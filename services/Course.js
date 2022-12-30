import clientAPI from "./AxiosConfig";

export default {
  getTopCourses(token) {
    const customHeaders = {
      "x-access-token": token || "",
    };
    return clientAPI(customHeaders).get("/lms/topCourses");
  },
  getUpcomingCourses(token) {
    const customHeaders = {
      "x-access-token": token || "",
    };
    return clientAPI(customHeaders).get("/lms/upcomingCourses");
  },
  getCourseDetails(token, id) {
    const customHeaders = {
      "x-access-token": token || "",
    };
    return clientAPI(customHeaders).get(`lms/getcoursedetail/${id}`);
  },
  registerCourse(token, payload) {
    const customHeaders = {
      "x-access-token": token || "",
    };
    return clientAPI(customHeaders).post(`lms/compregistercourse`, payload);
  },
  preRegisterCourse(token, payload) {
    const customHeaders = {
      "x-access-token": token || "",
    };
    return clientAPI(customHeaders).post(`lms/preregistercourse`, payload);
  },
  getMyCourses(token) {
    const customHeaders = {
      "x-access-token": token || "",
    };
    return clientAPI(customHeaders).get(`lms/mycourses`);
  },
  getOngoingCourses(token) {
    const customHeaders = {
      "x-access-token": token || "",
    };
    return clientAPI(customHeaders).get(`lms/memberongoingcourses`);
  },
  getMemberUpcomingCourses(token) {
    const customHeaders = {
      "x-access-token": token || "",
    };
    return clientAPI(customHeaders).get(`lms/memberupcomingcourses`);
  },
  getCoursesByKey(token, key) {
    const customHeaders = {
      "x-access-token": token || "",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    };
    return clientAPI(customHeaders).get(`lms/getcoursesbykey?k=${key}`);
  },
  getCoursesByCategory(token, id) {
    const customHeaders = {
      "x-access-token": token || "",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    };
    return clientAPI(customHeaders).get(`lms/getcoursesbycategory/${id}`);
  },
  getSidebarCategory(name) {
    return clientAPI().get(`lms/categoriesbykey?k=${name}&q=8`);
  },
  getAllCourses(token) {
    const customHeaders = {
      "x-access-token": token || "",
    }
    return clientAPI(customHeaders).get(`lms/getallcourses`);
  }
};
