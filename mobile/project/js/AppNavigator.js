
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
import Qone from './components/qone';
import Qtwo from './components/qtwo';
import QtwoOne from './components/qtwoOne';
<<<<<<< HEAD
import FillInfo from './components/fillInfo';

=======
>>>>>>> 22322b7cc60c65b1909914747144b3308cf853e2

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
      case 'qone':
        return <Qone />;
      case 'qtwo':
<<<<<<< HEAD
        return <Qtwo />;
      case 'qtwoOne':
        return <QtwoOne />;
      case 'fillInfo':
        return <FillInfo />;
=======
        return <Qtwo />
      case 'qtwoOne':
        return <QtwoOne />
>>>>>>> 22322b7cc60c65b1909914747144b3308cf853e2
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
            <Scene key="home" component={Home} />
            <Scene key="blankPage" component={BlankPage} />
            <Scene key="qone" component={Qone} />
            <Scene key="qtwo" component={Qtwo} />
            <Scene key="qtwoOne" component={QtwoOne} />
<<<<<<< HEAD
            <Scene key="fillInfo" component={FillInfo} />
=======
>>>>>>> 22322b7cc60c65b1909914747144b3308cf853e2
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
