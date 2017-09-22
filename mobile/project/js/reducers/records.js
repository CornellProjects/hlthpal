import type { Action } from '../actions/types';
import {
    SELECT_RECORD,
    SELECT_SYMPTOM,
    SET_RECORDS,
    CREATE_RECORD,
    SET_RECORD
} from '../actions/records';

export type State = {
    myRecords: string,
    mySymptoms: string,
    answersArray: string,
    selectedRecord: string,
    selectedSymptom: string,
    record: string,
    score: number
}

const initialState = {
    myRecords: [],
    mySymptoms: [],
    answersArray: [],
    selectedRecord: '',
    selectedSymptom: '',
    record: '',
    score: 0
};
 
export default function (state:State = initialState, action:Action): State {
    switch(action.type) {
        case SET_RECORD:
          return { ...state, record: action.payload  };
        case SET_RECORDS:
          return { ...state, myRecords: action.payload  };
        case SELECT_RECORD:
          return { selectedRecord: action.payload  };
        case SELECT_SYMPTOM:
          return { selectedSymptom: action.payload  };
        default:
            return state;
    }
}