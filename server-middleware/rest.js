const app = require("express")();
const axios = require("axios");
var crypto = require("crypto");
var session = require("express-session");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
import {
  CONFIG_URL,
  SECRET,
  PAYMENT_URL,
  TERMINAL_ID,
  PASSWORD,
  MERCHANT_KEY,
  CURRENCY_CODE,
  MERCHANT_IP,
  CUSTOMER_IP,
  COUNTRY,
  COMPLETE_URL,
  PAYREQ,
  ADDITIONEL_INFO_SAVE_URL,
  PAYMENT_CALLBACK_URL,
  CHECKOUT_URL,
  SAVE_USER_CARD_URL,
} from "../const/const.js";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(async function (req, res, next) {
  req.getUser = async function () {
    if (req.user) {
      return req.user;
    }

    if (!req.cookies.token) {
      return null;
    }

    let token = req.cookies.token;

    token = token.trim();

    let config = {
      method: "get",
      url: CONFIG_URL,
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    try {
      let user = await axios(config);
      req.user = user.data;
      return user.data;
    } catch (e) {
      res.clearCookie("token");
      return null;
    }
  };
  next();
});
app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.post(PAYMENT_URL, async (req, res) => {
  /*let user = await req.getUser();


    if(!user) {
        res.status(403).json({
            error: 'Auth Error'
        });
    }


*/

  var $terminalId = TERMINAL_ID; // Will be provided by URWAY
  var $password = PASSWORD; // Will be provided by URWAY
  var $merchant_key = MERCHANT_KEY; // Will be provided by URWAY
  var $currencycode = CURRENCY_CODE;
  var $amount = req.body.amount;
  var hash = require("crypto")
    .createHash("sha256")
    .update(
      "NODE_" +
        Date.now() +
        "|" +
        $terminalId +
        "|" +
        $password +
        "|" +
        $merchant_key +
        "|" +
        $amount +
        "|" +
        $currencycode,
      "utf-8"
    )
    .digest("hex");

  let paymentData = {
    trackid: "NODE_" + Date.now(),
    terminalId: $terminalId,
    customerEmail: req.body.email,
    merchantIp: MERCHANT_IP,
    customerIp: CUSTOMER_IP, //req.ip,
    password: $password,
    currency: $currencycode,
    country: COUNTRY,
    requestHash: hash,
    amount: $amount,
    udf1: req.body.checkoutCode,
    udf2:
      COMPLETE_URL + "?id=" + req.body.courseId + "&" + req.body.checkoutCode, //Response page URL
    udf3: "",
    udf4: "",
    udf5: "",
  };

  paymentData.action = "1";
  paymentData.tokenizationType = "1";

  /*
    if(req.body.token!=='') {
        paymentData.action = '1';
        paymentData.cardToken = req.body.token;
        paymentData.tokenizationType = '0';
        console.log(paymentData.cardToken);
    } else {
        paymentData.action = '12';
        paymentData.tokenOperation = "A";
    }*/

  try {
    let payreq = await axios.post(PAYREQ, paymentData);
    res.json(payreq.data);
  } catch (e) {
    res.status(500).json({ error: false });
  }
});
app.get(ADDITIONEL_INFO_SAVE_URL, async (req, res) => {
  req.session.additionelInfo = req.query.data;
  res.json({ status: "ok" });
});
app.get(PAYMENT_CALLBACK_URL, async (req, res) => {
  let user = await req.getUser();
  if (!user) {
    return res.redirect(CHECKOUT_URL);
  }

  if (req.query.Result !== "Successful") {
    return res.redirect(
      `/checkout?result=${req.query.Result}&code=${req.query.ResponseCode}`
    );
  }
  if (req.query.cardToken) {
    try {
      var data = JSON.stringify({
        masked_pan: req.query.maskedPAN,
        card_brand: req.query.cardBrand,
        card_token: req.query.cardToken,
      });

      var config = {
        method: "post",
        url: SAVE_USER_CARD_URL,
        headers: {
          Authorization: `Bearer ${req.cookies.token}`,
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config);
    } catch (e) {
      console.log(e);
    }
  }
});

module.exports = app;
