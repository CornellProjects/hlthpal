import React, {Component} from "react";
import {Bar, Line, Pie} from "react-chartjs-2";
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

class Patients extends Component {

  render (){
    const FlagGreenStyle = {
      backgroundColor : '#4dbd74',
      height : 10,
      width : 30,
    };
    const FlagRedStyle = {
      backgroundColor : '#f86c6b',
      height : 10,
      width : 30,
    };
    const FlagYellowStyle = {
      backgroundColor : '#ffc107',
      height : 10,
      width : 30,
    };
    const FlagOrangeStyle = {
      backgroundColor : '#f16c00',
      height : 10,
      width : 30,
    };
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
                  <th>SOB</th>
                  <th>Weakness</th>
                  <th>Nausea</th>
                  <th>Vomitting</th>
                  <th>Appetite</th>
                  <th>Constipation</th>
                  <th>Other High Score</th>
                  <th>Last Date Updated</th>
                  <th>Notes</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>
                    <div>Patient A</div>
                  </td>
                  <td className="text-center">
                    <div>Gasabo</div>
                  </td>
                  <td>
                      <div>
                        <strong>0</strong>
                      </div>
                      <div style={FlagGreenStyle}></div>
                  </td>
                  <td>
                  <div>
                    <strong>0</strong>
                  </div>
                  <div style={FlagGreenStyle}></div>
                  </td>
                  <td>
                  <div>
                    <strong>0</strong>
                  </div>
                  <div style={FlagGreenStyle}></div>
                  </td>
                  <td>
                  <div>
                    <strong>0</strong>
                  </div>
                  <div style={FlagGreenStyle}></div>
                  </td>
                  <td>
                  <div>
                    <strong>0</strong>
                  </div>
                  <div style={FlagGreenStyle}></div>
                  </td>
                  <td>
                  <div>
                    <strong>0</strong>
                  </div>
                  <div style={FlagGreenStyle}></div>
                  </td>
                  <td>
                  <div>
                    <strong>0</strong>
                  </div>
                  <div style={FlagGreenStyle}></div>
                  </td>
                  <td>
                  <div>
                    <strong>0</strong>
                  </div>
                  <div style={FlagGreenStyle}></div>
                  </td>
                  <td>
                  08/20/2017
                  </td>
                  <td>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>Patient B</div>
                  </td>
                  <td className="text-center">
                    <div>Klyovu</div>
                  </td>
                  <td>
                  <div>
                    <div>
                      <strong>3</strong>
                    </div>
                    <div style={FlagOrangeStyle}></div>
                  </div>
                  </td>
                  <td>
                  <div>
                    <strong>3</strong>
                  </div>
                  <div style={FlagOrangeStyle}></div>
                  </td>
                  <td>
                      <div>
                        <strong>3</strong>
                      </div>
                      <div style={FlagOrangeStyle}></div>
                  </td>
                  <td>
                      <div>
                        <strong>3</strong>
                      </div>
                      <div style={FlagOrangeStyle}></div>
                  </td>
                  <td>
                      <div>
                        <strong>3</strong>
                      </div>
                      <div style={FlagOrangeStyle}></div>
                  </td>
                  <td>
                      <div>
                        <strong>3</strong>
                      </div>
                      <div style={FlagOrangeStyle}></div>
                  </td>
                  <td>
                      <div>
                        <strong>3</strong>
                      </div>
                      <div style={FlagOrangeStyle}></div>
                  </td>
                  <td>
                      <div>
                        <strong>3</strong>
                      </div>
                      <div style={FlagOrangeStyle}></div>
                  </td>
                  <td>
                  <div>
                    04/25/2017
                    </div>
                  </td>
                  <td>
                    <div>

                    </div>
                  </td>
                </tr>
                <tr>

                  <td>
                    <div>Patient C</div>
                  </td>
                  <td>
                    <div>Remera</div>
                  </td>
                  <td>
                        <div>
                          <strong>2</strong>
                        </div>
                      <div style={FlagYellowStyle}></div>
                  </td>
                  <td>
                        <div>
                          <strong>2</strong>
                        </div>
                      <div style={FlagYellowStyle}></div>
                  </td>
                  <td>
                        <div>
                          <strong>2</strong>
                        </div>
                      <div style={FlagYellowStyle}></div>
                  </td>
                  <td>
                        <div>
                          <strong>2</strong>
                        </div>
                      <div style={FlagYellowStyle}></div>
                  </td>
                  <td>
                        <div>
                          <strong>2</strong>
                        </div>
                      <div style={FlagYellowStyle}></div>
                  </td>
                  <td>
                        <div>
                          <strong>2</strong>
                        </div>
                      <div style={FlagYellowStyle}></div>
                  </td>
                  <td>
                        <div>
                          <strong>2</strong>
                        </div>
                      <div style={FlagYellowStyle}></div>
                  </td>
                  <td>
                        <div>
                          <strong>2</strong>
                        </div>
                      <div style={FlagYellowStyle}></div>
                  </td>
                  <td>
                      <div>09/08/2017</div>
                  </td>
                  <td>
                  </td>

                </tr>
                <tr>
                  <td>
                    <div>Patient D</div>
                  </td>
                  <td>
                    <div>Gasabo</div>
                  </td>
                  <td>
                      <div>
                        <strong>3</strong>
                      </div>
                    <div style={FlagOrangeStyle}> </div>
                  </td>
                  <td>
                      <div>
                        <strong>3</strong>
                      </div>
                    <div style={FlagOrangeStyle}> </div>
                  </td>
                  <td>
                      <div>
                        <strong>3</strong>
                      </div>
                    <div style={FlagOrangeStyle}> </div>
                  </td>
                  <td>
                      <div>
                        <strong>3</strong>
                      </div>
                    <div style={FlagOrangeStyle}> </div>
                  </td>
                  <td>
                      <div>
                        <strong>3</strong>
                      </div>
                    <div style={FlagOrangeStyle}> </div>
                  </td>
                  <td>
                      <div>
                        <strong>3</strong>
                      </div>
                    <div style={FlagOrangeStyle}> </div>
                  </td>
                  <td>
                      <div>
                        <strong>3</strong>
                      </div>
                    <div style={FlagOrangeStyle}> </div>
                  </td>
                  <td>
                      <div>
                        <strong>3</strong>
                      </div>
                    <div style={FlagOrangeStyle}> </div>
                  </td>
                  <td>
                   06/23/2017
                  </td>
                  <td>
                    <div>
                      Visited 4/8/17- morphine increased for SOB
                      </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>Patient E</div>
                  </td>
                  <td>
                    <div>Klyovu</div>
                  </td>
                  <td>
                  <div>
                      <strong>4</strong>
                    </div>
                  <div style={FlagRedStyle}></div>
                  </td>
                  <td>
                  <div>
                      <strong>4</strong>
                    </div>
                  <div style={FlagRedStyle}></div>
                  </td>
                  <td>
                  <div>
                      <strong>4</strong>
                    </div>
                  <div style={FlagRedStyle}></div>
                  </td>
                  <td>
                  <div>
                      <strong>4</strong>
                    </div>
                  <div style={FlagRedStyle}></div>
                  </td>
                  <td>
                  <div>
                      <strong>4</strong>
                    </div>
                  <div style={FlagRedStyle}></div>
                  </td>
                  <td>
                  <div>
                      <strong>4</strong>
                    </div>
                  <div style={FlagRedStyle}></div>
                  </td>
                  <td>
                  <div>
                      <strong>4</strong>
                    </div>
                  <div style={FlagRedStyle}></div>
                  </td>
                  <td>
                  <div>
                      <strong>4</strong>
                    </div>
                  <div style={FlagRedStyle}></div>
                  </td>
                  <td>
                  <div>
                    07/08/2017
                  </div>
                  </td>
                  <td>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>Patient F</div>
                  </td>
                  <td>
                    <div>Remera</div>
                  </td>
                  <td>
                    <div>
                      <strong>0</strong>
                    </div>
                  <div style={FlagGreenStyle}> </div>
                  </td>
                  <td>
                    <div>
                      <strong>0</strong>
                    </div>
                  <div style={FlagGreenStyle}> </div>
                  </td>
                  <td>
                    <div>
                      <strong>0</strong>
                    </div>
                  <div style={FlagGreenStyle}> </div>
                  </td>
                  <td>
                    <div>
                      <strong>0</strong>
                    </div>
                  <div style={FlagGreenStyle}> </div>
                  </td>
                  <td>
                    <div>
                      <strong>0</strong>
                    </div>
                  <div style={FlagGreenStyle}> </div>
                  </td>
                  <td>
                    <div>
                      <strong>0</strong>
                    </div>
                  <div style={FlagGreenStyle}> </div>
                  </td>
                  <td>
                    <div>
                      <strong>0</strong>
                    </div>
                  <div style={FlagGreenStyle}> </div>
                  </td>
                  <td>
                    <div>
                      <strong>0</strong>
                    </div>
                  <div style={FlagGreenStyle}> </div>
                  </td>
                  <td>
                    02/09/2017
                  </td>
                  <td>
                  <div>Visited 4/17/17 - Pain already improved, family needed reassurance
                  </div>
                  </td>
                </tr>
                </tbody>
              </Table>
            </CardBlock>
          </Card>
        </Col>
      </Row>
    )
  }
}

export default Patients;
