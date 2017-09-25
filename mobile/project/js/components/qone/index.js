
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Container, Header, Title, Content, Text, Button, Icon, Left, Body, Right,Input,InputGroup,Item,Col,Radio } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';
import { textChanged, setQuestion, setAnswer, createAnswerObject } from '../../actions/answers';
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
    setQuestion: React.PropTypes.func,
    createAnswerObject: React.PropTypes.func,
  }

  componentWillMount() {
    this.props.setQuestion(1);
  }

  componentDidMount() {
    const { question, record, answersArray } = this.props;
  }

  onBackPress() {
    const { answersArray } = this.props;

    if (answersArray.length != 0) {
        answersArray.pop();
    }

    Actions.home();
  }

  onButtonPress() {
    const { question, token, record, textInput, answersArray } = this.props;

    let zero = 0;

    answersArray.push(this.props.setAnswer({ record, question, textInput, zero }).payload);

    Actions.qtwo();
  }

  newPage(index) {
    this.props.setIndex(index);
    Actions.blankPage();
  }

  render() {
    console.log(this.props.answersArray);
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
                  value={this.props.textInput}
                  onChangeText={this.onTextInputChange.bind(this)} />
          </Item>

          <Grid style={styles.buttons}>
            <Col>
              <Button bordered rounded style={styles.center} onPress={() => this.onBackPress()}>
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
    textChanged: text => dispatch(textChanged(text)),
    setQuestion: question => dispatch(setQuestion(question)),
    setAnswer: (record, question, textInput, rating) => dispatch(createAnswerObject(record, question, textInput, rating)),
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
  email: state.user.email,
  list: state.list.list,
  token: state.user.token,
  question: state.answers.question,
  record: state.records.record,
  textInput: state.answers.textInput,
  answersArray: state.records.answersArray,
});

export default connect(mapStateToProps, bindAction)(Qone);
