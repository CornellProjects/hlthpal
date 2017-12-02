import React, {Component} from "react";
import {Container, Row, Col, CardGroup, Card, CardBlock, Button, Input, InputGroup, InputGroupAddon} from "reactstrap";
import {connect} from 'react-redux';
import {login} from '../../../actions/authActions';
import {browserHistory} from 'react-router';
import PropTypes from 'prop-types';

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      isLoading: false,
      errors: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e){
    this.setState({
      [e.target.name]:e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    this.setState({isLoading:true});
    this.props.login(this.state).then(
      (res) => this.context.router.history.push('/'),
      (err) => this.setState({isLoading:false})
    );
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
                  <CardBlock className="card-body">
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon><i className="icon-user"></i></InputGroupAddon>
                      <Input type="text"
                             placeholder="Username"
                             name="username"
                             value={username}
                             errors={errors.username}
                             onChange={this.onChange}/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
                      <Input type="password"
                             placeholder="Password"
                             name="password"
                             value={password}
                             errors={errors.password}
                             onChange={this.onChange}/>
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4" onClick={this.onSubmit} disabled={isLoading}>Login</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">Forgot password?</Button>
                      </Col>
                    </Row>
                  </CardBlock>
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
