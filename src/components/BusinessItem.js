import React from 'react';
import { Linking, TouchableOpacity, Text, View, Image } from 'react-native';
import { Card, CardSection } from './common';
import { Actions } from 'react-native-router-flux';
import ModalDropdown from 'react-native-modal-dropdown';
import ActionSheet from 'react-native-actionsheet';
import { connect } from 'react-redux';
import { deleteBusiness } from '../actions';
const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 7;
const options = ['Cancel', 'View', 'Edit', 'Checkins', 'Favorites', 'Reviews', 'Media', 'Delete'];
const title = '';

const BusinessItem = ({ business, onSubmit, deleteBusiness }) => {
  const { containerStyle, businessStyle, arrowStyle,iconStyle } = styles;
  const business_id = business.id;
  return (
    <TouchableOpacity style={containerStyle} onPress={() => this.ActionSheet.show()}>
      <Text style={businessStyle}>{business.name}</Text>
      <View style={arrowStyle}>
        <Image style={iconStyle} source={require('../assets/right_arrow.png')} />
      </View>
      <ActionSheet
        ref={o => this.ActionSheet = o}
        title={title}
        options={options}
        cancelButtonIndex={CANCEL_INDEX}
        destructiveButtonIndex={DESTRUCTIVE_INDEX}
        onPress={index => {
          const businessURL = 'http://myblabber.com/web/business/' + business_id;
          if (index == 1) Linking.openURL(businessURL);
          if (index == 2) Actions.businessForm({ business, onSubmit });
          if (index == 3) Actions.userList({ business_id, list_type: 'checkins' });
          if (index == 4) Actions.userList({ business_id, list_type: 'saved-businesses' });
          if (index == 5) Actions.reviewList({ business_id });
          if (index == 6) Actions.mediaList({ business_id });
          if (index == 7) deleteBusiness(business_id);
        }}
      />
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

export default connect(null, { deleteBusiness })(BusinessItem);