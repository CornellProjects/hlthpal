import React, {Component} from "react";
import {
  Badge,
  Row,
  Col,
  Progress,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
  CardBlock,
  CardFooter,
  CardTitle,
  Button,
  ButtonToolbar,
  ButtonGroup,
  ButtonDropdown,
  Label,
  Input,
  Table
} from "reactstrap";
import PatientCard from "../PatientCard/PatientCard"
import {getAllPatientName} from "../../../actions/getAllPatientName"
import {getAllPatientData} from "../../../actions/getAllPatientData"
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';



class Patients extends Component {
  constructor(props){
    super(props)
    this.state = {
      patients: [],
    };
  }
  componentWillMount(){
    const token = localStorage.getItem('jwtToken');
    if (!token){
      this.props.history.push('/login');
    }
    axios.get('api/patients/data').then(
      (res) => this.setState({
        patients:res.data
      })
    );
  }

  render(){
    var {patients} = this.state;
    var renderPatients = () => {
      return patients.map((patient) => {
        var data = [];
        var length = 5;
        for (var i = 0; i < patient.data.length; i++){
          data.push(patient.data[i].answer)
        }
        while (data.length < length){
          data.push(null)
        }
        return (
          <PatientCard key={patient.user.id}
                       date={patient.record.date.substring(0,10)}
                       username={patient.user.username}
                       firstname={patient.user.first_name}
                       lastname={patient.user.last_name}
                       sector={patient.location.sector}
                       pain={data[0]}
                       breath={data[1]}
                       nausea={data[2]}
                       fatigue={data[3]}
                       constipation={data[4]}
                       note={patient.notes.notes}></PatientCard>
        );
      })
    };
    return (
      <Row>
          <Col>
            <Card>
              <CardHeader>
                My Patients
              </CardHeader>
              <CardBlock className="card-body">
                <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-default">
                  <tr>
                    <th>Last Submission</th>
                    <th>Patient Name</th>
                    <th>Sector</th>
                    <th>Pain</th>
                    <th>Shortness of breath</th>
                    <th>Nausea and Vomitting</th>
                    <th>Fatigue</th>
                    <th>Constipation</th>
                    <th>Note</th>
                    <th>More info</th>
                  </tr>
                  </thead>
                  <tbody>
                   { renderPatients() }
                  </tbody>
                </Table>
              </CardBlock>
            </Card>
          </Col>
        </Row>
    );
  }
}


export default (Patients);
