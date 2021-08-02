import React from 'react';
import {Text} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

//views
import MainView from '../views/home';
import MyAdoptions from '../views/myAdoptions';
import MyProfile from '../views/myProfile';

const App = createBottomTabNavigator();

interface IIconItem {
  lib: any;
  name: string;
}

interface IIconObject {
  [key: string]: IIconItem;
}

const icons: IIconObject = {
  Home: {
    lib: Feather,
    name: 'home',
  },
  AdoptionRequests: {
    lib: Ionicons,
    name: 'paw-outline',
  },
  MyProfile: {
    lib: Feather,
    name: 'user',
  },
  Settings: {
    lib: Feather,
    name: 'settings',
  },
};

const AppRoute: React.FC = () => {
  return (
    <App.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          const {lib: Icon, name} = icons[route.name];
          return <Icon name={name} size={20} color={color} />;
        },
        tabBarLabel: ({color}) => {
          if (route.name === 'Write') {
            return null;
          }

          let routerName = '';
          switch (route.name) {
            case 'Home':
              routerName = 'Página Inicial';
              break;
            case 'AdoptionRequests':
              routerName = 'Solicitações';
              break;
            case 'MyProfile':
              routerName = 'Meu Perfil';
              break;
          }

          return (
            <Text
              style={{
                color: color,
                marginBottom: 0,
                fontSize: 11,
                bottom: 5,
              }}>
              {routerName}
            </Text>
          );
        },
      })}
      tabBarOptions={{
        style: {
          backgroundColor: '#FAFCFE',
          justifyContent: 'center',
          borderTopColor: 'rgba(255, 255, 255, 0.2)',
        },
        // tabStyle:{

        // },
        activeTintColor: '#3DC162',
        inactiveTintColor: '#C0C3CC',
      }}>
      <App.Screen
        name="Home"
        options={{
          title: 'Página Inicial',
        }}
        component={MainView}
      />
      <App.Screen name="AdoptionRequests" component={MyAdoptions} />
      <App.Screen name="MyProfile" component={MyProfile} />
      {/* <App.Screen name="Settings" component={MainView} /> */}
    </App.Navigator>
  );
};

export default AppRoute;
