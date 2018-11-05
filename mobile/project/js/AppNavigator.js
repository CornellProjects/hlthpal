import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Drawer } from 'native-base';
import { Router, Scene } from 'react-native-router-flux';
import { closeDrawer } from './actions/drawer';
import Login from './components/login/';
import Home from './components/home/';
import Home_K from './components/home_kinya/';
import BlankPage from './components/blankPage';
import SideBar from './components/sideBar';
import { statusBarColor } from './themes/base-theme';
import QtwoOne from './components/qtwoOne';
import QtwoOne_K from './components/qtwoOne_kinya';
import QtwoTwo from './components/qtwoTwo';
import QtwoTwo_K from './components/qtwoTwo_kinya';
import QtwoThree from './components/qtwoThree';
import QtwoThree_K from './components/qtwoThree_kinya';
import QtwoFour from './components/qtwoFour';
import QtwoFour_K from './components/qtwoFour_kinya';
import QtwoFive from './components/qtwoFive';
import QtwoFive_K from './components/qtwoFive_kinya';
import QtwoSix from './components/qtwoSix';
import QtwoSix_K from './components/qtwoSix_kinya';
import QtwoSeven from './components/qtwoSeven';
import QtwoSeven_K from './components/qtwoSeven_kinya';
import QtwoEight from './components/qtwoEight';
import QtwoEight_K from './components/qtwoEight_kinya';
import QtwoNine from './components/qtwoNine';
import QtwoNine_K from './components/qtwoNine_kinya';
import QtwoTen from './components/qtwoTen';
import QtwoTen_K from './components/qtwoTen_kinya';
import QtwoEleven from './components/qtwoEleven';
import QtwoEleven_K from './components/qtwoEleven_kinya';
import QtwoTwelve from './components/qtwoTwelve';
import QtwoTwelve_K from './components/qtwoTwelve_kinya';
import otherSymptoms from './components/otherSymptoms';
import otherSymptoms_K from './components/otherSymptoms_kinya';
import FillInfo from './components/fillInfo';
import RecordList from './components/RecordList';
import symptomsForm from './components/symptomsForm';
import symptomsForm_K from './components/symptomsForm_kinya';
import Instructions from './components/instructions';
import Instructions_K from './components/instructions_kinya';
import Languages from './components/languages';
import finalScreen from './components/finalScreen';
import finalScreen_K from './components/finalScreen_kinya';

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
      case 'home_k':
        return <Home_K />;
      case 'blankPage':
        return <BlankPage />;
      case 'fillInfo':
        return <FillInfo />;
      case 'qtwoOne':
        return <QtwoOne />
      case 'qtwoOne_k':
        return <QtwoOne_K />
      case 'qtwoTwo':
        return <QtwoTwo />
      case 'qtwoTwo_k':
        return <QtwoTwo_K />
      case 'qtwoThree':
        return <QtwoThree />
      case 'qtwoThree_k':
        return <QtwoThree_K />
      case 'qtwoFour':
        return <QtwoFour />
      case 'qtwoFour_k':
        return <QtwoFour_K />
      case 'qtwoFive':
        return <QtwoFive />
      case 'qtwoFive_k':
        return <QtwoFive_K />
      case 'qtwoSix':
        return <QtwoSix />
      case 'qtwoSix_k':
        return <QtwoSix_K />
      case 'qtwoSeven':
        return <QtwoSeven />
      case 'qtwoSeven_k':
        return <QtwoSeven_K />
      case 'qtwoEight':
        return <QtwoEight />
      case 'qtwoEight_k':
        return <QtwoEight_K />
      case 'qtwoNine':
        return <QtwoNine />
      case 'qtwoNine_k':
        return <QtwoNine_K />
      case 'qtwoTen':
        return <QtwoTen />
      case 'qtwoTen_k':
        return <QtwoTen_K />
      case 'qtwoEleven':
        return <QtwoEleven />
      case 'qtwoEleven_k':
        return <QtwoEleven_K />
      case 'qtwoTwelve':
        return <QtwoTwelve />
      case 'qtwoTwelve_k':
        return <QtwoTwelve_K />
      case 'otherSymptoms':
        return <otherSymptoms />
      case 'otherSymptoms_k':
        return <otherSymptoms_K />
      case 'symptomsForm':
        return <symptomsForm />
      case 'symptomsForm_k':
        return <symptomsForm_K />
      case 'RecordList':
        return <RecordList />
      case 'Instructions':
        return <Instructions />
      case 'Instructions_K':
        return <Instructions_K />
      case 'Languages':
        return <Languages />
      case 'finalScreen':
        return <finalScreen />
      case 'finalScreen_k':
        return <finalScreen_K />
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
            <Scene key="home_k" component={Home_K} />
            <Scene key="blankPage" component={BlankPage} />
            <Scene key="qtwoOne" component={QtwoOne} />
            <Scene key="qtwoOne_k" component={QtwoOne_K} />
            <Scene key="qtwoTwo" component={QtwoTwo} />
            <Scene key="qtwoTwo_k" component={QtwoTwo_K} />
            <Scene key="qtwoThree" component={QtwoThree} />
            <Scene key="qtwoThree_k" component={QtwoThree_K} />
            <Scene key="qtwoFour" component={QtwoFour} />
            <Scene key="qtwoFour_k" component={QtwoFour_K} />
            <Scene key="qtwoFive" component={QtwoFive} />
            <Scene key="qtwoFive_k" component={QtwoFive_K} />
            <Scene key="qtwoSix" component={QtwoSix} />
            <Scene key="qtwoSix_k" component={QtwoSix_K} />
            <Scene key="qtwoSeven" component={QtwoSeven} />
            <Scene key="qtwoSeven_k" component={QtwoSeven_K} />
            <Scene key="qtwoEight" component={QtwoEight} />
            <Scene key="qtwoEight_k" component={QtwoEight_K} />
            <Scene key="qtwoNine" component={QtwoNine} />
            <Scene key="qtwoNine_k" component={QtwoNine_K} />
            <Scene key="qtwoTen" component={QtwoTen} />
            <Scene key="qtwoTen_k" component={QtwoTen_K} />
            <Scene key="qtwoEleven" component={QtwoEleven} />
            <Scene key="qtwoEleven_k" component={QtwoEleven_K} />
            <Scene key="qtwoTwelve" component={QtwoTwelve} />
            <Scene key="qtwoTwelve_k" component={QtwoTwelve_K} />
            <Scene key="otherSymptoms" component={otherSymptoms} />
            <Scene key="finalScreen" component={finalScreen} />
            <Scene key="finalScreen_k" component={finalScreen_K} />
            <Scene key="otherSymptoms_k" component={otherSymptoms_K} />
            <Scene key="symptomsForm" component={symptomsForm} />
            <Scene key="symptomsForm_k" component={symptomsForm_K} />
            <Scene key="RecordList" component={RecordList} />
            <Scene key="Instructions" component={Instructions} />
            <Scene key="Instructions_K" component={Instructions_K} />
            <Scene key="Languages" component={Languages} />
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