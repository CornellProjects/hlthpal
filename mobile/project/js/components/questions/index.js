
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Container, Card, Header, Title, Content, Text, Button, Icon, Left, Body, Right,Input,InputGroup,Item,Col,Radio,List,ListItem } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';
import { setQuestion, createAnswerObject, setAnswer, answerChanged, resetRating } from '../../actions/answers';
import { setIndex } from '../../actions/list';
import { openDrawer } from '../../actions/drawer';
import { SegmentedControls } from 'react-native-radio-buttons'
import styles from './styles';

const questionListLang = require('./question-list.json');

class Question extends Component {

  static propTypes = {
    setIndex: React.PropTypes.func,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
    answerChanged: React.PropTypes.func,
    resetRating: React.PropTypes.func,
    setQuestion: React.PropTypes.func,
    createAnswerObject: React.PropTypes.func,
  }

  componentWillMount() {
    this.props.setQuestion(this.props.questionName);
    const questionName = this.props.questionName;

  }

  componentDidMount() {
    const { question, record, rating, answersArray } = this.props;
  }

  onBackPress() {
    const { answersArray } = this.props;
    answersArray.pop();
    if(this.props.questionName == "1"){
        Actions.home({lang: this.props.lang});
    }
    else{
        Actions.questions({questionName: parseInt(this.props.questionName) - 1, lang: this.props.lang});
    }
  }

  onButtonPress() {
    const { question, record, rating, answersArray } = this.props;

    let text = '';

    answersArray.push(this.props.setAnswer({ record, question, text, rating }).payload);
    this.props.resetRating(rating);
    if(parseInt(this.props.questionName) == 7){
        Actions.otherSymptoms({lang: this.props.lang});
    }
    else if(parseInt(this.props.questionName) < 12){
        Actions.questions({questionName: parseInt(this.props.questionName) + 1, lang: this.props.lang});
    }
    else{
        Actions.home({lang: this.props.lang});
    }
  }

  render() {
    let questionList = questionListLang[this.props.lang];
    return (
      <Container style={styles.container}>
        <Header style={{backgroundColor:'#F16C00'}}>
          <Left>
            <Button transparent onPress={this.props.openDrawer}>
              <Icon active name="menu" />
            </Button>
           
          </Left>

          <Body>
            <Title>{questionList[this.props.questionName]["question"]}</Title>
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
                    <Button rounded bordered onPress={() => this.onBackPress()} style={styles.center}>
                    <Text>{questionList["button"]["back"]}</Text>
                    </Button>
                </Col>
                <Col>
                    <Button rounded onPress={() => this.onButtonPress()} style={styles.center}>
                    <Text>{questionList["button"]["next"]}</Text>
                    </Button>
                </Col>
            </Grid>
            <Text style={styles.text}>
            {questionList[this.props.questionName]["title"]}
            </Text>
            <Card style={styles.radios}>
                <SegmentedControls
                  direction={'column'}
                  tint={'#F16C00'}
                  options={questionList[this.props.questionName]["options"]}
                  containerBorderRadius={0}
                  optionStyle={{fontSize:20, paddingTop: 8}}
                  optionContainerStyle={{ height: 60, alignItems: 'center' }}
                  selectedIndex={ this.props.rating }
                  onSelection={value => this.props.answerChanged(value)}
                />
            </Card>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer()),
    answerChanged: rating => dispatch(answerChanged(rating)),
    resetRating: rating => dispatch(resetRating(rating)),
    setQuestion: question => dispatch(setQuestion(question)),
    setAnswer: (record, question, textInput, rating) => dispatch(createAnswerObject(record, question, textInput, rating)),
  };
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  list: state.list.list,
  token: state.user.token,
  question: state.answers.question,
  record: state.records.record,
  rating: state.answers.rating,
  answersArray: state.records.answersArray,
});

export default connect(mapStateToProps, bindAction)(Question);
