
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Container, Header, Title, Content, Card, Text, Button, Icon, Left, Body, Right,Input,InputGroup,Item,Col,Radio,List,ListItem } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';
import { setQuestion, createAnswerObject, setAnswer, answerModified, resetRating } from '../../actions/answers';
import { setIndex } from '../../actions/list';
import { openDrawer } from '../../actions/drawer';
import { SegmentedControls } from 'react-native-radio-buttons';
import styles from './styles';


class QtwoTen extends Component {

  static propTypes = {
      name: React.PropTypes.string,
      setIndex: React.PropTypes.func,
      list: React.PropTypes.arrayOf(React.PropTypes.string),
      openDrawer: React.PropTypes.func,
      answerModified: React.PropTypes.func,
      resetRating: React.PropTypes.func,
      setQuestion: React.PropTypes.func,
      createAnswerObject: React.PropTypes.func,
  }

  newPage(index) {
      this.props.setIndex(index);
      Actions.blankPage();
  }

  componentWillMount() {
      this.props.setQuestion(10);
  }

  componentDidMount() {
    const { question, record, rating, answersArray } = this.props;
  }

  onBackPress() {
    const { answersArray } = this.props;
    answersArray.pop();
    Actions.qtwoNine();
  }

  onButtonPress() {
    const { question, record, rating, answersArray } = this.props;

    let text = '';

    answersArray.push(this.props.setAnswer({ record, question, text, rating }).payload);
    this.props.resetRating(rating);
    Actions.qtwoEleven();
  }

  render() {
    const options = [
        'Yes',
        'Most of the time',
        'Sometimes',
        'Occasionally',
        'Not at all'
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
            <Title>{(this.props.name) ? this.props.name : 'Question 5'}</Title>
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
                    <Text>Back</Text>
                    </Button>
                </Col>
                <Col>
                    <Button rounded onPress={() => this.onButtonPress()} style={styles.center}>
                    <Text>Next</Text>
                    </Button>
                </Col>
            </Grid>
           <Text style={styles.text}>
            Over the past 3 days have you felt that life was worthwhile?
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
                 onSelection={ this.props.answerModified.bind(this) }
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
    answerModified: rating => dispatch(answerModified(rating)),
    resetRating: rating => dispatch(resetRating(rating)),
    setQuestion: question => dispatch(setQuestion(question)),
    setAnswer: (record, question, textInput, rating) => dispatch(createAnswerObject(record, question, textInput, rating)),
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list,
  question: state.answers.question,
  record: state.records.record,
  rating: state.answers.rating,
  answersArray: state.records.answersArray,
});

export default connect(mapStateToProps, bindAction)(QtwoTen);
