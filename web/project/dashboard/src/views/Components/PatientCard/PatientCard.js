import React, {Component} from "react";
import { Table } from "reactstrap";
class PatientCard extends Component{
  constructor(props){
    super(props)
    this.state = {
      firstname: props.firstname,
      lastname: props.lastname,
      sector: props.sector,
      pain: props.pain,
      weakness:props.weakness,
      nausea:props.nausea,
      vomitting:props.vomitting
    };
  }
  render(){
    const {firstname, lastname, sector, pain, weakness, nausea, vomitting} = this.state;
    return(
          <tr>
          <td>{firstname + " " + lastname}</td>
          <td>{sector}</td>
          <td>{pain}</td>
          <td>{weakness}</td>
          <td>{nausea}</td>
          <td>{vomitting}</td>
          </tr>
    );
  }
}

export default PatientCard;
