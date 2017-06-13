
import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Item, Input, Button, Icon, View, Text, Radio, InputGroup} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Grid, Row,Col } from 'react-native-easy-grid';

import { setUser } from '../../actions/user';
import styles from './styles';


const background = require('../../../images/login_background.png');

class FillInfo extends Component {

  static propTypes = {
    setUser: React.PropTypes.func,
    registUser: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  setUser(name) {
    this.props.setUser(name);
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
                    <Input style={styles.input} placeholder='Your Name'/>
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
                    <Input style={styles.input} placeholder='Patient ID'/>
                  </Item>
                
                  <Item regular style={styles.list}>
                    <Input style={styles.input} placeholder='Mobile'/>
                  </Item>
                
                 <Item regular style={styles.list}>
                    <Input style={styles.input} placeholder='My diagnosis'/>
                  </Item>
                 
                  <Item regular style={styles.list}>
                    <Input style={styles.input} placeholder='My doctor name'/>
                  </Item>
                
             

                <Grid>
                    <Col>
                        <Button rounded bordered style={styles.center} onPress={() => Actions.login()}>
                          <Text>Cancel</Text>
                        </Button>
                    </Col>
                    <Col>
                        <Button rounded style={styles.center} onPress={() => Actions.home()}>
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
