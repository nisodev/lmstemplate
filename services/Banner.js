import clientAPI from "./AxiosConfig";

export default {
  getMain() {
    return clientAPI().get("/cms/getmain");
  },
};
