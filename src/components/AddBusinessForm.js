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
  propChanged,
  getCountries,
  getCities,
  getCategories,
  getSubcategories,
  getFlags,
  getInterests,
  createBusiness
} from '../actions';
import ImagePicker from 'react-native-image-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Select, Option } from 'react-native-select-list';
import Modal from 'react-native-modalbox';
import SelectMultiple from 'react-native-select-multiple';
import MapView from 'react-native-maps';
import _ from 'lodash';

const { OS } = Platform;

class AddBusinessForm extends Component {
  state = {
    fromTimePickerVisible: false,
    fromTime: new Date(1970, 1, 1, 0, 0, 0, 0),
    toTimePickerVisible: false,
    toTime: new Date(1970, 1, 1, 0, 0, 0, 0),
    flagsModalVisible: false,
    interestsModalVisible: false,
    loaded: false
  };

  componentWillMount() {
    const {
      getCountries,
      getCategories,
      getFlags,
      getInterests,
      business
    } = this.props;
    console.log(business);
    getCountries();
    getCategories();
    getFlags();
    getInterests();
    _.each(business, (value, key) => this.onPropChange(key, value));
    const tokens = business.operation_hours.split(/ |:/);
    const fromHours = parseInt(tokens[1]) + (tokens[3] === 'PM' ? 12 : 0);
    const toHours = parseInt(tokens[5]) + (tokens[7] === 'PM' ? 12 : 0);
    const fromTime = new Date(1970, 1, 1, fromHours, parseInt(tokens[2]), 0, 0);
    const toTime = new Date(1970, 1, 1, toHours, parseInt(tokens[6]), 0, 0);
    this.setState({ fromTime, toTime });
    this.onPropChange('interests', []);
  }

  componentDidMount() {
    const { business } = this.props;
    this.refs.price.onOptionPressed(business.price, business.price);
  }

  componentWillReceiveProps(newProps) {
    const {
      getCities,
      getSubcategories,
      countries,
      cities,
      categories,
      subcategories,
      business,
      loaded
    } = newProps;
    const {
      country,
      city,
      category,
      subcategory,
    } = this.refs;
    if (!this.props.countries.length && countries.length) {
      country.onOptionPressed(business.country_id, business.country);
      getCities(business.country_id);
    }
    if (!this.props.cities.length && cities.length) {
      city.onOptionPressed(business.city_id, business.city);
    }
    if (!this.props.categories.length && categories.length) {
      category.onOptionPressed(business.category_id, business.category.name);
      getSubcategories(business.category_id);
    }
    if (!this.props.subcategories.length && subcategories.length) {
      subcategory.onOptionPressed(business.subcategory_id, business.subcategory.name);
    }
    // if (categories.length && !subcategories.length) getSubcategories(business.category_id);
    // if (!this.state.loaded && countries.length && cities.length && categories.length) {
    //   console.log(business);
    //   console.log(cities);
    //   country.onOptionPressed(business.country_id, business.country);
    //   city.onOptionPressed(business.city_id, business.city);
    //   category.onOptionPressed(business.category_id, business.category.name);
    //   // subcategory.onOptionPressed(business.subcategory_id, business.subcategory.name);
    //   this.setState({ loaded: true });
    // }
  }

  onPhotoPress() {
    ImagePicker.showImagePicker({ title: 'Add a photo' }, response => {
      if (!response.didCancel) {
        this.props.propChanged('media', response);
      }
    });
  }

