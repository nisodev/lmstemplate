import clientAPI from "./AxiosConfig";

export default {
  updateUser(token, payload) {
    const customHeaders = {
      "x-access-token": token || "",
    };
    return clientAPI(customHeaders).put("/user/updateInfo", payload);
  },

  updatePassword(token, payload) {
    const customHeaders = {
      "x-access-token": token || "",
    };
    return clientAPI(customHeaders).put("/user/updatePass", payload);
  },

  updatePhoto(token, payload) {
    const customHeaders = {
      "x-access-token": token || "",
    };
    return clientAPI(customHeaders).put("/user/updatePhoto", payload);
  },

  upload(token, payload) {
    const customHeaders = {
      "x-access-token": token || "",
      "Content-Type": "multipart/form-data",
    };
    return clientAPI(customHeaders).post("/upload/client", payload);
  },
};
