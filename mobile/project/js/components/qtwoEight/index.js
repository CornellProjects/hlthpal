
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Container, Header, Title, Content, Text, Button, Icon, Left, Body, Right,Input,InputGroup,Item,Col,Radio,List,ListItem } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';

import { setIndex } from '../../actions/list';
import { openDrawer } from '../../actions/drawer';
import styles from './styles';


class QtwoEight extends Component {

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
            <Title>{(this.props.name) ? this.props.name : 'Question 2 - 8'}</Title>
          </Body>
          <Right>
             <Button transparent onPress={() => Actions.login({ type: ActionConst.RESET })}>
              <Icon active name="power" />
            </Button>
          </Right>

        </Header>

        <Content>
           <Text style={styles.text}>
            Sore or Dry Mouth
          </Text>

           <Grid style={styles.options}>
              <Row><Text style={styles.optionText}>0 (Not at all)</Text></Row>
              <Row><Text style={styles.optionText}>1 (Slightly)</Text></Row>
              <Row><Text style={styles.optionText}>2 (Moderately)</Text></Row>
              <Row><Text style={styles.optionText}>3 (Severely)</Text></Row>
              <Row><Text style={styles.optionText}>4 (Overwhelmingly)</Text></Row>
           </Grid>

          <Grid>
          <Row style={styles.radios}>
            <Col><Radio selected={false} /><Text style={styles.radioText}>0</Text></Col>
            <Col><Radio selected={false} /><Text style={styles.radioText}>1</Text></Col>
            <Col><Radio selected={true} /><Text style={styles.radioText}>2</Text></Col>
            <Col><Radio selected={false} /><Text style={styles.radioText}>3</Text></Col>
            <Col><Radio selected={false} /><Text style={styles.radioText}>4</Text></Col>
          </Row>
          </Grid>

          <Grid style={styles.buttons}>
            <Col>
              <Button light rounded onPress={() => Actions.qtwoSeven()} style={styles.center}>
                  <Text>Back</Text>
              </Button>
            </Col>
            <Col>
              <Button rounded onPress={() => Actions.qtwoNine()} style={styles.center}>
                  <Text>Next</Text>
              </Button>
            </Col>
          </Grid>

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

export default connect(mapStateToProps, bindAction)(QtwoEight);
