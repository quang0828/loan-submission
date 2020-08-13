import Vue from 'vue';
import loan from '@/api/loan'
import { LoanType } from '@/utils/interface'
import { getItem } from '@/utils/storage'
import { processLoans } from '@/utils/loansHelpers'

export interface LoansState {
  list: Array<any>;
  loading: boolean;
  error: string;
  createdLoan: any;
}

// initial state
const state = () => ({
  list: [],
  loading: false,
  error: null,
  createdLoan: {}
});

// getters
const getters = {};

// actions
const actions = {
  submitLoan (obj: { commit: Function }, loanInfo: LoanType) {
    const token = getItem('token') || '';
    const { commit } = obj;
    commit('fetchingData')
    loan.createLoan(
      token,
      loanInfo,
      (payload: any) => commit('createLoanSuccess', payload),
      (payload: any) => commit('createLoanFail', payload),
    )
  },
  getLoans (obj: { commit: Function }, loanInfo: LoanType) {
    const token = getItem('token') || '';
    const { commit } = obj;
    commit('fetchingData')
    loan.getLoans(
      token,
      (payload: any) => commit('getLoansSuccess', payload),
      (payload: any) => commit('getLoansFail', payload),
    )
  }
};

// mutations
const mutations = {
  fetchingData (state: LoansState) {
    state.loading = true
  },
  
  createLoanSuccess (state: LoansState, payload: any) {
    const { data } = payload; 
    if (data) {
      state.list = [data, ...state.list]
      state.createdLoan = data
      state.loading = false
      state.error = ''
    } else {
      state.error = 'Some thing wrong! Can not submit loan.'
    }
  },

  createLoanFail (state: LoansState, payload: any) {
    state.loading = false
    state.error = 'Some thing wrong! Can not submit loan.'
  },

  getLoansSuccess (state: LoansState, payload: any) {
    const { data } = payload; 
    if (data) {
      state.list = processLoans(data)
      state.loading = false
      state.error = ''
    } else {
      state.error = 'Some thing wrong! Can not get submitted loans.'
    }
  },

  getLoansFail (state: LoansState, payload: any) {
    state.list = []
    state.loading = false
    state.error = 'Some thing wrong! Can not get submitted loans.'
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}