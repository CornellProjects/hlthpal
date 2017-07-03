
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Container, Card, Header, Title, Content, Text, Button, Icon, Left, Body, Right,Input,InputGroup,Item,Col,Radio,List,ListItem } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';
import { answerChanged, createAnswer } from '../../actions/user';
import { setIndex } from '../../actions/list';
import { openDrawer } from '../../actions/drawer';
import { SegmentedControls } from 'react-native-radio-buttons'
import styles from './styles';


class QtwoOne extends Component {

  static propTypes = {
    setIndex: React.PropTypes.func,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
    createAnswer: React.PropTypes.func,
    answerChanged: React.PropTypes.func,
  }

  onButtonPress() {
    const { rating, token } = this.props;
    this.props.createAnswer({ rating, token });
  }

  render() {
    const options = [
        'Not at all',
        'Slightly',
        'Moderately',
        'Severely',
        'Overwhelmingly'
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
            <Title>{(this.props.name) ? this.props.name : 'Question 2 - 1'}</Title>
          </Body>
          <Right>
             <Button transparent onPress={() => Actions.login({ type: ActionConst.RESET })}>
              <Icon active name="power" />
            </Button>
          </Right>
          
        </Header>

        <Content>
           <Text style={styles.text}>
            Pain
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

          <Grid style={styles.buttons}>

            <Col>
              <Button transparent onPress={() => Actions.qtwo()} style={styles.center}>
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
    answerChanged: rating => dispatch(answerChanged(rating)),
    createAnswer: ({ rating,token }) => dispatch(createAnswer({ rating,token })),
  };
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  list: state.list.list,
  rating: state.user.rating,
});

export default connect(mapStateToProps, bindAction)(QtwoOne);
