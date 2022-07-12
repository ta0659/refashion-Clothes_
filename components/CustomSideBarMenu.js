import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Platform,
  Image,
} from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import { Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import firebase from 'firebase';
import db from '../config';
import { Icon } from 'react-native-elements';

import { RFValue } from 'react-native-responsive-fontsize';

import { LinearGradient } from 'expo-linear-gradient';
export default class CustomSideBarMenu extends Component {
  state = {
    userId: firebase.auth().currentUser.email,
    image: '#',
    name: '',
    docId: '',
  };

  fetchImage = (imageName) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child('user_profiles/' + imageName);

    // Get the download URL
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
      })
      .catch((error) => {
        this.setState({ image: '#' });
      });
  };

  getUserProfile() {
    db.collection('users')
      .where('email_id', '==', this.state.userId)
      .onSnapshot((querySnapshot) => {
        console.log('hi');
        querySnapshot.forEach((doc) => {
          console.log('hi2');
          this.setState({
            name: doc.data().first_name,
            docId: doc.id,
          });
        });
      });

    console.log(this.state);
  }

  componentDidMount() {
    this.fetchImage(this.state.userId);
    this.getUserProfile();
  }

  render() {
    var name = this.state.name;
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../assets/header2.jpg')}
          style={{
            flex: 0.3,
            opacity:0.9,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
          resizeMode="contain">
       
        </ImageBackground>

        <View style={{ flex: 0.6 }}>
          <DrawerItems {...this.props} />
        </View>
        <View style={{ flex: 0.1 }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              width: '100%',
              height: 50,
              marginBottom: 20,
            }}
            onPress={() => {
              this.props.navigation.navigate('WelcomeScreen');
              firebase.auth().signOut();
            }}>
            <Icon
              name="logout"
              type="antdesign"
              color="#62C848"
              size={RFValue(20)}
              iconStyle={{
                paddingLeft: RFValue(10),
                backgroundcolor: 'black',
                marginTop: 20,
              }}
            />

            <Text
              style={{
                fontSize: RFValue(15),
                fontWeight: 'bold',
                marginLeft: 30,
                color: 'black',
                marginTop: 20,
              }}>
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.1 }}>
        </View>
      </View>
    );
  }
}
