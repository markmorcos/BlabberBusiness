import React, { Component } from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { connect } from 'react-redux';
import { getLoginState, propChanged, updatePhoto, updateUser, updatePassword } from '../actions';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import NavigationBar from './NavigationBar';

const { OS } = Platform;

class Settings extends Component {
  componentWillMount() {
    this.props.getLoginState('settings');
  }

  onPhotoPress() {
    ImagePicker.showImagePicker({ title: 'Update photo' }, response => {
      if (!response.didCancel) {
        this.props.propChanged('media', response);
        this.props.updatePhoto(response);
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
        <Text style={textStyle}>Update photo</Text>
      </TouchableOpacity>
    );
  }

  onButtonPress() {
    const { name, username, mobile, updateUser } = this.props;
    updateUser({ name, username, mobile });
  }

  renderButton() {
    if (this.props.loading) return <Spinner />;
    return (
      <Button
        style={{ width: '90%', alignSelf: 'center' }}
        onPress={this.onButtonPress.bind(this)}
      >Update</Button>
    );
  }

  onPasswordButtonPress() {
    const { password, updatePassword } = this.props;
    updatePassword(password);
  }

  renderPasswordButton() {
    if (this.props.changing) return <Spinner />;
    return (
      <Button
        style={{ width: '90%', alignSelf: 'center', marginBottom: 20 }}
        onPress={this.onPasswordButtonPress.bind(this)}
      >Change Password</Button>
    );
  }

  onPropChange(key, value) {
    this.props.propChanged(key, value);
  }

  render() {
    const {
      imageStyle,
      containerStyle,
      mainContainerStyle,
      inputStyle,
      textContainerStyle,
      textStyle,
      signUpStyle
    } = styles;
    const fields = [
      { name: 'name', placeholder: 'Business account name' },
      { name: 'username', placeholder: 'Username' },
      { name: 'mobile', placeholder: 'Mobile' }
    ];
    return (
      <View style={containerStyle}>
        <KeyboardAvoidingView style={mainContainerStyle} behavior={OS === 'ios' ? "padding" : null}>
          <ScrollView
            bounces={false}
            style={{ width: '100%' }}
            contentContainerStyle={{ width: '100%', alignItems: 'center' }}
          >
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
            <Input
              style={[inputStyle, { marginTop: 35 }]}
              value={this.props.password}
              onChangeText={this.onPropChange.bind(this, 'password')}
              placeholder="Password"
              textAlign="center"
              type="dark"
              secureTextEntry
            />
            {this.renderPasswordButton()}
          </ScrollView>
        </KeyboardAvoidingView>
        <NavigationBar />
      </View>
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
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  mainContainerStyle: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    marginLeft: 5,
    marginRight: 5,
    paddingTop: 5,
    marginBottom: 5
  },
  addPhotoStyle: {
    marginTop: 90,
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
    width: '90%',
    marginBottom: 5
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
    name,
    username,
    mobile,
    password,
    error,
    loading,
    changing
  } = auth;
  return { media, name, username, mobile, password, error, loading, changing };
};

export default connect(mapStateToProps, {
  getLoginState,
  propChanged,
  updatePhoto,
  updateUser,
  updatePassword
})(Settings);
