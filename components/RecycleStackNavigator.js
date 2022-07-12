import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import MyRecycle from '../screens/MyRecycleScreen';
import RecycleDetails from '../screens/RecycleDetails';

export const RecycleStackNavigator = createStackNavigator(
  {
    MyRecycle: {
      screen: MyRecycle,
      navigationOptions: {
        headerShown: false,
      },
    },
    RecycleDetails: {
      screen: RecycleDetails,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'MyRecycle',
  }
);