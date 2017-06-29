
import type { Action } from './types';
import { Actions } from 'react-native-router-flux';

export const EMAIL_CHANGED = 'EMAIL_CHANGED';
export const PASSWORD_CHANGED = 'PASSWORD_CHANGED';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';
export const LOGIN_USER = 'LOGIN_USER';
export const CURRENT_USER = 'CURRENT_USER';

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });

        fetch('http://0.0.0.0:8000/api/login', {
                   method: 'POST',
                   headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                   },

                   body: JSON.stringify({
                   email: email,
                   password: password,
                   })
                   })
                   .then(user => {// calling after request is complete
                        if (user.status === 200) {
                            loginUserSuccess(dispatch, user);
                        }
                        loginUserFail(dispatch);
                    });
    };
};

export const getUser = ({ token }) => {
    return (dispatch) => {
        dispatch({ type: CURRENT_USER });

        fetch('http://0.0.0.0:8000/api/user', {
                   method: 'GET',
                   headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                   'Authorization': 'Token '+token,
                   },
                   })
                   .then(response => {
                        getCurrentUser(dispatch, response);
                    });
    };
};

const loginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
    // redirect successful login to homepage
    Actions.home();
};

const getCurrentUser = (dispatch, username) => {
    dispatch({
        type: CURRENT_USER,
        payload: username
    });
};
