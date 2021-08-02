import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SignIn from '../views/signIn';
import SignUp from '../views/signUp';

const App = createStackNavigator();

const AppRoute: React.FC = () => {
  return (
    <App.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#ffffff'},
      }}>
      <App.Screen name="SignIn" component={SignIn} />
      <App.Screen name="SignUp" component={SignUp} />
    </App.Navigator>
  );
};

export default AppRoute;
