import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import {
    Container,
    Header,
    Title,
    Content,
    Text,
    Button,
    Icon,
    Left,
    Body,
    Right,
    Input,
    InputGroup,
    Item,
    Col } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';
import { setIndex } from '../../actions/list';
import { openDrawer } from '../../actions/drawer';
import styles from './styles';

const finalLang = require('./final.json');

class finalScreen extends Component {

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

  render() {
      let final = finalLang[this.props.lang];
      return (
        <Container style={styles.container}>
          <Header style={{backgroundColor:'#F16C00'}}>
            <Left>
              <Button transparent onPress={this.props.openDrawer}>
                <Icon active name="menu" />
              </Button>
            </Left>
            <Body>
              <Title>{final['page-title']}</Title>
            </Body>
            <Right>
               <Button transparent onPress={() => Actions.login({ type: ActionConst.RESET })}>
                <Icon active name="power" />
              </Button>
            </Right>
          </Header>
          <Content>
            <Text style={styles.text}>
              {final['summary']}{"\n\n"}
              {final['remarks']}
            </Text>
            <Grid style={styles.buttons}>
                <Col>
                    <Button rounded bordered onPress={() => Actions.home({lang: this.props.lang})} style={styles.center}>
                    <Text>{final["home"]}</Text>
                    </Button>
                </Col>
            </Grid>
          </Content>
        </Container>
      );
    }

//  render() {
//    return (
//      <Container style={styles.container}>
//        <Header style={{backgroundColor:'#F16C00'}}>
//          <Left>
//            <Button transparent onPress={this.props.openDrawer}>
//              <Icon active name="menu" />
//            </Button>
//          </Left>
//          <Body>
//            <Title>{(this.props.name) ? this.props.name : 'Summary'}</Title>
//          </Body>
//          <Right>
//             <Button transparent onPress={() => Actions.login({ type: ActionConst.RESET })}>
//              <Icon active name="power" />
//            </Button>
//          </Right>
//        </Header>
//        <Content>
//          <Text style={styles.text}>
//            Thank you for letting us know how you are doing today. We look forward to your next update.{"\n\n"}
//            Please click below to go back to the home screen.
//          </Text>
//          <Grid style={styles.buttons}>
//              <Col>
//                  <Button rounded bordered onPress={() => Actions.home()} style={styles.center}>
//                  <Text>Home</Text>
//                  </Button>
//              </Col>
//          </Grid>
//        </Content>
//      </Container>
//    );
//  }
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

export default connect(mapStateToProps, bindAction)(finalScreen);