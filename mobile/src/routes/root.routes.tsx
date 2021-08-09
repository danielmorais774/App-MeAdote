import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import appRoutes from './app.routes';
import Pet from '../views/pet';
import EditProfile from '../views/myProfile/editProfile';
import MyPets from '../views/myProfile/myPets';
import AddOrEditPet from '../views/AddOrEditPet';
import AdoptionRequestsReceived from '../views/adoptionRequests';

const App = createStackNavigator();

const AppRoute: React.FC = () => {
  return (
    <App.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#ffffff'},
      }}>
      <App.Screen name="AppBottom" component={appRoutes} />
      <App.Screen name="Pet" component={Pet} />
      <App.Screen name="EditProfile" component={EditProfile} />
      <App.Screen name="MyPets" component={MyPets} />
      <App.Screen name="AddOrEditPet" component={AddOrEditPet} />
      <App.Screen
        name="AdoptionRequestsReceived"
        component={AdoptionRequestsReceived}
      />
    </App.Navigator>
  );
};

export default AppRoute;
