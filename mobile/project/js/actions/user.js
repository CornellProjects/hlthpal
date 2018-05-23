
import type { Action } from './types';
import { Actions } from 'react-native-router-flux';
import { NetInfo } from 'react-native';
import _ from 'lodash';
import { moi_username, moi_password, moi_firstname } from '../cred.js';

export const EMAIL_CHANGED            = 'EMAIL_CHANGED';
export const PASSWORD_CHANGED         = 'PASSWORD_CHANGED';
export const LOGIN_USER_SUCCESS       = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAIL          = 'LOGIN_USER_FAIL';
export const LOGIN_USER               = 'LOGIN_USER';
export const CURRENT_USER             = 'CURRENT_USER';
export const SET_RECORDS              = 'SET_RECORDS';
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
        NetInfo.isConnected.fetch().done((isConnected) => {
            console.log('[DEBUG] createRecord => has connectivity :' + isConnected);
            if (isConnected) {
                fetch(myUrl + '/api/login', {
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
                            fetch(myUrl + '/api/user', {
                                   method: 'GET',
                                   headers: {
                                   'Accept': 'application/json',
                                   'Content-Type': 'application/json',
                                   'Authorization': 'JWT '+JSON.parse(str).token,
                                   },
                                   })
                                   .then(response => {
                                        const str = JSON.stringify(eval('(' + response._bodyInit + ')'));
                                        getCurrentUser(dispatch, JSON.parse(str).first_name);
                                    })

                               fetch(myUrl + '/api/record', {
                                       method: 'GET',
                                       headers: {
                                       'Accept': 'application/json',
                                       'Content-Type': 'application/json',
                                       'Authorization': 'JWT '+JSON.parse(str).token,
                                       },
                                       })
                                       .then(response => {
                                            const str = JSON.stringify(eval('(' + response._bodyInit + ')'));
                                            const parsed = JSON.parse(str);
                                            setRecords(dispatch, parsed);
                                        });
                        } else {
                            loginUserFail(dispatch);
                        }
                    })
    //                    .catch((error) => {
    ////                        console.log(error.response.data);
    //                        const str = JSON.stringify({
    //                                                       email: email,
    //                                                       password: password,
    //                                                       });
    //                        console.error(error);
    //                        console.log("Annoying error")
    //                        console.log(str);
    //                        if (error.response) {
    //                            console.log(error.response.data);
    //                            console.log(error.response.status);
    //                            console.log(error.response.headers);
    //                        } else if (error.request) {
    //                            // The request was made but no response was received
    //                            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //                            // http.ClientRequest in node.js
    //                            console.log(error.request);
    //                        } else {
    //                            // Something happened in setting up the request that triggered an Error
    //                            console.log('Error', error.message);
    //                        }

    //                    });
            } else {
                console.log('No internet connectivity, persisting the user credentials locally.');
//                persistRecordToLocalStore(token, answersArray, mySymptoms, score);
                loginUserSuccess(dispatch, null);
                getCurrentUser(dispatch, moi_firstname);
            }
        });

    };
};

const setRecords = (dispatch, records) => {
    dispatch({
        type: SET_RECORDS,
        payload: records
    });
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

const getCurrentUser = (dispatch, firstName) => {
    dispatch({
        type: CURRENT_USER,
        payload: firstName
    });
};

export const connectionState = ({ status }) => {
    return {
        type: CHANGE_CONNECTION_STATUS,
        isConnected: status
    };
};