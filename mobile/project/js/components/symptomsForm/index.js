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

class symptomsForm extends Component {
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
                        <Title> </Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => Actions.login({ type: ActionConst.RESET })}>
                            <Icon active name="power" />
                        </Button>
                    </Right>
                </Header>

                <Content>
                    <Item regular style={styles.list}>
                        <TextField
                        style={styles.input}
                        placeholder='Enter Symptom Here...'
                        />
                    </Item>

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
                            <Button rounded light onPress={() => Actions.otherSymptoms()} style={styles.center}>
                                <Text>Cancel</Text>
                            </Button>
                        </Col>
                        <Col>
                            <Button rounded style={styles.center}>
                                <Text>Add</Text>
                            </Button>
                        </Col>
                    </Grid>
                </Content>
            </Container>
        );
    }
}

export default symptomsForm;