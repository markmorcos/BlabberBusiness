import React, { Component } from 'react';
import { View, TouchableHighlight, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import SInfo from 'react-native-sensitive-info';
import { Spinner } from './common';
import { connect } from 'react-redux';
import { getLoginState } from '../actions';

class WelcomeScreen extends Component {

	componentWillMount() {
		this.props.getLoginState();
	}

	render() {
		if (this.props.loading) {
			return (
	  		<View style={styles.spinnerStyle}>
	  			<Spinner size="large" />
	  		</View>
			);
		}
	  return (
	  	<TouchableHighlight onPress={() => Actions.login()}>
		    <Image
		      style={{ width: '100%', height: '100%' }}
		      source={require('../assets/welcome_screen.png')}
		    />
		  </TouchableHighlight>
		);
	}
}

const styles = {
	spinnerStyle: {
		padding: 15
	},
};

const mapStateToProps = ({ auth }) => {
	const { loading } = auth;
	return { loading };
};

export default connect(mapStateToProps, { getLoginState })(WelcomeScreen);
