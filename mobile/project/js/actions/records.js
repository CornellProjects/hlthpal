import type { Action } from './types';
import { Actions } from 'react-native-router-flux';

export const SELECT_RECORD   = 'SELECT_RECORD';
export const SET_RECORDS     = 'SET_RECORDS';
export const CALCULATE_SCORE = 'CALCULATE_SCORE';
export const CREATE_RECORD   = 'CREATE_RECORD';


//export const createRecord = ({ token, score, answers_array }) => {
//    return (dispatch) => {
//
//        fetch('http://0.0.0.0:8000/api/record', {
//                   method: 'POST',
//                   headers: {
//                   'Accept': 'application/json',
//                   'Content-Type': 'application/json',
//                   'Authorization': 'JWT '+token,
//                   },
//
//                   body: JSON.stringify({
//                   score: score
//                   })
//                   .then(response => {
//                        fetch('http://0.0.0.0:8000/api/answer', {
//                               method: 'POST',
//                               headers: {
//                               'Accept': 'application/json',
//                               'Content-Type': 'application/json',
//                               'Authorization': 'JWT '+token,
//                               },
//
//                               body: JSON.stringify({
//                               answers_array
//                               })
//                        })
//                        .then(response => {
//                              console.log(response);
//                            })
//                        }
//           });
//    };
//};

export const calculateRecordScore = (myArray) => {
    var count = 0;

    myArray.forEach(function(item) {
        count += item.answer;
    });

    return {
        type: CALCULATE_SCORE,
        payload: count
    };
};

const setCurrentRecord = (dispatch, record) => {
    dispatch({
        type: CREATE_RECORD,
        payload: record
    });
};

export const createRecord = ({ token, answers }) => {
    return (dispatch) => {

        fetch('http://0.0.0.0:8000/api/record', {
                   method: 'POST',
                   headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                   'Authorization': 'JWT '+token,
                   },

                   body: JSON.stringify({
                   answers: answers
                   })
                   });
    };
};

export const displayRecords = ({ token }) => {
      // Change IP address according to yours
      // Make sure to include your IP address in Django settings.py ALLOWED_HOSTS
      return (dispatch) => {
          fetch('http://0.0.0.0:8000/api/record', {
                method: 'GET',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'JWT '+token,
                },
                })
                .then(response => {
                     const str = JSON.stringify(eval('(' + response._bodyInit + ')'));
                     const parsed = JSON.parse(str);
                     setRecords(dispatch, parsed);
                 });
     };
};

const setRecords = (dispatch, records) => {
    dispatch({
        type: SET_RECORDS,
        payload: records
    });
};

export const selectRecord = (selectedRecord) => {
    return {
        type: SELECT_RECORD,
        payload: selectedRecord
    };
};

export const deleteRecord = ({ token, param }) => {
    return (dispatch) => {

        fetch('http://0.0.0.0:8000/api/questionnaire/delete/' + param, {
                   method: 'DELETE',
                   headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                   'Authorization': 'JWT '+token,
                   },
                   });
    };
};