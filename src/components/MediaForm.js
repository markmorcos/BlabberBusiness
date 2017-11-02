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
import { submitMedia } from '../actions';
import ImagePicker from 'react-native-image-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';

const { OS } = Platform;

class MediaForm extends Component {
  state = {
    media: '',
    type: 'image',
    caption: '',
    rating: ''
  };

  onPhotoPress() {
    ImagePicker.showImagePicker({ title: 'Add a photo' }, response => {
      if (!response.didCancel) {
        this.onPropChange('media', response);
      }
    });
  }

  renderPhoto() {
    const { media } = this.state;
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
    const { business_id, submitMedia, onSubmit } = this.props;
    const { media, type, caption, rating } = this.state;
    submitMedia(business_id, media, type, caption, rating, onSubmit);
  }

  renderButton() {
    const { loading } = this.props;
    if (this.props.loading) return <Spinner />;
    return <Button onPress={this.onButtonPress.bind(this)}>CREATE</Button>;
  }

  onPropChange(key, value) {
    this.setState({ [key]: value });
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
    const { media, type, caption, rating } = this.state;
    const fields = [
      { name: 'caption', placeholder: 'Caption', multiline: true }
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
                selectedValue={rating}
                onValueChange={(value, index) => this.onPropChange('rating', value)}
              >
                <Picker.Item label="Choose rating" value="0" />
                {['1', '2', '3', '4', '5'].map(i => <Picker.Item key={i} label={i} value={i} />)}
              </Picker>
              <Picker
                style={selectStyle}
                selectedValue={type}
                onValueChange={(value, index) => this.onPropChange('type', value)}
              >
                {['image', 'menu', 'product', 'brochure'].map(i => <Picker.Item key={i} label={i} value={i} />)}
              </Picker>
              {this.renderButton()}
            </CardSection>
          </Card>
        </ScrollView>
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
    height: 400,
    backgroundColor: '#242424',
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  photoStyle: {
  	width: '100%',
    height: 400,
    resizeMode: 'contain'
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
  const { error, loading } = businessForm;
  return { error, loading };
};

export default connect(mapStateToProps, { submitMedia })(MediaForm);
