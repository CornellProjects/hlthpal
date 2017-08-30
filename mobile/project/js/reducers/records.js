import type { Action } from '../actions/types';
import {
    SELECT_RECORD,
    SET_RECORD
} from '../actions/records';

export type State = {
    my_records: string,
    selectedRecord: string
}

const initialState = {
    my_records: [],
    selectedRecord: ''
};
 
export default function (state:State = initialState, action:Action): State {
    switch(action.type) {
        case SET_RECORD:
          return { ...state, my_records: action.payload  };
        case SELECT_RECORD:
          return { selectedRecord: action.payload  };
        default:
            return state;
    }
}