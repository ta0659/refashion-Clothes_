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
import { ListItem, Header, Icon } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader';
import { RFValue } from 'react-native-responsive-fontsize';
import { DrawerItems } from 'react-navigation-drawer';
import { Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { LinearGradient } from 'expo-linear-gradient';

export default class DonateScreen extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      address: '',
      description: '',
      preferredPickup: '',
      nameOfNGO: '',
      donationImage: '#',
    };
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
        donationImage: uri,
      });
    }
  };

  uploadImage = async (uri, imageName) => {
    var response = await fetch(uri);
    var blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child('donations/' + imageName);

    return ref.put(blob).then((response) => {
      this.fetchImage(imageName);
    });
  };

  fetchImage = (imageName) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child('donations/' + imageName);

    // Get the download URL
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ donationImage: url });
        db.collection('all_donations').add({
          emailId: this.state.userId,
          donationId: imageName,
          address: this.state.address,
          description: this.state.description,
          preferredPickup: this.state.preferredPickup,
          nameOfNGO: this.state.nameOfNGO,
          image: this.state.donationImage,
          transactionStatus: 'Donation request raised',
          pickUpAgent: '',
          pickUpDetails: '',
          takenFrom: '',
          ngoMessage: 'Awaiting Donation',
        });
        Alert.alert('Donation registered successfully');
        alert('Donation registered successfully,  Our Dilevery boy will come to take parcel of donating clothes, just pay him !!');
        this.setState({
          address: '',
          description: '',
          preferredPickup: '',
          nameOfNGO: '',
          donationImage: '#',
        });
      })
      .catch((error) => {
        this.setState({ donationImage: '#' });
      });
  };

  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }

  addDonation() {
    var randomRequestId = this.createUniqueId();
    this.uploadImage(this.state.donationImage, randomRequestId);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
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
            text: 'Donate Clothes',
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
                uri: this.state.donationImage,
              }}
              style={{
                height: 100,
                width: 200,
                marginTop: 10,
                borderWidth: 1,
                borderColor: '#fcc005',
                //borderWidth: 1,
              }}
              onPress={() => this.selectPicture()}
              showEditButton
            />
            <TextInput
              style={[styles.formTextInput]}
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

            <Text
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}>
              Note: While donating please donate good condition clothes and give
              for recycle or make DIY of bad confition clothes
            </Text>

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
              <Picker.Item label="Oldage Home" value="" />
              <Picker.Item
                label="Matoshri VrudhAshram, Pandharpur"
                value="Matoshri VrudhAshram, Pandharpur"
              />

              <Picker.Item
                label="GOONJ, Nagpur"
                value="GOONJ, Soham- Home for Senior Living 175, North Ambazari Road, Beside Seva Sadan Saksham High School, Sitabuldi, Nagpur, Maharashtra "
              />
            </Picker>

            <Text style={{ fontSize: 10 }}>OR</Text>

            <Picker
              mode="dropdown"
              selectedValue={this.state.nameOfNGO}
              style={{
                width: '90%',
                height: 50,
                margin: 7,
                borderRadius: 5,
                borderColor: '#fcc005',
                borderWidth: 1,
              }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({
                  nameOfNGO: itemValue,
                })
              }>
              <Picker.Item label="Orphanage" value="" />

              <Picker.Item
                label="Shantai Orphanage, Solapur"
                value="Shantai Orphanage, Solapur, 35/2D Tirupati Nagar, Neelam Nagar Road, Bolkote Nagar Neighboring Solapur-413006, Maharashtra  "
              />
              <Picker.Item
                label="GOONJ, Thane, Mumbai"
                value="GOONJ, 2nd floor, M/s Mukund Synthetic Industries, R. R. Industrial Estate, W.E. Highway Road, Kashimira, Mira Road (E), Thane, Mumbai-401104, Maharashtra  "
              />

              <Picker.Item
                label="GOONJ, Hinjewadi, Pune"
                value="GOONJ, Reception Area Podium 1 & 2, Megapolis Splendor CHS Itd, Maan, Hinjewadi hase 3, Pune, Maharashtra  "
              />

              <Picker.Item
                label="GOONJ, Pimpri Chinchwad, Pune"
                value="GOONJ, D-1305, Pristine Green, Near D-Mart, Moshi Road, Borhade Wadi, Pimpri Chinchwad, Pune, Maharashtra  "
              />

              <Picker.Item
                label="GOONJ, Pune"
                value="GOONJ, ProEarth Ecosystems Pvt Ltd 202, 2nd floor, Sant Krupa Building, S.No 264/6, Above Citi Bank ATM, Baner Road, Pune-411045, Maharashtra  "
              />

              <Picker.Item
                label="GOONJ, Pune University Campus, Pune"
                value="GOONJ, Surya, NCRA Colony, TIFR, Pune University Campus, Pune-411045, Maharashtra  "
              />
            </Picker>

            <View style={styles.touchableopacity}>
              <LinearGradient
                colors={['#D0E07A', '#62C848']}
                start={{ x: -1, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttons}>
                <TouchableOpacity onPress={() => this.addDonation()}>
                  <Text style={styles.buttonText}>Donate Clothes</Text>
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
  formTextInput: {
    width: '85%',
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
