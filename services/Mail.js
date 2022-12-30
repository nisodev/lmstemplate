import clientAPI from "./AxiosConfig";

export default {
  feedback(payload) {
    return clientAPI().post("/feedback", payload);
  },
  notifyMe(token, payload) {
    const customHeaders = {
      "x-access-token": token || "",
    };
    return clientAPI(customHeaders).post("/followup", payload);
  },
};
