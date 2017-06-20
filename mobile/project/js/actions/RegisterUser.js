import type { Action } from './types';
import { Actions } from 'react-native-router-flux';

export const SET_USER = 'SET_USER';
export const USER_CREATE = 'USER_CREATE';

export const setUser = ({ prop, value }) => {
    return {
        type: SET_USER,
        payload: { prop, value }
    };
};

export const registerUser = ({
        email,
        username,
        password,
        first_name,
        last_name,
        mobile,
        diagnosis,
        doctor,
        selectedOption
    }) => {
          // Change IP address according to yours
          // Make sure to include your IP address in Django settings.py ALLOWED_HOSTS
          return (dispatch) => {
              fetch('http://0.0.0.0:8000/api/register', {
                     method: 'POST',
                     headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
                     },

                     body: JSON.stringify({
                     first_name: first_name,
                     last_name: last_name,
                     username: last_name,
                     email: email,
                     password: password,
                     patient: {
                         diagnosis: diagnosis,
                         doctor: doctor,
                         mobile: mobile,
                         gender: selectedOption,
                     }
                     })
                     })
                     .then((response) => {
                          dispatch({ type: USER_CREATE });
                          if (response.status === 201) {
                              Actions.login();
                          }
                     });
         };
    };
