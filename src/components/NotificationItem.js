import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import { Card, CardSection } from './common';
import { Actions } from 'react-native-router-flux';

const NotificationItem = ({ notification }) => {
  const {
    containerStyle,
    imageStyle,
    notificationStyle,
    textStyle,
    userStyle,
    businessStyle
  } = styles;
  return (
    <TouchableOpacity style={containerStyle}>
      <Image style={imageStyle} source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/KFC_logo.svg/1024px-KFC_logo.svg.png' }} />
      <Text style={[textStyle, notificationStyle]}>
        <Text style={[textStyle, userStyle]}>Mark Morcos</Text>
        <Text style={textStyle}> commented on </Text>
        <Text style={[textStyle, businessStyle]}>KFC - Maadi</Text>
        <Text style={textStyle}>'s photo</Text>
      </Text>
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
    flex: 1,
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 5
  },
  notificationStyle: {
    flex: 4,
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
  },
  businessStyle: {
    color: '#5d5d5d'
  }
};

export default NotificationItem;