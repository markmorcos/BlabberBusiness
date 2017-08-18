import React, { Component } from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  View,
  Image,
  Text,
  TouchableWithoutFeedback
} from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { connect } from 'react-redux';
import { propChanged, loginUser } from '../actions';
import { Actions } from 'react-native-router-flux';

const { OS } = Platform;

class LoginForm extends Component {
  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner />;
    }
    return <Button onPress={this.onButtonPress.bind(this)}>LOGIN NOW</Button>;
  }

  onPropChanged(key, value) {
    this.props.propChanged(key, value);
  }

  render() {
    const {
      imageStyle,
      containerStyle,
      textContainerStyle,
      textStyle,
      signUpStyle
    } = styles;
    return (
      <KeyboardAvoidingView behavior={OS === 'ios' ? "padding" : null}>
        <Image style={imageStyle} source={require('../assets/login_screen.png')}>
          <View style={containerStyle}>
            <Input
              value={this.props.email}
              onChangeText={this.onPropChanged.bind(this, 'email')}
              placeholder="Email"
              textAlign="center"
            />
            <Input
              value={this.props.password}
              onChangeText={this.onPropChanged.bind(this, 'password')}
              placeholder="Password"
              textAlign="center"
              secureTextEntry
            />
            {this.renderButton()}
            <View style={textContainerStyle}>
              <Text style={textStyle}>Don't have an account? </Text>
              <TouchableWithoutFeedback onPress={() => Actions.signUp()}>
                <View><Text style={[textStyle, signUpStyle]}>Sign up</Text></View>
              </TouchableWithoutFeedback>
              <Text style={textStyle}> now</Text>
            </View>
          </View>
        </Image>
      </KeyboardAvoidingView>
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
    marginBottom: 60
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
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};

export default connect(mapStateToProps, { propChanged, loginUser })(LoginForm);
