
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
      marginTop:50,
      fontSize: 24,
      marginBottom: 15,
      alignItems: 'center',
      alignContent: 'center',
      color: '#F16C00',
      marginLeft: 30,
      marginRight: 30,
      fontFamily: 'sans-serif-condensed',
  },
  radios: {
    flex:1,
    marginTop: 72,
    marginLeft: 30,
    marginRight: 30,
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
  },
  title: {
    width: 175,
  }
};
