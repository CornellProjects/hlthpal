import type { Action } from '../actions/types';
import {
    SET_ANSWER,
    SET_QUESTION,
    GET_QUESTIONS,
    CREATE_ANSWER_OBJECT,
    ANSWER_CHANGED,
    TEXT_INPUT_CHANGED,
    SYMPTOM_INPUT_CHANGED,
    ADD_SYMPTOM,
    RESET_RATING
} from '../actions/answers';

export type State = {
    questions: string,
    record: number,
    question: number,
    textInput: string,
    rating: string,
}

const initialState = {
    questions: '',
    record: '',
    question: '',
    textInput: '',
    rating: '',
};

export default function (state:State = initialState, action:Action): State {
    switch(action.type) {
        case SET_ANSWER:
            return { ...state, [action.payload.prop]: action.payload.value };
        case GET_QUESTIONS:
            return { ...state, questions: action.payload };
        case SET_QUESTION:
            return { ...state, question: action.payload };
        case CREATE_ANSWER_OBJECT:
            return { ...state };
        case ANSWER_CHANGED:
            return { ...state, rating: action.payload  };
        case TEXT_INPUT_CHANGED:
            return { ...state, textInput: action.payload  };
        case SYMPTOM_INPUT_CHANGED:
            return { ...state, symptom: action.payload  };
        case ADD_SYMPTOM:
            return [ ...state, action.item.push  ];
        case RESET_RATING:
            return { ...state, rating: action.payload };
        default:
            return state;
    }
}