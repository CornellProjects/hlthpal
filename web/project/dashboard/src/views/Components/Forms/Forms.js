import React, {Component} from "react";
import {
  Row,
  Col,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
  CardFooter,
  CardBlock,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButton
} from "reactstrap";

class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name:'',
      last_name:'',
      username:'',
      password:'',
      patient:{
        diagonosis:'',
        care_giver:'',
        doctor:'',
        gender:'',
        mobile:'',
        street:'',
        city:'',
        sector:'',
        state:'',
        country:''
      }
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    var headers = {
      'Content-Type':'application/json'
    }
    axios.post('api/doctor', this.state, headers);
  }

  render() {
    const {first_name, last_name, username, password, patient} = this.state;

    return (
      <div className="animated fadeIn">

        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <strong>Patient Info</strong>
              </CardHeader>
              <CardBlock className="card-body">
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label>Firstname</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                            type="text"
                            id="text-input"
                            name="first_name"
                            placeholder="Enter firstname"/>
                      <FormText color="muted">Please enter firstname</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label>Lastname</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                            type="text"
                            id="text-input"
                            name="last_name"
                            placeholder="Enter lastname"/>
                      <FormText color="muted">Please enter lastname</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email-input">Email Address</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="email"
                             id="email-input"
                             name="email"
                             placeholder="Enter Email"/>
                      <FormText className="help-block">Please enter patient email</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="password-input">Password</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="password"
                             id="password-input"
                             name="password"
                             placeholder="Password"/>
                      <FormText className="help-block">Please enter a complex password</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="address-input">Diagnosis</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="diagnosis"
                             id="diagnosis"
                             name="diagnosis"
                             placeholder="Enter patient diagnosis"/>
                      <FormText className="help-block">Please enter diagnosis</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="address-input">Care giver</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="address"
                             id="address-input"
                             name="care_giver"
                             placeholder="Enter care giver"/>
                      <FormText className="help-block">Please enter care giver</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="age-input">Doctor</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="doctor"
                             id="doctor-input"
                             name="doctor"
                             placeholder="Enter patient age"/>
                      <FormText className="help-block">Please enter doctor</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="age-input">Doctor</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="doctor"
                             id="doctor-input"
                             name="doctor"
                             placeholder="Enter patient age"/>
                      <FormText className="help-block">Please enter doctor</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="age-input">Gender</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="gender"
                             id="gender-input"
                             name="gender"
                             placeholder="Enter patient gender"/>
                      <FormText className="help-block">Please enter gender</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="mobile-input">Mobile</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="mobile"
                             id="mobile-input"
                             name="mobile"
                             placeholder="Enter mobile phone number"/>
                      <FormText className="help-block">Please enter mobile phone number</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="street-input">Street</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="street"
                             id="street-input"
                             name="street"
                             placeholder="Enter street"/>
                      <FormText className="help-block">Please enter street</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="city-input">City</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="city"
                             id="city-input"
                             name="city"
                             placeholder="Enter city"/>
                      <FormText className="help-block">Please enter city</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="sector-input">Sector</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="sector"
                             id="sector-input"
                             name="sector"
                             placeholder="Enter sector"/>
                      <FormText className="help-block">Please enter sector</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="state-input">State</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="state"
                             id="state-input"
                             name="state"
                             placeholder="Enter state"/>
                      <FormText className="help-block">Please enter state</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="country-input">Country</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="country"
                             id="country-input"
                             name="country"
                             placeholder="Enter country"/>
                      <FormText className="help-block">Please enter country</FormText>
                    </Col>
                  </FormGroup>

                </Form>
              </CardBlock>
              <CardFooter>
              <Row>
              <Col md="1">
              <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
              </Col>
              <Col md="1">
              <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
              </Col>
              </Row>
              </CardFooter>
            </Card>

          </Col>
        </Row>
      </div>
    )
  }
}

export default Forms;
