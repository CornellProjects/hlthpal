
import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Item, Button, Icon, View, Text, Radio, InputGroup} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Grid, Row,Col } from 'react-native-easy-grid';

import { setUser } from '../../actions/user';
import styles from './styles';
import TextField from '../TextField'
import { SegmentedControls } from 'react-native-radio-buttons'


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
      diagnosis: '',
      doctor: '',
      mobile: '',
      patientID: '',
      status: '',
      error: '',
      selectedOption: '',
    };
  }

  setUser(name) {
    this.props.setUser(name);
  }

  onButtonPress() {
      const {
        email,
        password,
        first_name,
        last_name,
        username,
        diagnosis,
        doctor,
        mobile,
        patientID,
        selectedOption } = this.state;

      // Change IP address according to yours
      // Make sure to include your IP address in Django settings.py ALLOWED_HOSTS
      fetch('http://0.0.0.0:8000/api/patient/post', {
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
             diagnosis: diagnosis,
             doctor: doctor,
             mobile: mobile,
             patientID: patientID,
             gender: selectedOption,
             })
             })
             .then((response) => {
                  this.setState({status: response.status})
                  if (this.state.status === 200) {
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
      diagnosis: '',
      doctor: '',
      mobile: '',
      patientID: '',
      selectedOption: '',
    });
  }

  render() {
    console.log(this.state);
    const options = [
        'Male',
        'Female'
    ];

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

                <Item regular style={styles.list}>
                    <SegmentedControls
                        tint={'#F16C00'}
                        options={options}
                        onSelection={selectedOption => this.setState({ selectedOption })}
                        selectedOption={ this.state.selectedOption }
                    />
                </Item>

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
                    <TextField
                        style={styles.input}
                        placeholder='Patient ID'
                        value={this.state.patientID}
                        onChangeText={patientID => this.setState({ patientID })}
                    />
                  </Item>

                  <Item regular style={styles.list}>
                    <TextField
                        style={styles.input}
                        placeholder='Mobile'
                        value={this.state.mobile}
                        onChangeText={mobile => this.setState({ mobile })}
                    />
                  </Item>
                
                 <Item regular style={styles.list}>
                    <TextField
                        style={styles.input}
                        placeholder='My diagnosis'
                        value={this.state.diagnosis}
                        onChangeText={diagnosis => this.setState({ diagnosis })}
                    />
                  </Item>
                 
                  <Item regular style={styles.list}>
                    <TextField
                        style={styles.input}
                        placeholder='My doctor name'
                        value={this.state.doctor}
                        onChangeText={doctor => this.setState({ doctor })}
                    />
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
