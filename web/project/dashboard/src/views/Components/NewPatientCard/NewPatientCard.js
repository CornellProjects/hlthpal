import React, {Component} from "react";
import ReactTable from 'react-table';
import axios from 'axios';
import 'react-table/react-table.css';
import {
    Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, CardBlock,
    Card, CardHeader, CardBody, CardFooter, CardTitle, Button, Label, Input, Table, UncontrolledTooltip} from "reactstrap";

class NewPatientCard extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.checkboxSubmit = this.checkboxSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.toggle_submit = this.toggle_submit.bind(this);
        if (props.location.state !== undefined) {
            this.state = {
                date: props.location.state.detail.date,
                username: props.location.state.detail.username,
                firstname: props.location.state.detail.firstname,
                lastname: props.location.state.detail.lastname,
                sector: props.location.state.detail.sector,
                modal: false,
                modal_submit: false,
                all_records: [],
                all_symptoms: [],
                all_notes: [],
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
            let data = {
                username:this.state.username
            };

            axios.post('api/patient/history', data).then(
                (res) => {
                    let records = res.data.reverse();
                    const singlePatientRecords = (record, data) => {
                        return {
                            key: record.record.id,
                            date: record.record.date.substring(0,10),
                            pain: data[0],
                            breath: data[1],
                            fatigue: data[2],
                            nausea: data[3],
                            vomiting: data[4],
                            poor_appetite: data[5],
                            constipation: data[6],
                            q3: data[7],
                            q4: data[8],
                            q5: data[9],
                            q6: data[10],
                            q7: data[11],
                            record_key: record.record.id,
                            user: record.record.signed
                        };
                    };
                    this.setState({
                        all_records: records.map((record) => {
                            if (record.data.length > 0) {
                                let data = [];
                                for (let i = 0; i < 12; i++){
                                    if (record.data[i] === undefined || record.data[i].length === 0 || record.data[i].answer === null){
                                        data.push(null);
                                    }
                                    else {
                                        data.push(record.data[i].answer);
                                    }
                                }
                                return {
                                    ...singlePatientRecords(record, data)
                                }
                            }
                            else{
                                return {...singlePatientRecords(record, Array(12).fill(null))}
                            }
                        })
                    });

                    // if a record was submitted but no other symptoms were mentioned, we skip display unlike singlePatientRecords
                    let symptom_data = [];
                    for (let i = 0; i < records.length; i++){
                        symp = records[i].symp;
                        for (let j = 0; j <  symp.length; j++){
                            if (symp[j] !== undefined || symp[j] !== null){
                                data.push({date: records[i].date.substring(0,10),
                                    symptom: symp[j].symptom,
                                    score: symp[j].answer})
                            }
                        }
                    }
                    this.setState({
                        all_symptoms: symptom_data
                    });

                });
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
                (res) => {
                    let notes = res.data.reverse();
                    this.setState({
                        all_notes: notes.map((each_note) => {
                            return {
                                date: each_note.date.substring(0, 10),
                                note: each_note.notes
                            }
                        })
                    });
                });
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
            (res) => {
                let notes = res.data.reverse();
                this.setState({
                    all_notes: notes.map((each_note) => {
                        return {
                            date: each_note.date.substring(0, 10),
                            note: each_note.notes
                        }
                    })
                });
            });
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

    checkboxSubmit(params){
        let headers = {
            'Content-Type':'application/json'
        };
        let url = 'api/edit_record/' + params.record_key;
        axios.put(url, {"update_user": true}, headers)
    };

    render(){
        let renderPatientData = () => {
            const {firstname, all_records, all_symptoms, all_notes, new_note} = this.state;
            return (
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                {firstname}
                            </CardHeader>
                            <CardBody className="card-body">
                                <div>
                                    <ReactTable
                                        getTheadTrProps={
                                            () => {
                                                return {
                                                    style: {
                                                        backgroundColor: "#5f9ea0"
                                                    }
                                                }
                                            }
                                        }
                                        className="-striped -highlight"
                                        filterable
                                        defaultFilterMethod={(filter, row) =>
                                            String(row[filter.id]).toLowerCase().startsWith(filter.value.toLowerCase())
                                        }
                                        data={all_records}
                                        columns={[
                                            {
                                                Header: "Last Submission",
                                                accessor: "date"
                                            },
                                            {
                                                Header: 'Pain',
                                                accessor: "pain"
                                            },
                                            {
                                                Header: () => <span id="SOB"> SOB</span>,
                                                accessor: "breath"
                                            },
                                            {
                                                Header: 'Nausea',
                                                accessor: "nausea"
                                            },
                                            {
                                                Header: 'Fatigue',
                                                accessor: "fatigue"
                                            },
                                            {
                                                Header: 'Constipation',
                                                accessor: "constipation"
                                            },
                                            {
                                                Header: () => <span id="q3">Q3</span>,
                                                accessor: "q3"
                                            },
                                            {
                                                Header: () => <span id="q4">Q4</span>,
                                                accessor: "q4"
                                            },
                                            {
                                                Header: () => <span id="q5">Q5</span>,
                                                accessor: "q5"
                                            },
                                            {
                                                Header: () => <span id="q6">Q6</span>,
                                                accessor: "q6"
                                            },
                                            {
                                                Header: () => <span id="q7">Q7</span>,
                                                accessor: "q7"
                                            },
                                            {
                                                Header: 'Signed',
                                                accessor: 'user',
                                                filterable: false,
                                                Cell: cellData => {
                                                    if ((cellData.original.record_key !== null) && (cellData.original.user !== null)) {
                                                        return (<div>
                                                            <Input addon type="checkbox" defaultChecked
                                                                   onClick={() => this.checkboxSubmit(cellData.original)}/>
                                                            <span>{cellData.original.user.first_name}</span>
                                                        </div>)
                                                    }
                                                    else if ((cellData.original.record_key !== null) && (cellData.original.user === null)) {
                                                        return (<Input addon type="checkbox"
                                                                       onClick={() => this.checkboxSubmit(cellData.original)}/>)
                                                    }
                                                }
                                            }
                                        ]}
                                        defaultPageSize={5}
                                        minRows={3}
                                        noDataText='No Patient Records Yet'
                                    />
                                </div>
                                <UncontrolledTooltip placement="top" target="SOB">
                                    Shortness of Breath
                                </UncontrolledTooltip>
                                <UncontrolledTooltip placement="top" target="q3">
                                    Have you been feeling worried about your illness in the past 3 days?
                                </UncontrolledTooltip>
                                <UncontrolledTooltip placement="top" target="q4">
                                    Over the past 3 days, have you been able to share how you are feeling with your
                                    family or friends?
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

                                <div>
                                    <ReactTable
                                        getTheadTrProps={
                                            () => {
                                                return {
                                                    style: {
                                                        backgroundColor:  "#008aff"
                                                    }
                                                }
                                            }
                                        }
                                        className="-striped -highlight"
                                        filterable
                                        defaultFilterMethod={(filter, row) =>
                                            String(row[filter.id]).toLowerCase().startsWith(filter.value.toLowerCase())
                                        }
                                        data={all_symptoms}
                                        columns={[
                                            {
                                                Header: "Last Submission",
                                                accessor: "date"
                                            },
                                            {
                                                Header: "Symptom",
                                                accessor: "symptom"
                                            },
                                            {
                                                Header: "Score",
                                                accessor: "score"
                                            }]}
                                        defaultPageSize={5}
                                        minRows={3}
                                        noDataText='No Symptoms Recorded'
                                    />
                                </div>

                                <div>
                                    <ReactTable
                                        getTheadTrProps={
                                            () => {
                                                return {
                                                    style: {
                                                        backgroundColor:  "#e7ff00"
                                                    }
                                                }
                                            }
                                        }
                                        className="-striped -highlight"
                                        filterable
                                        defaultFilterMethod={(filter, row) =>
                                            String(row[filter.id]).toLowerCase().startsWith(filter.value.toLowerCase())
                                        }
                                        data={all_notes}
                                        columns={[
                                            {
                                                Header: "Last Submission",
                                                accessor: "date"
                                            },
                                            {
                                                Header: "Note",
                                                accessor: "note"
                                            }]}
                                        defaultPageSize={5}
                                        minRows={3}
                                        noDataText='No Notes Recorded'
                                    />
                                </div>

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
                            </CardBody>

                        </Card>
                    </Col>
                </Row>
            );
        };

        return renderPatientData();
    }


}

export default (NewPatientCard);