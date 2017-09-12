
import type { Action } from './types';
import { Actions } from 'react-native-router-flux';
import { NetInfo } from 'react-native';
import _ from 'lodash';

export const EMAIL_CHANGED            = 'EMAIL_CHANGED';
export const PASSWORD_CHANGED         = 'PASSWORD_CHANGED';
export const LOGIN_USER_SUCCESS       = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAIL          = 'LOGIN_USER_FAIL';
export const LOGIN_USER               = 'LOGIN_USER';
export const CURRENT_USER             = 'CURRENT_USER';
export const CHANGE_CONNECTION_STATUS = 'CHANGE_CONNECTION_STATUS';

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
                            const str = JSON.stringify(eval('(' + user._bodyInit + ')'));
                            loginUserSuccess(dispatch, JSON.parse(str).token);
                        }
                        loginUserFail(dispatch);
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

export const getUser = ({ token }) => {
    return (dispatch) => {
        dispatch({ type: CURRENT_USER });

        fetch('http://0.0.0.0:8000/api/user', {
                   method: 'GET',
                   headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                   'Authorization': 'JWT '+token,
                   },
                   })
                   .then(response => {
                        const str = JSON.stringify(eval('(' + response._bodyInit + ')'));
                        getCurrentUser(dispatch, JSON.parse(str).first_name);
                    });
    };
};

const getCurrentUser = (dispatch, first_name) => {
    dispatch({
        type: CURRENT_USER,
        payload: first_name
    });
};

export const connectionState = ({ status }) => {
    return {
        type: CHANGE_CONNECTION_STATUS,
        isConnected: status
    };
};

export const createAnswer = ({ token, rating, question, record }) => {
    return (dispatch) => {
        dispatch({ type: SET_QUESTION });

        fetch('http://0.0.0.0:8000/api/questions', {
                   method: 'GET',
                   headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                   'Authorization': 'JWT '+token,
                   },
                   })
                   .then(response => {
                        const str = JSON.stringify(eval('(' + response._bodyInit + ')'));
                        const obj = JSON.parse(str);
                        const arr = [];
                        for (var i in obj) {
                            arr.push(obj[i].id);
                        }
                        getQuestions(dispatch, arr);
                        fetch('http://0.0.0.0:8000/api/answer', {
                                 method: 'POST',
                                 headers: {
                                 'Accept': 'application/json',
                                 'Content-Type': 'application/json',
                                 'Authorization': 'JWT '+token,
                                 },

                                 body: JSON.stringify({
                                 answer: rating,
                                 question: arr[question],
                                 record: record
                                 })
                                 })
                                 .then((response) => {
                                    console.log(response);

                                    if (response.status === 201) {
                                        dispatch({ type: ANSWER_CREATE });
                                    }
                                 });
                    });
    };
};