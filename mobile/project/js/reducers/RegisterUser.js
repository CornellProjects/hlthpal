import type { Action } from '../actions/types';
import {
    SET_USER,
    USER_CREATE
} from '../actions/RegisterUser';

export type State = {
    email: string,
    username: string,
    password: string,
    first_name: string,
    last_name: string,
    mobile: string,
    diagnosis: string,
    doctor: string,
    selectedOption: string,
    care_giver: string,
    street: string,
    city: string,
    my_state: string,
    country: string,
    error: string,
    loading: boolean,
    user: string,
    error: string,
    loading: boolean
}

const initialState = {
    email: '',
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    mobile: '',
    diagnosis: '',
    doctor: '',
    selectedOption: '',
    care_giver: '',
    street: '',
    city: '',
    my_state: '',
    country: '',
    user: null,
    error: '',
    loading: false
};

export default function (state:State = initialState, action:Action): State {
    switch(action.type) {
        case USER_CREATE:
            return { initialState };
        case SET_USER:
            return { ...state, [action.payload.prop]: action.payload.value };
        default:
            return state;
    }
}