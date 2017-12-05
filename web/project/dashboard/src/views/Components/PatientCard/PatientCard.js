import React, {Component} from "react";
import { Table, Button, Card, CardBody, CardHeader, CardFooter, Row, Col, Label, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from 'axios';
import PatientDetail from "../PatientDetail/PatientDetail"


class PatientCard extends Component{
  constructor(props){
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      username: props.username,
      firstname: props.firstname,
      lastname: props.lastname,
      sector: props.sector,
      pain: props.pain,
      breath: props.weakness,
      nausea: props.nausea,
      fatigue: props.fatigue,
      constipation: props.constipation,
      modal: false,
      records:[]
    };
  }

  componentWillMount(){
    axios.post('api/patient/history', {username:this.state.username}).then(
      (res) => this.setState({
        records: res.data
      })
    );
  }

  toggle(){
    this.setState({modal: !this.state.modal});
  }

  render(){
    var { records } = this.state;
    const {firstname, lastname, sector, pain, breath, nausea, fatigue, constipation, modal} = this.state;
    var renderPatients = () => {
      return records.map((record) => {
        return (
          <PatientDetail
                       key={record.id}
                       firstname={firstname}
                       lastname={lastname}
                       sector="Gisenyi"
                       date={record.date}
                       pain={record.data[0].answer}
                       breath={record.data[1].answer}
                       ></PatientDetail>
        );
      })
    };
    return(
          <tr>
              <td>{firstname + " " + lastname}</td>
              <td>{sector}</td>
              <td>{pain}</td>
              <td>{breath}</td>
              <td>{nausea}</td>
              <td>{fatigue}</td>
              <td>{constipation}</td>
            <td>
                <Button color="primary" size="sm" onClick={this.toggle} > More </Button>
                <Modal isOpen={modal} size="lg" toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}> Patient Detail</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col md="3">
                                <Label>Patient Name: {firstname + " " + lastname}</Label>
                            </Col>
                            <Col md="3">
                                <Label>Sector: {sector}</Label>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                                  <thead className="thead-default">
                                      <tr>
                                        <th>Pain</th>
                                        <th>Shortness of breath</th>
                                        <th>Nausea and Vomitting</th>
                                        <th>Fatigue</th>
                                        <th>Constipation</th>
                                        <th>Q3</th>
                                        <th>Q4</th>
                                        <th>Q5</th>
                                        <th>Q6</th>
                                        <th>Q7</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                    { renderPatients() }
                                  </tbody>
                                </Table>
                            </Col>
                        </Row>
                      </ModalBody>
                    <ModalFooter>
                        <Button color="primary" size="sm" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </td>
         </tr>
    );
  }
}

export default (PatientCard);
