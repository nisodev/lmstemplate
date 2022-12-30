import clientAPI from "./AxiosConfig";

export default {

  fetchCourseProgress(token, id) {
    const customHeaders = {
      "x-access-token": token || "",
    };
    return clientAPI(customHeaders).get(`/lms/getcourseprogress/${id}`);
  },

  updateLesson(token, id, payload) {
    const customHeaders = {
        "Content-Type": "application/json",
        "x-access-token": token || "",
    };
    return clientAPI(customHeaders).post(`/lms/updatelesson/${id}`, payload);
  }
}