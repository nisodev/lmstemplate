export const state = () => ({
  certs: []
})

export const mutations = {
  SET_CERTS (state, certs) {
    state.certs = certs
  }
}

export const getters = {
  getCerts (state) {
    return state.certs
  }
}

export const actions = {
  async getCerts ({ commit }) {
    const res = await this.$axios.$get('/lms/mycerts')
    commit('SET_CERTS', res)
    console.log(res)
    return res
  }
}
