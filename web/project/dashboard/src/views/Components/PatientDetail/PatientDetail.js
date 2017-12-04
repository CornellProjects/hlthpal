import React, {Component} from "react";
import axios from 'axios';
import { Table,
         Button,
         } from "reactstrap";



class PatientDetail extends Component {
  construtor(props){
    super(props);
    this.state = {
      firstname: props.firstname,
      lastname: props.lastname,
      sector: props.sector,
      pain: props.pain,
      breath: props.breath,
      nausea: props.nausea,
      fatigue: props.fatigue,
      constipation: props.constipation,
      q3: props.q3,
      q4: props.q4,
      q5: props.q5,
      q6: props.q6,
      q7: props.q7
    }
  }

  render(){
    const {firstname, lastname, sector, pain, breath, nausea, fatigue, constipation, q3, q4, q5, q6, q7} = this.state;

    return(
      <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
            <thead className="thead-default">
                <tr>
                  <th>Patient Name</th>
                  <th>Sector</th>
                  <th>Pain</th>
                  <th>Shortness of breath</th>
                  <th>Nausea and Vomitting</th>
                  <th>Fatigue</th>
                  <th>Constipation</th>
                  <th>More info</th>
                </tr>
            </thead>
             <tbody>
                <tr>
                    <td>{firstname + " " + lastname}</td>
                    <td>{sector}</td>
                    <td>{pain}</td>
                    <td>{breath}</td>
                    <td>{nausea}</td>
                    <td>{fatigue}</td>
                    <td>{constipation}</td>
               </tr>
              </tbody>
         <Table>

         <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
            <thread className="threa-default">
            <tr>
              <th>Have you been feeling worried about your illness in the past 3 days?</th>
            </tr>
            </thread>
            <tbody>
             <tr>
                {q3}
             </tr>
            </tbody>
         </Table>



         <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
            <thread className="threa-default">
            <tr>
              <th>
              Over the past 3 days, have you been able to share
              how you are feeling with your family or friends?</th>
            </tr>
            </thread>
            <tbody>
             <tr>
                {q4}
             </tr>
            </tbody>
         </Table>

         <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
            <thread className="threa-default">
            <tr>
              <th>Over the past 3 days have you felt that life was
                  worthwhile?</th>
            </tr>
            </thread>
            <tbody>
             <tr>
                {q5}
             </tr>
            </tbody>
         </Table>

         <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
            <thread className="threa-default">
            <tr>
              <th>Over the past 3 days, have you felt at peace?</th>
            </tr>
            </thread>
            <tbody>
             <tr>
                {q6}
             </tr>
            </tbody>
         </Table>

         <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
            <thread className="threa-default">
            <tr>
              <th>Have you had enough help and advice for your
                  family to plan for the future?</th>
            </tr>
            </thread>
            <tbody>
             <tr>
                {q7}
             </tr>
            </tbody>
         </Table>
    );
  }
}
}

export default (PatientDetail);
