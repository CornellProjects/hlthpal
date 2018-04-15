import type { Action } from './types';
import { Actions } from 'react-native-router-flux';

export const SELECT_RECORD       = 'SELECT_RECORD';
export const SELECT_SYMPTOM      = 'SELECT_SYMPTOM';
export const SET_RECORD          = 'SET_RECORD';
export const CREATE_RECORD       = 'CREATE_RECORD';

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

export const createRecord = ({ token, answersArray, mySymptoms, score }) => {
    return (dispatch) => {
        score = calculateRecordScore(answersArray);
        score += calculateRecordScore(mySymptoms);

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
                   'Authorization': 'JWT '+token,
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
            }).then(response => {console.log('SYMPTOMS', response)});
        });
    }
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