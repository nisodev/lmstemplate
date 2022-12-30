import PlayCourse from '../services/PlayCourse'

export const state = () => ({
  courseProgress: null,
  activeLesson: null,
  reviews: null,
});

export const getters = {
  getCourseProgress(state) {
    return state.courseProgress;
  },
  getActiveLesson(state) {
    return state.activeLesson;
  },
};

export const mutations = {
  SET_COURSE_PROGRESS(state, course) {
    state.courseProgress = course;
  },
  SET_ACTIVE_LESSON(state, lesson) {
    state.activeLesson = lesson;
  },
  SET_COURSE_REVIEWS(state, reviews) {
    state.reviews = reviews;
  },
  UPDATE_PROGRESS(state, id) {
    state.courseProgress.Lectures.forEach(lecture => {
      lecture.Lessons.forEach((lesson) => {
        if (lesson.id === id) {
          lesson.progress = 100;
        }
      });
    });
  }
};

export const actions = {
  async updateLessonProgress({commit}, payload) {
    const res = await this.$axios.$post(`/lms/updatelesson/${payload.id}`, payload.data)
    return res
  },
  async sendReview({commit}, payload) {
    const res = await this.$axios.$post(`/lms/reviewcourse`, payload)
    return res
  },
  async getReviews({commit}, payload) {
    const res = await this.$axios.$get(`lms/coursereviews/${payload.guid}?p=${payload.page}&l=${payload.take}`)
    console.log(res);
    // commit('SET_COURSE_REVIEWS', res.data)
    return res
  },
};


