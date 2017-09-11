import React, { Component } from 'react';
import {
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
  createBusiness
} from '../actions';
import ImagePicker from 'react-native-image-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';

class AddBusinessForm extends Component {
  state = {
    fromTimePickerVisible: false,
    fromTime: new Date(),
    toTimePickerVisible: false,
    toTime: new Date()
  };

  componentWillMount() {
    this.props.getCategories();
    this.props.getCountries();
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
      signUpStyle
    } = styles;
    const {
      media,
      location,
      country,
      city,
      category,
      subcategory,
      operationHours,
      price
	  } = this.props;
    const {
      fromTimePickerVisible,
      fromTime,
      toTimePickerVisible,
      toTime
    } = this.state;
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
            <Picker
              style={{ width: '100%' }}
              selectedValue={country}
              onValueChange={(value, index) => this.onCountryChange(value)}
            >
              <Picker.Item key="0" label="(Choose country)" value="0" />
              {this.renderCountries()}
            </Picker>
            <Picker
              style={{ width: '100%' }}
              selectedValue={city}
              onValueChange={(value, index) => this.onPropChange('city', value)}
            >
              <Picker.Item key="0" label="(Choose city)" value="0" />
              {this.renderCities()}
            </Picker>
            <Picker
              style={{ width: '100%' }}
              selectedValue={category}
              onValueChange={(value, index) => this.onCategoryChange(value)}
            >
              <Picker.Item key="0" label="(Choose category)" value="0" />
              {this.renderCategories()}
            </Picker>
            <Picker
              style={{ width: '100%' }}
              selectedValue={subcategory}
              onValueChange={(value, index) => this.onPropChange('subcategory', value)}
            >
              <Picker.Item key="0" label="(Choose subcategory)" value="0" />
              {this.renderSubcategories()}
            </Picker>
            <Picker
              style={{ width: '100%' }}
              selectedValue={price}
              onValueChange={(value, index) => this.onPropChange('price', value)}
            >
              <Picker.Item key="0" label="(Choose price range)" value="0" />
              <Picker.Item key="1" label="1" value="1" />
              <Picker.Item key="2" label="2" value="2" />
              <Picker.Item key="3" label="3" value="3" />
              <Picker.Item key="4" label="4" value="4" />
              <Picker.Item key="5" label="5" value="5" />
              {this.renderSubcategories()}
            </Picker>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
              marginBottom: 10
            }}>
              <Text style={{ flex: 1 }}>Operation hours</Text>
              <TouchableOpacity
                style={{ padding: 5, borderRadius: 10, backgroundColor: '#f9f9f9' }}
                onPress={() => this.setState({ fromTimePickerVisible: true })}
              >
                <Text>{this.format(fromTime)}</Text>
              </TouchableOpacity>
              <Text> : </Text>
              <TouchableOpacity
                style={{ padding: 5, borderRadius: 10, backgroundColor: '#f9f9f9' }}
                onPress={() => this.setState({ toTimePickerVisible: true })}
              >
                <Text>{this.format(toTime)}</Text>
              </TouchableOpacity>
            </View>
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
            {/* flags, interests */}
            {/* location */}
            {this.renderButton()}
          </CardSection>
        </Card>
      </ScrollView>
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
    name,
    nameAr,
    address,
    addressAr,
    phone,
    website,
    facebook,
    description,
    descriptionAr,
    media,
    location,
    country,
    city,
    category,
    subcategory,
    operationHours,
    price,
    error,
    loading
  } = businessForm;
  return {
    countries,
    cities,
    categories,
    subcategories,
    name,
    nameAr,
    address,
    addressAr,
    phone,
    website,
    facebook,
    description,
    descriptionAr,
    media,
    location,
    country,
    city,
    category,
    subcategory,
    operationHours,
    price,
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
  createBusiness
})(AddBusinessForm);
