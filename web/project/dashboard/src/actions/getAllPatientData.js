import axios from 'axios';
export function getAllPatientData(){
  return dispatch => {
      return axios.get('api/patients')
}}
