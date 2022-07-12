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
import { ListItem, Header } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader';
import { DrawerItems } from 'react-navigation-drawer';
import { LinearGradient } from 'expo-linear-gradient';

export default class MainScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient style={{flex:1, justifyContent:"center"}} colors={['#D0E07A', '#62C848']}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={require('../assets/refashion3.png')}
              style={styles.bookImage}
            />
          </View>

          <View style={{marginTop:10, alignItems:"center" }}>
            <Text style={{ fontSize: 18, color:"white" }}>
              Contribute to sustainable fashion
            </Text>
            <Text style={{ fontSize: 18, color:"white" }}>
              Donate.. Recycle.. DIY.. 
            </Text>
          </View>

          
            <View style={{ marginTop:10,justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => {
                  this.props.navigation.navigate('WelcomeScreen');
                }}>
                <Text style={styles.buttonText}>Sign In</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.buttons, { marginBottom: 20 }]}
                onPress={() => {
                  this.props.navigation.navigate('Signup');
                }}>
                <Text style={styles.buttonText}>Create an account</Text>
              </TouchableOpacity>
            </View>
          
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bookImage: {
    margin: 20,
    width: '85%',
    height: 300,
    borderRadius:150
  },
  buttonText: {
    color: '#62C848',
    fontSize: 20,
    textAlign: 'center',
  },
  buttons: {
    marginTop: 20,
    padding: 10,
    alignSelf: 'center',
    textAlign: 'center',
    width: '75%',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
});

