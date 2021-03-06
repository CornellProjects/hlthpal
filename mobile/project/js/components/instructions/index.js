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

const instructionLang = require('./instructions.json');

class Instructions extends Component {

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
    let instructions = instructionLang[this.props.lang];
    return (
      <Container style={styles.container}>
        <Header style={{backgroundColor:'#F16C00'}}>
          <Left>
            <Button transparent onPress={this.props.openDrawer}>
              <Icon active name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>{instructions['page-title']}</Title>
          </Body>
          <Right>
             <Button transparent onPress={() => Actions.login({ type: ActionConst.RESET })}>
              <Icon active name="power" />
            </Button>
          </Right>
        </Header>
        <Content>
            <Grid style={styles.buttons}>
                <Col>
                    <Button rounded bordered onPress={() => Actions.home({lang: this.props.lang})} style={styles.center}>
                    <Text>{instructions["cancel"]}</Text>
                    </Button>
                </Col>
                <Col>
                    <Button rounded onPress={() => Actions.questions({questionName: "1", lang: this.props.lang})} style={styles.center}>
                    <Text>{instructions["next"]}</Text>
                    </Button>
                </Col>
            </Grid>
           <Text style={styles.text}>
            {instructions["instruction"]}
          </Text>
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

export default connect(mapStateToProps, bindAction)(Instructions);