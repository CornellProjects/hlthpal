import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';

export default function refreshToken(){
  function fetchToken(){
    axios.post('api/token-refresh',{token:localStorage.jwtToken}).then(
          res => {
            const token = res.data.token;
            localStorage.setItem('jwtToken', token);
            setAuthorizationToken(token);
          }
        )
  }
  setInterval(fetchToken, 600000)
}
