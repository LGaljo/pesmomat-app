export const state = () => ({
  authors: [],
})

export const mutations = {
  set(state, value) {
    state.authors = value
  },
  unset(state) {
    state.authors = null
  },
}

export const getters = {
  get(state) {
    return state.authors
  },
}

export const actions = {
  async fetch({ commit }, filters) {
    commit('set', [])
    this.$axios.$get(`/author`, { params: filters })
      .then(res => {
        commit('set', res)
      })
      .catch(res => {
        console.error(res)
      })
  },
  async remove({ commit }, id) {
    this.$axios.$delete(`/author/${id}`)
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
