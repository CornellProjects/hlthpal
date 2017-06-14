
import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Item, Button, Icon, View, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Grid, Row,Col } from 'react-native-easy-grid';

import { setUser } from '../../actions/user';
import styles from './styles';
import TextField from '../TextField'


const background = require('../../../images/login_background.png');

class Login extends Component {

  static propTypes = {
    setUser: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      token: '',
      error: '',
      status: '',
    };
  }

  setUser(name) {
    this.props.setUser(email);
  }

  onButtonPress() {
    // Take the values within the state variables: email and password to send a login
    // request to Django REST Api
    const { email, password } = this.state;

    this.setState({error: ''});

    // Change IP address according to yours
    // Make sure to include your IP address in Django settings.py ALLOWED_HOSTS
    fetch('http://0.0.0.0:8000/api/login', {
           method: 'POST',
           headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           },

           body: JSON.stringify({
           email: email,
           password: password,
           })
           })
           .then((response) => {
                this.setState({status: response.status})
                if (this.state.status === 200) {
                   // Status 200 = OK
                   // User is logged in and goes to homepage
                   this.onLoginSuccess();
                   Actions.home();
                }
                else {
                   // throws an error
                   this.setState({error: 'Authentication Failed'})
                }
                return response.json()
                })
           .then((responseJson) => {
                this.setState({token: responseJson.token});
            });
  }

  onLoginSuccess() {
    // clear fields upon logged in
    this.setState({
        email: '',
        password: '',
    });
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Content>
            <Image source={background} style={styles.shadow}>
              <View style={styles.bg}>
                <Item style={styles.input}>
                  <TextField placeholder="email"
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })} />
                </Item>
                <Item style={styles.input}>
                  <TextField
                    placeholder="password"
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    secureTextEntry
                  />
                </Item>
                <Grid>
                    <Col>
                        <Button rounded style={styles.center} onPress={() => this.onButtonPress()}>
                          <Text>Login</Text>
                        </Button>
                    </Col>
                    <Col>
                        <Button rounded bordered style={styles.center} onPress={() => Actions.fillInfo()}>
                          <Text>Sign up</Text>
                        </Button>
                    </Col>
                </Grid>
              </View>
            </Image>
          </Content>
        </View>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    setUser: name => dispatch(setUser(name)),
  };
}


export default connect(null, bindActions)(Login);
