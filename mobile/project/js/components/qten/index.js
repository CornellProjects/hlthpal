
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Container, Header, Title, Content, Card, Text, Button, Icon, Left, Body, Right,Input,InputGroup,Item,Col,List,ListItem } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';
import { setQuestion, createAnswerObject, setAnswer, whoAnswered } from '../../actions/answers';
import { createRecord } from '../../actions/records';
import { setIndex } from '../../actions/list';
import { openDrawer } from '../../actions/drawer';
import { SegmentedControls } from 'react-native-radio-buttons';
import styles from './styles';


class Qten extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    setIndex: React.PropTypes.func,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
    whoAnswered: React.PropTypes.func,
    createRecord: React.PropTypes.func,
    setQuestion: React.PropTypes.func,
  }

  componentWillMount() {
    this.props.setQuestion(19);
  }

  componentDidMount() {
    const { question, record, rating, answersArray } = this.props;
  }

  onBackPress() {
    const { answersArray } = this.props;
    answersArray.pop();
    Actions.qnine();
  }

  onButtonPress() {
    const { token, question, record, rating, mySymptoms, answersArray, score } = this.props;

    let text = '';

    answersArray.push(this.props.setAnswer({ record, question, text, rating }).payload);

    this.props.createRecord({ token, answersArray, mySymptoms, score });
    Actions.home();
  }

  newPage(index) {
    this.props.setIndex(index);
    Actions.blankPage();
  }

  render() {
    const options = [
        'On my own',
        'With help from a friend or relative',
        'With help from a member of staff'
    ];

    return (
      <Container style={styles.container}>
        <Header style={{backgroundColor:'#F16C00'}}>
          <Left>
            <Button transparent onPress={this.props.openDrawer}>
              <Icon active name="menu" />
            </Button>

          </Left>

          <Body>
            <Title>{(this.props.name) ? this.props.name : 'Question 10'}</Title>
          </Body>
          <Right>
             <Button transparent onPress={() => Actions.login({ type: ActionConst.RESET })}>
              <Icon active name="power" />
            </Button>
          </Right>

        </Header>

        <Content>
           <Text style={styles.text}>
            How did you complete this questionnaire?
           </Text>

           <Card style={styles.radios}>
              <SegmentedControls
                  direction={'column'}
                  tint={'#F16C00'}
                  options={options}
                  containerBorderRadius={0}
                  optionStyle={{fontSize:20, paddingTop: 8}}
                  optionContainerStyle={{ height: 60, alignItems: 'center' }}
                  selectedIndex={ this.props.rating }
                  onSelection={value => this.props.whoAnswered(value)}
              />
           </Card>

          <Grid style={styles.buttons}>
            <Col>
              <Button rounded bordered onPress={() => this.onBackPress()} style={styles.center}>
                  <Text>Back</Text>
              </Button>
            </Col>
            <Col>
              <Button rounded onPress={() => this.onButtonPress()} style={styles.center}>
                  <Text>Finish</Text>
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
    whoAnswered: rating => dispatch(whoAnswered(rating)),
    setQuestion: question => dispatch(setQuestion(question)),
    createRecord: token => dispatch(createRecord(token)),
    setAnswer: (record, question, textInput, rating) => dispatch(createAnswerObject(record, question, textInput, rating)),
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list,
  token: state.user.token,
  question: state.answers.question,
  record: state.records.record,
  rating: state.answers.rating,
  score: state.records.score,
  answersArray: state.records.answersArray,
  mySymptoms: state.records.mySymptoms,
});

export default connect(mapStateToProps, bindAction)(Qten);
