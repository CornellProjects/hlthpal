
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Container, Header, Title, Content, Text, Button, Icon, Left, Body,Thumbnail,Right,View} from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';

import { setIndex } from '../../actions/list';
import { openDrawer } from '../../actions/drawer';
import styles from './styles';

//import axios from 'axios';


class Home extends Component {

  constructor(props) {
      super(props);
      this.state = {
        data: [],
        status: [],
      };
  }

  static propTypes = {
    name: React.PropTypes.string,
    setIndex: React.PropTypes.func,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
  }

  newPage(index) {
    this.props.setIndex(index);
    Actions.blankPage();
  }

  componentWillMount() {
  // trying to connect through axios
//    axios.get("http://128.84.125.93:8000/home")
//    .then(response => {
//        this.setState({status:response.status})
//        this.setState({data: response.data})
//    });
  // trying to connect through standard Fetch API
//      fetch('http://128.84.125.93:8000/api/login', {
//           method: 'POST',
//           headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//           },
//
//           body: JSON.stringify({
//           username: 'testuser',
//           password: 'k234',
//           })
//        })
//           .then((response) => {
//                   this.setState({response: response.status});
//                   return response.json() })
//           .then((responseJson) => {
//                   this.setState({token: responseJson.token});
//            })
//           .catch((error) => { console.error(error); });

    }

  render() {
    console.log(this.state)
     return (
      <Container style={styles.container}>
        <Header style={{backgroundColor:'#F16C00'}}>
          <Left>
            <Button transparent onPress={this.props.openDrawer}>
              <Icon active name="menu" />
            </Button>
           
          </Left>

          <Body>
            <Title>{(this.props.name) ? this.props.name : 'Home'}</Title>
          </Body>
          <Right>
             <Button transparent onPress={() => Actions.login({ type: ActionConst.RESET })}>
              <Icon active name="power" />
            </Button>
          </Right>
          
        </Header>

        <Content>
          <View style={styles.mt}>
          <Thumbnail size={80} style={styles.center} source={require('../../../images/avatar.png')} />
            <Text style={styles.text}>
              Hi Joyce, how are you today?
            </Text>

            <View style={styles.buttons}>
                <Button rounded bordered style={styles.center} onPress={() => Actions.qone()}>
                    <Text style={styles.btn}>Take record</Text>
                </Button>
            </View>
         </View>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list,
});

export default connect(mapStateToProps, bindAction)(Home);
