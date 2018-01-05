import React, {Component} from "react";
import {Container, Row, Col, Card, CardBlock, CardFooter, Button, Input, InputGroup, InputGroupAddon} from "reactstrap";
import {connect} from 'react-redux';
import { userSignupRequest } from '../../../actions/signupActions';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
                  firstname:'',
                  lastname:'',
                  username:'',
                  email:'',
                  password:'',
                  rpassword:'',
                  errors:{},
                  isLoading:false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({
      [e.target.name]:e.target.value
    });
  }

  onSubmit(e){
    e.preventDefault();
    this.setState({errors:{}, isLoading:true});
    this.props.userSignupRequest(this.state).then(
      () => {
        browserHistory.push('/login');
      },
      ({data}) => this.setState({ errors: data, isLoading:false})
    );
  }
  render() {
    const { errors } = this.state;
    const { userSignupRequest } = this.props
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBlock className="card-body p-4">
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <InputGroup className="mb-3" >
                    <InputGroupAddon><i className="icon-user"></i></InputGroupAddon>
                    <Input type="text"
                           placeholder="First name"
                           name="firstname"
                           value={this.state.firstname}
                           onChange={this.onChange}/>
                  </InputGroup>


                  <InputGroup className="mb-3">
                    <InputGroupAddon><i className="icon-user"></i></InputGroupAddon>
                    <Input type="text"
                           placeholder="Last name"
                           name="lastname"
                           value={this.state.lastname}
                           onChange={this.onChange}/>
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon><i className="icon-user"></i></InputGroupAddon>
                    <Input type="text"
                           placeholder="User name"
                           name="username"
                           value={this.state.username}
                           onChange={this.onChange}/>
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon>@</InputGroupAddon>
                    <Input type="text"
                           placeholder="Email address"
                           name="email"
                           value={this.state.email}
                           onChange={this.onChange}/>
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
                    <Input type="text"
                           placeholder="Password"
                           name="password"
                           value={this.state.password}
                           onChange={this.onChange}/>
                  </InputGroup>

                  <InputGroup className="mb-4">
                    <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
                    <Input type="text"
                           placeholder="Repeat password"
                           name="rpassword"
                           value={this.state.rpassword}
                           onChange={this.onChange}/>
                  </InputGroup>

                  <Button color="success" disabled={this.state.isLoading} onClick={this.onSubmit} block>Create Account</Button>
                </CardBlock>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

// Register.propTypes = {
//   userSignupRequest: React.PropTypes.func.isRequired
// }
export default connect((state) => {return {} }, {userSignupRequest}) (Register);
