
import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Item, Button, Icon, View, Text, Radio, InputGroup} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Grid, Row,Col } from 'react-native-easy-grid';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { setUser, registerUser } from '../../actions/RegisterUser';
import styles from './styles';
import TextField from '../TextField'
import { SegmentedControls } from 'react-native-radio-buttons'


const background = require('../../../images/login_background.png');

class FillInfo extends Component {

  static propTypes = {
    setUser: React.PropTypes.func,
    registerUser: React.PropTypes.func,
  }

  onButtonPress() {
      const {
        email,
        password,
        firstName,
        lastName,
        mobile,
        diagnosis,
        doctor,
        selectedOption,
        caregiver,
        street,
        city,
        myState,
        country
      } = this.props;

      this.props.registerUser({
          email,
          password,
          firstName,
          lastName,
          mobile,
          diagnosis,
          doctor,
          caregiver,
          street,
          city,
          myState,
          country,
          selectedOption: selectedOption || 'Male'
      });
  }

  render() {
    const options = [
        'Male',
        'Female'
    ];

    return (
      <Container>
        <KeyboardAwareScrollView style={styles.container}>
          <Content>
            <Text style={styles.title}>
              Account Information
            </Text>
              
                <Item regular style={styles.list}>
                    <TextField
                        style={styles.input}
                        placeholder='First Name *'
                        value={this.props.firstName}
                        onChangeText={value => this.props.setUser({
                            prop: 'firstName', value
                        })}
                    />
                </Item>

                <Item regular style={styles.list}>
                    <TextField
                        style={styles.input}
                        placeholder='Last Name *'
                        value={this.props.lastName}
                        onChangeText={value => this.props.setUser({
                            prop: 'lastName', value
                        })}
                    />
                </Item>

                <Item regular style={styles.list}>
                    <TextField
                        style={styles.input}
                        placeholder='Street *'
                        value={this.props.street}
                        onChangeText={value => this.props.setUser({
                            prop: 'street', value
                        })}
                    />
                </Item>

                <Item regular style={styles.list}>
                    <TextField
                        style={styles.input}
                        placeholder='City *'
                        value={this.props.city}
                        onChangeText={value => this.props.setUser({
                            prop: 'city', value
                        })}
                    />
                </Item>

                <Item regular style={styles.list}>
                    <TextField
                        style={styles.input}
                        placeholder='State *'
                        value={this.props.myState}
                        onChangeText={value => this.props.setUser({
                            prop: 'myState', value
                        })}
                    />
                </Item>

                <Item regular style={styles.list}>
                    <TextField
                        style={styles.input}
                        placeholder='Country *'
                        value={this.props.country}
                        onChangeText={value => this.props.setUser({
                            prop: 'country', value
                        })}
                    />
                </Item>

                <Item regular style={styles.list}>
                    <SegmentedControls
                        tint={'#F16C00'}
                        options={options}
                        onSelection={value => this.props.setUser({
                            prop: 'selectedOption', value
                        })}
                        selectedOption={ this.props.selectedOption }
                    />
                </Item>

                  <Item regular style={styles.list}>
                    <TextField
                        style={styles.input}
                        placeholder='Email *'
                        value={this.props.email}
                        onChangeText={value => this.props.setUser({
                            prop: 'email', value
                        })}
                    />
                  </Item>

                  <Item regular style={styles.list}>
                    <TextField
                        secureTextEntry
                        style={styles.input}
                        placeholder='Password *'
                        value={this.props.password}
                        onChangeText={value => this.props.setUser({
                            prop: 'password', value
                        })}
                    />
                  </Item>

                  <Item regular style={styles.list}>
                    <TextField
                        style={styles.input}
                        placeholder='Mobile *'
                        value={this.props.mobile}
                        onChangeText={value => this.props.setUser({
                            prop: 'mobile', value
                        })}
                    />
                  </Item>
                
                 <Item regular style={styles.list}>
                    <TextField
                        style={styles.input}
                        placeholder='My diagnosis *'
                        value={this.props.diagnosis}
                        onChangeText={value => this.props.setUser({
                            prop: 'diagnosis', value
                        })}
                    />
                  </Item>

                 <Item regular style={styles.list}>
                    <TextField
                        style={styles.input}
                        placeholder='My Care Giver *'
                        value={this.props.caregiver}
                        onChangeText={value => this.props.setUser({
                            prop: 'caregiver', value
                        })}
                    />
                  </Item>
                 
                  <Item regular style={styles.list}>
                    <TextField
                        style={styles.input}
                        placeholder='My doctor name *'
                        value={this.props.doctor}
                        onChangeText={value => this.props.setUser({
                            prop: 'doctor', value
                        })}
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
        </KeyboardAwareScrollView>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
    const {
        email,
        password,
        firstName,
        lastName,
        mobile,
        diagnosis,
        doctor,
        selectedOption,
        caregiver,
        street,
        city,
        myState,
        country
    } = state.registerUser;

    return {
        email,
        password,
        firstName,
        lastName,
        mobile,
        diagnosis,
        doctor,
        selectedOption,
        caregiver,
        street,
        city,
        myState,
        country
    };
};

export default connect(mapStateToProps, { setUser, registerUser })(FillInfo);
