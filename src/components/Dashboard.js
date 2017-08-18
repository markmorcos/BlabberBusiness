import React, { Component } from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  View,
  ListView,
  RefreshControl,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { getBusinesses } from '../actions';
import { SearchBar, Card, CardSection, Spinner, Button } from './common';
import { Actions } from 'react-native-router-flux';
import BusinessItem from './BusinessItem';

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

  createDataSource({ businesses }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(businesses);
  }

  renderRow(business) {
    return <BusinessItem business={business} />;
  }

  onRefresh() {
    const { getBusinesses, businesses } = this.props;
    getBusinesses();
    this.createDataSource(this.props);
  }

  renderListView() {
  	return (
      <ListView
        style={{
          backgroundColor: 'white',
          height: '99%',
          marginLeft: 5,
          marginRight: 5,
          paddingTop: 5,
          marginBottom: 5,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15
        }}
        bounces={false}
      	enableEmptySections
        renderEmptyListComponent={() => {
          return (
            <Card>
              <CardSection>
                <Text style={styles.businessStyle}>No businesses yet</Text>
              </CardSection>
            </Card>
          );
        }}
        renderHeader={() => <SearchBar />}
        stickyHeaderIndices={[]}
        dataSource={this.dataSource}
        renderRow={this.renderRow}
        refreshControl={
          <RefreshControl
            refreshing={this.props.loading}
            onRefresh={this.onRefresh.bind(this)}
          />
        }
      />
    );
  }

  render() {
    if (this.props.loading) {
      return (
        <View style={styles.spinnerStyle}>
          <Spinner size="large" />
        </View>
      );
    }
    return (
      <KeyboardAvoidingView behavior={OS === 'ios' ? "padding" : null}>
        {this.renderListView()}
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
	spinnerStyle: {
		padding: 15
	}
};

const mapStateToProps = state => {
	const { businesses, error, loading } = state.businesses;
  return { businesses, error, loading };
};

export default connect(mapStateToProps, { getBusinesses })(Dashboard);
