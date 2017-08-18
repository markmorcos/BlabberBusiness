import React, { Component } from 'react';
import { BackHandler, Image } from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';
import WelcomeScreen from './components/WelcomeScreen';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import ProcessScreen from './components/ProcessScreen';
import Dashboard from './components/Dashboard';
import AddBusinessForm from './components/AddBusinessForm';
import EditBusinessForm from './components/EditBusinessForm';
import { connect } from 'react-redux';
import { logoutUser } from './actions';

class RouterComponent extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (Actions.currentScene === 'welcome'
        || Actions.currentScene === 'login'
        || Actions.currentScene === 'dashboard') {
        return false;
      }
      Actions.pop();
      return true;
    });
  }

  render() {
    return (
      <Router>
      	<Scene key="root" hideNavBar={true}>
  	      <Scene key="auth">
            <Scene
              key="welcome"
              component={WelcomeScreen}
              hideNavBar={true}
            />
  	        <Scene key="login" component={LoginForm} hideNavBar={true} />
  	    		<Scene key="signUp" component={SignUpForm} hideNavBar={true} />
            <Scene key="process" component={ProcessScreen} hideNavBar={true} />
            <Scene
              key="dashboard"
              hideNavBar={true}
              tabs
              tabBarPosition="bottom"
              showLabel={false}
              swipeEnabled={false}
              animationEnabled={false}
              showIcon
              tabBarStyle={{ backgroundColor: 'white' }}
              indicatorStyle={{ backgroundColor: 'white' }}
            >
              <Scene
                key="home"
                component={Dashboard}
                title="Blabber for Businesses"
                onLeft={() => this.props.logoutUser()}
                leftButtonImage={require('./assets/logout_icon.png')}
                onRight={() => Actions.addBusiness()}
                rightButtonImage={require('./assets/add_icon.png')}
                icon={() => tabBarIcon(require('./assets/home_icon.png'))}
              />
              <Scene
                key="notifications"
                component={Dashboard}
                title="Notifications"
                onLeft={() => this.props.logoutUser()}
                leftButtonImage={require('./assets/logout_icon.png')}
                icon={() => tabBarIcon(require('./assets/notifications_icon.png'))}
              />
              <Scene
                key="settings"
                component={Dashboard}
                title="Settings"
                onLeft={() => this.props.logoutUser()}
                leftButtonImage={require('./assets/logout_icon.png')}
                icon={() => tabBarIcon(require('./assets/settings_icon.png'))}
              />
            </Scene>
            <Scene
              key="addBusiness"
              component={AddBusinessForm}
              title="Add Business"
            />
            <Scene
              key="editBusiness"
              component={EditBusinessForm}
              title="Edit Business"
            />
        	</Scene>
      		<Scene key="privacy" component={WelcomeScreen} title="Privacy Policy" />
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

export default connect(null, { logoutUser })(RouterComponent);
