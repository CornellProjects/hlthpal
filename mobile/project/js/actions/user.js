
import type { Action } from './types';
import { Actions } from 'react-native-router-flux';

export const EMAIL_CHANGED = 'EMAIL_CHANGED';
export const PASSWORD_CHANGED = 'PASSWORD_CHANGED';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';
export const LOGIN_USER = 'LOGIN_USER';
export const CURRENT_USER = 'CURRENT_USER';

export const ANSWER_CHANGED = 'ANSWER_CHANGED';
export const ANSWER_CREATE = 'ANSWER_CREATE';

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
                        var str = JSON.stringify(eval('(' + response._bodyInit + ')'));
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

export const createAnswer = ({
        rating,
        token
    }) => {
          // Change IP address according to yours
          // Make sure to include your IP address in Django settings.py ALLOWED_HOSTS
          return (dispatch) => {
              fetch('http://0.0.0.0:8000/api/record', {
                     method: 'POST',
                     headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
                     'Authorization': 'JWT '+token,
                     },

                     body: JSON.stringify({
                     answer: rating
                     })
                     })
                     .then((response) => {
                        console.log(response);
                        dispatch({ type: ANSWER_CREATE });

                        if (response.status === 201) {
                            Actions.qtwoTwo();
                        }
                     });
         };
    };

export const answerChanged = (rating) => {
    const options = {
        'Not at all':     0,
        'Slightly':       1,
        'Moderately':     2,
        'Severely':       3,
        'Overwhelmingly': 4
    };

    return {
        type: ANSWER_CHANGED,
        payload: options[rating]
    };
};