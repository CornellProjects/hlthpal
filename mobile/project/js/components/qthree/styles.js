
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
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
  },
  center: {
    alignSelf: 'center',
  },
  buttons:{
    marginTop: 45,
    marginBottom:18,
    justifyContent: 'center',
  },
  title: {
    width: 175,
  }
};
