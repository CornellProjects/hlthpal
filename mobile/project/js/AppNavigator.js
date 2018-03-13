import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Drawer } from 'native-base';
import { Router, Scene } from 'react-native-router-flux';
import { closeDrawer } from './actions/drawer';
import Login from './components/login/';
import Home from './components/home/';
import BlankPage from './components/blankPage';
import SideBar from './components/sideBar';
import { statusBarColor } from './themes/base-theme';
import QtwoOne from './components/qtwoOne';
import QtwoTwo from './components/qtwoTwo';
import QtwoThree from './components/qtwoThree';
import QtwoFour from './components/qtwoFour';
import QtwoFive from './components/qtwoFive';
import QtwoSix from './components/qtwoSix';
import QtwoSeven from './components/qtwoSeven';
import QtwoEight from './components/qtwoEight';
import QtwoNine from './components/qtwoNine';
import QtwoTen from './components/qtwoTen';
import QtwoEleven from './components/qtwoEleven';
import QtwoTwelve from './components/qtwoTwelve';
import otherSymptoms from './components/otherSymptoms';
import FillInfo from './components/fillInfo';
import RecordList from './components/RecordList';
import symptomsForm from './components/symptomsForm';
import Instructions from './components/instructions';

const RouterWithRedux = connect()(Router);

class AppNavigator extends Component {

  static propTypes = {
    drawerState: React.PropTypes.string,
    closeDrawer: React.PropTypes.func,
  }

  componentDidUpdate() {
    if (this.props.drawerState === 'opened') {
      this.openDrawer();
    }

    if (this.props.drawerState === 'closed') {
      this._drawer._root.close();
    }
  }

  openDrawer() {
    this._drawer._root.open();
  }

  closeDrawer() {
    if (this.props.drawerState === 'opened') {
      this.props.closeDrawer();
    }
  }

  _renderScene(props) { // eslint-disable-line class-methods-use-this
    switch (props.scene.route.key) {
      case 'login':
        return <Login />;
      case 'home':
        return <Home />;
      case 'blankPage':
        return <BlankPage />;
      case 'fillInfo':
        return <FillInfo />;
      case 'qtwoOne':
        return <QtwoOne />
      case 'qtwoTwo':
        return <QtwoTwo />
      case 'qtwoThree':
        return <QtwoThree />
      case 'qtwoFour':
        return <QtwoFour />
      case 'qtwoFive':
        return <QtwoFive />
      case 'qtwoSix':
        return <QtwoSix />
      case 'qtwoSeven':
        return <QtwoSeven />
      case 'qtwoEight':
        return <QtwoEight />
      case 'qtwoNine':
        return <QtwoNine />
      case 'qtwoTen':
        return <QtwoTen />
      case 'qtwoEleven':
        return <QtwoEleven />
      case 'qtwoTwelve':
        return <QtwoTwelve />
      case 'otherSymptoms':
        return <otherSymptoms />
      case 'symptomsForm':
        return <symptomsForm />
      case 'RecordList':
        return <RecordList />
      case 'Instructions':
        return <Instructions />
      default:
        return <Login />;
    }
  }

  render() {
    return (
      <Drawer
        ref={(ref) => { this._drawer = ref; }}
        type="overlay"
        tweenDuration={150}
        content={<SideBar />}
        tapToClose
        acceptPan={false}
        onClose={() => this.closeDrawer()}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        styles={{
          drawer: {
            shadowColor: '#000000',
            shadowOpacity: 0.8,
            shadowRadius: 3,
          },
        }}
        tweenHandler={(ratio) => {  //eslint-disable-line
          return {
            drawer: { shadowRadius: ratio < 0.2 ? ratio * 5 * 5 : 5 },
            main: {
              opacity: (2 - ratio) / 2,
            },
          };
        }}
        negotiatePan
      >
        <StatusBar
          backgroundColor={statusBarColor}
          barStyle="default"
        />
        <RouterWithRedux>
          <Scene key="root">
            <Scene key="login" component={Login} hideNavBar initial />
            <Scene key="fillInfo" component={FillInfo} />
            <Scene key="home" component={Home} />
            <Scene key="blankPage" component={BlankPage} />
            <Scene key="qtwoOne" component={QtwoOne} />
            <Scene key="qtwoTwo" component={QtwoTwo} />
            <Scene key="qtwoThree" component={QtwoThree} />
            <Scene key="qtwoFour" component={QtwoFour} />
            <Scene key="qtwoFive" component={QtwoFive} />
            <Scene key="qtwoSix" component={QtwoSix} />
            <Scene key="qtwoSeven" component={QtwoSeven} />
            <Scene key="qtwoEight" component={QtwoEight} />
            <Scene key="qtwoNine" component={QtwoNine} />
            <Scene key="qtwoTen" component={QtwoTen} />
            <Scene key="qtwoEleven" component={QtwoEleven} />
            <Scene key="qtwoTwelve" component={QtwoTwelve} />
            <Scene key="otherSymptoms" component={otherSymptoms} />
            <Scene key="symptomsForm" component={symptomsForm} />
            <Scene key="RecordList" component={RecordList} />
            <Scene key="Instructions" component={Instructions} />
          </Scene>
        </RouterWithRedux>
      </Drawer>
    );
  }
}

function bindAction(dispatch) {
  return {
    closeDrawer: () => dispatch(closeDrawer()),
  };
}

const mapStateToProps = state => ({
  drawerState: state.drawer.drawerState,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(AppNavigator);