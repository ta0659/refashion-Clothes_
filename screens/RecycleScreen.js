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
  Picker,
} from 'react-native';
import { ListItem, Avatar, Icon, Header } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { LinearGradient } from 'expo-linear-gradient';

export default class RecycleScreen extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      address: '',
      description: '',
      preferredPickup: '',
      nameOfNGO: '',
      recycleImage: '#',
    };
    this.requestRef = null;
  }

  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!cancelled) {
      this.setState({
        recycleImage: uri,
      });
    }
  };

  uploadImage = async (uri, imageName) => {
    var response = await fetch(uri);
    var blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child('recycles/' + imageName);

    return ref.put(blob).then((response) => {
      this.fetchImage(imageName);
    });
  };

  fetchImage = (imageName) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child('recycles/' + imageName);

    // Get the download URL
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ recycleImage: url });
        db.collection('all_recycles').add({
          emailId: this.state.userId,
          recycleId: imageName,
          address: this.state.address,
          description: this.state.description,
          preferredPickup: this.state.preferredPickup,
          nameOfNGO: this.state.nameOfNGO,
          image: this.state.recycleImage,
          transactionStatus: 'Recycle request raised',
          pickUpAgent: '',
          pickUpDetails: '',
          takenFrom: '',
          companyMessage: 'Awaiting Products to be recycle',
          pointsReceived: 'Waiting confirmation',
        });
        Alert.alert('Recycle registered successfully');
        alert('Recycle registered successfully');
        this.setState({
          address: '',
          description: '',
          preferredPickup: '',
          nameOfNGO: '',
          recycleImage: '#',
        });
      })
      .catch((error) => {
        this.setState({ recycleImage: '#' });
      });
  };

  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }

  addRecycles() {
    var randomRequestId = this.createUniqueId();
    this.uploadImage(this.state.recycleImage, randomRequestId);
  }

  // Make a states for each textInput

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <Header
          leftComponent={
            <Icon
              name="arrow-back"
              type="Ionicons"
              color="white"
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />
          }
          centerComponent={{
            text: ' Recycle Clothes',
            style: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
          }}
          backgroundColor="#62C848"
        />

        <ScrollView
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.view}>
            <Avatar
              rectangle
              source={{
                uri: this.state.recycleImage,
              }}
              style={{
                height: 100,
                width: 200,
                marginTop: 10,
                borderWidth: 1,
                borderColor: '#fcc005',
              }}
              onPress={() => this.selectPicture()}
              showEditButton
            />

            <TextInput
              style={styles.formTextInput1}
              placeholder="Address"
              placeholderTextColor="#e0dede"
              onChangeText={(text) => {
                this.setState({
                  address: text,
                });
              }}
              value={this.state.address}
            />

            <TextInput
              style={[styles.formTextInput]}
              multiline
              numberOfLines={8}
              placeholder={'Description of clothes'}
              placeholderTextColor="#e0dede"
              onChangeText={(text) => {
                this.setState({
                  description: text,
                });
              }}
              value={this.state.description}
            />

            <TextInput
              style={[styles.formTextInput]}
              multiline={true}
              numberOfLines={2}
              placeholder={'Preferred pickup date and time'}
              placeholderTextColor="#e0dede"
              onChangeText={(text) => {
                this.setState({
                  preferredPickup: text,
                });
              }}
              value={this.state.preferredPickup}
            />

            <Picker
              mode="dropdown"
              selectedValue={this.state.nameOfNGO}
              style={{
                width: '90%',
                height: 50,
                margin: 7,
                borderColor: '#fcc005',
                borderWidth: 1,
                borderRadius: 8,
                fontColor: '#fff',
              }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({
                  nameOfNGO: itemValue,
                })
              }>
              <Picker.Item label="Name of NGO" value="" />
              <Picker.Item
                label="Eco Regain, Pune"
                value="Exo Regain, 2nd floor, 42/B Anurekha Society near Tathawade garden, oo. navsayandri society, karve Nagar, Pune-411052, Maharashtra"
              />
            </Picker>

            <View style={styles.touchableopacity}>
              <LinearGradient
                colors={['#D0E07A', '#62C848']}
                start={{ x: -1, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttons}>
                <TouchableOpacity onPress={() => this.addRecycles()}>
                  <Text style={styles.buttonText}>Recycle Clothes</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  formTextInput1: {
    width: 310,
    height: 50,
    fontSize: 16,
    padding: 10,
    margin: 7,
    borderColor: '#fcc005',
    borderWidth: 1,
    borderRadius: 10,
  },
  formTextInput: {
    width: '100%',
    height: 50,
    fontSize: 16,
    padding: 10,
    margin: 7,
    borderColor: '#fcc005',
    borderWidth: 1,
    borderRadius: 10,
  },
  buttons: {
    margin: 10,
    padding: 10,
    alignSelf: 'center',
    width: '80%',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
});
