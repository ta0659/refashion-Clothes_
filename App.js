
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import MainScreen from './screens/MainScreen';
import SignUpScreen from './screens/Signup';
import WelcomeScreen from './screens/WelcomeScreen';
import { AppDrawerNavigator } from './components/AppDrawerNavigator';

export default function App() {
  return <AppContainer />;
}

const switchNavigator = createSwitchNavigator({
  MainScreen: { screen: MainScreen },
  WelcomeScreen: { screen: WelcomeScreen },
  Signup: { screen: SignUpScreen },
  Drawer: { screen: AppDrawerNavigator },
});

const AppContainer = createAppContainer(switchNavigator);
