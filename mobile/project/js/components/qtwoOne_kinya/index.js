
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


class QtwoOne extends Component {

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
    this.props.setQuestion(1);
  }

  componentDidMount() {
    const { question, record, rating, answersArray } = this.props;
  }

  onBackPress() {
    const { answersArray, question } = this.props;
//    answersArray.pop();
    delete answersArray[question];
    Actions.home_k();
  }

  onButtonPress() {
    const { question, record, rating, answersArray } = this.props;

    let text = '';

//    answersArray.push(this.props.setAnswer({ record, question, text, rating }).payload);
    answersArray[question] = this.props.setAnswer({ record, question, text, rating }).payload
    console.log(answersArray);
    this.props.resetRating(rating);
    Actions.qtwoTwo_k();
  }

  render() {
        const options = [
                'Ntanarimwe',
                'Bukeya',
                'Buringaniye',
                'Byinshi',
                'Byinshi cyane'
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
            <Title>{(this.props.name) ? this.props.name : 'Ibibazo 1'}</Title>
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
                    <Text>Subira inyuma</Text>
                    </Button>
                </Col>
                <Col>
                    <Button rounded onPress={() => this.onButtonPress()} style={styles.center}>
                    <Text>Ibikurikira</Text>
                    </Button>
                </Col>
            </Grid>
            <Text style={styles.text}>
                Uburibwe
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

export default connect(mapStateToProps, bindAction)(QtwoOne);
