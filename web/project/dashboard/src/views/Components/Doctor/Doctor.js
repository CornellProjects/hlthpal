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
  constructor(props){
    super(props)
    this.state = {
      entity:'',
      first_name:'',
      last_name:'',
      password: '',
      username:'',
      email:'',
      modal:false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onReset = this.onReset.bind(this);
  }
  componentWillMount(){
    const token = localStorage.getItem('jwtToken');
    if (!token){
      this.props.history.push('/login');
    }
  }
  toggle(){
    this.setState({
      modal:!this.state.modal
    });
  }
  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onReset(){
    this.setState({
      entity:'',
      first_name:'',
      last_name:'',
      password: '',
      username:'',
      email:''
    });
  }
  onSubmit(e) {
    e.preventDefault();
    var headers = {
      'Content-Type':'application/json'
    }
    var data = {
      doctor:{
        entity: this.state.entity
      },
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      password: this.state.password,
      username: this.state.email,
      email: this.state.email
    }
    axios.post('api/doctor', data, headers);
    this.setState({
      modal:!this.state.modal
    });
  }
  render() {
    const {first_name, last_name, entity, password, username, email} = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <strong>Doctor Info</strong>
              </CardHeader>
              <CardBlock className="card-body">
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label>Firstname</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="firstname"
                             name="first_name"
                             value={first_name}
                             placeholder="Enter firstname"
                             onChange={this.onChange}/>
                      <FormText color="muted">Please enter doctor firstname</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label>Lastname</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="lastname"
                             name="last_name"
                             value={last_name}
                             placeholder="Enter lastname"
                             onChange={this.onChange}/>
                      <FormText color="muted">Please enter doctor lastname</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label>Doctor entity</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="entity"
                             name="entity"
                             value={entity}
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
                             name="email"
                             value={email}
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
                             name="password"
                             value={password}
                             placeholder="Password"
                             onChange={this.onChange}/>
                      <FormText className="help-block">Please enter a complex password</FormText>
                    </Col>
                  </FormGroup>

                </Form>
              </CardBlock>
              <CardFooter>
              <Row>
              <Col sm="2"md="1">
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
                    You have successfully add a doctor!
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.toggle}>Go back</Button>{' '}
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
