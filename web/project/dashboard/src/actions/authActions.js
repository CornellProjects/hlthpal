import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';

export function login(data){
  var headers = {
    'Content-Type':'application/json'
  }
  return dispatch => {
      return axios.post('api/login', data, headers).then(
        res => {
          const token = res.data.token;
          localStorage.setItem('jwtToken', token);
          setAuthorizationToken(token);
        }
      )
}}
