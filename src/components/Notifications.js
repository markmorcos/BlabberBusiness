import React, { Component } from 'react';
import { View, ListView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { getNotifications } from '../actions';
import NotificationItem from './NotificationItem';
import CommentNotification from './CommentNotification';
import NavigationBar from './NavigationBar';

class Notifications extends Component {
  componentWillMount() {
    this.props.getNotifications();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ notifications }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(notifications);
  }

  renderRow(notification) {
    if (notification.data.type === 'comment') return <CommentNotification notification={notification} />;
    return <NotificationItem notification={notification} />;
  }

  onRefresh() {
    this.props.getNotifications();
    this.createDataSource(this.props);
  }

  render() {
    const { containerStyle, listViewStyle } = styles;
    return (
      <View style={containerStyle}>
        <ListView
          style={listViewStyle}
          bounces={false}
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
          refreshControl={
            <RefreshControl
              refreshing={this.props.loading}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
        />
        <NavigationBar />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  listViewStyle: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    marginLeft: 5,
    marginRight: 5,
    paddingTop: 5,
    marginBottom: 5,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
  }
};

const mapStateToProps = ({ notification }) => {
  const { notifications, error, loading } = notification;
  return { notifications, error, loading };
};

export default connect(mapStateToProps, { getNotifications })(Notifications);
