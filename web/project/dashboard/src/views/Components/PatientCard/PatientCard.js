import React, {Component} from "react";
import { Table, Button, Card, CardBody, Row, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from 'axios';


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
    axios.get('api/patient/history', {username:this.state.username}).then(
      (res) => this.setState({
        records:res.data
      })
    );
  }
  toggle(){
    this.setState({modal: !this.state.modal});
  }
  render(){
    const {firstname, lastname, sector, pain, breath, nausea, fatigue, constipation, modal} = this.state;
    var renderPatients = () => {
      return records.map((record) => {
        return (
          <PatientDetail
                       firstname={firstname}
                       lastname={lastname}
                       sector="Gisenyi"
                       pain={record.data[0].answer}
                       breath={record.data[1].answer}
                       nausea={record.data[2].answer}
                       fatigue={record.data[3].answer}
                       constipation={record.data[4].answer}
                       q3={record.data[5].answer}
                       q4={record.data[6].answer}
                       q5={record.data[7].answer}
                       q6={record.data[8].answer}
                       q7={record.data[9].answer}></PatientDetail>
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
                        { renderPatients() }
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

export default PatientCard;
