
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
    marginTop: deviceHeight * 0.3,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    bottom: 0,
  },
  input: {
    marginBottom: 20,
  },
  center:{
    alignSelf: 'center',
  },
//  text:{
//    marginBottom: 20,
//
//  },
  text: {
      marginBottom:30,
      fontSize: 22,
      alignSelf:'center',
      color: '#F16C00',
      marginLeft: 40,
      marginRight:40,
//      fontFamily: 'sans-serif-condensed',
    },
};
