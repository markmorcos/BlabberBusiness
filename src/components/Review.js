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
import { Card, CardSection, Input, Button, Spinner } from './common';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { getReview } from '../actions';
import Comments from './Comments';

class Review extends Component {
  componentWillMount() {
    const { review_id, getReview } = this.props;
    getReview(review_id);
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
    const { review } = this.props;
    if (review === null) return <Spinner />;
    if (review === undefined) return <Text style={{ alignSelf: 'center', padding: 10 }}>Review not found</Text>;
    const { id, business, user } = review;
    const userURL = 'http://myblabber.com/web/user/' + user.id;
    return (
      <ScrollView>
        <View style={containerStyle}>
          <Image style={imageStyle} source={{ uri: user.profile_photo }} />
          <View style={notificationStyle}>
            <Text style={[textStyle, userStyle]} onPress={() => Linking.openURL(userURL)}>{review.user.name}</Text>
            <Text style={[textStyle, { fontWeight: 'bold' }]}>{review.rating || ''}/5</Text>
            <Text style={textStyle}>{review.text || ''}</Text>
          </View>
        </View>
        <Comments object_id={id} object_type="review" business_id={business.id} />
      </ScrollView>
    );
  }
}

const styles = {
  containerStyle: {
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
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10
  },
  notificationStyle: {
    width: '100%',
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
  const { review, error, loading } = notification;
  return { review, error, loading };
};

export default connect(mapStateToProps, { getReview })(Review);