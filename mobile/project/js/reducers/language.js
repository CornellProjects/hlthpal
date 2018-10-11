
import type { Action } from '../actions/types';
import { SET_LANGUAGE } from '../actions/language';

export type State = {
    language: string
}

const initialState = {
  language: "kr"
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_LANGUAGE) {
    return {
      ...state,
      language: action.payload,
    };
  }

  return state;
}
