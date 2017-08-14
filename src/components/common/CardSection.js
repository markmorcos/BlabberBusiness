import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
  return (
    <View style={[styles.containerStyle, props.style]}>{props.children}</View>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    borderColor: '#DDD',
    padding: 15,
    backgroundColor: '#FFF',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  }
};

export { CardSection };
