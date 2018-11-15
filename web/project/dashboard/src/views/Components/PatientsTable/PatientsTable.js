import React, {Component} from "react";
import ReactTable from 'react-table';
import axios from 'axios';
import 'react-table/react-table.css';
import {
    Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody,
    CardFooter, CardTitle, Button, Label, Input, Table, UncontrolledTooltip} from "reactstrap";
import Pagination from "../NewPatientCard/new_pagination";


class PatientsTable extends Component {
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.checkboxSubmit = this.checkboxSubmit.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = {
            allPatients: [],
            modal: false
        };
    }

    componentWillMount(){
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            this.props.history.push('/login');
        }
        axios.get('api/patients/data').then((res) => {
            let patients = res.data;
            const currentPatient = (patient, data) => {
                return {
                    key: patient.user.id,
                    date: patient.record.date.substring(0,10),
                    username: patient.user.username,
                    name: patient.user.first_name + ' ' + patient.user.last_name,
                    firstname: patient.user.first_name,
                    lastname: patient.user.last_name,
                    sector: patient.location.sector,
                    pain: data[0],
                    breath: data[1],
                    fatigue: data[2],
                    nausea: data[3],
                    vomiting: data[4],
                    poor_appetite: data[5],
                    constipation: data[6],
                    note: patient.notes.notes,
                    record_key: patient.record.id,
                    user: patient.record.signed
                };
            };
            const newPatient = (patient) => {
                return {
                    key: patient.user.id,
                    date: '',
                    name: patient.user.first_name + ' ' + patient.user.last_name,
                    username: patient.user.username,
                    firstname: patient.user.first_name,
                    lastname: patient.user.last_name,
                    sector: patient.location.sector,
                    pain: '',
                    breath: '',
                    nausea: '',
                    fatigue: '',
                    vomiting: '',
                    poor_appetite: '',
                    constipation: '',
                    note: patient.notes.notes,
                    record_key: null,
                    user: null
                };
            };
            this.setState({
                allPatients: patients.map((patient) => {
                    if (patient.data.length > 0) {
                        let data = [];
                        for (let i = 0; i < 12; i++){
                            // if (patient.data[i].length === 0 || patient.data[i].answer === null){
                            if (patient.data[i] === undefined || patient.data[i].length === 0 || patient.data[i].answer === null){
                                data.push(null);
                            }
                            else {
                                data.push(patient.data[i].answer);
                            }
                        }
                        return {
                            ...currentPatient(patient, data)
                        }
                    } else {
                        return {
                            ...newPatient(patient)
                        };
                    }
                })
            });
        }).catch((error) => {
            this.setState({
                modal: true
            });
        });

    };


    onSubmit(params){
        this.props.history.push({
            pathname: '/viewPatient',
            state: {detail: params}
        })
    };

    toggle() {
        this.setState({
            modal: false
        });
        this.props.history.push('/login');
    }

    checkboxSubmit(params){
        let headers = {
            'Content-Type':'application/json'
        };
        let url = 'api/edit_record/' + params.record_key;
        axios.put(url, {"update_user": true}, headers)
    };

    render() {

        const {allPatients} = this.state;
        return (
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            Patients List
                        </CardHeader>
                        <CardBody className="card-body">
                            <div>
                                <ReactTable
                                    PaginationComponent={Pagination}
                                    getTableProps={
                                        () => {
                                            return {
                                                style: {
                                                    border: "1px solid #5ca3c9"
                                                }
                                            }
                                        }
                                    }
                                    getTdProps={
                                        () => {
                                            return {
                                                style: {
                                                    borderTop: "1px solid #5ca3c9",
                                                    borderRight: "none"
                                                }
                                            }
                                        }
                                    }
                                    getTheadTrProps={
                                        () => {
                                            return {
                                                style: {
                                                    backgroundColor: "#c2cfd6",
                                                    color: "#3e515b",
                                                    fontWeight: "bold",
                                                    borderRight: "none",
                                                    padding: "4px"
                                                }
                                            }
                                        }
                                    }
                                    // className="-striped -highlight"
                                    filterable
                                    defaultFilterMethod={(filter, row) =>
                                        String(row[filter.id]).toLowerCase().startsWith(filter.value.toLowerCase())
                                    }
                                    data={allPatients}
                                    columns={[
                                        {
                                            Header: "Last Submission",
                                            // Header: () => <span><i className='fa-tasks' /> Progress</span>,
                                            accessor: "date"
                                        },
                                        {
                                            Header: "Patient Name",
                                            accessor: "name"
                                            // filterMethod: (filter, row) =>
                                            //     row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase()),
                                            // Cell: cellData => (<span>{cellData.original.firstname} {cellData.original.lastname}</span>)
                                        },
                                        {
                                            Header: 'Sector',
                                            accessor: "sector"
                                        },
                                        {
                                            Header: 'Pain',
                                            accessor: "pain"
                                        },
                                        {
                                            // Header: 'SOB',
                                            Header: () => <span id="SOB"> SOB</span>,
                                            accessor: "breath"
                                        },
                                        {
                                            Header: 'Nausea',
                                            accessor: "nausea"
                                        },
                                        {
                                            Header: 'Vomiting',
                                            accessor: "vomiting"
                                        },
                                        {
                                            Header: 'Fatigue',
                                            accessor: "fatigue"
                                        },
                                        {
                                            Header: 'Poor Appetite',
                                            accessor: "poor_appetite"
                                        },
                                        {
                                            Header: 'Constipation',
                                            accessor: "constipation"
                                        },
                                        {
                                            Header: 'Note',
                                            accessor: "note"
                                        },
                                        {
                                            Header: 'Signed',
                                            accessor: 'user',
                                            filterable: false,
                                            Cell: cellData =>
                                                {if ((cellData.original.record_key !== null) && (cellData.original.user !== null)) {
                                                // console.log(cellData.original.user.first_name, cellData.original.user);
                                                    return (<div>
                                                                <Input addon type="checkbox" defaultChecked
                                                                      onClick={() => this.checkboxSubmit(cellData.original)} />
                                                                <span>{cellData.original.user.first_name}</span>
                                                            </div>)}
                                                else if ((cellData.original.record_key !== null) && (cellData.original.user === null)){
                                                    return (<Input addon type="checkbox"
                                                               onClick={() => this.checkboxSubmit(cellData.original)} />)}
                                            }
                                        },
                                        {
                                            Header: 'More Info',
                                            sortable: false,
                                            filterable: false,
                                            Cell: cellData => (<div style={{textAlign: "center"}}><Button outline color="primary" size="sm" style={{borderRadius: "15px"}}
                                                                            onClick={() => this.onSubmit(cellData.original)}> More </Button></div>)

                                        }
                                    ]}
                                    // defaultPageSize={10}
                                    // className="-striped -highlight"
                                />
                            </div>
                            <UncontrolledTooltip placement="top" target="SOB">
                                Shortness of Breath
                            </UncontrolledTooltip>
                        </CardBody>
                    </Card>
                    <Modal isOpen={this.state.modal}>
                        <ModalHeader toggle={this.toggle} style={{color: 'red'}}>Alert!</ModalHeader>
                        <ModalBody>
                            Your previous session has expired. You should log in again to restart your session.
                        </ModalBody>
                        <ModalFooter style={{justifyContent: "center", paddingTop: "30px", paddingBottom: "20px"}}>
                            <Button style={{borderRadius: "15px", color: "white"}} color="primary" onClick={this.toggle}>Log-in</Button>{' '}
                        </ModalFooter>
                    </Modal>
                </Col>
            </Row>



        );
    }
}


export default (PatientsTable);
