import React from 'react';
import { Linking, TouchableOpacity, Text, View, Image } from 'react-native';
import { Card, CardSection } from './common';
import { Actions } from 'react-native-router-flux';
import ModalDropdown from 'react-native-modal-dropdown';

const BusinessItem = ({ business }) => {
  const { containerStyle, businessStyle, arrowStyle,iconStyle } = styles;
  const business_id = business.id;
  return (
    <ModalDropdown
      dropdownTextStyle={{ fontSize: 20 }}
      dropdownStyle={{ width: '100%' }} 
      options={['View', 'Edit', 'Checkins', 'Favorites', 'Reviews', 'Media']}
      onSelect={(index, value) => {
        const businessURL = 'http://myblabber.com/web/business/' + business_id;
        if (index == 0) Linking.openURL(businessURL);
        if (index == 1) Actions.businessForm({ business });
        if (index == 2) Actions.userList({ business_id, list_type: 'checkins' });
        if (index == 3) Actions.userList({ business_id, list_type: 'saved-businesses' });
        if (index == 4) Actions.reviewList({ business_id });
        if (index == 5) Actions.mediaList({ business_id });
        return false;
      }}
    >
      <View style={containerStyle}>
        <Text style={businessStyle}>{business.name}</Text>
        <View style={arrowStyle}>
          <Image style={iconStyle} source={require('../assets/right_arrow.png')} />
        </View>
      </View>
    </ModalDropdown>
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