export const state = () => ({
  categories: [],
})

export const mutations = {
  set(state, value) {
    state.categories = value
  },
  unset(state) {
    state.user = null
  },
}

export const getters = {
  get(state) {
    return state.categories
  },
}

export const actions = {
  async fetch({ commit }, filters) {
    // console.log('lang: ', filters)
    this.$axios.$get(`/categories`, {
      params: {
        filters
      }
    })
      .then(res => {
        commit('set', res)
      })
      .catch(res => {
        console.error(res)
      })
  },
  async remove({ commit }, id) {
    this.$axios.$delete(`/categories/${id}`)
      .then(res => {
        console.log(res)
      })
      .catch(res => {
        console.error(res)
      })
  },
  unset({ commit }) {
    commit('unset')
  },
}
