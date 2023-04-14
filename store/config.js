export const state = () => ({
  logo: '',
  config: null
})

export const mutations = {
  SET_LOGO (state, logo) {
    state.logo = logo
  },
  SET_CONFIG (state, config) {
    state.config = config
  }
}

export const getters = {
  getLogo (state) {
    return state.logo
  },
  getConfig (state) {
    return state.config
  }
}

export const actions = {
  async getConfig ({ commit }) {
    const res = await this.$axios.$get('/cms/getconfig').catch((err) => {
      console.log(err)
    })
    if (res.data) {
      commit('SET_LOGO', res.data.ClientSetting.logo)
      commit('SET_CONFIG', res.data)
    }
    return res.data
  }
}
