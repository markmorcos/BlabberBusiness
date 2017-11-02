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
import { getMediaList, deleteMedia } from '../actions';

class MediaList extends Component {
  componentWillMount() {
    const { business_id, getMediaList } = this.props;
    getMediaList(business_id);
    this.createDataSource(this.props);
  }

  componentDidMount() {
    const { business_id } = this.props;    
    Actions.refresh({
      onRight: () => Actions.mediaForm({ business_id, onSubmit: this.onRefresh.bind(this) })
    });
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ mediaList }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
    const sectionedMediaList = {};
    mediaList.forEach(function(media) {
      const section = media.type.charAt(0).toUpperCase() + media.type.slice(1);
      if (!sectionedMediaList[section]) sectionedMediaList[section] = [];
      sectionedMediaList[section].push(media);
    });
    this.dataSource = ds.cloneWithRowsAndSections(sectionedMediaList);
  }

  renderRow(media) {
    const { containerStyle, imageStyle, notificationStyle, textStyle, userStyle } = styles;
    const userURL = 'http://myblabber.com/web/user/' + media.user.id;
    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={() => Actions.mediaItem({ media_id: media.id })}
        onLongPress={() => this.props.deleteMedia(media.id, media.business.id, this.onRefresh.bind(this))}
      >
        <Image style={imageStyle} source={{ uri: media.url }} />
        <View style={notificationStyle}>
          <Text style={[textStyle, userStyle]} onPress={() => Linking.openURL(userURL)}>{media.user.name}</Text>
          <Text style={textStyle}>{media.caption}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderSectionHeader(mediaList, section) {
    return <Text style={{ marginTop: 5, padding: 5, fontSize: 24, fontWeight: 'bold' }}>{section}</Text>;
  }

  onRefresh() {
    const { business_id, getMediaList } = this.props;
    getMediaList(business_id);
    this.createDataSource(this.props);
  }

  render() {
    const { containerStyle, listViewStyle } = styles;
    const { mediaList, loading } = this.props;
    return (
      <ListView
        style={[listViewStyle, { flex: 1 }]}
        bounces={false}
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow.bind(this)}
        renderSectionHeader={this.renderSectionHeader}
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
  const { mediaList, error, loading } = notification;
  return { mediaList, error, loading };
};

export default connect(mapStateToProps, { getMediaList, deleteMedia })(MediaList);