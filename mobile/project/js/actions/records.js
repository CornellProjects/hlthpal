import type { Action } from './types';
import { Actions } from 'react-native-router-flux';
import { NetInfo, AsyncStorage } from 'react-native';

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

async function persistRecordToLocalStore(token, answersArray, mySymptoms, score) {
    console.log('[DEBUG] Inside persistRecordToLocalStore');
    try {
        console.log('[DEBUG] Persisting token to local storage ' + JSON.stringify(token));
        console.log('[DEBUG] Persisting answersArray to local storage ' + JSON.stringify(answersArray));
        console.log('[DEBUG] Persisting mySymptoms to local storage ' + JSON.stringify(mySymptoms));
        console.log('[DEBUG] Persisting score to local storage ' + JSON.stringify(score));

        AsyncStorage.setItem('@MyHtPal:token', JSON.stringify(token));
        AsyncStorage.setItem('@MyHtPal:answersArray', JSON.stringify(answersArray));
        AsyncStorage.setItem('@MyHtPal:mySymptoms', JSON.stringify(mySymptoms));
        AsyncStorage.setItem('@MyHtPal:score', JSON.stringify(score));
    } catch (error) {
        console.log('Error saving data' + error);
    }
}

async function retrieveRecordFromLocalStorage() {
    try {
        const retrievedToken = await AsyncStorage.getItem('@MyHtPal:token');
        const retrievedAnswersArray = await AsyncStorage.getItem('@MyHtPal:answersArray');
        const retrievedSymptoms = await AsyncStorage.getItem('@MyHtPal:mySymptoms');
        const retrievedScore = await AsyncStorage.getItem('@MyHtPal:score');

        const retrievedRecord = {
            token : JSON.parse(retrievedToken),
            answersArray : JSON.parse(retrievedAnswersArray),
            mySymptoms : JSON.parse(retrievedSymptoms),
            score : JSON.parse(retrievedScore)
        };
        return retrievedRecord;
    } catch (error) {
        console.log('Error retrieving data' + error);
    }
}

const setCurrentRecord = (dispatch, record) => {
    dispatch({
        type: CREATE_RECORD,
        payload: record
    });
};

/**
 * Retrieves the saved answers on the device.
 */
export const retrieveAnswersFromLocalStorage = () => {
    retrieveRecordFromLocalStorage().then((record) => {
        console.log('[DEBUG] async retrieved record = ' + JSON.stringify(record));
        submitCreateRecordCall(record.token, record.answersArray, record.mySymptoms, record.score);
    });
};

function submitCreateRecordCall(token, answersArray, mySymptoms, score) {
    console.log('[DEBUG] submitCreateRecordCall called');
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
        }).then(response => {console.log('SYMPTOMS', response)});
    });
}

/**
 * Submit POST requests to the API endpoints store the user responses.
 */
export const createRecord = ({ token, answersArray, mySymptoms, score }) => {
    console.log('[DEBUG] createRecord called.');
    return (dispatch) => {
        NetInfo.isConnected.fetch().done((isConnected) => {
            console.log('[DEBUG] createRecord => has connectivity :' + isConnected);
            if (isConnected) {
                score = calculateRecordScore(answersArray);
                score += calculateRecordScore(mySymptoms);

                console.log('[DEBUG] Create record called');
                console.log('[DEBUG] Taget URL is ' + myUrl);

                submitCreateRecordCall(token, answersArray, mySymptoms, score);
            } else {
                console.log('No internet connectivity, persisting the records locally.');
                persistRecordToLocalStore(token, answersArray, mySymptoms, score);
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