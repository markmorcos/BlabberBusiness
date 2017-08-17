import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  BackHandler
} from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { connect } from 'react-redux';
import { photoChanged, propChanged, createBusiness } from '../actions';
import ImagePicker from 'react-native-image-picker';

class AddBusinessForm extends Component {
  onPhotoPress() {
    ImagePicker.showImagePicker({ title: 'Add a photo' }, response => {
      if (!response.didCancel) {
        this.props.photoChanged(response);
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
    const {
      media,
      business,
      username,
      mobile,
      email,
      password,
      createBusiness
    } = this.props;
    createBusiness({ media, business, username, mobile, email, password });
  }

  renderButton() {
    if (this.props.loading) return <Spinner />;
    return <Button onPress={this.onButtonPress.bind(this)}>CREATE</Button>;
  }

  onPropChange(key, value) {
    this.props.propChanged(key, value);
  }

  render() {
    const {
      imageStyle,
      containerStyle,
      addPhotoStyle,
      photoStyle,
      textContainerStyle,
      textStyle,
      signUpStyle
    } = styles;
    const {
    	business,
	    username,
	    mobile, 
	    number,
	    website,
	    facebook
	  } = this.props;
    return (
      <Card style={imageStyle}>
      	<CardSection style={containerStyle}>
          {this.renderPhoto()}
          <Input
            value={business}
            onChangeText={this.onPropChange.bind(this, 'business')}
            placeholder="Name"
            type="dark"
            textAlign="left"
          />
          <Input
            value={username}
            onChangeText={this.onPropChange.bind(this, 'address')}
            placeholder="Address"
            type="dark"
            textAlign="left"
          />
          <Input
            value={mobile}
            onChangeText={this.onPropChange.bind(this, 'location')}
            placeholder="Location"
            type="dark"
            textAlign="left"
          />
          <Input
            value={number}
            onChangeText={this.onPropChange.bind(this, 'number')}
            placeholder="Mobile number"
            type="dark"
            textAlign="left"
          />
          <Input
            value={website}
            onChangeText={this.onPropChange.bind(this, 'website')}
            placeholder="Website"
            type="dark"
            textAlign="left"
          />
          <Input
            value={facebook}
            onChangeText={this.onPropChange.bind(this, 'facebook')}
            placeholder="Facebook"
            type="dark"
            textAlign="left"
          />
          {this.renderButton()}
	      </CardSection>
      </Card>
    );
  }
}

const styles = {
  imageStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  containerStyle: {
  	flexDirection: 'column',
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
    height: 100,
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

const mapStateToProps = ({ auth }) => {
  const {
    media,
    business,
    username,
    mobile,
    email,
    password,
    error,
    loading
  } = auth;
  return { media, business, username, mobile, email, password, error, loading };
};

export default connect(mapStateToProps, {
  photoChanged,
  propChanged,
  createBusiness
})(AddBusinessForm);
