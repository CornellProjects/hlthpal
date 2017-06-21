import type { Action } from '../actions/types';
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER
} from '../actions/user';

export type State = {
    email: string,
    password: string,
    user: string,
    error: string,
    token: string,
    loading: boolean
}

const initialState = {
    email: '',
    password: '',
    user: null,
    error: '',
    token: '',
    loading: false
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
          return { ...state, user: action.payload, token: action.token, error: '', loading: false };
      case LOGIN_USER_FAIL:
          return { ...state, error: 'Authentication Failed.', password: '', loading: false };
      default:
          return state;
  }
}