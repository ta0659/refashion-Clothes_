import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import MyDonationScreen from '../screens/MyDonationScreen';
import DonationDetails from '../screens/DonationDetails';
import DIYScreen from '../screens/DIYScreen'

export const DonateStackNavigator = createStackNavigator(
  {
    MyDonationScreen: {
      screen: MyDonationScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    DonationDetails: {
      screen: DonationDetails,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'MyDonationScreen',
  }
);