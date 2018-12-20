
const React = require('react-native');

const { StyleSheet } = React;
export default {
  container: {
    backgroundColor: '#FBFAFA',
  },
  row: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    alignSelf:'center',
    color: '#F16C00',
    marginLeft: 20,
    marginRight:20,
    marginTop: 30,
    fontFamily: 'sans-serif-condensed',
  },
  symptom_text: {
    fontSize: 24,
    alignItems: 'center',
    alignContent: 'center',
    color: '#F16C00',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    justifyContent:'center',
    fontFamily: 'sans-serif-condensed',
  },
  radios: {
    flex:1,
    marginTop: 45,
    marginLeft: 30,
    marginRight: 30,
  },
  center: {
    alignSelf: 'center',
  },
  buttons:{
    marginTop: 50,
    justifyContent: 'center',
  }
};
