import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Container, Card, Header, Title, Content, Text, Button, Icon, Left, Body, Right,Input,InputGroup,Item,Col,Radio,List,ListItem } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';
import { setIndex } from '../../actions/list';
import { openDrawer } from '../../actions/drawer';
import TextField from '../TextField';
import styles from './styles';
import { ListView } from 'react-native';
import RecordDetail from '../RecordDetail';

class RecordList extends Component {
    componentWillMount() {
        this.createDataSource(this.props);
    }

    // render a single element for the list
    renderRow(element) {
        return <RecordDetail element={element} />;
    }

    createDataSource({ myRecords }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(myRecords);
    }

    render() {
        console.log(this.props.myRecords);
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
                        enableEmptySections
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
  };
}

const mapStateToProps = state => ({
  myRecords: state.user.myRecords,
  token: state.user.token,
});

export default connect(mapStateToProps, bindAction)(RecordList);