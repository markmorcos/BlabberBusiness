import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <LinearGradient colors={['#00a8ff', '#0e49c1']} style={buttonStyle}>
        <Text style={textStyle}>{children}</Text>
      </LinearGradient>
    </TouchableOpacity>
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
    fontSize: 12,
    fontWeight: '600',
    paddingTop: 7.5,
    paddingBottom: 7.5
  }
};

export { Button };
