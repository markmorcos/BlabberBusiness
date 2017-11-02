import React, { Component } from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  BackHandler,
  Picker
} from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { connect } from 'react-redux';
import {
  getCountries,
  getCities,
  getCategories,
  getSubcategories,
  getFlags,
  getInterests,
  submitBusiness
} from '../actions';
import ImagePicker from 'react-native-image-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Modal from 'react-native-modalbox';
import SelectMultiple from 'react-native-select-multiple';
import MapView from 'react-native-maps';
import _ from 'lodash';

const { OS } = Platform;

class BusinessForm extends Component {
  state = {
    media: '',
    main_image: '',
    name: '',
    nameAr: '',
    address: '',
    addressAr: '',
    email: '',
    phone: '',
    website: '',
    facebook: '',
    description: '',
    descriptionAr: '',
    lat: '',
    lng: '',
    country: '',
    city: '',
    category: '',
    subcategory: '',
    operationHours: '',
    price: 0,
    flags: [],
    interests: [],
    region: {
      latitude: 30.042,
      longitude: 31.252,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
    fromTimePickerVisible: false,
    fromTime: new Date(1970, 1, 1, 0, 0, 0, 0),
    toTimePickerVisible: false,
    toTime: new Date(1970, 1, 1, 0, 0, 0, 0),
    flagsModalVisible: false,
    interestsModalVisible: false
  };

  componentWillMount() {
    const {
      getCountries,
      getCategories,
      getFlags,
      getInterests,
      business
    } = this.props;
    getCountries();
    getCategories();
    getFlags();
    getInterests();
    if (business) {
      _.each(business, (value, key) => this.onPropChange(key, value));
      this.setState({
        country: business.country_id,
        city: business.city_id,
        category: business.top_category.id,
        subcategory: business.category.id
      });
      this.setState({
        interests: business.interests.split(',').map(interest => {
            return { label: interest, value: interest };
        })
      });
      const tokens = business.operation_hours.split(/ |:/);
      const fromHours = parseInt(tokens[1]) + (tokens[3] === 'PM' ? 12 : 0);
      if (fromHours === 12) fromHours = 0;
      if (fromHours === 24) fromHours = 12;
      const toHours = parseInt(tokens[5]) + (tokens[7] === 'PM' ? 12 : 0);
      if (toHours === 12) toHours = 0;
      if (toHours === 24) toHours = 12;
      const fromTime = new Date(1970, 1, 1, fromHours, parseInt(tokens[2]), 0, 0);
      const toTime = new Date(1970, 1, 1, toHours, parseInt(tokens[6]), 0, 0);
      this.setState({ fromTime, toTime });
      this.setState({
        region: {
          latitude: parseFloat(business.lat),
          longitude: parseFloat(business.lng),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }
      })
    }
  }

  componentWillReceiveProps(newProps) {
    const {
      getCities,
      getSubcategories,
      countries,
      cities,
      categories,
      subcategories,
      interests,
      business
    } = newProps;
    if (business) {
      if (!this.props.countries.length && countries.length) {
        this.setState({ country: business.country_id });
        getCities(business.country_id);
      }
      if (!this.props.cities.length && cities.length) {
        this.setState({ city: business.city_id });
      }
      if (!this.props.categories.length && categories.length) {
        this.setState({ category: business.top_category.id });
        getSubcategories(business.top_category.id);
      }
      if (!this.props.subcategories.length && subcategories.length) {
        this.setState({ subcategory: business.category.id });
      }
      this.setState({ price: business.price });
    }
  }

  onPhotoPress() {
    ImagePicker.showImagePicker({ title: 'Add a photo' }, response => {
      if (!response.didCancel) {
        this.onPropChange('media', response);
      }
    });
  }

  renderPhoto() {
    const { media, main_image } = this.state;
    const { addPhotoStyle, photoStyle, textStyle } = styles;
    if (media) {
      return (
        <TouchableOpacity
          onPress={this.onPhotoPress.bind(this)}
          style={[addPhotoStyle, { backgroundColor: 'white' }]}
        >
          <Image style={photoStyle} source={media} />
        </TouchableOpacity>
      );
    }
    if (main_image) {
      return (
        <TouchableOpacity
          onPress={this.onPhotoPress.bind(this)}
          style={[addPhotoStyle, { backgroundColor: 'white' }]}
        >
          <Image style={photoStyle} source={{ uri: main_image }} />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        onPress={this.onPhotoPress.bind(this)}
        style={addPhotoStyle}
      >
        <Image source={require('../assets/add_photo.png')} />
        <Text style={textStyle}>Add a photo</Text>
      </TouchableOpacity>
    );
  }

  onButtonPress() {
    const { countries, cities, business, submitBusiness, onSubmit } = this.props;
    const business_id = business && business.id; 
    const {
      media,
      name,
      nameAr,
      address,
      addressAr,
      email,
      phone,
      website,
      facebook,
      description,
      descriptionAr,
      country,
      city,
      category,
      subcategory,
      operationHours,
      price,
      flags,
      interests,
      region
    } = this.state;
    const flagsStr = flags.map(flag => flag.id).join(',');
    const interestsStr = interests.map(interest => interest.label).join(',');
    const { latitude, longitude } = region;
    submitBusiness(
      media,
      name,
      nameAr,
      address,
      addressAr,
      email,
      phone,
      website,
      facebook,
      description,
      descriptionAr,
      country,
      city,
      category,
      subcategory,
      operationHours,
      price,
      flagsStr,
      interestsStr,
      latitude,
      longitude,
      business_id,
      onSubmit
    );
  }

  renderButton() {
    const { business, loading } = this.props;
    if (this.props.loading) return <Spinner />;
    return <Button onPress={this.onButtonPress.bind(this)}>{business ? 'UPDATE' : 'CREATE'}</Button>;
  }

  onPropChange(key, value) {
    this.setState({ [key]: value });
  }

  renderCountries() {
    return this.props.countries.map(country => {
      return <Picker.Item key={country.id} label={country.name} value={country.id} />;
    });
  }

  renderCities() {
    return this.props.cities.map(city => {
      return <Picker.Item key={city.id} label={city.name} value={city.id} />;
    });
  }

  renderCategories() {
    return this.props.categories.map(category => {
      return <Picker.Item key={category.id} label={category.name} value={category.id} />;
    });
  }

  renderSubcategories() {
    return this.props.subcategories.map(subcategory => {
      return <Picker.Item key={subcategory.id} label={subcategory.name} value={subcategory.id} />;
    });
  }

  onCategoryChange(value) {
    this.onPropChange('category', value);
    this.onPropChange('subcategory', '');
    this.props.getSubcategories(value);
  }

  onCountryChange(value) {
    this.onPropChange('country', value);
    this.onPropChange('city', '');
    this.props.getCities(value);
  }

  format(date) {
    result = '';
    hours = date.getHours();
    meridiem = hours < 12 ? 'AM' : 'PM';
    if (hours === 0) hours = 12;
    if (hours > 12) hours -= 12;
    if (hours < 10) hours = '0' + hours;
    minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    return hours + ':' + minutes + ' ' + meridiem;
  }

  handleFromPickerConfirm(time) {
    const { fromTime, toTime } = this.state;
    this.onPropChange('operationHours', 'from ' + this.format(fromTime) + ' to ' + this.format(toTime));
    this.setState({ fromTime: time, fromTimePickerVisible: false });
  }

  handleToPickerConfirm(time) {
    const { fromTime, toTime } = this.state;
    this.onPropChange('operationHours', 'from ' + this.format(fromTime) + ' to ' + this.format(toTime));
    this.setState({ toTime: time, toTimePickerVisible: false });
  }

  render() {
    const {
      scrollViewStyle,
      imageStyle,
      containerStyle,
      addPhotoStyle,
      photoStyle,
      textContainerStyle,
      textStyle,
      selectStyle,
      timeStyle,
      signUpStyle
    } = styles;
    const {
      country,
      city,
      category,
      subcategory,
      operationHours,
      price,
      flags,
      interests,
      region,
      fromTimePickerVisible,
      fromTime,
      toTimePickerVisible,
      toTime,
      flagsModalVisible,
      interestsModalVisible
    } = this.state;
    const {
      flagsModal,
      interestsModal,
      regionModal
    } = this.refs;
    const fields = [
      { name: 'name', placeholder: 'Name' },
      { name: 'nameAr', placeholder: 'Arabic name' },
      { name: 'address', placeholder: 'Address' },
      { name: 'addressAr', placeholder: 'Arabic address' },
      { name: 'email', placeholder: 'Email' },
      { name: 'phone', placeholder: 'Phone number' },
      { name: 'website', placeholder: 'Website' },
      { name: 'facebook', placeholder: 'Facebook' },
      { name: 'description', placeholder: 'Description', multiline: true },
      { name: 'descriptionAr', placeholder: 'Arabic description', multiline: true },
      { name: 'lat', placeholder: 'Latitude' },
      { name: 'lng', placeholder: 'Longitude' }
    ];
    return (
      <KeyboardAvoidingView behavior={OS === 'ios' ? "padding" : null}>
        <ScrollView style={scrollViewStyle}>
          <Card style={imageStyle}>
            <CardSection style={containerStyle}>
              {this.renderPhoto()}
              {fields.map(field => {
                return (
                  <Input
                    key={field.name}
                    value={this.state[field.name]}
                    onChangeText={this.onPropChange.bind(this, field.name)}
                    placeholder={field.placeholder}
                    type="dark"
                    textAlign="left"
                    multiline={field.multiline}
                  />
                );
              })}
              <Picker
                style={selectStyle}
                selectedValue={country}
                onValueChange={(value, index) => this.onCountryChange(value)}
              >
                <Picker.Item label="Choose country" value="" />
                {this.renderCountries()}
              </Picker>
              <Picker
                style={selectStyle}
                selectedValue={city}
                onValueChange={(value, index) => this.onPropChange('city', value)}
              >
                <Picker.Item label="Choose city" value="" />
                {this.renderCities()}
              </Picker>
              <Picker
                style={selectStyle}
                selectedValue={category}
                onValueChange={(value, index) => this.onCategoryChange(value)}
              >
                <Picker.Item label="Choose category" value="" />
                {this.renderCategories()}
              </Picker>
              <Picker
                style={selectStyle}
                selectedValue={subcategory}
                onValueChange={(value, index) => this.onPropChange('subcategory', value)}
              >
                <Picker.Item label="Choose subcategory" value="" />
                {this.renderSubcategories()}
              </Picker>
              <Picker
                style={selectStyle}
                selectedValue={price}
                onValueChange={(value, index) => this.onPropChange('price', value)}
              >
                <Picker.Item label="Choose price" value="0" />
                {['1', '2', '3', '4', '5'].map(i => <Picker.Item key={i} label={i} value={i} />)}
              </Picker>
              <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10
              }}>
                <Text style={{ flex: 1 }}>Operation hours</Text>
                <TouchableOpacity
                  style={timeStyle}
                  onPress={() => this.setState({ fromTimePickerVisible: true })}
                >
                  <Text>{this.format(fromTime)}</Text>
                </TouchableOpacity>
                <Text> : </Text>
                <TouchableOpacity
                  style={timeStyle}
                  onPress={() => this.setState({ toTimePickerVisible: true })}
                >
                  <Text>{this.format(toTime)}</Text>
                </TouchableOpacity>
                <DateTimePicker
                  isVisible={fromTimePickerVisible}
                  onConfirm={time => this.handleFromPickerConfirm(time)}
                  onCancel={() => this.setState({ fromTimePickerVisible: false })}
                  mode="time"
                  is24Hour={false}
                  date={fromTime}
                />
                <DateTimePicker
                  isVisible={toTimePickerVisible}
                  onConfirm={time => this.handleToPickerConfirm(time)}
                  onCancel={() => this.setState({ toTimePickerVisible: false })}
                  mode="time"
                  is24Hour={false}
                  date={toTime}
                />
              </View>
              <TouchableOpacity
                style={timeStyle}
                onPress={() => flagsModal.open()}
              >
                <Text>Choose flags ({flags.length} selected)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={timeStyle}
                onPress={() => interestsModal.open()}
              >
                <Text>Choose interests ({interests.length} selected)</Text>
              </TouchableOpacity>
              {this.renderButton()}
            </CardSection>
          </Card>
        </ScrollView>
        <Modal
          ref="flagsModal"
          onRequestClose={() => null}
          style={{ height: '50%' }}
          backdrop
        >
          <SelectMultiple
            items={this.props.flags.map(flag => {
              return { label: flag.name || flag.label, value: flag.id || flag.value };
            })}
            selectedItems={flags.map(flag => {
              return { label: flag.name || flag.label, value: flag.id || flag.value };
            })}
            onSelectionsChange={flags => this.onPropChange('flags', flags.map(flag => {
              return { label: flag.name || flag.label, value: flag.id || flag.value };
            }))}
          />
        </Modal>
        <Modal
          ref="interestsModal"
          onRequestClose={() => null}
          style={{ height: '50%' }}
          backdrop
        >
          <SelectMultiple
            items={this.props.interests.map(interest => {
              return { label: interest.name || interest.label, value: interest.name || interest.label };
            })}
            selectedItems={interests.map(interest => {
              return { label: interest.name || interest.label, value: interest.name || interest.label };
            })}
            onSelectionsChange={interests => this.onPropChange('interests', interests.map(interest => {
              return { label: interest.name || interest.label, value: interest.name || interest.label };
            }))}
          />
        </Modal>
        <Modal
          ref="regionModal"
          onRequestClose={() => null}
          style={{ height: '50%' }}
          backdrop
          swipeToClose={false}
        >
          <MapView
            style={{ width: '100%', height: '100%' }}
            initialRegion={region}
            onRegionChange={region => this.onPropChange('region', region)}
          />
        </Modal>
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  scrollViewStyle: {
    marginBottom: 5
  },
  imageStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  containerStyle: {
    display: 'flex',
  	flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  addPhotoStyle: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#242424',
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  photoStyle: {
  	width: '100%',
    height: 120,
    resizeMode: 'contain',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  textContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  textStyle: {
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginTop: 10
  },
  selectStyle: {
    flex: 1,
    width: '100%',
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    shadowColor: '#7c7c7c',
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    elevation: 2
  },
  timeStyle: {
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 10
  },
  signUpStyle: {
    textDecorationLine: 'underline'
  }
};

const mapStateToProps = ({ businessForm }) => {
  const {
    countries,
    cities,
    categories,
    subcategories,
    flags,
    interests,
    error,
    loading
  } = businessForm;
  return {
    countries,
    cities,
    categories,
    subcategories,
    flags,
    interests,
    error,
    loading
  };
};

export default connect(mapStateToProps, {
  getCountries,
  getCities,
  getCategories,
  getSubcategories,
  getFlags,
  getInterests,
  submitBusiness
})(BusinessForm);
