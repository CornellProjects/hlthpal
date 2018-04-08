import React, {Component} from "react";
import { Table, Button, Card, CardBody, CardBlock, CardHeader, CardFooter, Row, Col, Label, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup } from "reactstrap";
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
                let length = 10;
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
                        nausea={data[2]}
                        fatigue={data[3]}
                        constipation={data[4]}
                        q3={data[5]}
                        q4={data[6]}
                        q5={data[7]}
                        q6={data[8]}
                        q7={data[9]}
                    />
                );
            })
        };

        let renderNotes = () => {
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
                        <CardBlock className="card-body">
                            <Row>
                                <Col>
                                    <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                                        <thead className="thead-default">
                                        <tr>
                                            <th>Last Submission</th>
                                            <th>Pain</th>
                                            <th>SOB</th>
                                            <th>Nausea</th>
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
                        </CardBlock>

                    </Card>
                </Col>
            </Row>
        );
    }
}

export default (NewPatientCard);