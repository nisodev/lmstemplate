import jsCookie from "js-cookie";
export const state = () => ({
  user: null,
});

export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
};

export const getters = {
  getUser(state) {
    return state.user;
  },
};
