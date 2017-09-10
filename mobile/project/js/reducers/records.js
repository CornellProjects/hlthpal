import type { Action } from '../actions/types';
import {
    SELECT_RECORD,
    SET_RECORDS,
    CALCULATE_SCORE,
    CREATE_RECORD,
    SET_RECORD
} from '../actions/records';

export type State = {
    my_records: string,
    answers_array: string,
    selectedRecord: string,
    record: string,
    score: number
}

const initialState = {
    my_records: [],
    answers_array: [],
    selectedRecord: '',
    record: '',
    score: 0
};
 
export default function (state:State = initialState, action:Action): State {
    switch(action.type) {
        case CALCULATE_SCORE:
          return { score: action.payload  };
        case SET_RECORDS:
          return { ...state, my_records: action.payload  };
        case SELECT_RECORD:
          return { selectedRecord: action.payload  };
        default:
            return state;
    }
}