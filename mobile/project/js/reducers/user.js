import type { Action } from '../actions/types';
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    CURRENT_USER,
    ANSWER_CHANGED,
    ANSWER_CREATE,
    GET_QUESTION,
    CHANGE_CONNECTION_STATUS
} from '../actions/user';

export type State = {
    first_name: string,
    email: string,
    password: string,
    user: string,
    error: string,
    token: string,
    loading: boolean,
    rating: string,
    isConnected: boolean,
    answers: object,
    question: integer,
    questions: string
}

const initialState = {
    email: '',
    first_name: '',
    password: '',
    user: null,
    error: '',
    token: '',
    loading: false,
    rating: 2,
    isConnected: false,
    answers: [],
    question: 1,
    questions: ''
};

function getToken(token) {
    myToken = "";
    for (var i = 10; i < token.length; i++){
        if (token[i] === '\"') {
            break;
        }
        myToken += token[i];
    }
    return myToken;
}

export default function (state:State = initialState, action:Action): State {
  switch (action.type){
      case EMAIL_CHANGED:
          return { ...state, email: action.payload };
      case PASSWORD_CHANGED:
          return { ...state, password: action.payload };
      case LOGIN_USER:
          return { ...state, loading: true, error: '' };
      case LOGIN_USER_SUCCESS:
          return { ...state, error: '', user: action.payload, token: getToken(action.payload._bodyInit), loading: false };
      case CURRENT_USER:
          return { ...state, first_name: action.payload };
      case LOGIN_USER_FAIL:
          return { ...state, error: 'Authentication Failed.', password: '', loading: false };
      case ANSWER_CREATE:
          return { ...state };
      case GET_QUESTION:
          return { ...state, questions: action.payload };
      case ANSWER_CHANGED:
          return { ...state, rating: action.payload  };
      case CHANGE_CONNECTION_STATUS:
          return Object.assign({}, state, { isConnected: action.isConnected });
      default:
          return state;
  }
}
