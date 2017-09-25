import type { Action } from './types';
import { Actions } from 'react-native-router-flux';
import { NetInfo } from 'react-native';

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
        password,
        firstName,
        lastName,
        mobile,
        diagnosis,
        doctor,
        selectedOption,
        caregiver,
        street,
        city,
        myState,
        country
    }) => {
          // Change IP address according to yours
          // Make sure to include your IP address in Django settings.py ALLOWED_HOSTS
          return (dispatch) => {
              fetch(myUrl + '/api/register', {
                     method: 'POST',
                     headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
                     },

                     body: JSON.stringify({
                     first_name: firstName,
                     last_name: lastName,
                     username: email,
                     email: email,
                     password: password,
                     patient: {
                         doctor: doctor,
                         care_giver: caregiver,
                         diagnosis: diagnosis,
                         gender: selectedOption,
                         mobile: mobile,
                         street: street,
                         city: city,
                         state: myState,
                         country: country,
                     }
                     })
                     })
                     .then((response) => {
                          dispatch({ type: USER_CREATE });
                          console.log(response);
                          if (response.status === 201) {
                              Actions.login();
                          }
                     });
         };
    };
