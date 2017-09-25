import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button } from 'native-base';
import { connect } from 'react-redux';
import { selectSymptom } from '../../actions/records';
import { Actions } from 'react-native-router-flux';

class RecordDetail extends Component {
    static propTypes = {
        openDrawer: React.PropTypes.func,
        selectSymptom: React.PropTypes.func,
    }

    // IN-PROGRESS
    goToEditView(symptom) {
        this.props.selectSymptom(symptom);
    }

    render() {
        const { symptom } = this.props.element;

        return (
            <Button full bordered
                onPress={() => this.goToEditView(symptom)}
            >
                <Text>{symptom}</Text>
            </Button>
        );
    }
};

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    selectSymptom: symptom => dispatch(selectSymptom(symptom))
  };
}

const mapStateToProps = state => ({
  selectedSymptom: state.records.selectedSymptom,
});

export default connect(mapStateToProps, bindAction)(RecordDetail);