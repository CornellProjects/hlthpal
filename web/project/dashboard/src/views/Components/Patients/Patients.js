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
import {getAllPatientData} from "../../../actions/getAllPatientData"
import {connect} from 'react-redux';
import PropTypes from 'prop-types';


class Patients extends Component {
  constructor(props){
    super(props)
    this.state = {
      patients: []
    };
  }
  componentWillMount(){
    this.props.getAllPatientData().then(
      (res) => console.log(res)
    );
  }
  render(){
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
                    <th>Patient Name</th>
                    <th>Sector</th>
                    <th>Pain</th>
                    <th>Weakness</th>
                    <th>Nausea</th>
                    <th>Vomitting</th>
                  </tr>
                  </thead>
                  <tbody>

                  </tbody>
                </Table>
              </CardBlock>
            </Card>
          </Col>
        </Row>
    );
  }
}



export default connect(null, {getAllPatientData}) (Patients);
