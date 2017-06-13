
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

export default {
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FBFAFA',
  },
  shadow: {
    flex: 1,
    width: null,
    height: null,
  },
  bg: {
    flex: 1,
    marginTop: deviceHeight / 1.75,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    bottom: 0,
  },
  input: {
    fontFamily: 'sans-serif-condensed',
  },
  center:{
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 25,
  },
  title:{
    marginTop: 25,
    marginLeft: 30,
    color:'#F16C00',
    fontSize: 20,
    fontFamily: 'sans-serif-condensed',
  },
  list:{
    marginTop: 15,
    marginBottom: 20,
    marginLeft: 25,
    marginRight: 25,
  },
  radios:{
    alignItems: 'center',
    marginLeft: 30,
    marginTop: 20,
  },
  radioText: {
    marginLeft: 35,
    position: 'relative',
    top: -25,
    fontSize: 18,
    fontFamily: 'sans-serif-condensed',
  },
};
