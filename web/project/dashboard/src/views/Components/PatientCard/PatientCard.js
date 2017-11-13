import React, {Component} from "react";
import { Table } from "reactstrap";
class PatientCard extends Component{
  constructor(props){
    super(props)
    this.state = {
      patientName: '',
      pain: '',
      weakness:'',
      nausea: '',
      vomitting: ''
    };
  }
  render(){
    const {patientName, pain, weakness, nausea, vomitting} = this.state;
    return(
        <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
          <tr>
           <div>
            {patientName}
           </div>
          </tr>
          <tr>
            <div>
              {pain}
            </div>
          </tr>
          <tr>
            <div>
              {weakness}
            </div>
          </tr>
          <tr>
             <div>
               {nausea}
             </div>
          </tr>
          <tr>
            <div>
              {vomitting}
            </div>
          </tr>
        </Table>
    );
  }
}

export default PatientCard;
