
import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Item, Button, Icon, View, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Grid, Row,Col } from 'react-native-easy-grid';

import { emailChanged, passwordChanged, loginUser } from '../../actions/user';
import styles from './styles';
import TextField from '../TextField'


const background = require('../../../images/sun_logo.png');

class Login extends Component {

  onEmailChange(text) {
      this.props.emailChanged(text);
  }

  onPasswordChange(text) {
      this.props.passwordChanged(text);
  }

  onButtonPress() {
      const { email, password, loading } = this.props;

      this.props.loginUser({ email, password });
  }

  renderButtons() {
    return;
  }

  renderErrorMessage() {
    const { error } = this.props;
    if (error != '') {
        return <Text> { error } </Text>
    }
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
                    value={this.props.email}
                    onChangeText={this.onEmailChange.bind(this)} />
                </Item>
                <Item style={styles.input}>
                  <TextField
                    placeholder="password"
                    value={this.props.password}
                    onChangeText={this.onPasswordChange.bind(this)}
                    secureTextEntry
                  />
                </Item>

                {this.renderErrorMessage()}

                <Grid>
                    <Col>
                        <Button rounded style={styles.center} onPress={this.onButtonPress.bind(this)}>
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

const mapStateToProps = ({ user }) => {
    const { email, password, error, loading } = user;

    return { email, password, error, loading };
};

export default connect(mapStateToProps, {
    emailChanged,
    passwordChanged,
    loginUser
})(Login);
