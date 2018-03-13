import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export function login(data){
  var headers = {
      'Content-Type':'application/json'
  };
  return dispatch => {
      return axios.post('api/login', data, headers).then(
        res => {
          const is_staff = res.data.is_staff;
          if (is_staff){
            const token = res.data.token;
            localStorage.setItem('jwtToken', token);
            localStorage.setItem('is_staff', is_staff);
            setAuthorizationToken(token);
          }
        }
      )
}}