  renderPhoto() {
    const { media } = this.props;
    const { addPhotoStyle, photoStyle, textStyle } = styles;
    if (media) {
      return (
        <TouchableOpacity
          onPress={this.onPhotoPress.bind(this)}
          style={[addPhotoStyle, photoStyle]}
        >
          <Image style={photoStyle} source={media} />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        onPress={this.onPhotoPress.bind(this)}
        style={[addPhotoStyle, photoStyle]}
      >
        <Image source={require('../assets/add_photo.png')} />
        <Text style={textStyle}>Add a photo</Text>
      </TouchableOpacity>
    );
  }

  onButtonPress() {
    this.props.createBusiness();
  }

  renderButton() {
    if (this.props.loading) return <Spinner />;
    return <Button onPress={this.onButtonPress.bind(this)}>CREATE</Button>;
  }

  onPropChange(key, value) {
    this.props.propChanged(key, value);
  }

  renderCountries() {
    return this.props.countries.map(country => {
      return <Option key={country.id} value={country.id}>{country.name}</Option>;
    });
  }

  renderCities() {
    return this.props.cities.map(city => {
      return <Option key={city.id} value={city.id}>{city.name}</Option>;
    });
  }

  renderCategories() {
    return this.props.categories.map(category => {
      return <Option key={category.id} value={category.id}>{category.name}</Option>;
    });
  }

  renderSubcategories() {
    return this.props.subcategories.map(subcategory => {
      return <Option key={subcategory.id} value={subcategory.id}>{subcategory.name}</Option>;
    });
  }

  onCategoryChange(value) {
    this.onPropChange('category', value);
    this.props.getSubcategories(value);
  }

  onCountryChange(value) {
    this.onPropChange('country', value);
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
      flags,
      interests,
      country,
      city,
      category,
      subcategory,
      operationHours,
      price,
      selectedFlags,
      selectedInterests,
      region
	  } = this.props;
    const {
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
      { name: 'phone', placeholder: 'Phone number' },
      { name: 'website', placeholder: 'Website' },
      { name: 'facebook', placeholder: 'Facebook' },
      { name: 'description', placeholder: 'Description', multiline: true },
      { name: 'descriptionAr', placeholder: 'Arabic description', multiline: true }
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
                    value={this.props[field.name]}
                    onChangeText={this.onPropChange.bind(this, field.name)}
                    placeholder={field.placeholder}
                    type="dark"
                    textAlign="left"
                    multiline={field.multiline}
                  />
                );
              })}
              <Select
                ref="country"
                selectStyle={selectStyle}
                selectedValue={country}
                onSelect={(value, text) => this.onCountryChange(value)}
                default="Choose country"
                caret="down"
                caretSize={10}
                caretColor="#797979"
              >
                {this.renderCountries()}
              </Select>
              <Select
                ref="city"
                selectStyle={selectStyle}
                selectedValue={city}
                onSelect={(value, text) => this.onPropChange('city', value)}
                default="Choose city"
                caret="down"
                caretSize={10}
                caretColor="#797979"
              >
                {this.renderCities()}
              </Select>
              <Select
                ref="category"
                selectStyle={selectStyle}
                selectedValue={category}
                onSelect={(value, text) => this.onCategoryChange(value)}
                default="Choose category"
                caret="down"
                caretSize={10}
                caretColor="#797979"
              >
                {this.renderCategories()}
              </Select>
              <Select
                ref="subcategory"
                selectStyle={selectStyle}
                selectedValue={subcategory}
                onSelect={(value, text) => this.onPropChange('subcategory', value)}
                default="Choose subcategory"
                caret="down"
                caretSize={10}
                caretColor="#797979"
              >
                {this.renderSubcategories()}
              </Select>
              <Select
                ref="price"
                selectStyle={selectStyle}
                selectedValue={price}
                onSelect={(value, text) => this.onPropChange('price', value)}
                default="Choose price range"
                caret="down"
                caretSize={10}
                caretColor="#797979"
              >
                {[1, 2, 3, 4, 5].map(i => <Option key={i} value={i}>{i}</Option>)}
              </Select>
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
                <Text>Choose flags ({selectedFlags.length} selected)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={timeStyle}
                onPress={() => interestsModal.open()}
              >
                <Text>Choose interests ({selectedInterests.length} selected)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={timeStyle}
                onPress={() => regionModal.open()}
              >
                <Text>Choose region</Text>
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
            items={flags.map(flag => {
              return { label: flag.name, value: flag.id };
            })}
            selectedItems={selectedFlags}
            onSelectionsChange={selectedFlags => this.onPropChange('selectedFlags', selectedFlags)}
          />
        </Modal>
        <Modal
          ref="interestsModal"
          onRequestClose={() => null}
          style={{ height: '50%' }}
          backdrop
        >
          <SelectMultiple
            items={interests.map(interest => {
              return { label: interest.name, value: interest.id };
            })}
            selectedItems={selectedInterests}
            onSelectionsChange={selectedInterests => this.onPropChange('selectedInterests', selectedInterests)}
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
    backgroundColor: '#242424',
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  photoStyle: {
  	width: '100%',
    height: 120,
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
    media,
    name,
    nameAr,
    address,
    addressAr,
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
    selectedFlags,
    selectedInterests,
    region,
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
    media,
    name,
    nameAr,
    address,
    addressAr,
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
    selectedFlags,
    selectedInterests,
    region,
    error,
    loading
  };
};

export default connect(mapStateToProps, {
  propChanged,
  getCountries,
  getCities,
  getCategories,
  getSubcategories,
  getFlags,
  getInterests,
  createBusiness
})(AddBusinessForm);
