import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button } from 'native-base';
import { connect } from 'react-redux';
import { selectRecord } from '../../actions/records';
import { Actions } from 'react-native-router-flux';

class RecordDetail extends Component {
    static propTypes = {
        openDrawer: React.PropTypes.func,
        selectRecord: React.PropTypes.func,
    }

    getDate(str) {
        let myDate = new Date(str);
        let onlyDate = myDate.toLocaleDateString();
        return onlyDate;
    }

    // IN-PROGRESS
    goToEditView(id) {
        this.props.selectRecord(id);
    }

    render() {
        const { id, date } = this.props.element;
        console.log(this.props.selectedRecord);
        return (
            <Button full bordered
                onPress={() => this.goToEditView(id)}
            >
                <Text>{this.getDate(date)}</Text>
            </Button>
        );
    }
};

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    selectRecord: id => dispatch(selectRecord(id))
  };
}

const mapStateToProps = state => ({
  selectedRecord: state.records.selectedRecord,
});

export default connect(mapStateToProps, bindAction)(RecordDetail);