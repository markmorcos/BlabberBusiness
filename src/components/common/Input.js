import React from 'react';
import { View, Text, TextInput } from 'react-native';

const Input = ({
    style,
    label,
    value,
    type,
    textAlign,
    onChangeText,
    placeholder,
    secureTextEntry
  }) => {
  const { containerStyle, labelStyle, inputStyle } = styles;
  const color = type === 'dark' ? 'black' : 'white';
  const placeholderColor = type === 'dark' ? '#8d8d8d' : 'white';
  return (
    <View style={[style, containerStyle]}>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        underlineColorAndroid={placeholderColor}
        style={[inputStyle, { color, textAlign }]}
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = {
  containerStyle: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputStyle: {
    height: 40,
    paddingRight: 5,
    paddingLeft: 5,
    marginBottom: 30,
    fontSize: 12,
    lineHeight: 12,
    flex: 1,
    textAlign: 'center'
  }
};

export { Input };
