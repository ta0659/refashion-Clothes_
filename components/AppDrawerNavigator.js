import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';

import CustomSideBarMenu from './CustomSideBarMenu';
import MyDonationScreen from '../screens/MyDonationScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SettingScreen from '../screens/SettingScreen';
import RecycleScreen from '../screens/RecycleScreen';
import DIYScreen from '../screens/DIYScreen';
import { Icon } from 'react-native-elements';
import DonateScreen from '../screens/DonateScreen';
import MyRecycle from '../screens/MyRecycleScreen';
import HomeScreen from '../screens/HomeScreen';
import { DonateStackNavigator } from './DonateStackNavigator';
import { HomeStackNavigator } from './HomeStackNavigator';
import { SettingStackNavigator } from './SettingStackNavigator';
import { RecycleStackNavigator } from './RecycleStackNavigator';

export const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeStackNavigator,
      navigationOptions: {
        drawerIcon: <Icon name="home" type="fontawesome5" color='#fcc005' />,
      },
    },

    MyDonation: {
      screen: DonateStackNavigator,
      navigationOptions: {
        drawerIcon: <Icon name="donate" type="font-awesome-5" color='#fcc005' />,
        drawerLabel: 'My Donations',
      },
    },
    MyRecycle: {
      screen: RecycleStackNavigator,
      navigationOptions: {
        drawerIcon: <Icon name="recycle" type="font-awesome" color='#fcc005' />,
        drawerLabel: 'My Recycles'   ,
      },
    },
    DIYClothes: {
      screen: DIYScreen,
      navigationOptions: {
        drawerIcon: <Icon name="scissors" type="font-awesome"color='#fcc005'/>,
        drawerLabel: 'DIY Clothes',
      },
    },
    Setting: {
      screen: SettingStackNavigator,
      navigationOptions: {
        drawerIcon: <Icon name="settings" type="ionicons"color='#fcc005'/>,
        drawerLabel: 'Settings',
      },
    },
  },
  {
    contentComponent: CustomSideBarMenu,
  },
  {
    initialRouteName: 'Home',
  }
);
