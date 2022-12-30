import axios from "axios";
import { API_URL, CLIENT_AUTH_TOKEN } from "../const/const";

const clientAPI = (customHeaders) =>
  axios.create({
    baseURL: API_URL,
    withCredentials: false,
    headers: {
      "Client-Auth-Token": CLIENT_AUTH_TOKEN,
      lang: "en",
      ...customHeaders,
    },
});


export default clientAPI;


