import type { Action } from '../actions/types';
import {
    SET_ANSWER,
    SET_QUESTION,
    CREATE_ANSWER_OBJECT,
    ANSWER_CHANGED,
    TEXT_INPUT_CHANGED,
    SET_BACK
} from '../actions/answers';

export type State = {
    record: number,
    question: number,
    text_input: string,
    rating: string
}

const initialState = {
    record: '',
    question: '',
    text_input: '',
    rating: ''
};

export default function (state:State = initialState, action:Action): State {
    switch(action.type) {
        case SET_ANSWER:
            return { ...state, [action.payload.prop]: action.payload.value };
        case SET_QUESTION:
            return { ...state, question: action.payload };
        case CREATE_ANSWER_OBJECT:
            return { ...state };
        case ANSWER_CHANGED:
            return { ...state, rating: action.payload  };
        case TEXT_INPUT_CHANGED:
            return { ...state, text_input: action.payload  };
        default:
            return state;
    }
}