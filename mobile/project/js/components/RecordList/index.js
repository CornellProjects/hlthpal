import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Container, Card, Header, Title, Content, Text, Button, Icon, Left, Body, Right,Input,InputGroup,Item,Col,Radio,List,ListItem } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';
import { setIndex } from '../../actions/list';
import { openDrawer } from '../../actions/drawer';
import TextField from '../TextField'
import { SegmentedControls } from 'react-native-radio-buttons';
import styles from './styles';
import { ListView } from 'react-native';
import RecordDetail from '../RecordDetail';
import { displayRecords } from '../../actions/records';

class RecordList extends Component {
    componentWillMount() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(this.props.my_records);
    }

    // render a single element for the list
    renderRow(element) {
        return <RecordDetail element={element} />;
    }

    render() {
        console.log(this.props.my_records);
        return (
            <Container style={styles.container}>
                <Header style={{backgroundColor:'#F16C00'}}>
                    <Left>
                        <Button transparent onPress={this.props.openDrawer}>
                            <Icon active name="menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>List View</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => Actions.login({ type: ActionConst.RESET })}>
                            <Icon active name="power" />
                        </Button>
                    </Right>
                </Header>

                <Content>
                    <ListView
                        dataSource={this.dataSource}
                        renderRow={this.renderRow}
                    />
                </Content>
            </Container>
        );
    }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    displayRecords: token => dispatch(displayRecords(token)),
  };
}

const mapStateToProps = state => ({
  my_records: state.records.my_records,
  token: state.user.token,
});

export default connect(mapStateToProps, bindAction)(RecordList);