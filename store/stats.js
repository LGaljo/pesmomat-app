export const state = () => ({
  stats: [],
})

export const mutations = {
  set(state, value) {
    state.stats = value
  },
  unset(state) {
    state.stats = null
  },
}

export const getters = {
  get(state) {
    return state.stats
  },
}

export const actions = {
  async fetch({ commit }, filters) {
    commit('set', [])
    this.$axios.$get(`/stats`, { params: filters })
      .then(res => {
        commit('set', res.items)
      })
      .catch(res => {
        console.error(res)
      })
  },
  async saveAction({ commit }, data) {
    await this.$axios.$post(`/stats/${data.action}/${data.id}`)
  },
  unset({ commit }) {
    commit('unset')
  },
}
