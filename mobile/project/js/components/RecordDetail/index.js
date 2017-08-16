import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button } from 'native-base';
import { connect } from 'react-redux';
import { selectRecord } from '../../actions/records';

class RecordDetail extends Component {
    static propTypes = {
        openDrawer: React.PropTypes.func,
        selectRecord: React.PropTypes.func,
    }

    render() {
        const { id, date } = this.props.element;

        return (
            <Button full bordered
                onPress={() => this.props.selectRecord(id)}
            >
                <Text>{date}</Text>
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