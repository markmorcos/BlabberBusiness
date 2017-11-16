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
import { getMedia } from '../actions';
import Comments from './Comments';

class Media extends Component {
  componentWillMount() {
    const { media_id, getMedia } = this.props;
    getMedia(media_id);
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
    const { media_id, media } = this.props;
    if (media === null) return <Spinner />;
    if (media === undefined) return <Text style={{ alignSelf: 'center', padding: 10 }}>Media not found</Text>;
    const { user, business } = media;
    const userURL = 'http://myblabber.com/web/user/' + media.user.id;
    return (
      <ScrollView>
        <View style={[containerStyle, { flexDirection: 'column' }]}>
          <Image
            style={{ flex: 1, width: '100%', height: 400, resizeMode: 'contain' }}
            source={{ uri: media.url }}
          />
          <View style={notificationStyle}>
            <Text style={[textStyle, userStyle]} onPress={() => Linking.openURL(userURL)}>{user.name}</Text>
            <Text style={textStyle}>{media.caption || ''}</Text>
          </View>
        </View>
        <Comments object_id={media_id} object_type="media" business_id={business.id} />
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
    flex: 1,
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10
  },
  notificationStyle: {
    flex: 1,
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
  const { media, error, loading } = notification;
  return { media, error, loading };
};

export default connect(mapStateToProps, { getMedia })(Media);