import type { Action } from '../actions/types';
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    CURRENT_USER,
    SET_RECORDS,
    CHANGE_CONNECTION_STATUS,
    SET_OFFLINE_CRED
} from '../actions/user';

export type State = {
    myRecords: string,
    username: string,
    email: string,
    first_name: string,
    password: string,
    user: string,
    error: string,
    token: string,
    loading: boolean,
    isConnected: boolean
}

const initialState = {
    myRecords: [],
    email: '',
    username: '',
    first_name:'',
    password: '',
    user: null,
    error: '',
    token: '',
    loading: false,
    isConnected: false
};


export default function (state:State = initialState, action:Action): State {
  switch (action.type){
      case EMAIL_CHANGED:
          return { ...state, email: action.payload };
      case PASSWORD_CHANGED:
          return { ...state, password: action.payload };
      case LOGIN_USER:
          return { ...state, loading: true, error: '' };
      case LOGIN_USER_SUCCESS:
          return { ...state, error: '', token: action.payload, loading: false };
      case CURRENT_USER:
          return { ...state, first_name: action.payload };
      case SET_OFFLINE_CRED:
          return { ...state, username: action.payload.username, password: action.payload.password };
      case LOGIN_USER_FAIL:
          return { ...state, error: 'Wrong email or password. Please try again.', password: '', loading: false };
      case SET_RECORDS:
          return { ...state, myRecords: action.payload };
      case CHANGE_CONNECTION_STATUS:
          return Object.assign({}, state, { isConnected: action.isConnected });
      default:
          return state;
  }
}
