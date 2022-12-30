export const state = () => ({
  quizList: [],
  quiz: null,
  questions: [],
  question: {},
  result: null
});

export const getters = {
  getQuizList(state) {
    return state.quizList;
  },
  getQuiz(state) {
    return state.quiz;
  },
  getQuestions(state) {
    return state.questions;
  },
  getQuestion(state) {
    return state.question;
  },
  getResult(state) {
    return state.result
  }
};

export const mutations = {
  SET_QUIZ_LIST(state, quizList) {
    state.quizList = quizList;
  },
  SET_QUIZ(state, quiz) {
    state.quiz = quiz;
  },
  SET_QUESTIONS(state, questions) {
    state.questions = questions;
  },
  SET_QUESTION(state, question) {
    state.question = question
  },
  SET_RESULT(state, result) {
    state.result = result
  }
};

export const actions = {
  async fetchQuizzes({ commit }) {
    let res = await this.$axios.$get('/lms/myexams')
    res = res.data.map((quiz) => {
      return {
        ...quiz,
        examInfo: quiz.examInfo = JSON.parse(quiz.examInfo)
      } 
    });
    commit('SET_QUIZ_LIST', res);
  },
  async startQuiz({ commit }, payload) {
    let res = await this.$axios.$post('/lms/startExam', payload)
    res.data.forEach((question) => {
      question.questionAnswers = JSON.parse(question.questionAnswers)
    });
    commit('SET_QUESTIONS', res.data);
    commit('SET_QUESTION', res.data[0]);
    return res
  },
  async finishQuiz ({ commit }, payload) {
    let res = await this.$axios.$post('/lms/completeexam', payload)
    return res
  },
  async getResults ({ commit }, {id}) {
    let res = await this.$axios.$get(`/lms/getexamresults/${id}`)
    return res
  },
  async answer ({ commit }, payload) {
    let res = await this.$axios.$post('/lms/processexam', payload)
    return res
  },
  async getQuestionDetails ({ commit }, id) {
    let res = await this.$axios.$get(`/lms/getexamquestions/${id}`)
    return res
  }
  
};


