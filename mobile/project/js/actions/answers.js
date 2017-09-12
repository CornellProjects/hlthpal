import type { Action } from './types';
import { Actions } from 'react-native-router-flux';

export const CREATE_ANSWER_OBJECT = 'CREATE_ANSWER_OBJECT';
export const SET_ANSWER           = 'SET_ANSWER';
export const SET_QUESTION         = 'SET_QUESTION';
export const ANSWER_CHANGED       = 'ANSWER_CHANGED';
export const TEXT_INPUT_CHANGED   = 'TEXT_INPUT_CHANGED';
export const SET_BACK             = 'SET_BACK';

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

export const setAnswer = ({ record, question, text_input, rating }) => {
    return {
        type: SET_ANSWER,
        payload: { prop, value }
    };
};

export const createAnswerObject = ({ record, question, text_input, rating }) => {
    if (rating === undefined) {
        rating = 0;
    }

    if (text_input === undefined) {
        text_input = '';
    }

    const answerObj = {
        'answer':   rating,
        'text':     text_input,
        'question': question,
        'record':   record
    };

    return {
        type: CREATE_ANSWER_OBJECT,
        payload: answerObj
    };
};

export const updateAnswer = ({ token, record, question, rating, text }) => {
    return (dispatch) => {

        fetch('http://0.0.0.0:8000/api/edit_answer/' + record + '/' + question, {
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