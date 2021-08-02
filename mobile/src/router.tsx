import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//views
import MainView from './views/home';

const RootStack = createStackNavigator();

const StackMainApplication: React.FC = () => (
  <RootStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <RootStack.Screen name="Splash" component={MainView} />
  </RootStack.Navigator>
);

const MainNavigator: React.FC = () => {
  return <StackMainApplication />;
};

export default MainNavigator;
