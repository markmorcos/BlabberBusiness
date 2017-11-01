import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Linking
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
  const { body, data } = notification;
  const { review_id, media_id, business_data, user_data } = data.payload;
  const userURL = 'http://myblabber.com/web/user/' + user_data.id;
  const businessURL = 'http://myblabber.com/web/business/' + business_data.id;
  const Touchable = body.indexOf('checked') !== -1 || body.indexOf('saved') !== -1 ? TouchableWithoutFeedback : TouchableOpacity;
  return (
    <Touchable onPress={() => {
      if (data.type === 'review') Actions.reviewItem({ review_id });
      if (data.type === 'media') Actions.mediaItem({ media_id });
    }}>
      <View style={containerStyle}>
        <Image style={imageStyle} source={{ uri: business_data.main_image }} />
        <Text style={[textStyle, notificationStyle]}>
          <Text style={[textStyle, userStyle]} onPress={() => Linking.openURL(userURL)}>{user_data.name}</Text>
          <Text style={textStyle}>{notification.body.slice(user_data.name.length, -business_data.name.length)}</Text>
          <Text style={[textStyle, businessStyle]} onPress={() => Linking.openURL(businessURL)}>{business_data.name}</Text>
        </Text>
      </View>
    </Touchable>
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
    width: 60,
    height: 60,
    borderRadius: 30,
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
  },
  businessStyle: {
    color: '#5d5d5d'
  }
};

export default NotificationItem;