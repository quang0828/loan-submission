import { LoginType } from '../utils/interface'
import axios from 'axios';
import { API_URL } from './constants';

export default {
  async login (loginInfo: LoginType, cb: Function, errorCb: Function) {
    try {
      const response = await axios.post(API_URL + '/users/login', loginInfo)
      cb(response);
    } catch(error) {
      errorCb(error)
    }
  },

  async logout (token: string, cb: Function, errorCb: Function) {
    try {
      const response = await axios.post(
        API_URL + '/users/me/logout',
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      cb(response);
    } catch(error) {
      errorCb(error)
    }
  }
}