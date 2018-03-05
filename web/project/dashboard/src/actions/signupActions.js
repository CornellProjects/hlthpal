import axios from 'axios';
import qs from 'qs';

export function userSignupRequest(userData){

  return dispatch => {
    return axios.post('api/register', userData).then(function(){console.log("success!")}).catch(function(err){console.log(err)})
  };
}
