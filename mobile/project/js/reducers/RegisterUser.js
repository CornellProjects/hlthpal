import type { Action } from '../actions/types';
import {
    SET_USER,
    USER_CREATE
} from '../actions/RegisterUser';

export type State = {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    mobile: string,
    diagnosis: string,
    doctor: string,
    selectedOption: string,
    caregiver: string,
    street: string,
    sector: string,
    city: string,
    myState: string,
    country: string,
    error: string,
    loading: boolean,
    user: string,
    error: string,
    loading: boolean
}

const initialState = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    mobile: '',
    diagnosis: '',
    doctor: '',
    selectedOption: '',
    caregiver: '',
    street: '',
    sector: '',
    city: '',
    myState: '',
    country: '',
    user: null,
    error: '',
    loading: false
};

export default function (state:State = initialState, action:Action): State {
    switch(action.type) {
//        case USER_CREATE:
//            return { initialState };
        case SET_USER:
            return { ...state, [action.payload.prop]: action.payload.value };
        default:
            return state;
    }
}