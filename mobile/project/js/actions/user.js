
import type { Action } from './types';
import { Actions } from 'react-native-router-flux';

export const EMAIL_CHANGED = 'EMAIL_CHANGED';
export const PASSWORD_CHANGED = 'PASSWORD_CHANGED';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';
export const LOGIN_USER = 'LOGIN_USER';
export const CURRENT_USER = 'CURRENT_USER';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const SET_QUESTION = 'SET_QUESTION';
export const ANSWER_CHANGED = 'ANSWER_CHANGED';
export const ANSWER_CREATE = 'ANSWER_CREATE';
export const SET_BACK = 'SET_BACK';
export const TEXT_INPUT_CHANGED = 'TEXT_INPUT_CHANGED';
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
                            var str = JSON.stringify(eval('(' + user._bodyInit + ')'));
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

export const answerCreated = (rating) => {
    const options = {
        'Not at all':         0,
        'Occasionally':       1,
        'Sometimes':          2,
        'Most of the time':   3,
        'Always':             4
    };

    return {
        type: ANSWER_CHANGED,
        payload: options[rating]
    };
};

export const answerModified = (rating) => {
    const options = {
        'Always':             0,
        'Most of the time':   1,
        'Sometimes':          2,
        'Occasionally':       3,
        'Not at all':         4
    };

    return {
        type: ANSWER_CHANGED,
        payload: options[rating]
    };
};

export const answerAltered = (rating) => {
    const options = {
        'Problems addressed/No problems':  0,
        'Problems mostly addressed':       1,
        'Problems partly addressed':       2,
        'Problems hardly addressed':       3,
        'Problems not addressed':          4
    };

    return {
        type: ANSWER_CHANGED,
        payload: options[rating]
    };
};

export const whoAnswered = (rating) => {
    const options = {
        'On my own':                            0,
        'With help from a friend or relative':  1,
        'With help from a member of staff':     2
    };

    return {
        type: ANSWER_CHANGED,
        payload: options[rating]
    };
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
                        var str = JSON.stringify(eval('(' + response._bodyInit + ')'));
                        var obj = JSON.parse(str);
                        var arr = [];
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

const getQuestions = (dispatch, questions) => {
    dispatch({
        type: GET_QUESTIONS,
        payload: questions
    });
};

export const setQuestion = (question) => {
    return {
        type: SET_QUESTION,
        payload: question
    };
}

export const textChanged = (text) => {
    return {
        type: TEXT_INPUT_CHANGED,
        payload: text
    };
};

export const updateAnswer = ({ token, record, question, rating, text }) => {
    return (dispatch) => {

        fetch('http://0.0.0.0:8000/api/update/' + record + '/' + question, {
                   method: 'PUT',
                   headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                   'Authorization': 'JWT '+token,
                   },

                   body: JSON.stringify({
                   text: text,
                   answer: rating
                   })
                   })
                   .then((response) => {
                        console.log('UPDATED',response);
                        if (response.status === 200) {
                            dispatch({ type: ANSWER_CREATE });
                        }
                   });
    };
};


