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
import axios from 'axios';

class Forms extends Component {
  constructor(props){
    super(props)
    this.state = {
      doctor:
           { entity: 1},
      first_name:'',
      last_name:'',
      password: '',
      username:'',
      email:''
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
    const {first_name, last_name, doctor, password, username, email} = this.state;
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
                             value={doctor.entity}
                             placeholder="Enter entity"
                             onChange={this.onChange}/>
                      <FormText color="muted">Please enter doctor entity</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email-input">Username</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="username"
                             name="username"
                             value={username}
                             placeholder="Enter username"
                             onChange={this.onChange}/>
                      <FormText className="help-block">Please enter username</FormText>
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
              <Col md="1">
              <Button type="submit" size="sm" color="primary" onClick={this.onSubmit}><i className="fa fa-dot-circle-o"></i> Submit</Button>
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
