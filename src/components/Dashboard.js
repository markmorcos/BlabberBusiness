import React, { Component } from 'react';
import { View, ListView, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { getBusinesses } from '../actions';
import { Card, CardSection, Spinner, Button } from './common';
import { Actions } from 'react-native-router-flux';

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
  	const { businessStyle, arrowStyle } = styles;
    return (
    	<TouchableOpacity onPress={() => Actions.editBusiness({ id: business.id })}>
	    	<Card>
	    		<CardSection>
	    			<Text style={businessStyle}>{business.name}</Text>
	    			<View style={arrowStyle}>
	    				<Image source={require('../assets/right_arrow.jpg')} />
	    			</View>
	    		</CardSection>
	    	</Card>
    	</TouchableOpacity>
    );
  }

  render() {
    const { loading, businesses } = this.props;
    const { spinnerStyle, businessStyle } = styles;
    if (loading) {
      return (
        <View style={spinnerStyle}>
          <Spinner size="large" />
        </View>
      );
    }
    return (
      <ListView
        enableEmptySections
        renderEmptyListComponent={() => {
          return (
            <Card>
              <CardSection>
                <Text style={businessStyle}>No businesses yet</Text>
              </CardSection>
            </Card>
          );
        }}
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const styles = {
	spinnerStyle: {
		padding: 15
	},
	businessStyle: {
		fontSize: 16,
		fontWeight: '600'
	},
	arrowStyle: {
		alignSelf: 'center',
		position: 'absolute',
		right: 15
	}
};

const mapStateToProps = state => {
	const { businesses, error, loading } = state.businesses;
  return { businesses, error, loading };
};

export default connect(mapStateToProps, { getBusinesses })(Dashboard);
