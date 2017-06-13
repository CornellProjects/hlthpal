
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
    marginTop:60,
    fontSize: 30,
    alignSelf:'center',
    color: '#F16C00',
    marginLeft: 20,
    marginRight:20,
    fontFamily: 'sans-serif-condensed',
  },
  subText: {
    fontSize: 20,
    marginBottom: 15,
    alignSelf:'center',
    color: '#F16C00',
    marginLeft: 20,
    marginRight:20,
    fontFamily: 'sans-serif-condensed',
  },
  radios: {
    flex:1,
    alignItems: 'center',
    marginTop: 30,
    marginLeft: 40,
  },
  radioText: {
    color:'#0A3E68',
    alignContent: 'center',
    marginLeft:5,
  },
  center: {
    alignSelf: 'center',
  },
  options: {
    marginLeft: 30,
    marginTop: 15,
    marginBottom:15,
  },
  optionText: {
    fontSize: 20,
    color:'#0A3E68',
    marginLeft: 5,
  },
  buttons:{
    marginTop: 50,
    marginBottom:18,
    justifyContent: 'center',
  }
};
