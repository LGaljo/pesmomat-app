export const state = () => ({
  amount: 0
})

export const mutations = {
  set (state, amount) {
    state.amount = amount
  }
}

export const getters = {
  get (state) {
    return state.amount
  }
}

export const actions = {
  async set({ commit }) {
    await this.$axios.$get('/tokens')
      .then(res => {
        commit('set', res.amount)
      })
      .catch(res => {
        console.log(res)
        commit('set', -1)
      })
  },
  async reduce({ commit }) {
    await this.$axios.$post('/tokens?value=-1')
      .then(res => {
        commit('set', res.amount)
      })
      .catch(err => {
        console.log(err)
      })
  },
  unset({ commit }) {
    commit('unset')
  },
}
