
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Container, Header, Title, Content, Text, Button, Icon, Left, Body,Thumbnail,Right,View} from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';
import { setIndex } from '../../actions/list';
import { openDrawer } from '../../actions/drawer';
import styles from './styles';

class Home extends Component {

  static propTypes = {
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

  onButtonPress() {
    const { token } = this.props;
    Actions.qone();
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
              Hi {this.props.userName}, how are you today?
            </Text>

            <View style={styles.buttons}>
                <Button rounded bordered style={styles.center} onPress={() => this.onButtonPress()}>
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
  list: state.list.list,
  token: state.user.token,
  userName: state.user.userName,
});

export default connect(mapStateToProps, bindAction)(Home);
