export default {
  state: {
    userInfo: {}
  },
  actions: {
    setUserInfo({ commit }, info) {
      commit('SET_USER_INFO', info)
    },
    clearUserInfo({ commit }) {
      commit('SET_USER_INFO')
    }
  },
  mutations: {
    SET_USER_INFO(state, info){
      state.userInfo = info
    },
    CLEAR_USER_INFO(state){
      state.userInfo = {}
    }
  }
}