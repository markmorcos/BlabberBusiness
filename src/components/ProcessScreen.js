import React, { Component } from 'react';
import { TouchableHighlight, Image, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

class ProcessScreen extends Component {
	render() {
		const { imageStyle, boldTextStyle, textStyle } = styles;
		return (
		  <TouchableHighlight onPress={() => Actions.login({ type: 'replace' })}>
		    <Image
		      style={imageStyle}
		      source={require('../assets/process_screen.png')}
		    >
		    	<Text style={[
		    		textStyle,
		    		boldTextStyle
		    	]}>Your account is being processed.</Text>
		    	<Text style={textStyle}>We will get back to you within 24 hours</Text>
		    </Image>
		  </TouchableHighlight>
		);
	}
}

const styles = {
	imageStyle: {
  	width: '100%',
  	height: '100%',
  	display: 'flex',
  	flexDirection: 'column',
  	justifyContent: 'center',
  	alignItems: 'center',
  	backgroundColor: 'transparent' 
	},
	boldTextStyle: {
		fontWeight: 'bold',
		marginTop: '30%'
	},
	textStyle: {
		fontFamily: 'Montserrat-Regular',
		color: '#292929'
	}
}

export default ProcessScreen;
