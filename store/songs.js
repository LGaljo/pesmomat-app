export const state = () => ({
  songs: [],
  total: 0,
})

export const mutations = {
  set(state, value) {
    state.songs = value
  },
  setTotal(state, value) {
    state.total = value
  },
  unset(state) {
    state.songs = null
  },
}

export const getters = {
  get(state) {
    return state.songs
  },
}

export const actions = {
  async fetch({ commit }, filters) {
    this.$axios.$get('/songs', {
      params: {
        page: filters?.currentPage ?? 1,
        limit: filters?.perPage ?? 500,
        noBody: !!filters?.noBody,
        author: filters?.author,
        period: filters?.period,
        search: filters?.search
      }
    })
      .then(res => {
        if (!!res?.items) {
          commit('set', res?.items)
          commit('setTotal', res?.total)
        }
      })
      .catch((res) => {
        console.error(res)
      })
  },
  async remove({ commit }, id) {
    this.$axios.$delete(`/songs/${id}`)
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
