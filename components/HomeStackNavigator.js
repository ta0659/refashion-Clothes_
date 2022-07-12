import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import DonateScreen from '../screens/DonateScreen'
import RecycleScreen from '../screens/RecycleScreen'
import HomeScreen from '../screens/HomeScreen'

export const HomeStackNavigator = createStackNavigator(
  {
      HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    DonateScreen: {
      screen: DonateScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    RecycleScreen: {
      screen: RecycleScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'HomeScreen',
  }
);