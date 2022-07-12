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
} from 'react-native';
import { ListItem, Header, Icon } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import { LinearGradient } from 'expo-linear-gradient';
import MyHeader from '../components/MyHeader';
import { RFValue } from 'react-native-responsive-fontsize';
import { DrawerItems } from 'react-navigation-drawer';
import { Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default class Contactus extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      yourname: '',
      yourquery: '',
      contactnumber: '',
      queryImage: '#',
    };
  }

  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }

  addQuery() {
    var randomRequestId = this.createUniqueId();
    db.collection('all_queries').add({
      emailId: this.state.userId,
      queryId: randomRequestId,
      yourname: this.state.yourname,
      yourquery: this.state.yourquery,
      contactnumber: this.state.contactnumber,
      image: this.state.queryImage,
    });
    Alert.alert('Your Query registered successfully');
    alert('Your Query registered successfully');
    this.setState({
      yourname: '',
      yourquery: '',
      contactnumber: '',
      queryImage: '#',
    });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header
          leftComponent={
            <Icon
              name="arrow-back"
              type="Ionicons"
              color="#fff"
              onPress={() => {
                this.props.navigation.navigate('SettingScreen');
              }}
            />
          }
          centerComponent={{
            text: 'Ask Your Query',
            style: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
          }}
          backgroundColor="#62C848"
        />

        <ScrollView
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
          }}>
          <View style={styles.view}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={[styles.loginBox]}
                placeholder="Your Name"
                placeholderTextColor="#e0dede"
                keyboardType="email-address"
                onChangeText={(text) => {
                  this.setState({
                    yourname: text,
                  });
                }}
                value={this.state.yourname}
              />

              <Text style={[styles.label]}>Ask Query</Text>
              <TextInput
                style={[styles.loginBox,{height:80}]}
                secureTextEntry={false}
                placeholder="Ask Your Query"
                placeholderTextColor="#e0dede"
                onChangeText={(text) => {
                  this.setState({
                    yourquery: text,
                  });
                }}
                value={this.state.yourquery}
              />

              <Text style={styles.label}>Contact</Text>
              <TextInput
                style={[styles.loginBox]}
                secureTextEntry={false}
                placeholder="Contact Number"
                placeholderTextColor="#e0dede"
                onChangeText={(text) => {
                  this.setState({
                    contactnumber: text,
                  });
                }}
                value={this.state.contactnumber}
              />
            </View>

            <LinearGradient
              colors={['#D0E07A', '#62C848']}
              start={{ x: -1, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttons}>
              <TouchableOpacity onPress={() => this.addQuery()}>
                <Text style={styles.buttonText}>Ask Query</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    padding: 10,
    alignSelf: 'center',
    width: '90%',
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
  loginBox: {
    margin: 7,
    width: 320,
    fontSize: 16,
    paddingLeft: 10,
    borderRadius: 10,
    borderColor: '#fcc005',
    borderWidth: 1,
    height: 40,
    padding: 5,
  },
  label: {
    fontSize: 15,
    color: '#62C848',
    fontWeight: 'bold',
    marginRight: 250,
    backgroundColor: '#ffff',
  },
});
