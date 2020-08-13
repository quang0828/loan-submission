import Vue from 'vue'
import Vuex, { createLogger } from 'vuex'
import user from './modules/user'
import loan from './modules/loan'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    user,
    loan
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})