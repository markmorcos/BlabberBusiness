import React, { Component } from 'react';
import { View, ListView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { getUsers } from '../actions';
import UserItem from './UserItem';

class UserList extends Component {
  componentWillMount() {
    const { getUsers, business_id, list_type } = this.props;
    getUsers(business_id, list_type);
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ users }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(users);
  }

  renderRow(user) {
    return <UserItem user={user} />;
  }

  onRefresh() {
    const { getUsers, business_id, list_type } = this.props;
    getUsers(business_id, list_type);
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
  const { users, error, loading } = notification;
  return { users, error, loading };
};

export default connect(mapStateToProps, { getUsers })(UserList);
