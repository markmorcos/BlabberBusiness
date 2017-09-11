import React from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';

const NavigationBar = () => {
  return (
    <View style={{ width: '100%' }}>
      <Image style={{
        position: 'absolute',
        width: 80,
        height: 80,
        bottom: -5,
        alignSelf: 'center'
      }} source={require('../assets/notifications_icon.png')} />
      <View
        style={{
          height: 60,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: 'white',
          overflow: 'hidden'
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            if (Actions.currentScene !== 'dashboard') {
              Actions.dashboard({ type: 'replace' });
            }
          }}
        >
          <Image style={{ width: 35, height: 35 }} source={require('../assets/home_icon.png')} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            if (Actions.currentScene !== 'notifications') {
              Actions.notifications({ type: 'replace' });
            }
          }}
        >
          <Image style={{ position: 'relative', bottom: 5, width: 80, height: 80 }} source={require('../assets/notifications_icon.png')} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            if (Actions.currentScene !== 'settings') {
              Actions.settings({ type: 'replace' });
            }
          }}
        >
          <Image style={{ width: 35, height: 35 }} source={require('../assets/settings_icon.png')} />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default NavigationBar;