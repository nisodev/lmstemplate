import clientAPI from "./AxiosConfig";
export default {
  register(payload) {
    return clientAPI().post("/register", payload);
  },
  login(payload) {
    return clientAPI().post("/login", payload);
  },
  getUserDetails(token) {
    const customHeaders = {
      "x-access-token": token,
    };
    return clientAPI(customHeaders).get("/user/getinfo");
  },
};
