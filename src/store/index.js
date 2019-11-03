import Vue from 'vue'
import Vuex from 'vuex'
import cartModules from './cart';
import alertMessageModules from './alertMessage';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    nowPage: 'home',
  },
  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    },

    NOW_PAGE(state, page) {
      state.nowPage = page;
    },
  },
  actions: {
    updateLoading(context, status) {
      context.commit('LOADING', status)
    },

    updateNowPage(context, page) {
      context.commit('NOW_PAGE', page);
    },
  },
  modules: {
    cartModules,
    alertMessageModules,
  },
})
