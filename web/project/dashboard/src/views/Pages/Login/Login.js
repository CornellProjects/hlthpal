import React, {Component} from "react";
import {Container,
        Row,
        Col,
        CardGroup,
        Card,
        CardBlock,
        CardBody,
        Button,
        Input,
        InputGroup,
        InputGroupAddon,
        Modal,
        ModalHeader,
        ModalBody, FormFeedback,
        ModalFooter} from "reactstrap";
import {connect} from 'react-redux';
import {login} from '../../../actions/authActions';
import {browserHistory} from 'react-router';
import PropTypes from 'prop-types';
import axios from 'axios';


class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      isLoading: false,
      errors: {'username': false, 'password': false},
      modal: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.reset = this.reset.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  componentWillMount(){
    localStorage.clear();
  }
  onChange(e){
    this.setState({
      [e.target.name]:e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    this.setState({
        // isLoading:true,
        errors: {'username': false, 'password': false},
    });
    let data = {
        username:this.state.username,
        password:this.state.password
      };
    this.props.login(data).then(
      (res) => {
        const is_staff = localStorage.getItem('is_staff');
        if (is_staff){
          this.context.router.history.push('/');
        }
        else{
          this.setState({
            modal:true,
            // isLoading:false
          })
        }
        },
      (err) => {
          let errors = this.state.errors;
          if (err.response.data.password || err.response.data.non_field_errors[0] === "Incorrect credentials!") {
              errors['password'] = true;
              this.setState({
                  errors: errors
              })
          }
          if (err.response.data.non_field_errors[0] === "The username or email is not valid." ||
              err.response.data.non_field_errors[0] === "A username or email address is required.") {
              errors['username'] = true;
              this.setState({
                  errors: errors
              })
          }
          // this.setState(
          //     {isLoading: false})
      }
    );
  }
  toggle(){
    this.setState({
      modal: !this.state.modal
    });
  }
  reset(e){
    e.preventDefault();
    this.context.router.history.push('/password-reset');
  }
  render() {
    const { errors, username, password, isLoading } = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup className="mb-0">
                <Card className="p-4">
                  <CardBody className="card-body">
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      {/*<InputGroupAddon><i className="icon-user"></i></InputGroupAddon>*/}
                      <Input type="text" invalid={this.state.errors.username}
                             placeholder="Enter your username here"
                             name="username"
                             value={username}
                             onChange={this.onChange}/>
                      {(this.state.errors.username === true) &&
                      <FormFeedback>
                        Your username is not valid!
                      </FormFeedback>}
                    </InputGroup>
                    <InputGroup className="mb-3">
                      {/*<InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>*/}
                      <Input type="password" invalid={this.state.errors.password}
                             placeholder="Please enter your password"
                             name="password"
                             value={password}
                             onChange={this.onChange}/>
                      {(this.state.errors.password === true) &&
                      <FormFeedback>
                        Your password is not valid!
                      </FormFeedback>}
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" style={{borderRadius:"15px", marginLeft:"20px"}} className="px-4" onClick={this.onSubmit} >Login</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <a href="../password-reset/"><Button color="link" className="px-0">Forgot password?</Button></a>
                      </Col>
                    </Row>
                  </CardBody>
                  <Modal isOpen={this.state.modal}>
                    <ModalHeader toggle={this.toggle}>Sorry</ModalHeader>
                    <ModalBody>
                      Only staff can login!
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={this.toggle}>Go back</Button>{' '}
                    </ModalFooter>
                  </Modal>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
Login.contextTypes = {
    router: PropTypes.object.isRequired
}

export default connect(null, {login})(Login);
