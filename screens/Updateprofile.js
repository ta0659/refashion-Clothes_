import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { Card, Icon, Header, Avatar } from 'react-native-elements';
import MyHeader from '../components/MyHeader';
import { LinearGradient } from 'expo-linear-gradient';
import db from '../config';
import firebase from 'firebase';

import * as ImagePicker from 'expo-image-picker';
export default class Updateprofile extends Component {
  constructor() {
    super();
    this.state = {
      emailId: firebase.auth().currentUser.email,
      firstName: '',
      address: '',
      contact: '',
      docId: '',
    };
  }

  getUserDetails = () => {
    db.collection('users')
      .where('email_id', '==', this.state.emailId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            image: data.image,
            contact: data.contact,
            address: data.address,
            firstName: data.first_name,
            docId: doc.id,
          });
        });
      });
  };

  updateUserDetails = async (uri, imageName) => {
    try {
      var response = await fetch(uri);
      var blob = await response.blob();
      var ref = firebase
        .storage()
        .ref()
        .child('user_profiles/' + imageName);
      return ref.put(blob).then((response) => {
        this.fetchImage(imageName);
      });
    } catch (e) {
      console.log(e);
    }
  };
  fetchImage = (imageName) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child('user_profiles/' + imageName);
    storageRef.getDownloadURL().then((url) => {
      this.setState({ image: url });

      db.collection('users').doc(this.state.docId).update({
        first_name: this.state.firstName,
        email_id: this.state.emailId,
        image: this.state.image,
        contact: this.state.contact,
        address: this.state.address,
      });
      Alert.alert('Profile Updated Successfully');
    });
  };
  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!cancelled) {
      this.setState({ image: uri });
    }
  };

  componentDidMount() {
    this.getUserDetails();
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
            text: 'Update profile',
            style: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
          }}
          backgroundColor="#62C848"
        />

        <ScrollView style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.view}>
            <Avatar
              rounded
              source={{
                uri: this.state.image,
              }}
              size={'xlarge'}
              onPress={() => this.selectPicture()}
              containerStyle={styles.imageContainer}
              showEditButton
            />

            <Text style={styles.label}> Name </Text>
            <TextInput
              style={styles.loginBox}
              placeholder={'Name'}
              maxLength={12}
              onChangeText={(text) => {
                this.setState({
                  firstName: text,
                });
              }}
              value={this.state.firstName}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.loginBox}
              placeholder={'Email'}
              maxLength={12}
              onChangeText={(text) => {
                this.setState({
                  emailId: text,
                });
              }}
              value={this.state.emailId}
            />

            <Text style={styles.label}>Contact</Text>
            <TextInput
              style={styles.loginBox}
              placeholder={'Contact Number'}
              maxLength={10}
              keyboardType={'numeric'}
              onChangeText={(text) => {
                this.setState({
                  contact: text,
                });
              }}
              value={this.state.contact}
            />

            <Text style={styles.label}>Address </Text>
            <TextInput
              style={styles.loginBox}
              placeholder={'Address'}
              // multiline={20}
              onChangeText={(text) => {
                this.setState({
                  address: text,
                });
              }}
              value={this.state.address}
            />

            <LinearGradient
              colors={['#D0E07A', '#62C848']}
              start={{ x: -1, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttons}>
              <TouchableOpacity
                onPress={() => {
                  this.updateUserDetails(
                    this.state.image,
                    this.state.emailId,
                    this.state.address,
                    this.state.contact,
                    this.state.firstName
                  );
                }}>
                <Text style={styles.buttonText1}>Save</Text>
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
  },
  label: {
    fontSize: 15,
    color: '#62C848',
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: -10,
    backgroundColor: '#ffff',
  },
  imageContainer: {
    marginTop: 10,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#fcc005',
  },
  buttons: {
    padding: 10,
    alignSelf: 'center',
    width: '90%',
    borderRadius: 10,
    margin: 10,
  },
  buttonText1: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
  loginBox: {
    margin: 10,
    width: 320,
    fontSize: 16,
    paddingLeft: 10,
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    height: 40,
    borderColor: '#fcc005',
  },
});
