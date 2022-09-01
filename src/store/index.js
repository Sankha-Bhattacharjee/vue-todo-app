import Vue from "vue";
import Vuex from "vuex";
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './action.js'

Vue.use(Vuex);

const state = {
  tasks: [
    {
      id: 1,
      title: "Wake up",
      subTitle: "wake up at 7 AM",
      dueDate: null,
      done: false,
    },
    {
      id: 2,
      title: "Get groceries",
      subTitle: "Grocery for evening party",
      dueDate: null,
      done: false,
    },
    {
      id: 3,
      title: "Get wine",
      subTitle: "Wine for party",
      dueDate: null,
      done: false,
    },
  ],
  searchedTasks:[]
};

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});

export default store;
