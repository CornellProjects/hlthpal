
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Container, Header, Title, Content, Text, Button, Icon, Left, Body, Right,Input,InputGroup,Item,Col,Radio } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';
import { createRecord, textChanged, updateAnswer, setQuestion } from '../../actions/user';
import { setIndex } from '../../actions/list';
import { openDrawer } from '../../actions/drawer';
import TextField from '../TextField'
import styles from './styles';


class Qone extends Component {

  onTextInputChange(text) {
    this.props.textChanged(text);
  }

  static propTypes = {
    name: React.PropTypes.string,
    setIndex: React.PropTypes.func,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
    textChanged: React.PropTypes.func,
    createRecord: React.PropTypes.func,
    updateAnswer: React.PropTypes.func,
    setQuestion: React.PropTypes.func,
  }

  componentWillMount() {
    this.props.setQuestion(0);
  }

  newPage(index) {
    this.props.setIndex(index);
    Actions.blankPage();
  }

  onButtonPress() {
    const { rating, token, question, record, text_input } = this.props;
    this.props.createRecord({ token, text_input });
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
            <Title>{(this.props.name) ? this.props.name : 'Question 1'}</Title>
          </Body>
          <Right>
             <Button transparent onPress={() => Actions.login({ type: ActionConst.RESET })}>
              <Icon active name="power" />
            </Button>
          </Right>
          
        </Header>

        <Content>
          
          <Text style={styles.text}>
            What have been your main problems and concerns over the past week? (optional)
          </Text>
          <Item underline style={styles.input}>
              <TextField placeholder="Enter Text Here..."
                  value={this.props.text_input}
                  onChangeText={this.onTextInputChange.bind(this)} />
          </Item>

          <Grid style={styles.buttons}>
            <Col>
              <Button bordered rounded style={styles.center} onPress={() => Actions.home()}>
                  <Text>Cancel</Text>
              </Button>
            </Col>
            <Col>
              <Button rounded style={styles.center} onPress={() => this.onButtonPress()}>
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
    createRecord: token => dispatch(createRecord(token)),
    deleteRecord: token => dispatch(deleteRecord(token)),
    textChanged: text => dispatch(textChanged(text)),
    updateAnswer: token => dispatch(updateAnswer(token)),
    setQuestion: question => dispatch(setQuestion(question)),
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list,
  token: state.user.token,
  record: state.user.record,
  question: state.user.question,
  text_input: state.user.text_input,
});

export default connect(mapStateToProps, bindAction)(Qone);
