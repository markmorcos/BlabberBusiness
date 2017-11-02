import React, { Component } from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  View,
  ListView,
  RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import { getBusinesses } from '../actions';
import BusinessItem from './BusinessItem';
import SearchBar from './SearchBar';
import NavigationBar from './NavigationBar';
import { Actions } from 'react-native-router-flux';

const { OS } = Platform;

class Dashboard extends Component {
  componentWillMount() {
  	const { getBusinesses, businesses } = this.props;
    getBusinesses();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  componentDidMount() {
  }

  createDataSource({ keyword, businesses }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(businesses.filter(business => {
      return business.name.toLowerCase().indexOf(keyword.toLowerCase()) != -1;
    }));
  }

  renderRow(business) {
    return <BusinessItem business={business} onSubmit={this.onRefresh.bind(this)} />;
  }

  onRefresh() {
    const { getBusinesses, businesses } = this.props;
    getBusinesses();
    this.createDataSource(this.props);
  }

  renderListView() {
    const { containerStyle, listViewStyle } = styles;
  	return (
      <View style={containerStyle}>
        <ListView
          style={listViewStyle}
          bounces={false}
        	enableEmptySections
          renderHeader={() => <SearchBar />}
          stickyHeaderIndices={[]}
          dataSource={this.dataSource}
          renderRow={this.renderRow.bind(this)}
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

  render() {
    return (
      <KeyboardAvoidingView behavior={OS === 'ios' ? "padding" : null}>
        {this.renderListView()}
      </KeyboardAvoidingView>
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

const mapStateToProps = ({ business }) => {
	const { businesses, error, loading, keyword } = business;
  return { businesses, error, loading, keyword };
};

export default connect(mapStateToProps, { getBusinesses })(Dashboard);
