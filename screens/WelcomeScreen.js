import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Modal,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { Icon } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import { LinearGradient } from 'expo-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

export default class WelcomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      password: '',
      firstName: '',
      lastName: '',
    };
  }

  userLogin = (emailId, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailId, password)
      .then(() => {
        this.props.navigation.navigate('Home');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
  };

  forgotPassword = (emailAddress) => {
    if (emailAddress !== '') {
      firebase
        .auth()
        .sendPasswordResetEmail(emailAddress)
        .then(function () {
          alert(
            'Reset password link have been sent to your email follow the link to reset your secure password'
          );
        })
        .catch(function (error) {
          alert(error);
        });
    } else {
      alert('Please enter your registered Email Id');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <KeyboardAvoidingView>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image
                source={require('../assets/loginBg.jpg')}
                style={styles.bookImage}
              />
            </View>
            <View style={styles.santaView}>
              <Text style={styles.santaText}>Welcome back...!</Text>
            </View>
            <View
              style={{
                marginTop: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              
              <TextInput
                style={styles.loginBox}
                placeholder="Email Id"
                placeholderTextColor="gray"
                keyboardType="email-address"
                onChangeText={(text) => {
                  this.setState({
                    emailId: text,
                  });
                }}
                value={this.state.emailId}
              />
              <TextInput
                style={[styles.loginBox, { marginTop: 15, marginBottom: 5 }]}
                secureTextEntry={true}
                placeholder="Password"
                placeholderTextColor="gray"
                onChangeText={(text) => {
                  this.setState({
                    password: text,
                  });
                }}
                value={this.state.password}
              />
            </View>

            <TouchableOpacity
              style={styles.forgot}
              onPress={() => {
                this.forgotPassword(this.state.emailId);
              }}>
              <Text style={styles.forgottext}>Forgot Password?</Text>
            </TouchableOpacity>

            <View style={{ alignItems: 'center' }}>
              <LinearGradient
                colors={['#D0E07A', '#62C848']}
                start={{ x: -1, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttons}>
                <TouchableOpacity
                  onPress={() => {
                    this.userLogin(this.state.emailId, this.state.password);
                  }}>
                  <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
              </LinearGradient>

              <TouchableOpacity
                style={{ marginTop: 10 }}
                onPress={() => {
                  this.props.navigation.navigate('Signup');
                }}>
                <Text style={styles.buttonText1}>
                  New User? Create Account.
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  bookImage: {
    marginTop: 20,
    width: '90%',
    height: 250,
  },
  loginBox: {
    width: '90%',
    height: 50,
    fontSize: 16,
    paddingLeft: 10,
    backgroundColor: '#E2FFD1',
  },

  buttonText1: {
    fontSize: 18,
    textAlign: 'center',
    color: '#62C848',
    width: '100%',
  },
  santaView: {
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  santaText: {
    fontSize: 18,
    color: '#62C848',
    fontWeight: 'bold',
  },
  forgot: {
    marginTop: 10,
    marginBottom: 50,
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  forgottext: {
    width: '100%',
    fontSize: 15,
    color: '#62C848',
  },
  buttons: {
    padding: 10,
    alignSelf: 'center',
    width: '80%',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
});
