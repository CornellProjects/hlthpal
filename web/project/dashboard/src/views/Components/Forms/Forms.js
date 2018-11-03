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
  CardBody,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import axios from 'axios';

class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name:'',
      last_name:'',
      email:'',
      password:'',
      diagnosis:'',
      care_giver:'',
      address: '',
      doctor:'',
      gender:'',
      mobile:'',
      sector: '',
      category: '',
      referral: '',
      modal:false,
      header: 'Success: Your form was submitted',
      message: [],
      valid_email:true,
      valid_email_format: true,
      valid_first_name: true,
      valid_last_name: true,
      valid_password: true
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onReset = this.onReset.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount(){
    const token = localStorage.getItem('jwtToken');
    if (!token){
      this.props.history.push('/login');
    }
  }
  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onChangeEmail(){
      let emailRex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      let data = {email: this.state.email};
      if (!emailRex.test(data['email'])) {
          this.setState({ valid_email_format: false });
      }
      else {
          this.setState({ valid_email_format: true });
          axios.post('api/valid_email', data).then(response => {
              let res = response['data']['status'];
              this.setState({valid_email: res});
          });
      }
  }
  onChangeFirstName(){
      if (this.state.first_name.trim() === '' || /\s/g.test(this.state.first_name.trim())){
          this.setState({valid_first_name: false});
      }
      else {
          this.setState({valid_first_name: true});
      }
  }
  onChangeLastName(){
      if (this.state.last_name.trim() === '' || /\s/g.test(this.state.last_name.trim())){
          this.setState({valid_last_name: false});
      }
      else {
          this.setState({valid_last_name: true});
      }
  }
  onChangePassword(){
      if (this.state.password.trim() === '' || /\s/g.test(this.state.password.trim())){
          this.setState({valid_password: false});
      }
      else {
          this.setState({valid_password: true});
      }
  }

  onSubmit(e) {
    e.preventDefault();
    var data = {
      first_name:this.state.first_name,
      last_name:this.state.last_name,
      username:this.state.email,
      email:this.state.email,
      password:this.state.password,
      patient: {
        diagnosis:this.state.diagnosis,
        care_giver:this.state.care_giver,
        doctor:this.state.doctor,
        gender:this.state.gender,
        mobile:this.state.mobile,
        category:this.state.category,
        referral:this.state.referral,
        address:this.state.address,
        sector:this.state.sector
        // state:this.state.state,
        // country:this.state.country
      }
    };

    var headers = {
      'Content-Type':'application/json'
    };
    var self = this;

    axios.post('api/register', data, headers).then(response => {
        self.setState({
            modal:!self.state.modal,
            message: ["No errors found"]
        });
        this.onReset();
    }).catch(function(err) {
        let message = []; let i = 0;
        let styles = {
            fontSize: '15px',
            fontWeight: 'bold'
        };
        if (err.response.status === 400){
            for (let property in err.response.data) {
                if (err.response.data.hasOwnProperty('patient')) {
                    for (let item in err.response.data['patient']) {
                        let text = item + ': ' + err.response.data[property][item];
                        message.push(<div style={styles} key={i}>{text}</div>);
                    }
                }
                else {
                    if (property === 'username'){
                        if (err.response.data[property] === "A user with that username already exists"){
                            let text = 'email: ' + "This email already exists in the system";
                            message.push(<div style={styles} key={i}>{text}</div>);
                        }
                    }
                    else {
                        let text = property + ': ' + err.response.data[property];
                        message.push(<div style={styles} key={i}>{text}</div>);
                    }
                }
                i += 1;
            }
            self.setState({
                header:'Error: Your form could not be submitted',
                message: message,
                modal:!self.state.modal
            });
            message = [];
        }
        else {
            self.setState({
                modal:!self.state.modal,
                message: message
            });
        }
    });
  }
  onReset(){
    this.setState({
      first_name:'',
      last_name:'',
      email:'',
      password:'',
      diagnosis:'',
      care_giver:'',
      doctor:'',
      gender:'',
      mobile:'',
      address: '',
      category: '',
      referral: '',
      sector:'',
      header: 'Success: Your form was submitted',
      message: [],
      valid_email:true,
      valid_email_format: true,
      valid_first_name: true,
      valid_last_name: true,
      valid_password: true
    });
  }
  toggle() {
    this.setState({
      modal: !this.state.modal,
      header: 'Success: Your form was submitted'
    });
  }
  render() {
    // const {first_name, last_name, password, email, diagnosis, care_giver, address, doctor, gender, mobile, street, city, sector, state, country} = this.state;
    const {first_name, last_name, password, email, diagnosis, care_giver, address, doctor, gender, mobile, sector, category, referral} = this.state;

      return (
          <div className="animated fadeIn">

              <Row>
                  <Col xs="12" md="12">
                      <Card>
                          <CardHeader>
                              <strong>Patient Info</strong>
                          </CardHeader>
                          <CardBody>
                              <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                  <FormGroup row>
                                      <Col md="2">
                                          <Label>Firstname*</Label>
                                      </Col>
                                      <Col xs="12" md="7">
                                          <Input
                                              type="first_name" invalid={!this.state.valid_first_name}
                                              id="first_name-input"
                                              name="first_name"
                                              placeholder="Enter Firstname"
                                              value={first_name}
                                              onChange={this.onChange}
                                              onBlur={this.onChangeFirstName} />

                                          {this.state.valid_first_name === false &&
                                          <FormFeedback>
                                              Uh oh! This field cannot be empty or contain spaces.
                                          </FormFeedback>}

                                          <FormText color="muted">Please enter firstname</FormText>
                                      </Col>
                                  </FormGroup>

                                  <FormGroup row>
                                      <Col md="2">
                                          <Label>Lastname*</Label>
                                      </Col>
                                      <Col xs="12" md="7">
                                          <Input
                                              type="last_name" invalid={!this.state.valid_last_name}
                                              id="last_name-input"
                                              name="last_name"
                                              placeholder="Enter Lastname"
                                              value={last_name}
                                              onChange={this.onChange}
                                              onBlur={this.onChangeLastName} />

                                          {this.state.valid_last_name === false &&
                                          <FormFeedback>
                                              Uh oh! This field cannot be empty or contain spaces.
                                          </FormFeedback>}

                                          <FormText color="muted">Please enter lastname</FormText>
                                      </Col>
                                  </FormGroup>

                                  <FormGroup row>
                                      <Col md="2">
                                          <Label htmlFor="email-input">Email Address*</Label>
                                      </Col>
                                      <Col xs="12" md="7">
                                          <Input type="email" invalid={!(this.state.valid_email_format && this.state.valid_email)}
                                                 id="email-input"
                                                 name="email"
                                                 placeholder="Enter Email"
                                                 value={email}
                                                 onChange={this.onChange}
                                                 onBlur={this.onChangeEmail} />

                                          {(this.state.valid_email_format === true && this.state.valid_email === false) &&
                                          <FormFeedback>
                                              Uh oh! Looks like your email is taken. Please enter another one.
                                          </FormFeedback>
                                          }
                                          {this.state.valid_email_format === false &&
                                          <FormFeedback>
                                              Uh oh! Your email should be of the form "username@email.com"
                                          </FormFeedback>
                                          }

                                          <FormText className="help-block">Please enter patient email</FormText>
                                      </Col>
                                  </FormGroup>

                                  <FormGroup row>
                                      <Col md="2">
                                          <Label htmlFor="password-input">Password*</Label>
                                      </Col>
                                      <Col xs="12" md="7">
                                          <Input type="password" invalid={!this.state.valid_password}
                                                 id="password-input"
                                                 name="password"

                                                 placeholder="Enter Password"
                                                 value={password}
                                                 onChange={this.onChange}
                                                 onBlur={this.onChangePassword} />

                                          {this.state.valid_password === false &&
                                          <FormFeedback>
                                              Uh oh! The password field cannot be empty or contain spaces.
                                          </FormFeedback>
                                          }
                                          <FormText className="help-block">Please enter a complex password</FormText>
                                      </Col>
                                  </FormGroup>

                                  <FormGroup row>
                                      <Col md="2">
                                          <Label htmlFor="gender-input">Gender</Label>
                                      </Col>
                                      <Col xs="12" md="7">
                                          <Input type="gender"
                                                 id="gender-input"
                                                 name="gender"
                                                 placeholder="Enter patient gender"
                                                 value={gender}
                                                 onChange={this.onChange}/>
                                          <FormText className="help-block">Please enter gender</FormText>
                                      </Col>
                                  </FormGroup>

                                  <FormGroup row>
                                      <Col md="2">
                                          <Label htmlFor="category-input">Category</Label>
                                      </Col>
                                      <Col xs="12" md="7">
                                          <Input type="category"
                                                 id="category-input"
                                                 name="category"
                                                 placeholder="Enter enter social category"
                                                 value={category}
                                                 onChange={this.onChange}/>
                                          <FormText className="help-block">Please enter social category</FormText>
                                      </Col>
                                  </FormGroup>

                                  <FormGroup row>
                                      <Col md="2">
                                          <Label htmlFor="mobile-input">Mobile</Label>
                                      </Col>
                                      <Col xs="12" md="7">
                                          <Input type="mobile"
                                                 id="mobile-input"
                                                 name="mobile"
                                                 placeholder="Enter mobile phone number"
                                                 value={mobile}
                                                 onChange={this.onChange}/>
                                          <FormText className="help-block">Please enter mobile phone number</FormText>
                                      </Col>
                                  </FormGroup>

                                  <FormGroup row>
                                      <Col md="2">
                                          <Label htmlFor="street-input">Home Address</Label>
                                      </Col>
                                      <Col xs="12" md="7">
                                          <Input type="address"
                                                 id="address-input"
                                                 name="address"
                                                 placeholder="Enter address"
                                                 value={address}
                                                 onChange={this.onChange}/>
                                          <FormText className="help-block">Please enter home address</FormText>
                                      </Col>
                                  </FormGroup>

                                  <FormGroup row>
                                      <Col md="2">
                                          <Label htmlFor="sector-input">Sector</Label>
                                      </Col>
                                      <Col xs="12" md="7">
                                          <Input type="sector"
                                                 id="sector-input"
                                                 name="sector"
                                                 placeholder="Enter sector"
                                                 value={sector}
                                                 onChange={this.onChange}/>
                                          <FormText className="help-block">Please enter sector</FormText>
                                      </Col>
                                  </FormGroup>

                                  <FormGroup row>
                                      <Col md="2">
                                          <Label htmlFor="address-input">Diagnosis</Label>
                                      </Col>
                                      <Col xs="12" md="7">
                                          <Input type="diagnosis"
                                                 id="diagnosis-input"
                                                 name="diagnosis"
                                                 placeholder="Enter Patient Diagnosis"
                                                 value={diagnosis}
                                                 onChange={this.onChange}/>
                                          <FormText className="help-block">Please enter diagnosis</FormText>
                                      </Col>
                                  </FormGroup>

                                  <FormGroup row>
                                      <Col md="2">
                                          <Label htmlFor="address-input">Referred From</Label>
                                      </Col>
                                      <Col xs="12" md="7">
                                          <Input type="referral"
                                                 id="referral-input"
                                                 name="referral"
                                                 placeholder="Please enter place where patient was referred from"
                                                 value={referral}
                                                 onChange={this.onChange}/>
                                          <FormText className="help-block">Please enter place where patient was referred
                                              from</FormText>
                                      </Col>
                                  </FormGroup>

                                  <FormGroup row>
                                      <Col md="2">
                                          <Label htmlFor="care_giver-input">Care giver</Label>
                                      </Col>
                                      <Col xs="12" md="7">
                                          <Input type="care_giver"
                                                 id="care_giver-input"
                                                 name="care_giver"
                                                 placeholder="Enter a Caregiver Name"
                                                 value={care_giver}
                                                 onChange={this.onChange}/>
                                          <FormText className="help-block">Please enter a caregiver name</FormText>
                                      </Col>
                                  </FormGroup>

                                  <FormGroup row>
                                      <Col md="2">
                                          <Label htmlFor="doctor-input">Doctor</Label>
                                      </Col>
                                      <Col xs="12" md="7">
                                          <Input type="doctor"
                                                 id="doctor-input"
                                                 name="doctor"
                                                 placeholder="Enter a Doctor Name"
                                                 value={doctor}
                                                 onChange={this.onChange}/>
                                          <FormText className="help-block">Please enter a doctor name</FormText>
                                      </Col>
                                  </FormGroup>
                              </Form>
                          </CardBody>
                          <CardFooter>
                              <Row>
                                  <Col sm="2" md="1">
                                      <Button type="submit" size="sm" color="primary" onClick={this.onSubmit}><i
                                          className="fa fa-dot-circle-o"></i> Submit</Button>
                                  </Col><Col sm="2" md="1">
                                  <Button type="reset" size="sm" color="danger" onClick={this.onReset}><i
                                      className="fa fa-ban"></i> Reset</Button>
                              </Col>
                              </Row>
                          </CardFooter>
                          <Modal isOpen={this.state.modal}>
                              {this.state.header==='Error: Your form could not be submitted' &&
                              <ModalHeader toggle={this.toggle} style={{color: 'red'}}>{this.state.header}</ModalHeader>}
                              {this.state.header==='Success: Your form was submitted' &&
                              <ModalHeader toggle={this.toggle} style={{color: 'green'}}>{this.state.header}</ModalHeader>}
                              <ModalBody>
                                  {this.state.message}
                              </ModalBody>
                              <ModalFooter>
                                  <Button color="primary" onClick={this.toggle}>Okay</Button>{' '}
                              </ModalFooter>
                          </Modal>
                      </Card>

                  </Col>
              </Row>
          </div>
      );
  }
}

export default Forms;
