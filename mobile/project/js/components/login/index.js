
import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Item, Button, Icon, View, Text, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Grid, Row,Col } from 'react-native-easy-grid';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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
      const { loading } = this.props;

      if (loading) {
          return <Spinner color='orange'/>;
      }
      else {
          return <Grid>
             <Col>
                 <Button rounded style={styles.center} onPress={this.onButtonPress.bind(this)} active={!this.props.loading}>
                   <Text>Login</Text>
                 </Button>
             </Col>
             <Col>
                 <Button rounded bordered style={styles.center} onPress={() => Actions.fillInfo()}>
                   <Text>Sign up</Text>
                 </Button>
             </Col>
          </Grid>;
      }
  }

  renderErrorMessage() {
    const { error } = this.props;
    if (error != '') {
        return <Text style={styles.text}> { error } </Text>
    }
  }

  render() {
    return (
      <Container>
        <KeyboardAwareScrollView style={styles.container}>
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
                {this.renderButtons()}

              </View>
            </Image>
          </Content>
        </KeyboardAwareScrollView>
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
