import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import appRoutes from './app.routes';
import Pet from '../views/pet';
import SignIn from '../views/signIn';
import SignUp from '../views/signUp';
import EditProfile from '../views/myProfile/editProfile';

import {useAuth} from '../hooks/auth';

const App = createStackNavigator();

const AppRoute: React.FC = () => {
  const {user} = useAuth();

  return (
    <App.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#ffffff'},
      }}>
      <App.Screen name="AppBottom" component={appRoutes} />
      <App.Screen name="Pet" component={Pet} />
      <App.Screen name="EditProfile" component={EditProfile} />
    </App.Navigator>
  );
};

export default AppRoute;
