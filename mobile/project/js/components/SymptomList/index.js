import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Card, Content } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';
import { setIndex } from '../../actions/list';
import { openDrawer } from '../../actions/drawer';
import TextField from '../TextField'
import { SegmentedControls } from 'react-native-radio-buttons';
import styles from './styles';
import { ListView } from 'react-native';
import SymptomDetail from '../SymptomDetail';

class SymptomList extends Component {
    componentWillMount() {
        this.createDataSource(this.props);
    }

    // render a single element for the list
    renderRow(element) {
        return <SymptomDetail element={element} />;
    }

    createDataSource({ mySymptoms }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(mySymptoms);
    }

    render() {
        return (
            <Card style={styles.card}>
                <Content>
                    <ListView
                        enableEmptySections
                        dataSource={this.dataSource}
                        renderRow={this.renderRow}
                    />
                </Content>
            </Card>
        );
    }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => ({
  mySymptoms: state.records.mySymptoms,
  token: state.user.token,
});

export default connect(mapStateToProps, bindAction)(SymptomList);