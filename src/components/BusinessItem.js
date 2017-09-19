import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import { Card, CardSection } from './common';
import { Actions } from 'react-native-router-flux';

const BusinessItem = ({ business }) => {
  const { containerStyle, businessStyle, arrowStyle,iconStyle } = styles;
  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={() => Actions.editBusiness({ id: business.id })}
    >
      <Text style={businessStyle}>{business.name}</Text>
      <View style={arrowStyle}>
        <Image style={iconStyle} source={require('../assets/right_arrow.png')} />
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  containerStyle: {
    borderRadius: 15,
    shadowColor: '#7c7c7c',
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    elevation: 2,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
    padding: 15,
    backgroundColor: '#f9f9f9',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  businessStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'transparent'
  },
  arrowStyle: {
    alignSelf: 'center',
    position: 'absolute',
    right: 15
  },
  iconStyle: {
    width: 5,
    height: 10
  }
};

export default BusinessItem;