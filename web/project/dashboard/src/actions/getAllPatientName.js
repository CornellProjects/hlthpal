import axios from 'axios';

export function getAllPatientName(){
  return dispatch => {
      return axios.get('api/patients')
}}
