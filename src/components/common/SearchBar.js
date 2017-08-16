import React from 'react';
import { View, Image, TextInput } from 'react-native';

const SearchBar = () => {
	const { barStyle, iconStyle, inputStyle } = styles;
  return (
  	<View style={barStyle}>
	    <Image
	      style={iconStyle}
	      source={require('../../assets/search_icon.png')}
	    />
	    <TextInput
	      style={inputStyle}
	      placeholder="Search for business"
	      underlineColorAndroid="transparent"
	    />
	  </View>
	);
};

const styles = {
	barStyle: {
		flex: 1,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: 'white',
		marginTop: 5,
		marginLeft: 5,
		marginRight: 5,
		borderRadius: 25
	},
	iconStyle: {
		marginLeft: 5,
		marginRight: 5
	},
	inputStyle: {
		flex: 1
	}
};

export { SearchBar };