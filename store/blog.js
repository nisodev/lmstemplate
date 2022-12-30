export const state = () => ({
  headerPost: {},
  categories: [],
  category: {},
  postSize: null,
  posts: [],
  post: {}
})
export const mutations = {
  SET_CATEGORIES (state, categories) {
    state.categories = categories
  },
  SET_CATEGORY (state, category) {
    state.category = category
  },
  SET_POST_SIZE (state, postSize) {
    state.postSize = postSize
  },
  SET_POSTS (state, posts) {
    state.posts = posts
  },
  SET_POST (state, post) {
    state.post = post
  },
  SET_HEADER_POST (state, post) {
    state.headerPost = post
  }
}
export const actions = {
  async fetchCategories ({ commit }) {
    const { data } = await this.$axios.$get('cms/blogcategories').catch((err) => {
      console.log(err)
    })
    commit('SET_CATEGORIES', data)
  },
  async fetchBlogPosts ({ commit }, { page = 1, limit = 6, q = '' }) {
    const { data, totalposts } = await this.$axios.$get(`cms/blogposts?l=${limit}&p=${page}&q=${q}`).catch((err) => {
      console.log(err)
    })
    commit('SET_POSTS', data)
    commit('SET_POST_SIZE', totalposts)
    if (data.length > 0) {
      commit('SET_HEADER_POST', data[0])
    }
  },
  async fetchBlogPostsByCategory ({ commit }, { page = 1, limit = 6, category, q = '' }) {
    const { data, totalposts } = await this.$axios.$get(`cms/blogposts?l=${limit}&p=${page}&c=${category}&q=${q}`).catch((err) => {
      console.log(err)
    })
    commit('SET_POSTS', data)
    commit('SET_POST_SIZE', totalposts)
  },
  async fetchBlogPost ({ commit }, id) {
    const { data } = await this.$axios.$get(`cms/postdetail?id=${id}`).catch((err) => {
      console.log(err)
    })
    commit('SET_POST', data)
    return data
  }
}
export const getters = {
  categories: state => state.categories,
  category: state => state.category,
  posts: state => state.posts,
  postSize: state => state.postSize,
  post: state => state.post,
  headerPost: state => state.headerPost
}
