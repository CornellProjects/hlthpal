import type { Action } from './types';
import { Actions } from 'react-native-router-flux';
import { NetInfo, AsyncStorage } from 'react-native';
import OfflineAnswerHandler from '../handlers/offlineAnswerHandler';
import Record from '../dao/record';

export const SELECT_RECORD       = 'SELECT_RECORD';
export const SELECT_SYMPTOM      = 'SELECT_SYMPTOM';
export const SET_RECORD          = 'SET_RECORD';
export const CREATE_RECORD       = 'CREATE_RECORD';

const base64 = require('base-64');

function calculateRecordScore(myArray) {
    var count = Object.keys(myArray).map(function(key){
        if (!isNaN(parseInt(myArray[key].answer))){
            return parseInt(myArray[key].answer)
        }
        else { return 0 }
    });
    count = count.reduce((a, b) => a + b, 0);
    return count;
};

function calculateSympRecordScore(myArray) {
    var count = 0;
    myArray.forEach(function(item) {
        if (!isNaN(parseInt(item.answer))){
            count += parseInt(item.answer);
        }
    });
    return count;
};

function assignRecord(myArray, record) {
    let myNewArray = Object.keys(myArray).map(function(key){
        myArray[key].record = record
//        if  myArray[key]
        return myArray[key];
    });
    return myNewArray;
};

function prepareRecord(myArray, record) { //only push questions that have been filled
    let myNewArray = []
    myArray.forEach(function(item) {
        item.record = record;
        myNewArray.push(item)
    });
    return myNewArray;
};

const setCurrentRecord = (dispatch, record) => {
    dispatch({
        type: CREATE_RECORD,
        payload: record
    });
};

const submitCreateRecordCall = (token, answersArray, mySymptoms, score, created_date, callback) => {
    console.log('Submitting a record to the server.');

    fetch(myUrl + '/api/record', {
               method: 'POST',
               headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': 'JWT '+token,
               },

               body: JSON.stringify({
                    score: score,
                    created_date: created_date
               })
    })
    .then(response => {
        if (response.status < 400) {
            const str = JSON.stringify(eval('(' + response._bodyInit + ')'));
            const parsed = JSON.parse(str).id;

            let answers = assignRecord(answersArray, parsed);
            let symptoms = assignRecord(mySymptoms, parsed);

            fetch(myUrl + '/api/answer', {
                   method: 'POST',
                   headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                   'Authorization': 'JWT '+ token,
                   },

                   body: JSON.stringify(answers)
            }).then(response => {console.log('ANSWERS', response)});

            fetch(myUrl + '/api/symptom', {
                   method: 'POST',
                   headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                   'Authorization': 'JWT '+token,
                   },

               body: JSON.stringify(symptoms)
            }).then(response => {
                console.log('SYMPTOMS', response);
                Object.keys(answersArray).map(function(key){delete answersArray[key]}) //resets the answersArray after every submission
                Object.keys(mySymptoms).map(function(key){delete mySymptoms[key]})
                if (callback) {
                    callback();
                }});
        }

    });
}

const submitCreateRecordCallNoToken = (username, password, answersArray, mySymptoms, score, created_date, callback) => {
    console.log('Submitting a record to the server.', created_date);

    fetch(myUrl + '/api/record', {
               method: 'POST',
               headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': 'Basic ' + base64.encode(username + ":" + password),
               },

               body: JSON.stringify({
                    score: score,
                    created_date: created_date
               })
    })
    .then(response => {
        if (response.status < 400){
            const str = JSON.stringify(eval('(' + response._bodyInit + ')'));
            const parsed = JSON.parse(str).id;

            let answers = assignRecord(answersArray, parsed);
            let symptoms = assignRecord(mySymptoms, parsed);
            fetch(myUrl + '/api/answer', {
                   method: 'POST',
                   headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                   'Authorization': 'Basic ' + base64.encode(username + ":" + password),
                   },

                   body: JSON.stringify(answers)
            }).then(response => {console.log('ANSWERS', response)});

            fetch(myUrl + '/api/symptom', {
                   method: 'POST',
                   headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                   'Authorization': 'Basic '+ base64.encode(username + ":" + password),
                   },

               body: JSON.stringify(symptoms)
            }).then(response => {
                console.log('SYMPTOMS', response);
                Object.keys(answersArray).map(function(key){delete answersArray[key]}) //resets the answersArray after every submission
                Object.keys(mySymptoms).map(function(key){delete mySymptoms[key]})
                if (callback) {
                    callback();
                }});
          }
        else {
            console.log(response);
        }
        });


}

/**
 * If there is network connectivity, submits all the offline records.
 *
 * @param token
 *     the currently active user's token
 */
export const submitOfflineRecords = (token, username, password) => {
//    if (token===null) {
//        throw 'The token cannot be empty, null, or undefined.';
//    console.log('The token is either empty, null, or undefined.');
    NetInfo.isConnected.fetch().done((isConnected) => {
        if (isConnected) {
            const offlineAnswerHandler = new OfflineAnswerHandler();
            offlineAnswerHandler.retrieveOfflineRecords(function(record) {
                const recordObject = JSON.parse(record);
                submitCreateRecordCallNoToken(username, password,
                    recordObject.answers,
                    recordObject.symptoms,
                    recordObject.score,
                    recordObject.created_date,
                    cleanUp);
            });
        }
        });
//    }
//    else {
//        console.log('Token value is present');
//        NetInfo.isConnected.fetch().done((isConnected) => {
//            if (isConnected) {
//                const offlineAnswerHandler = new OfflineAnswerHandler();
//                offlineAnswerHandler.retrieveOfflineRecords(function(record) {
//                    const recordObject = JSON.parse(record);
//                    submitCreateRecordCall(token,
//                        recordObject.answers,
//                        recordObject.symptoms,
//                        recordObject.score,
//                        recordObject.created_date,
//                        cleanUp);
//                });
//            }
//        });
//    }
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
export const createRecord = ({ token, username, password, answersArray, mySymptoms, score }) => {
    return (dispatch) => {
        NetInfo.isConnected.fetch().done((isConnected) => {
            const totalScore =
                parseInt(calculateRecordScore(answersArray)) +
                parseInt(calculateRecordScore(mySymptoms));

            if (isConnected) {
                console.log('There is network connectivity, submitting the record online.');
                timestamp = new Date();
//                submitCreateRecordCall(token, answersArray, mySymptoms, totalScore, timestamp.getTime());
                submitCreateRecordCallNoToken(username, password, answersArray, mySymptoms, totalScore, timestamp.getTime());
            } else {
                console.log('No network connectivity, persisting the record locally.');
                const record = new Record(answersArray, mySymptoms, totalScore);
                const offlineAnswerHandler = new OfflineAnswerHandler();
                offlineAnswerHandler.saveRecord(record);
                Object.keys(answersArray).map(function(key){delete answersArray[key]}) //resets the answersArray after every submission
                Object.keys(mySymptoms).map(function(key){delete mySymptoms[key]})
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