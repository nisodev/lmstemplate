import clientAPI from "./AxiosConfig";

export default {
  getDashboard(token) {
    const customHeaders = {
      "x-access-token": token || "",
    };
    return clientAPI(customHeaders).get(`lms/getdashboard`);
  },
};
