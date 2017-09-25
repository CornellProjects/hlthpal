
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Container, Header, Title, Content, Card, Text, Button, Icon, Left, Body, Right,Input,InputGroup,Item,Col,Radio,List,ListItem } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';
import { setQuestion, createAnswerObject, setAnswer, answerCreated } from '../../actions/answers';
import { setIndex } from '../../actions/list';
import { openDrawer } from '../../actions/drawer';
import { SegmentedControls } from 'react-native-radio-buttons';
import styles from './styles';


class Qfour extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    setIndex: React.PropTypes.func,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
    answerCreated: React.PropTypes.func,
    setQuestion: React.PropTypes.func,
  }

  componentWillMount() {
    this.props.setQuestion(13);
  }

  componentDidMount() {
    const { question, record, rating, answersArray } = this.props;
  }

  onBackPress() {
    const { answersArray } = this.props;
    answersArray.pop();
    Actions.qthree();
  }

  onButtonPress() {
    const { question, record, rating, answersArray } = this.props;

    let text = '';

    answersArray.push(this.props.setAnswer({ record, question, text, rating }).payload);

    Actions.qfive();
  }

  newPage(index) {
    this.props.setIndex(index);
    Actions.blankPage();
  }

  render() {
    const options = [
          'Not at all',
          'Occasionally',
          'Sometimes',
          'Most of the time',
          'Always'
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
            <Title style={styles.title}>{(this.props.name) ? this.props.name : 'Over the past week'}</Title>
          </Body>
          <Right>
             <Button transparent onPress={() => Actions.login({ type: ActionConst.RESET })}>
              <Icon active name="power" />
            </Button>
          </Right>

        </Header>

        <Content>
           <Text style={styles.text}>
            Have any of your family or friends been anxious or worried about you?
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
                    onSelection={value => this.props.answerCreated(value)}
                />
           </Card>

          <Grid style={styles.buttons}>
            <Col>
              <Button transparent onPress={() => this.onBackPress()} style={styles.center}>
                  <Icon name='arrow-back' />
              </Button>
            </Col>
            <Col>
              <Button transparent onPress={() => this.onButtonPress()} style={styles.center}>
                  <Icon name='arrow-forward' />
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
    answerCreated: rating => dispatch(answerCreated(rating)),
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

export default connect(mapStateToProps, bindAction)(Qfour);
