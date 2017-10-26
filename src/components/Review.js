import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Linking,
  ScrollView
} from 'react-native';
import { Card, CardSection, Input, Button } from './common';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { getComments, addComment } from '../actions';
import Comments from './Comments';

class ReviewItem extends Component {
  componentWillMount() {
    const { notification } = this.props;
    const { review_id } = notification.data.payload;
    // getReview(review_id);
  }

  render() {
    const {
      containerStyle,
      imageStyle,
      notificationStyle,
      textStyle,
      userStyle,
      businessStyle
    } = styles;
    const { notification } = this.props;
    const { body, data } = notification;
    const { review_id, business_data, user_data } = data.payload;
    const userURL = 'http://myblabber.com/web/user/' + user_data.id;
    return (
      <ScrollView>
        <View style={containerStyle}>
          <Image style={imageStyle} source={{ uri: user_data.profile_photo }} />
          <View style={notificationStyle}>
            <Text style={[textStyle, userStyle]} onPress={() => Linking.openURL(userURL)}>{user_data.name}</Text>
            <Text style={textStyle}>{body}</Text>
          </View>
        </View>
        <Comments object_id={review_id} object_type="review" business_id={business_data.id} />
      </ScrollView>
    );
  }
}

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
    alignItems: 'flex-start'
  },
  imageStyle: {
    flex: 1,
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 10
  },
  notificationStyle: {
    flex: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
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

const mapStateToProps = ({ notification }) => {
  const { comments, error, loading } = notification;
  return { comments, error, loading };
};

export default connect(mapStateToProps, { getComments, addComment })(ReviewItem);