const API_URL = process.env.API_URL
// const CLIENT_AUTH_TOKEN = "9997188f-9f50-44a3-ac81-d95d332eddbf";
const CLIENT_AUTH_TOKEN = process.env.CLIENT_AUTH_TOKEN

// REST.JS

const CONFIG_URL = 'https://ship.baja.com.sa/api/v1/authenticated/profile'
const SECRET = 'keyboard cat'
const PAYMENT_URL = '/api/checkout/payment'
const TERMINAL_ID = 'sigal'
const PASSWORD = 'sigal@123'
const MERCHANT_KEY =
  'cee58136af241a859a1d8c791b5e16d15b9607ac1514463a9b9541f64382b603'
const CURRENCY_CODE = 'SAR'
const MERCHANT_IP = '159.0.239.20'
const CUSTOMER_IP = '159.0.239.20'
const COUNTRY = 'SA'
const COMPLETE_URL = 'https://training.niso.dev/course/course-details/'
const PAYREQ =
  'https://payments-dev.urway-tech.com/URWAYPGService/transaction/jsonProcess/JSONrequest'
const ADDITIONEL_INFO_SAVE_URL = '/api/additionelInfo/save'
const PAYMENT_CALLBACK_URL = '/api/checkout/payment/callback'
const CHECKOUT_URL = '/course/course-details'
const SAVE_USER_CARD_URL =
  'https://ship.baja.com.sa/api/v1/authenticated/ecwid/customers/cctoken/saveusercard'

export {
  API_URL,
  CLIENT_AUTH_TOKEN,
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
  SAVE_USER_CARD_URL
}
