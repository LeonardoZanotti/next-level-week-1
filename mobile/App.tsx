import React from 'react';
import { useFonts } from '@use-expo/font';
import { StatusBar } from 'react-native';
import { AppLoading } from 'expo';

import Routes from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto_400Regular': require('./src/assets/fonts/Roboto-Regular.ttf'),
    'Roboto_500Medium': require('./src/assets/fonts/Roboto-Medium.ttf'),
    'Ubuntu_700Bold': require('./src/assets/fonts/Ubuntu-Bold.ttf')
  });

  if(!fontsLoaded) {
    return <AppLoading />
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Routes />
    </>
  );
}