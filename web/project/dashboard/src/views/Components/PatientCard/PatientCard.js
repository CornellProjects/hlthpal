import React, {Component} from "react";
import { Table, Button, Card, CardBody, CardHeader, CardFooter, Row, Col, Label, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup } from "reactstrap";
import axios from 'axios';
import PatientDetail from "../PatientDetail/PatientDetail"


class PatientCard extends Component{
  constructor(props){
    super(props);
    this.toggle = this.toggle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.toggle_submit = this.toggle_submit.bind(this);
    this.state = {
      date: props.date,
      username: props.username,
      firstname: props.firstname,
      lastname: props.lastname,
      sector: props.sector,
      pain: props.pain,
      breath: props.breath,
      nausea: props.nausea,
      fatigue: props.fatigue,
      constipation: props.constipation,
      last_note:props.note,
      modal: false,
      modal_submit: false,
      records:[],
      notes:[],
      new_note:"",
    };
  }

  componentWillMount(){
    var headers = {
      'Content-Type':'application/json'
    }
    var data = {
      username:this.state.username
    }

    axios.post('api/patient/history', data).then(
      (res) => this.setState({
        records: res.data
      })
    );
  }
  componentDidMount(){
    var headers = {
      'Content-Type':'application/json'
    }
    var data = {
      username:this.state.username
    }
    axios.post('api/notes/history', data, headers).then(
      (res) => this.setState(
        {notes:res.data.reverse()}
      ),
    );
  }

  toggle(){
    this.setState({modal: !this.state.modal});
  }
  toggle_submit(){
    this.setState(
      {modal_submit: !this.state.modal_submit}
    );
    var headers = {
      'Content-Type':'application/json'
    }
    var data = {
      username:this.state.username
    }
    axios.post('api/notes/history', data, headers).then(
      (res) => this.setState(
        {notes:res.data.reverse()}
      ),
    );
  }
  onSubmit(e) {
    e.preventDefault();
    var headers = {
      'Content-Type':'application/json'
    }
    var data = {
      notes: this.state.new_note,
      username:this.state.username
    }
    axios.post('api/notes/create', data, headers).then(
      (res) => this.setState({
        modal_submit: !this.state.modal_submit,
      })
    );

  }
  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render(){
    var { records } = this.state;
    const {date, username, firstname, lastname, sector, pain, breath, nausea, fatigue, constipation, modal, last_note, new_note} = this.state;
    var {notes} = this.state;
    var renderPatients = () => {
      return records.map((record) => {
        var data = [];
        var length = 10;
        for (var i=0; i < record.data.length; i++){
          data.push(record.data[i].answer);
        }
        while (data.length < length){
          data.push(null);
        }
        return (
          <PatientDetail
                       key={record.record.id}
                       username={username}
                       firstname={firstname}
                       lastname={lastname}
                       sector={sector}
                       date={record.record.date.substring(0,10)}
                       pain={data[0]}
                       breath={data[1]}
                       nausea={data[2]}
                       fatigue={data[3]}
                       constipation={data[4]}
                       q3={data[5]}
                       q4={data[6]}
                       q5={data[7]}
                       q6={data[8]}
                       q7={data[9]}
                       ></PatientDetail>
        );
      })
    };

    var renderNotes = () => {
      return notes.map((eachnote) => {
        return (
          <tr>
            <th scope="row">{eachnote.date.substring(0,10)}</th>
            <td>{eachnote.notes}</td>
          </tr>
        );
      })
    };
    return(
          <tr>
              <td>{date}</td>
              <td>{firstname + " " + lastname}</td>
              <td>{sector}</td>
              <td>{pain}</td>
              <td>{breath}</td>
              <td>{nausea}</td>
              <td>{fatigue}</td>
              <td>{constipation}</td>
              <td>{last_note}</td>
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
                                        <th>Last Submission</th>
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
                                <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                                    <thead className="thead-default">
                                      <tr>
                                        <th>Date</th>
                                        <th>Note</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      { renderNotes() }
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                        <Row>
                        <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                              Create Note for {firstname}
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="3">
                                      <Label>Note</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                      <Input type="new_note"
                                             name="new_note"
                                             value={new_note}
                                             placeholder="Enter your note"
                                             onChange={this.onChange}/>
                                    </Col>
                                </FormGroup>
                            </CardBody>

                          <CardFooter>
                          <Row>
                          <Col md="1">
                            <Button color="primary" size="sm" onClick={this.onSubmit}>Submit</Button>
                          </Col>
                          </Row>
                          <Modal isOpen={this.state.modal_submit}>
                            <ModalHeader toggle={this.toggle_submit}>Success!</ModalHeader>
                            <ModalBody>
                                You have successfully create a note!
                            </ModalBody>
                            <ModalFooter>
                              <Button color="primary" onClick={this.toggle_submit}>Go back</Button>{' '}
                            </ModalFooter>
                          </Modal>
                          </CardFooter>
                        </Card>
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
