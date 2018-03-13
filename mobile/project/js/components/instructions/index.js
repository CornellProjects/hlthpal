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
    return (
      <Container style={styles.container}>
        <Header style={{backgroundColor:'#F16C00'}}>
          <Left>
            <Button transparent onPress={this.props.openDrawer}>
              <Icon active name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>{(this.props.name) ? this.props.name : 'Instructions'}</Title>
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
                    <Button rounded bordered onPress={() => Actions.home()} style={styles.center}>
                    <Text>Cancel</Text>
                    </Button>
                </Col>
                <Col>
                    <Button rounded onPress={() => Actions.qtwoOne()} style={styles.center}>
                    <Text>Next</Text>
                    </Button>
                </Col>
            </Grid>
           <Text style={styles.text}>
            Below is a list of symptoms, which you may or may not have experienced. For
            each symptom, please tick one box that best describe how it affected you
            over the past 3 days.
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