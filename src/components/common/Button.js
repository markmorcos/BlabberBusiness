import React from 'react';
import { TouchableWithoutFeedback, TouchableOpacity, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Button = ({ disabled, style, onPress, children }) => {
  const { buttonStyle, textStyle } = styles;
  const Touchable = disabled ? TouchableWithoutFeedback : TouchableOpacity;
  return (
    <Touchable onPress={disabled ? () => {} : onPress} style={[buttonStyle, style]}>
      <LinearGradient colors={disabled ? ['#ddd', '#aaa'] : ['#00a8ff', '#0e49c1']} style={buttonStyle}>
        <Text style={textStyle}>{children}</Text>
      </LinearGradient>
    </Touchable>
  );
};

const styles = {
  buttonStyle: {
    alignSelf: 'stretch',
    height: 30,
    borderRadius: 15,
  },
  textStyle: {
    alignSelf: 'center',
    color: '#FFF',
    backgroundColor: 'transparent',
    fontSize: 12,
    fontWeight: 'bold',
    paddingTop: 7.5,
    paddingBottom: 7.5
  }
};

export { Button };
