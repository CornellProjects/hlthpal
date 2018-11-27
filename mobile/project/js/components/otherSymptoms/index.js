import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Container,
         Header,
         Title,
         Content,
         Card,
         Text,
         Button,
         Icon,
         Left,
         Body,
         Right,
         Input,
         InputGroup,
         Item,
         Col } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';
import { setIndex } from '../../actions/list';
import { openDrawer } from '../../actions/drawer';
import SymptomList from '../SymptomList';
import styles from './styles';

const otherSymptomsLang = require('./other-symptoms.json');

class otherSymptoms extends Component {

  static propTypes = {
    setIndex: React.PropTypes.func,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
  }

  newPage(index) {
    this.props.setIndex(index);
    Actions.blankPage();
  }

  render() {
    let otherSymptoms = otherSymptomsLang[this.props.lang];
    return (
      <Container style={styles.container}>
        <Header style={{backgroundColor:'#F16C00'}}>
          <Left>
            <Button transparent onPress={this.props.openDrawer}>
              <Icon active name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>{otherSymptoms["othersymptoms"]}</Title>
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
                    <Button rounded bordered onPress={() => Actions.questions({"questionName": "8", "lang":this.props.lang})} style={styles.center}>
                    <Text>{otherSymptoms["back"]}</Text>
                    </Button>
                </Col>
                <Col>
                    <Button rounded onPress={() => Actions.questions({"questionName": "9", "lang":this.props.lang})} style={styles.center}>
                    <Text>{otherSymptoms["next"]}</Text>
                    </Button>
                </Col>
            </Grid>
            <Text style={styles.text}>
            {otherSymptoms["instruction"]}
            </Text>
            <SymptomList />
            <Grid style={styles.buttons}>
                <Row>
                    <Col>
                        <Button rounded onPress={() => Actions.symptomsForm({"lang":this.props.lang})} style={styles.button}>
                            <Text>{otherSymptoms["add"]}</Text>
                        </Button>
                    </Col>
                </Row>
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
  list: state.list.list,
});

export default connect(mapStateToProps, bindAction)(otherSymptoms);
