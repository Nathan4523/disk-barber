import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Routes from './src/routes';

const fetchFonts = () => {
  return Font.loadAsync({
    'RobotoSlab-Medium': require('./assets/fonts/RobotoSlab-Medium.ttf'),
    'RobotoSlab-Regular': require('./assets/fonts/RobotoSlab-Regular.ttf'),
  });
}

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      />
    )
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
      <Routes />
    </NavigationContainer>
  );
}