import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
import { Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';
import db from '../config';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/Entypo';

export default class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      password: '',
      firstName: '',
      confirmPassword: '',
    };
  }
  userSignUp = (emailId, password, confirmPassword) => {
    if (password != confirmPassword) {
      return Alert.alert("Passwords don't match");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(emailId, password)
        .then(() => {
          db.collection('users').add({
            first_name: this.state.firstName,
            email_id: this.state.emailId,
            image: '#',
            contact: '',
            address: '',
          });
          return Alert.alert('User addded successfully', '', [
            {
              text: 'Okay',
              onPress: () => this.props.navigation.navigate('HomeScreen'),
            },
          ]);
        })
        .catch((error) => {
          var errorcode = error.code;
          var errorMessage = error.message;
          return alert(errorMessage);
        });
    }
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
        }}>
        <ScrollView style={{ flex: 1 }}>
          <KeyboardAvoidingView>
            <View
              style={{
                marginTop: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../assets/signupBg.jpg')}
                style={styles.bookImage}
              />
            </View>
            <View style={styles.signupView}>
              <Text style={styles.signupText}>Create Account...! </Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <TextInput
                style={styles.loginBox}
                placeholder={'Full Name'}
                placeholderTextColor="gray"
                maxLength={12}
                onChangeText={(text) => {
                  this.setState({
                    firstName: text,
                  });
                }}
                value={this.state.firstName}
              />

              <TextInput
                style={styles.loginBox}
                placeholder={'Email'}
                placeholderTextColor="gray"
                keyboardType={'email-address'}
                onChangeText={(text) => {
                  this.setState({
                    emailId: text,
                  });
                }}
                value={this.state.emailId}
              />
              <TextInput
                style={styles.loginBox}
                placeholder={'Password'}
                placeholderTextColor="gray"
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    password: text,
                  });
                }}
                value={this.state.password}
              />

              <TextInput
                style={styles.loginBox}
                placeholder={'Confirm Password'}
                placeholderTextColor="gray"
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    confirmPassword: text,
                  });
                }}
                value={this.state.confirmPassword}
              />
            </View>
            <View style={{ alignItems: 'center' }}>
              <LinearGradient
                colors={['#D0E07A', '#62C848']}
                start={{ x: -1, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttons}>
                <TouchableOpacity
                  onPress={() => {
                    this.userSignUp(
                      this.state.emailId,
                      this.state.password,
                      this.state.confirmPassword,
                    );
                  }}>
                  <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
              </LinearGradient>

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.props.navigation.navigate('WelcomeScreen');
                }}>
                <Text style={styles.buttonText1}>Alert User? Login</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  signupText: {
    marginTop: 40,
    fontSize: 20,
    color: '#62C848',
    fontWeight: 'bold',
  },
  bookImage: {
    width: '90%',
    height: 230,
    alignItems: 'center',
  },
  buttons: {
    marginTop: 20,
    padding: 10,
    alignSelf: 'center',
    width: '80%',
    borderRadius: 10,
  },
  button: {
    width: '100%',
    height: 50,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
  buttonText1: {
    fontSize: 18,
    textAlign: 'center',
    color: '#62C848',
    width: '100%',
    marginBottom: 10,
  },

  loginBox: {
    width: '90%',
    height: 50,
    fontSize: 16,
    marginTop: 15,
    paddingLeft: 10,
    backgroundColor: '#E2FFD1',
  },
  signupView: {
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 10,
  },
});
