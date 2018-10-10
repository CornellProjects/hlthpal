import React, { Component } from 'react';
import { TouchableOpacity, NetInfo } from 'react-native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Container,
         Header,
         Title,
         Content,
         Text,
         Button,
         Icon,
         Left,
         Body,
         Thumbnail,
         Right,
         View} from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';
import { setIndex } from '../../actions/list';
import { directoryExists } from '../../handlers/fileHandler';
import { submitOfflineRecords } from '../../actions/records';
import { openDrawer } from '../../actions/drawer';

import styles from './styles';

class Home extends Component {

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
    const { token } = this.props;
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('change', this.handleConnectionChange);
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('change', this.handleConnectionChange);
    const token = this.props.token;
    const username = this.props.username;
    const password = this.props.password;
    submitOfflineRecords(token, username, password);
  }

  handleConnectionChange = (isConnected) => {
    console.log('Connectivity changed. Has network connectivity: ' + isConnected);
    if (isConnected) {
        const token = this.props.token;
        const username = this.props.username;
        const password = this.props.password;
        submitOfflineRecords(token, username, password);
    }
  }

  onButtonPress() {
    const { token } = this.props;
    Actions.Instructions_K();
  }

  render() {
     return (
      <Container style={styles.container}>
        <Header style={{backgroundColor:'#F16C00'}}>
          <Left>
            <Button transparent onPress={this.props.openDrawer}>
              <Icon active name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>{(this.props.name) ? 'Intaho' : 'Intaho'}</Title>
          </Body>
          <Right>
             <Button transparent onPress={() => Actions.login({ type: ActionConst.RESET })}>
              <Icon active name="power" />
            </Button>
          </Right>
        </Header>
        <Content>
          <View style={styles.mt}>
            <Text style={styles.text}>
              Muraho {this.props.first_name}, amakuru yawe uyumunsi?
            </Text>
            <View style={styles.buttons}>
                <Button rounded style={styles.round} onPress={() => this.onButtonPress()}>
                    <Text style={styles.btn}>Fata amajwi</Text>
                </Button>
                {/*<Button light rounded style={styles.light} onPress={() => this.onButtonPress()}>
                    <Text style={styles.btn}>View Past Data</Text>
                </Button>*/}
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
  list: state.list.list,
  token: state.user.token,
  first_name: state.user.first_name,
  username: state.user.username,
  password: state.user.password
});

export default connect(mapStateToProps, bindAction)(Home);
