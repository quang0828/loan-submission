import { LoanType } from '../utils/interface'
import axios from 'axios';
import { API_URL } from './constants';

export default {
  async createLoan (
    token: string,
    loanInfo: LoanType,
    cb: Function,
    errorCb: Function
  ) {
    try {
      const response = await axios.post(
        API_URL + '/loans',
        loanInfo,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      cb(response);
    } catch(error) {
      errorCb(error)
    }
  },

  async getLoans (token: string, cb: Function, errorCb: Function) {
    try {
      const response = await axios.get(
        API_URL + '/loans',
        { headers: { Authorization: `Bearer ${token}` } }
      )
      cb(response);
    } catch(error) {
      errorCb(error)
    }
  }
}