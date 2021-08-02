import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import Router from './src/routes';

import AppProvider from './src/hooks';

const App = () => {
  return (
    <NavigationContainer>
      <AppProvider>
        <Router />
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
