import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  Linking
} from 'react-native';
import { Card, CardSection } from './common';

const UserItem = ({ user }) => {
  const {
    containerStyle,
    imageStyle,
    notificationStyle,
    textStyle,
    userStyle
  } = styles;
  const userURL = 'http://myblabber.com/web/user/' + user.id;
  return (
    <TouchableOpacity onPress={() => Linking.openURL(userURL)}>
      <View style={containerStyle}>
        <Image style={imageStyle} source={{ uri: user.profile_photo }} />
        <Text style={[textStyle, notificationStyle]}>
          <Text style={[textStyle, userStyle]}>{user.name}</Text>
        </Text>
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
    padding: 10,
    backgroundColor: '#f9f9f9',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  imageStyle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 5
  },
  notificationStyle: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  textStyle: {
    backgroundColor: 'transparent',
    color: '#a4a4a4'
  },
  userStyle: {
    color: '#0091c9'
  }
};

export default UserItem;