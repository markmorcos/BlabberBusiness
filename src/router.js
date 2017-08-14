import React, { Component } from 'react';
import { BackHandler } from 'react-native';
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
              component={Dashboard}
              title="Blabber for Businesses"
              onLeft={() => this.props.logoutUser()}
              leftButtonImage={require('./assets/logout_icon.jpg')}
              onRight={() => Actions.addBusiness()}
              rightButtonImage={require('./assets/add_icon.png')}
            />
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

export default connect(null, { logoutUser })(RouterComponent);
