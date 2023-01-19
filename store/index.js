import Vue from 'vue'
import Vuex, { Store } from 'vuex'

import auth from './modules/auth'
import projects from './modules/projects'

Vue.use(Vuex)

const createStore = () => {
  return new Store({
    modules: {
      auth,
      projects,
    },
  })
}
export default createStore