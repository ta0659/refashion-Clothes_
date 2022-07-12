import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Input,
  ScrollView,
  ImageBackground,
} from 'react-native';

import { Icon, Badge } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { ListItem, Header } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import { RFValue } from 'react-native-responsive-fontsize';
import { DrawerItems } from 'react-navigation-drawer';
import { Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      firstName: '',
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = () => {
    db.collection('users')
      .where('email_id', '==', this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            firstName: doc.data().first_name,
          });
        });
      });
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', marginTop: 10 }}>
        <ImageBackground
          source={require('../assets/header1.jpg')}
          style={styles.header}>
          <View
            style={{
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              marginTop: 10,
              margin: 5,
              padding: 5,
            }}>
            <Icon
              name="bars"
              type="font-awesome"
              color="#fff"
              onPress={() => this.props.navigation.toggleDrawer()}
            />
          </View>

          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              color: '#13bd00',
              fontSize: 20,
              marginTop: 30,
              marginLeft: 50,
              fontStyle:"italic" ,
            }}>
            Hi {this.state.firstName}!
          </Text>
        </ImageBackground>
        <View style={styles.view}>
          <View style={{ flex: 0.3, flexDirection: 'row' }}>
            <ImageBackground
              source={require('../assets/home3.jpg')}
              style={{
                height: 100,
                flex: 0.5,
                alignSelf: 'center',
                marginTop:10,
              }}
              resizeMode="contain"
            />
            <ImageBackground
              source={require('../assets/home5.jpg')}
              style={{
                height: 100,
                flex: 0.5,
                alignSelf: 'center',
                marginTop:10,
              }}
              resizeMode="contain"
            />
          </View>
          <View style={{ flex: 0.6 }}>
            <TouchableOpacity
              style={{
                width: '70%',
                height: 70,
                margin: 10,
                flex: 0.5,
                borderRadius: 10,
                borderWidth: 1,
                alignSelf: 'center',
                // padding:10
              }}
              onPress={() => {
                alert(
                  'While donating please donate good condition clothes and give for recycle or make DIY of bad confition clothes'
                );
                this.props.navigation.navigate('DonateScreen');
              }}>
              <ImageBackground
                source={require('../assets/clothDonate.jpg')}
                style={{
                  height: 80,
                  width: '100%',
                  opacity: 0.5,
                  alignSelf: 'center',
                  position: 'absolute',
                }}
                resizeMode="contain"
              />

              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{ fontSize: 20 }}>Donate</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: '70%',
                height: 75,
                margin: 10,
                flex: 0.5,
                borderRadius: 10,
                borderWidth: 1,
                alignSelf: 'center',
                // padding:10
              }}
              onPress={() => {
                this.props.navigation.navigate('RecycleScreen');
              }}>
              <ImageBackground
                source={require('../assets/recylebutton.jpg')}
                style={{
                  height: 80,
                  width: '100%',
                  opacity: 0.5,
                  alignSelf: 'center',
                  position: 'absolute',
                }}
                resizeMode="contain"
              />
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{ fontSize: 20, textAlign: 'center' }}>
                  Recycle
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{
              width: '100%',
              height: 100,

              alignSelf: 'center',
              // padding:10
            }}>
            <ImageBackground
              source={require('../assets/header3.jpg')}
              style={{
                height: 100,
                width: '100%',
                //opacity: 0.5,
                alignSelf: 'center',
                position: 'absolute',
              }}
            />
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{ fontSize: 20, textAlign: 'center', color: '#62C848' }}>
                Donate.. Recycle.. DIY..
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 0.3,
  },
  view: {
    flex: 0.7,
    width: '100%',
    //  backgroundColor: '#F9F9F9',
    backgroundColor: '#fff',
  },
});
