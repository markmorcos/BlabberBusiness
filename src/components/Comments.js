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
import { getComments, addComment } from '../actions';

class Comments extends Component {
  state = {
    text: ''
  };

  componentWillMount() {
    const { object_id, object_type, getComments } = this.props;
    getComments(object_id, object_type);
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ comments }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(comments);
  }

  renderRow(comment) {
    return <View><Text>{comment.text}</Text></View>;
  }

  onRefresh() {
    const { object_id, getComments } = this.props;
    getComments(object_id, object_type);
    this.createDataSource(this.props);
  }

  onButtonPress() {
    const { text } = this.state;
    this.setState({ text: '' });
    const { object_id, object_type, business_id, addComment } = this.props;
    addComment(text, object_id, object_type, business_id);
  }

  renderButton() {
    if (this.props.loading) return <Spinner />
    return <Button disabled={!this.state.text} onPress={this.onButtonPress.bind(this)}>Comment</Button>;
  }

  render() {
    const { containerStyle, listViewStyle } = styles;
    const { comments, loading } = this.props;
    return (
      <View style={[containerStyle, { flexDirection: 'column' }]}>
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
        <View style={{ display: 'flex' }}>
          <Input
            type="dark"
            placeholder="Add a comment"
            onChangeText={text => this.setState({ text })}
            style={{ width: '100%', marginTop: 20 }}
          />
          {this.renderButton()}
        </View>
      </View>
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
  listViewStyle: {
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
  const { comments, error, loading } = notification;
  return { comments, error, loading };
};

export default connect(mapStateToProps, { getComments, addComment })(Comments);