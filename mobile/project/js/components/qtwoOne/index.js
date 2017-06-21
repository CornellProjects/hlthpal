
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Container, Card, Header, Title, Content, Text, Button, Icon, Left, Body, Right,Input,InputGroup,Item,Col,Radio,List,ListItem } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';

import { setIndex } from '../../actions/list';
import { openDrawer } from '../../actions/drawer';
import { SegmentedControls } from 'react-native-radio-buttons'
import styles from './styles';


class QtwoOne extends Component {

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
              />
            </Card>

          <Grid style={styles.buttons}>

            <Col>
              <Button transparent onPress={() => Actions.qone()} style={styles.center}>
                  <Icon name='arrow-back' />
              </Button>
            </Col>
            <Col>
              <Button transparent onPress={() => Actions.qtwoTwo()} style={styles.center}>
                   <Icon name='arrow-forward' />
              </Button>
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

export default connect(mapStateToProps, bindAction)(QtwoOne);
