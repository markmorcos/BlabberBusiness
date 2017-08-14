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
import { photoChanged, propChanged, registerUser } from '../actions';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';

class SignUpForm extends Component {
  onPhotoPress() {
    ImagePicker.showImagePicker({ title: 'Add a photo' }, response => {
      if (!response.didCancel) {
        this.props.photoChanged(response);
      }
    });
  }

  renderPhoto() {
    const { media } = this.props;
    const { addPhotoStyle, iconStyle, photoStyle, textStyle } = styles;
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
        <Image style={iconStyle} source={require('../assets/add_photo.png')} />
        <Text style={textStyle}>Add a photo</Text>
      </TouchableOpacity>
    );
  }

  onButtonPress() {
    const {
      media,
      name,
      username,
      mobile,
      email,
      password,
      registerUser
    } = this.props;
    registerUser({ media, name, username, mobile, email, password });
  }

  renderButton() {
    if (this.props.loading) return <Spinner />;
    return <Button onPress={this.onButtonPress.bind(this)}>REGISTER</Button>;
  }

  onPropChange(key, value) {
    this.props.propChanged(key, value);
  }

  render() {
    const {
      imageStyle,
      containerStyle,
      inputStyle,
      textContainerStyle,
      textStyle,
      signUpStyle
    } = styles;
    const fields = [
      { name: 'name', placeholder: 'Business account name' },
      { name: 'username', placeholder: 'Username' },
      { name: 'mobile', placeholder: 'Mobile' },
      { name: 'email', placeholder: 'Email' },
      { name: 'password', placeholder: 'Password' }
    ];
    return (
      <Image style={imageStyle} source={require('../assets/sign_up_screen.png')}>
        <View style={containerStyle}>
          {this.renderPhoto()}
          {fields.map(field => {
            return (
              <Input
                key={field.name}
                style={inputStyle}
                value={this.props[field.name]}
                onChangeText={this.onPropChange.bind(this, field.name)}
                placeholder={field.placeholder}
                textAlign="center"
                type="dark"
              />
            );
          })}
          {this.renderButton()}
          <View style={textContainerStyle}>
            <Text style={textStyle}>Check our </Text>
            <TouchableWithoutFeedback onPress={() => Actions.privacy()}>
              <View><Text style={[textStyle, signUpStyle]}>privacy policy</Text></View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Image>
    );
  }
}

const styles = {
  imageStyle: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  containerStyle: {
    width: '60%',
    marginBottom: '5%',
    alignItems: 'center'
  },
  addPhotoStyle: {
    backgroundColor: '#242424',
    marginBottom: 35,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconStyle: {
    width: 25,
    height: 25
  },
  photoStyle: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  inputStyle: {
    marginBottom: 5
  },
  textContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  textStyle: {
    color: 'white',
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
    name,
    username,
    mobile,
    email,
    password,
    error,
    loading
  } = auth;
  return { media, name, username, mobile, email, password, error, loading };
};

export default connect(mapStateToProps, {
  photoChanged,
  propChanged,
  registerUser
})(SignUpForm);