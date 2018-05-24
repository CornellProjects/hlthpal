import type { Action } from './types';
import { Actions } from 'react-native-router-flux';
import { NetInfo, AsyncStorage } from 'react-native';
import OfflineAnswerHandler from '../handlers/offlineAnswerHandler';
import Record from '../dao/record';
//import { moi_username, moi_email, moi_password, moi_firstname } from '../cred.js';

export const SELECT_RECORD       = 'SELECT_RECORD';
export const SELECT_SYMPTOM      = 'SELECT_SYMPTOM';
export const SET_RECORD          = 'SET_RECORD';
export const CREATE_RECORD       = 'CREATE_RECORD';

const base64 = require('base-64');

function calculateRecordScore(myArray) {
    var count = 0;

    myArray.forEach(function(item) {
        if (!isNaN(parseInt(item.answer))){
            count += item.answer;
        }
    });

    return count;
};

function assignRecord(myArray, record) {
    myArray.forEach(function(item) {
        item.record = record;
    });

    return myArray;
};

function prepareRecord(myArray) { //only push questions that have been filled
    let myNewArray = []
    myArray.forEach(function(item) {
        if (item.answer !== ""){
            myNewArray.push(item);
        }
    });
    return myNewArray;
};

const setCurrentRecord = (dispatch, record) => {
    dispatch({
        type: CREATE_RECORD,
        payload: record
    });
};

const submitCreateRecordCall = (token, answersArray, mySymptoms, score, callback) => {
    console.log('Submitting a record to the server.');

    fetch(myUrl + '/api/record', {
               method: 'POST',
               headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': 'JWT '+token,
               },

               body: JSON.stringify({
                    score: score
               })
    })
    .then(response => {
        const str = JSON.stringify(eval('(' + response._bodyInit + ')'));
        const parsed = JSON.parse(str).id;

        answersArray = assignRecord(answersArray, parsed);
        mySymptoms = assignRecord(mySymptoms, parsed);
        newAnswersArray = prepareRecord(answersArray);

        fetch(myUrl + '/api/answer', {
               method: 'POST',
               headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': 'JWT '+ token,
               },

               body: JSON.stringify(newAnswersArray)
        }).then(response => {console.log('ANSWERS', response)});

        fetch(myUrl + '/api/symptom', {
               method: 'POST',
               headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': 'JWT '+token,
               },

           body: JSON.stringify(mySymptoms)
        }).then(response => {
            console.log('SYMPTOMS', response);
            if (callback) {
                callback();
            }});
    });
}

const submitCreateRecordCallNoToken = (email, password, answersArray, mySymptoms, score, callback) => {
    console.log('Submitting a record to the server.');

    fetch(myUrl + '/api/record', {
               method: 'POST',
               headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': 'Basic ' + base64.encode(email + ":" + password),
               },

               body: JSON.stringify({
                    score: score
               })
    })
    .then(response => {
        const str = JSON.stringify(eval('(' + response._bodyInit + ')'));
        const parsed = JSON.parse(str).id;

        answersArray = assignRecord(answersArray, parsed);
        mySymptoms = assignRecord(mySymptoms, parsed);
        newAnswersArray = prepareRecord(answersArray);

        fetch(myUrl + '/api/answer', {
               method: 'POST',
               headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': 'Basic ' + base64.encode(email + ":" + password),
               },

               body: JSON.stringify(newAnswersArray)
        }).then(response => {console.log('ANSWERS', response)});

        fetch(myUrl + '/api/symptom', {
               method: 'POST',
               headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': 'Basic '+ base64.encode(email + ":" + password),
               },

           body: JSON.stringify(mySymptoms)
        }).then(response => {
            console.log('SYMPTOMS', response);
            if (callback) {
                callback();
            }});
    });
}

/**
 * If there is network connectivity, submits all the offline records.
 *
 * @param token
 *     the currently active user's token
 */
export const submitOfflineRecords = (token, username, password) => {
    if (token===null) {
//        throw 'The token cannot be empty, null, or undefined.';
        console.log('The token is either empty, null, or undefined.');
        NetInfo.isConnected.fetch().done((isConnected) => {
            if (isConnected) {
                const offlineAnswerHandler = new OfflineAnswerHandler();
                offlineAnswerHandler.retrieveOfflineRecords(function(record) {
                    const recordObject = JSON.parse(record);
                    submitCreateRecordCallNoToken(username, password,
                        recordObject.answers,
                        recordObject.symptoms,
                        recordObject.score,
                        cleanUp);
                });
            }
        });
    }
    else {
        console.log('Token value is present');
        NetInfo.isConnected.fetch().done((isConnected) => {
            if (isConnected) {
                const offlineAnswerHandler = new OfflineAnswerHandler();
                offlineAnswerHandler.retrieveOfflineRecords(function(record) {
                    const recordObject = JSON.parse(record);
                    submitCreateRecordCall(token,
                        recordObject.answers,
                        recordObject.symptoms,
                        recordObject.score,
                        cleanUp);
                });
            }
        });
    }
}

/**
 * Removes all records saved on the device.
 */
const cleanUp = () => {
    const offlineAnswerHandler = new OfflineAnswerHandler();
    offlineAnswerHandler.deleteOfflineRecords();
}

/**
 * Submit POST requests to the API endpoints store the user responses.
 */
export const createRecord = ({ token, answersArray, mySymptoms, score }) => {
    return (dispatch) => {
        NetInfo.isConnected.fetch().done((isConnected) => {
            const totalScore =
                calculateRecordScore(answersArray) +
                calculateRecordScore(mySymptoms);

            if (isConnected) {
                console.log('There is network connectivity, submitting the record online.');
                submitCreateRecordCall(token, answersArray, mySymptoms, totalScore);
            } else {
                console.log('No network connectivity, persisting the record locally.');
                const record = new Record(answersArray, mySymptoms, totalScore);
                const offlineAnswerHandler = new OfflineAnswerHandler();
                offlineAnswerHandler.saveRecord(record);
            }
        });
    };
};

export const selectRecord = (selectedRecord) => {
    return {
        type: SELECT_RECORD,
        payload: selectedRecord
    };
};

export const selectSymptom = (selectedSymptom) => {
    return {
        type: SELECT_SYMPTOM,
        payload: selectedSymptom
    };
};

export const setRecord = (record) => {
    return {
        type: SET_RECORD,
        payload: record
    };
};

export const deleteRecord = ({ token, param }) => {
    return (dispatch) => {

        fetch(myUrl + '/api/edit_record/' + param, {
                   method: 'DELETE',
                   headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                   'Authorization': 'JWT '+token,
                   },
                   });
    };
};