import Vue from "vue";
import Vuex from "vuex";
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './action.js'

Vue.use(Vuex);

const state = {
  userId: null,
  userFirstName:'',
  userLastName: '',
  isAuthenticated: false,
  tasks: []
};

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});

export default store;
