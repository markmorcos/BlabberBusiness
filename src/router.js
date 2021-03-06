import React, { Component } from 'react';
import { BackHandler, Image, View, TouchableWithoutFeedback } from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';
import WelcomeScreen from './components/WelcomeScreen';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import ProcessScreen from './components/ProcessScreen';
import Dashboard from './components/Dashboard';
import Notifications from './components/Notifications';
import UserList from './components/UserList';
import ReviewList from './components/ReviewList';
import Review from './components/Review';
import MediaList from './components/MediaList';
import Media from './components/Media';
import MediaForm from './components/MediaForm';
import Settings from './components/Settings';
import BusinessForm from './components/BusinessForm';
import PrivacyPolicy from './components/PrivacyPolicy';
import { connect } from 'react-redux';
import { getBusinesses, logoutUser } from './actions';

class RouterComponent extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (Actions.currentScene === 'welcome'
        || Actions.currentScene === 'login'
        || Actions.currentScene === 'dashboard'
        || Actions.currentScene === 'notifications'
        || Actions.currentScene === 'settings') {
        return false;
      }
      Actions.pop();
      return true;
    });
  }

  render() {
    const { getBusinesses, logoutUser } = this.props;
    return (
      <Router>
      	<Scene key="root">
          <Scene key="welcome" component={WelcomeScreen} hideNavBar={true} />
	        <Scene key="login" component={LoginForm} hideNavBar={true} />
	    		<Scene key="signUp" component={SignUpForm} hideNavBar={true} />
    		  <Scene key="privacy" component={PrivacyPolicy} title="Privacy Policy" />
          <Scene key="process" component={ProcessScreen} hideNavBar={true} />
          <Scene
            key="dashboard"
            component={Dashboard}
            title="Blabber for Businesses"
            onLeft={() => logoutUser()}
            leftButtonImage={require('./assets/logout_icon.png')}
            onRight={() => Actions.businessForm({ onSubmit: () => getBusinesses() })}
            rightButtonImage={require('./assets/add_icon.png')}
            icon={() => tabBarIcon(require('./assets/home_icon.png'))}
            animation={false}
          />
          <Scene key="businessForm" component={BusinessForm} title="Business Form" />
          <Scene key="userList" component={UserList} title="Users" />
          <Scene key="reviewList" component={ReviewList} title="Reviews" />
          <Scene
            key="mediaList"
            component={MediaList}
            title="Media List"
            onRight={() => {}}
            rightButtonImage={require('./assets/add_icon.png')}
          />
          <Scene key="mediaForm" component={MediaForm} title="Media Form" />
          <Scene
            key="notifications"
            component={Notifications}
            title="Notifications"
            onLeft={() => this.props.logoutUser()}
            leftButtonImage={require('./assets/logout_icon.png')}
            icon={() => tabBarIcon(require('./assets/notifications_icon.png'))}
            animation={false}
          />
          <Scene key="reviewItem" component={Review} title="Review" />
          <Scene key="mediaItem" component={Media} title="Image" />
          <Scene
            key="settings"
            component={Settings}
            title="Settings"
            onLeft={() => this.props.logoutUser()}
            leftButtonImage={require('./assets/logout_icon.png')}
            icon={() => tabBarIcon(require('./assets/settings_icon.png'))}
            animation={false}
          />
     		</Scene>
      </Router>
    )
  }
}

const tabBarIcon = icon => {
  return <Image
    style={{ width: 25, height: 25 }}
    source={icon}
  />;
};

export default connect(null, { getBusinesses, logoutUser })(RouterComponent);
