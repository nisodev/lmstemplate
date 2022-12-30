import clientAPI from "./AxiosConfig";

export default {
  getPage(key) {
    return clientAPI().get(`cms/getpage?pagekey=${key}`);
  },
};
