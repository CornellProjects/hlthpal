import axios from 'axios';
import qs from 'qs';

export function userSignupRequest(userData){

  return dispatch => {
    return axios.post('http://127.0.0.1:8000/api/register', userData).then(function(){console.log("success!")})
  };
}
