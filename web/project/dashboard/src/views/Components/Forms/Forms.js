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
      valid_password: true,
      doctor_options: ["Dr. Christian Ntizimira", "Dr. Vincent Karamuka", "Dr. Olive Mukeshimana", "Dr. Vianney Mbitse"],
      newdoctor_first_name: "",
      newdoctor_last_name: "",
      newdoctor_username: "",
      newdoctor_password: "",
      newdoctor_email: "",
      entity: "",
      modal: false,
      modalOpen: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onReset = this.onReset.bind(this);
    this.toggle = this.toggle.bind(this);

    this.onDoctorChange = this.onDoctorChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addNewDoctor = this.addNewDoctor.bind(this);
  }

  componentWillMount(){
    const token = localStorage.getItem('jwtToken');
    if (!token){
      this.props.history.push('/login');
    }
  }

  componentDidMount(){
      axios.get('api/all_doctors').then(response => {
        let names = []
        for(let x = 0; x < response["data"].length; x++){
            let res = response["data"][x];
            names.push("Dr. " + res["first_name"] + " " + res["last_name"]);
        }
        this.setState({
            doctor_options: names
        });
      });
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

  onDoctorChange(e){
    if(e.target.value === "Add New Doctor"){
        this.openModal();
    }
    else{
        this.setState({doctor: e.target.value});
    }
  }

  openModal(){
      this.setState({modalOpen: true});
  }

  closeModal(){
      this.setState({modalOpen: false});
  }

  addNewDoctor(e){
    e.preventDefault();
    var headers = {
        'Content-Type':'application/json'
      }
      var data = {
        doctor:{
          entity: this.state.entity
        },
        first_name: this.state.newdoctor_first_name,
        last_name: this.state.newdoctor_last_name,
        password: this.state.newdoctor_password,
        username: this.state.newdoctor_email,
        email: this.state.newdoctor_email
      }
      axios.post('api/doctor', data, headers);
      this.setState({
        modal:!this.state.modal,
        newdoctor_first_name: "",
        newdoctor_last_name: "",
        newdoctor_password: "",
        newdoctor_email: ""
      });
      this.closeModal();
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
              <Modal
                isOpen={this.state.modalOpen}
                onRequestClose={this.closeModal}
                contentLabel="Add New Doctor">
                    <Card>
                    <CardHeader>
                    <Row>
                        <Col md="9"><strong>Add a New Doctor</strong></Col>
                    </Row>
                    </CardHeader>
                    <CardBlock className="card-body">
                        <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <FormGroup row>
                            <Col md="3">
                            <Label>First Name</Label>
                            </Col>
                            <Col xs="12" md="9">
                            <Input type="newdoctor_firstname"
                                    name="newdoctor_first_name"
                                    value={this.state.newdoctor_first_name}
                                    placeholder="Enter first name"
                                    onChange={this.onChange}/>
                            <FormText color="muted">Please enter doctor first name</FormText>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col md="3">
                            <Label>Last Name</Label>
                            </Col>
                            <Col xs="12" md="9">
                            <Input type="newdoctor_lastname"
                                    name="newdoctor_last_name"
                                    value={this.state.newdoctor_last_name}
                                    placeholder="Enter last name"
                                    onChange={this.onChange}/>
                            <FormText color="muted">Please enter doctor last name</FormText>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col md="3">
                            <Label>Doctor entity</Label>
                            </Col>
                            <Col xs="12" md="9">
                            <Input type="entity"
                                    name="entity"
                                    value={this.state.entity}
                                    placeholder="Enter entity"
                                    onChange={this.onChange}/>
                            <FormText color="muted">Please enter doctor entity</FormText>
                            </Col>
                        </FormGroup>


                        <FormGroup row>
                            <Col md="3">
                            <Label htmlFor="email-input">Email Address</Label>
                            </Col>
                            <Col xs="12" md="9">
                            <Input type="email"
                                    name="newdoctor_email"
                                    value={this.state.newdoctor_email}
                                    placeholder="Enter email"
                                    onChange={this.onChange}/>
                            <FormText className="help-block">Please enter email</FormText>
                            </Col>
                        </FormGroup>


                        <FormGroup row>
                            <Col md="3">
                            <Label htmlFor="password-input">Password</Label>
                            </Col>
                            <Col xs="12" md="9">
                            <Input type="password"
                                    name="newdoctor_password"
                                    value={this.state.newdoctor_password}
                                    placeholder="Password"
                                    onChange={this.onChange}/>
                            <FormText className="help-block">Please enter a complex password</FormText>
                            </Col>
                        </FormGroup>

                        </Form>
                    </CardBlock>
                    <CardFooter>
                    <Row>
                    <Col md="1" style={{marginLeft: "10px", marginRight: "105px"}}>
                        <Button type="submit" size="sm" style={{borderRadius: "15px", color: "white"}} color="submit" onClick={this.addNewDoctor}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                    </Col>
                    <Col md="4"></Col>
                    <Col md="1">
                            <Button size="sm" color="danger" 
                            style={{borderRadius: "15px", marginLeft:"25px"}} 
                            onClick={this.closeModal}> <i className="fa fa-ban"></i> Cancel</Button>
                    </Col>
                    </Row>
                    </CardFooter>
                    </Card>
                </Modal>
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
                                              placeholder="Enter firstname"
                                              value={first_name}
                                              onChange={this.onChange}
                                              onBlur={this.onChangeFirstName} />

                                          {this.state.valid_first_name === false &&
                                          <FormFeedback>
                                              This field cannot be empty or contain spaces.
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
                                              placeholder="Enter lastname"
                                              value={last_name}
                                              onChange={this.onChange}
                                              onBlur={this.onChangeLastName} />

                                          {this.state.valid_last_name === false &&
                                          <FormFeedback>
                                            This field cannot be empty or contain spaces.
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
                                                 placeholder="Enter email"
                                                 value={email}
                                                 onChange={this.onChange}
                                                 onBlur={this.onChangeEmail} />

                                          {(this.state.valid_email_format === true && this.state.valid_email === false) &&
                                          <FormFeedback>
                                            Looks like your email is taken. Please enter another one.
                                          </FormFeedback>
                                          }
                                          {this.state.valid_email_format === false &&
                                          <FormFeedback>
                                            Your email should be of the form "username@email.com"
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

                                                 placeholder="Enter password"
                                                 value={password}
                                                 onChange={this.onChange}
                                                 onBlur={this.onChangePassword} />

                                          {this.state.valid_password === false &&
                                          <FormFeedback>
                                            The password field cannot be empty or contain spaces.
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
                                        <select type="gender" name="gender" id="gender-input" value={gender} onChange={this.onChange} placeholder="Select Gender">
                                            <option></option>
                                            <option value="Male"> Male</option>
                                            <option value="Female"> Female</option>
                                        </select>
                                        <FormText className="help-block">Please select gender</FormText>
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
                                                 placeholder="Enter social category"
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
                                                 placeholder="Enter phone number"
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
                                                 placeholder="Enter patient diagnosis"
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
                                          <Label htmlFor="care_giver-input">Caregiver</Label>
                                      </Col>
                                      <Col xs="12" md="7">
                                          <Input type="care_giver"
                                                 id="care_giver-input"
                                                 name="care_giver"
                                                 placeholder="Enter a caregiver name"
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
                                        <select type="doctor" name="doctor" id="doctor-input" value={doctor} onChange={this.onDoctorChange} placeholder="Select Doctor's Name">
                                            {
                                                this.state.doctor_options.map((doc) => 
                                                    <option value={doc}>{doc}</option>
                                            )}
                                            <option></option>
                                            <option value="Add New Doctor"> + Add New Doctor</option>
                                        </select>
                                        <FormText className="help-block">Please select doctor's Name</FormText>
                                      </Col>
                                  </FormGroup>
                              </Form>
                          </CardBody>
                          <CardFooter>
                              <Row>
                                <Col sm="2" md="1" style={{marginLeft:"50px", marginRight:"70px"}}>
                                    <Button style={{borderRadius: "15px", color: "white"}} type="submit" size="sm" color="submit" onClick={this.onSubmit}><i
                                          className="fa fa-dot-circle-o"></i> Submit</Button>
                                </Col>
                                <Col sm="2" md="1">
                                    <Button style={{borderRadius: "15px"}} type="reset" size="sm" color="danger" onClick={this.onReset}><i
                                      className="fa fa-ban"></i> Reset&nbsp;</Button>
                                </Col>
                              </Row>
                          </CardFooter>
                          <Modal isOpen={this.state.modal}>
                              {this.state.header==='Error: Your form could not be submitted' &&
                              <ModalHeader toggle={this.toggle} style={{color: 'red'}}>{this.state.header}</ModalHeader>}
                              {this.state.header==='Success: Your form was submitted' &&
                              <ModalHeader toggle={this.toggle} style={{color: 'green'}}>{this.state.header}</ModalHeader>}

                              <ModalFooter style={{justifyContent: "center", paddingTop: "30px", paddingBottom: "20px"}}>
                                <Button style={{borderRadius: "15px", color: "white"}} color="primary" onClick={this.toggle}>Okay</Button>{' '}
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
