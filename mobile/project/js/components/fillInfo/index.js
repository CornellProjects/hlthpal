
import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Item, Button, Icon, View, Text, Radio, InputGroup} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Grid, Row,Col } from 'react-native-easy-grid';

import { setUser } from '../../actions/user';
import styles from './styles';
import TextField from '../TextField'


const background = require('../../../images/login_background.png');

class FillInfo extends Component {

  static propTypes = {
    setUser: React.PropTypes.func,
    registUser: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: '',
      status: '',
      error: '',
    };
  }

  setUser(name) {
    this.props.setUser(name);
  }

  onButtonPress() {
      const { email, password, first_name, last_name, username } = this.state;

      // Change IP address according to yours
      // Make sure to include your IP address in Django settings.py ALLOWED_HOSTS
      fetch('http://0.0.0.0:8000/api/register', {
             method: 'POST',
             headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             },

             body: JSON.stringify({
             first_name: first_name,
             last_name: last_name,
             username: last_name,
             email: email,
             password: password,
             })
             })
             .then((response) => {
                  this.setState({status: response.status})
                  if (this.state.status === 201) {
                     // Status 201 = User Created
                     // User is logged in and goes to login page
                     this.onRegistration();
                     Actions.login();
                  }
                  else {
                     // throws an error
                     this.setState({error: 'Authentication Failed'})
                  }
                  return response.json()
             });
  }

  onRegistration() {
    // clear fields after user is registered
    this.setState({
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: '',
    });
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Content>
            <Text style={styles.title}>
              Account Information
            </Text>
              
                <Item regular style={styles.list}>
                    <TextField
                        style={styles.input}
                        placeholder='First Name'
                        value={this.state.first_name}
                        onChangeText={first_name => this.setState({ first_name })}
                    />
                </Item>

                <Item regular style={styles.list}>
                    <TextField
                        style={styles.input}
                        placeholder='Last Name'
                        value={this.state.last_name}
                        onChangeText={last_name => this.setState({ last_name })}
                    />
                </Item>

              <Grid style = {styles.radios}>
                 <Col style={styles.center}>

                    <Radio selected={true} />
                    <Text style={styles.radioText}>Male</Text>
                    
                  </Col>

                  <Col style={styles.center}>
                    <Radio selected={false} />
                    <Text style={styles.radioText}>Female</Text>
                  </Col>
              </Grid>

             
                  <Item regular style={styles.list}>
                    <TextField
                        style={styles.input}
                        placeholder='Username'
                        value={this.state.username}
                        onChangeText={username => this.setState({ username })}
                    />
                  </Item>

                  <Item regular style={styles.list}>
                    <TextField
                        style={styles.input}
                        placeholder='Email'
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    />
                  </Item>

                  <Item regular style={styles.list}>
                    <TextField
                        secureTextEntry
                        style={styles.input}
                        placeholder='Password'
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />
                  </Item>

                  <Item regular style={styles.list}>
                    <TextField style={styles.input} placeholder='Patient ID'/>
                  </Item>

                  <Item regular style={styles.list}>
                    <TextField style={styles.input} placeholder='Mobile'/>
                  </Item>
                
                 <Item regular style={styles.list}>
                    <TextField style={styles.input} placeholder='My diagnosis'/>
                  </Item>
                 
                  <Item regular style={styles.list}>
                    <TextField style={styles.input} placeholder='My doctor name'/>
                  </Item>
                
             

                <Grid>
                    <Col>
                        <Button rounded bordered style={styles.bottom} onPress={() => Actions.login()}>
                          <Text>Cancel</Text>
                        </Button>
                    </Col>
                    <Col>
                        <Button rounded style={styles.bottom} onPress={() => this.onButtonPress()}>
                          <Text>Submit</Text>
                        </Button>
                    </Col>
                </Grid>
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


export default connect(null, bindActions)(FillInfo);
