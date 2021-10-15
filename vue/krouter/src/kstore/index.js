import Vue from 'vue'
import Vuex from './kvuex.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 1,
    todos: [
      { id: 1, text: '1', done: true },
      { id: 2, text: '2', done: true },
      { id: 3, text: '3', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => !todo.done)
    }
  },
  mutations: {
    add(state) {
      state.counter ++;
    }
  },
  actions: {
    add({ commit }) {
      setTimeout(() => {
        commit('add')
      }, 1000)
    }
  },
  modules: {
  }
})
