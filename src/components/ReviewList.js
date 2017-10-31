import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Linking,
  ScrollView,
  ListView,
  RefreshControl
} from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { getReviews } from '../actions';

class ReviewList extends Component {
  componentWillMount() {
    const { business_id, getReviews } = this.props;
    getReviews(business_id);
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ reviews }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(reviews);
  }

  renderRow(review) {
    const { containerStyle, imageStyle, notificationStyle, textStyle, userStyle } = styles;
    const userURL = 'http://myblabber.com/web/user/' + review.user.id;
    return (
      <TouchableOpacity style={containerStyle} onPress={() => Actions.reviewItem({ review_id: review.id })}>
        <Image style={imageStyle} source={{ uri: review.user.profile_photo }} />
        <View style={notificationStyle}>
          <Text style={[textStyle, userStyle]} onPress={() => Linking.openURL(userURL)}>{review.user.name}</Text>
          <Text style={textStyle}>{review.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  onRefresh() {
    const { business_id } = this.props;
    getReviews(business_id);
    this.createDataSource(this.props);
  }

  render() {
    const { containerStyle, listViewStyle } = styles;
    const { reviews, loading } = this.props;
    return (
      <ListView
        style={[listViewStyle, { flex: 1 }]}
        bounces={false}
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={this.onRefresh.bind(this)}
          />
        }
      />
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
    marginBottom: 0,
    padding: 10,
    backgroundColor: '#f9f9f9',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  imageStyle: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  listViewStyle: {
    width: '100%',
    height: '100%',
    marginLeft: 0,
    marginRight: 5,
    paddingTop: 5,
    marginBottom: 5,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
  }
};

const mapStateToProps = ({ notification }) => {
  const { reviews, error, loading } = notification;
  return { reviews, error, loading };
};

export default connect(mapStateToProps, { getReviews })(ReviewList);