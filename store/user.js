export const state = () => ({
  token: null,
  user: null
})

export const mutations = {
  setToken(state, value) {
    state.token = value
  },
  setUser(state, value) {
    state.user = value
  },
  unsetUser(state, value) {
    state.user = null
  },
  unsetToken(state, value) {
    state.user = null
  },
}

export const getters = {
  getUser(state) {
    return state.user
  },
  isApproved(state) {
    if (!state.user) return false;
    return state.user.role !== 'UNAPPROVED'
  },
  isUser(state) {
    if (!state.user) return false;
    return state.user.role === 'USER'
  }
}

export const actions = {
  async fetchUser({ commit }) {
    const userId = localStorage.getItem('userId')
    if (userId) {
      await this.$axios.$get(`/users/${userId}`)
        .then(res => {
          commit('setUser', res)
        })
        .catch(res => {
          commit('set', null)
        })
    }
  },
  unsetUser({ commit }) {
    commit('unsetUser')
    commit('unsetToken')
  },
  logoutUser({ commit }) {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userId');
    commit('unsetUser')
    commit('unsetToken')
  }
}
