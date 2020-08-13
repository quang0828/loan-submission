import user from '@/api/user'
import { LoginType } from '@/utils/interface'
import { setItem, getItem, removeItem } from '@/utils/storage'

export interface UserState {
  data: any;
  loading: boolean;
  error: string;
  token: string;
}

// initial state
const state = () => ({
  data: {},
  loading: false,
  error: null,
  token: getItem('token') || ''
});

const token = getItem('token') || ''

// actions
const actions = {
  userLogin (obj: { commit: Function }, loginInfo: LoginType) {
    const { commit } = obj;
    commit('isLoading')
    user.login(
      loginInfo,
      (payload: any) => commit('setUser', payload),
      (payload: any) => commit('loginFail', payload),
    )
  },
  userLogout (obj: { commit: Function }) {
    removeItem('token')
    const { commit } = obj;
    user.logout(
      token,
      (payload: any) => commit('removeUser', payload),
      (payload: any) => commit('removeUser', payload),
    )
  }
};

// mutations
const mutations = {
  setUser (state: UserState, payload: any) {
    const { data } = payload; 
    if (data && data.token) {
      state.data = {...state.data, ...data.user}
      state.loading = false
      state.error = ''
      state.token = data.token
      setItem('token', data.token)
    } else {
      state.error = 'Email or password is wrong!'
    }
  },

  isLoading (state: UserState) {
    state.loading = true
  },

  loginFail (state: UserState, payload: any) {
    state.data = {}
    state.loading = false
    state.error = 'Email or password is wrong!'
  },
  
  removeUser (state: UserState) {
    state.data = {}
    state.loading = false
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
}