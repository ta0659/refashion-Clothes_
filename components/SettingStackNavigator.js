import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Updateprofile from '../screens/Updateprofile';
import Reedencoupons from '../screens/Redeemcoupons';
import Aboutapp from '../screens/Aboutapp';
import Contactus from '../screens/Contactus';
import SettingScreen from '../screens/SettingScreen';

export const SettingStackNavigator = createStackNavigator(
  {
    
    SettingScreen: {
      screen: SettingScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Updateprofile: {
      screen: Updateprofile,
      navigationOptions: {
        headerShown: false,
      },
    },
    Reedencoupons: {
      screen: Reedencoupons,
      navigationOptions: {
        headerShown: false,
      },
    },
   Aboutapp: {
      screen: Aboutapp,
      navigationOptions: {
        headerShown: false,
      },
    },
   Contactus: {
      screen: Contactus,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'SettingScreen',
  }
);