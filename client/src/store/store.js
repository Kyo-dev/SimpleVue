import Vue from 'vue'
import Vuex from 'vuex'

import Auth from './modules/auth'
import Employee from './modules/employee'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Auth, 
    Employee
  },
  // state: {

  // },
  // mutations: {

  // },
  // actions: {

  // }
})
