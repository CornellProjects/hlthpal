import React, {Component} from "react";
import { Table, Button, Card, CardBody, CardBlock, CardHeader, CardFooter, Row, Col, Label, Modal,
    ModalHeader, ModalBody, ModalFooter, Input, FormGroup, UncontrolledTooltip } from "reactstrap";
import axios from 'axios';
import PatientDetail from "../PatientDetail/PatientDetail"


class NewPatientCard extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.toggle_submit = this.toggle_submit.bind(this);
        if (props.location.state !== undefined) {
            this.state = {
                date: props.location.state.detail.date,
                username: props.location.state.detail.username,
                firstname: props.location.state.detail.firstname,
                lastname: props.location.state.detail.lastname,
                sector: props.location.state.detail.sector,
                pain: props.location.state.detail.pain,
                breath: props.location.state.detail.breath,
                nausea: props.location.state.detail.nausea,
                fatigue: props.location.state.detail.fatigue,
                constipation: props.location.state.detail.constipation,
                last_note:props.location.state.detail.note,
                modal: false,
                modal_submit: false,
                records:[],
                notes:[],
                new_note:"",
                redirect: false
            };
        }
        else {
            this.state = {
                redirect: true
            }
        }

    }


    componentWillMount(){
        if (!this.state.redirect) {
            let headers = {
                'Content-Type': 'application/json'
            };
            let data = {
                username:this.state.username
            };

            axios.post('api/patient/history', data).then(
                (res) => this.setState({
                    records: res.data.reverse()
                })
            );
        }
    }

    componentDidMount(){
        if (this.state.redirect){
            this.props.history.push('/');
        }
        else {
            let headers = {
                'Content-Type': 'application/json'
            };
            let data = {
                username: this.state.username
            };
            axios.post('api/notes/history', data, headers).then(
                (res) => this.setState(
                    {notes: res.data.reverse()}
                ),
            );
        }
    }

    toggle(){
        this.setState({modal: !this.state.modal});
    }
    toggle_submit(){
        this.setState(
            {modal_submit: !this.state.modal_submit}
        );
        let headers = {
            'Content-Type':'application/json'
        };
        let data = {
            username:this.state.username
        };
        axios.post('api/notes/history', data, headers).then(
            (res) => this.setState(
                {notes:res.data.reverse()}
            ),
        );
    }
    onSubmit(e) {
        e.preventDefault();
        let headers = {
            'Content-Type':'application/json'
        };
        let data = {
            notes: this.state.new_note,
            username:this.state.username
        };
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

        let { records } = this.state;
        const {date, username, firstname, lastname, sector, pain, breath, nausea, fatigue, constipation, modal, last_note, new_note} = this.state;
        let {notes} = this.state;
        let renderPatients = () => {
            return records.map((record) => {
                let data = [];
//                let data = new Array(5);
//                console.log({firstname}, record.data);
                let length = 12;
                for (let i=0; i < record.data.length; i++){
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
                        fatigue={data[2]}
                        nausea={data[3]}
                        vomiting={data[4]}
                        poor_appetite={data[5]}
                        constipation={data[6]}
                        q3={data[7]}
                        q4={data[8]}
                        q5={data[9]}
                        q6={data[10]}
                        q7={data[11]}
                    />
                );
            })
        };

        let renderSymptoms = () => {
          return records.map((record) => {
            return record.symp.map((symptom) => {
                return (<tr>
                        <td scope="row">{record.record.date.substring(0,10)}</td>
                        <td>{symptom.symptom}</td>
                        <td>{symptom.answer}</td>
                        </tr>)
            });
          });
        };

        let renderFullSymptoms = () => {
            let table_symptoms = renderSymptoms();
            if (table_symptoms.flat().length > 0){
                return (<Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                    <thead className="thead-default">
                    <tr>
                        <th>Date</th>
                        <th>Other Symptoms</th>
                        <th>Score</th>
                    </tr>
                    </thead>
                    <tbody>
                    { table_symptoms }
                    </tbody>
                    </Table>);
            }
        };

        let renderNotes = () => {
            return notes.map((eachnote) => {
                return (
                    <tr>
                        <td scope="row">{eachnote.date.substring(0,10)}</td>
                        <td>{eachnote.notes}</td>
                    </tr>
                );
            })
        };

        let renderFullNotes = () => {
            let table_notes = renderNotes();
            if (table_notes.flat().length > 0){
                return (<Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                    <thead className="thead-default">
                    <tr>
                        <th>Date</th>
                        <th>Note</th>
                    </tr>
                    </thead>
                    <tbody>
                    { table_notes }
                    </tbody>
                    </Table>);
            }
        };

        return(
            //Add a key value somewhere, see react errors for more info
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <Row>
                                <Col md="3">
                                    <Label>Patient Name: {firstname + " " + lastname}</Label>
                                </Col>
                                <Col md="3">
                                    <Label>Sector: {sector}</Label>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody className="card-body">
                            <Row>
                                <Col>
                                    <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                                        <thead className="thead-default">
                                        <tr>
                                            <th>Last Submission</th>
                                            <th>Pain</th>
                                            <th id="SOB">SOB</th>
                                            <th>Nausea</th>
                                            <th>Fatigue</th>
                                            <th>Constipation</th>
                                            <th id="q3">Q3</th>
                                            <th id="q4">Q4</th>
                                            <th id="q5">Q5</th>
                                            <th id="q6">Q6</th>
                                            <th id="q7">Q7</th>
                                            <UncontrolledTooltip placement="top" target="SOB">
                                                Shortness of Breath
                                            </UncontrolledTooltip>
                                            <UncontrolledTooltip placement="top" target="q3">
                                             Have you been feeling worried about your illness in the past 3 days?
                                            </UncontrolledTooltip>
                                            <UncontrolledTooltip placement="top" target="q4">
                                             Over the past 3 days, have you been able to share how you are feeling with your family or friends?
                                            </UncontrolledTooltip>
                                            <UncontrolledTooltip placement="top" target="q5">
                                              Over the past 3 days have you felt that life was worthwhile?
                                            </UncontrolledTooltip>
                                            <UncontrolledTooltip placement="top" target="q6">
                                             Over the past 3 days, have you felt at peace?
                                            </UncontrolledTooltip>
                                            <UncontrolledTooltip placement="top" target="q7">
                                             Have you had enough help and advice for your family to plan for the future?
                                            </UncontrolledTooltip>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        { renderPatients() }
                                        </tbody>

                                    </Table>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {renderFullSymptoms()}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {renderFullNotes()}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
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
                                                <Col >
                                                    <Button color="success" size="sm" className="float-right" onClick={this.onSubmit}>Submit</Button>{' '}
                                                </Col>
                                                {/*<Col >*/}
                                                    {/*<Button color="danger" size="sm" className="float-right" onClick={this.toggle}>Close</Button>{' '}*/}
                                                {/*</Col>*/}
                                            </Row>
                                            <Modal isOpen={this.state.modal_submit}>
                                                <ModalHeader toggle={this.toggle_submit}>Success!</ModalHeader>
                                                <ModalBody>
                                                    You have successfully created a note!
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button color="primary" onClick={this.toggle_submit}>Okay</Button>{' '}
                                                </ModalFooter>
                                            </Modal>
                                        </CardFooter>
                                    </Card>
                                </Col>
                            </Row>
                        </CardBody>

                    </Card>
                </Col>
            </Row>
        );
    }
}

export default (NewPatientCard);