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
      // street:'',
      // city:'',
      sector: '',
      category: '',
      referral: '',
      // state:'',
      // country:'',
      modal:false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
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
        // street:this.state.street,
        address:this.state.address,
        // city:this.state.city,
        sector:this.state.sector
        // state:this.state.state,
        // country:this.state.country
      }
    }

    var headers = {
      'Content-Type':'application/json'
    };
    axios.post('api/register', data, headers).then(
      this.setState({
        modal:!this.state.modal
      })
   ).catch(function(err) {
      console.error(JSON.stringify(err));
      console.log("Yoyoyo");
      })
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
      // street:'',
      // city:'',
      sector:''
      // state:'',
      // country:''
    });
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
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
              <CardBlock className="card-body">
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label>Firstname</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                            type="first_name"
                            id="first_name-input"
                            name="first_name"
                            placeholder="Enter Firstname"
                            value={first_name}
                            onChange={this.onChange}
                            />
                      <FormText color="muted">Please enter firstname</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label>Lastname</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                            type="last_name"
                            id="last_name-input"
                            name="last_name"
                            placeholder="Enter Lastname"
                            value={last_name}
                            onChange={this.onChange}/>
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
                             placeholder="Enter Email"
                             value={email}
                             onChange={this.onChange}/>
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

                             placeholder="Enter Password"
                             value={password}
                             onChange={this.onChange}/>

                      <FormText className="help-block">Please enter a complex password</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                      <Col md="3">
                          <Label htmlFor="gender-input">Gender</Label>
                      </Col>
                      <Col xs="12" md="9">
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
                      <Col md="3">
                          <Label htmlFor="category-input">Category</Label>
                      </Col>
                      <Col xs="12" md="9">
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
                      <Col md="3">
                          <Label htmlFor="mobile-input">Mobile</Label>
                      </Col>
                      <Col xs="12" md="9">
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
                      <Col md="3">
                          <Label htmlFor="street-input">Home Address</Label>
                      </Col>
                      <Col xs="12" md="9">
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
                      <Col md="3">
                          <Label htmlFor="sector-input">Sector</Label>
                      </Col>
                      <Col xs="12" md="9">
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
                    <Col md="3">
                      <Label htmlFor="address-input">Diagnosis</Label>
                    </Col>
                    <Col xs="12" md="9">
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
                      <Col md="3">
                          <Label htmlFor="address-input">Referred From</Label>
                      </Col>
                      <Col xs="12" md="9">
                          <Input type="referral"
                                 id="referral-input"
                                 name="referral"
                                 placeholder="Please enter place where patient was referred from"
                                 value={referral}
                                 onChange={this.onChange}/>
                          <FormText className="help-block">Please enter place where patient was referred from</FormText>
                      </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="care_giver-input">Care giver</Label>
                    </Col>
                    <Col xs="12" md="9">
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
                    <Col md="3">
                      <Label htmlFor="doctor-input">Doctor</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="doctor"
                             id="doctor-input"
                             name="doctor"
                             placeholder="Enter a Doctor Name"
                             value={doctor}
                             onChange={this.onChange}/>
                      <FormText className="help-block">Please enter a doctor name</FormText>
                    </Col>
                  </FormGroup>

                  {/*<FormGroup row>*/}
                      {/*<Col md="3">*/}
                          {/*<Label htmlFor="street-input">Street</Label>*/}
                      {/*</Col>*/}
                      {/*<Col xs="12" md="9">*/}
                          {/*<Input type="street"*/}
                                 {/*id="street-input"*/}
                                 {/*name="street"*/}
                                 {/*placeholder="Enter street"*/}
                                 {/*value={street}*/}
                                 {/*onChange={this.onChange}/>*/}
                          {/*<FormText className="help-block">Please enter street</FormText>*/}
                      {/*</Col>*/}
                  {/*</FormGroup>*/}

                  {/*<FormGroup row>*/}
                    {/*<Col md="3">*/}
                      {/*<Label htmlFor="city-input">City</Label>*/}
                    {/*</Col>*/}
                    {/*<Col xs="12" md="9">*/}
                      {/*<Input type="city"*/}
                             {/*id="city-input"*/}
                             {/*name="city"*/}
                             {/*placeholder="Enter city"*/}
                             {/*value={city}*/}
                             {/*onChange={this.onChange}/>*/}
                      {/*<FormText className="help-block">Please enter city</FormText>*/}
                    {/*</Col>*/}
                  {/*</FormGroup>*/}


                  {/*<FormGroup row>*/}
                    {/*<Col md="3">*/}
                      {/*<Label htmlFor="state-input">State</Label>*/}
                    {/*</Col>*/}
                    {/*<Col xs="12" md="9">*/}
                      {/*<Input type="state"*/}
                             {/*id="state-input"*/}
                             {/*name="state"*/}
                             {/*placeholder="Enter state"*/}
                             {/*value={state}*/}
                             {/*onChange={this.onChange}/>*/}
                      {/*<FormText className="help-block">Please enter state</FormText>*/}
                    {/*</Col>*/}
                  {/*</FormGroup>*/}

                  {/*<FormGroup row>*/}
                    {/*<Col md="3">*/}
                      {/*<Label htmlFor="country-input">Country</Label>*/}
                    {/*</Col>*/}
                    {/*<Col xs="12" md="9">*/}
                      {/*<Input type="country"*/}
                             {/*id="country-input"*/}
                             {/*name="country"*/}
                             {/*placeholder="Enter country"*/}
                             {/*value={country}*/}
                             {/*onChange={this.onChange}/>*/}
                      {/*<FormText className="help-block">Please enter country</FormText>*/}
                    {/*</Col>*/}
                  {/*</FormGroup>*/}

                </Form>
              </CardBlock>
              <CardFooter>
              <Row>
              <Col md="1">
              <Button type="submit" size="sm" color="primary" onClick={this.onSubmit}><i className="fa fa-dot-circle-o"></i> Submit</Button>
              </Col>
              <Col md="1">
              <Button type="reset" size="sm" color="danger" onClick={this.onReset}><i className="fa fa-ban"></i> Reset</Button>
              </Col>
              </Row>
              </CardFooter>
              <Modal isOpen={this.state.modal}>
                <ModalHeader toggle={this.toggle}>Success!</ModalHeader>
                <ModalBody>
                    You have successfully create an entity!
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.toggle}>Okay</Button>{' '}
                </ModalFooter>
              </Modal>
            </Card>

          </Col>
        </Row>
      </div>
    )
  }
}

export default Forms;
