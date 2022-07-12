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
  FlatList,
  Image,
} from 'react-native';
import {
  Entypo,
  Fontisto,
  FontAwesome5,
  Octicons,
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
  FontAwesome,
} from '@expo/vector-icons';
import { Card, ListItem, Icon } from 'react-native-elements';
import MyHeader from '../components/MyHeader';
import db from '../config';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';
import { Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { LinearGradient } from 'expo-linear-gradient';
export default class SettingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      emailId: '',
      firstName: '',
      docId: '',
      image: '#',
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
            emailId: doc.data().email_id,
            image: doc.data().image,
          });
        });
      });
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <MyHeader title="Settings" navigation={this.props.navigation} />
        <View style={{ flex: 1, justifyContent: 'space-around' }}>
          <LinearGradient
            // Button Linear Gradient
            colors={['#D0E07A', '#62C848']}
            start={{ x: -1, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              flex: 0.2,
              marginTop: -5,
              padding: 10,
              justifyContent: 'center',
            }}>
            <View
              style={{
                paddingLeft: 10,
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              <Image
                style={{
                  width: 80,
                  height: 80,
                  margin: 10,
                  borderColor: '#fcc005',
                  padding: 5,
                  borderWidth: 2,
                  borderRadius: 40,
                }}
                source={{
                  uri: this.state.image,
                }}
              />

              <View
                style={{
                  marginLeft: 15,
                  margin: 10,
                  marginTop: 15,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    //fontWeight: 'bold',
                    color: 'white',
                    padding: 5,
                    borderBottomWidth: 1,
                    borderColor: '#fcc005',
                  }}>
                  {this.state.firstName}
                </Text>

                <Text
                  style={{
                    color: 'white',
                    padding: 5,
                    borderBottomWidth: 1,
                    borderColor: '#fcc005',
                    fontSize: 20,
                  }}>
                  {this.state.userId}
                </Text>
              </View>
            </View>
          </LinearGradient>

          <View style={{ flex: 0.7, padding: 10 }}>
            <View style={styles.ss}>
              <FontAwesome name={'user-circle-o'} size={30} color="#fcc005" />
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Updateprofile');
                }}
                style={styles.sss}>
                <Text style={{ color: '#62C848', fontSize: 16 }}>
                  {' '}
                  Update Profile
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.ss}>
              <AntDesign name={'mobile1'} size={30} color="#fcc005" />
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Aboutapp');
                }}
                style={styles.sss}>
                <Text style={{ color: '#62C848', fontSize: 16 }}>
                  About App
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.ss}>
              <AntDesign name={'customerservice'} size={30} color="#fcc005" />
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Contactus');
                }}
                style={styles.sss}>
                <Text style={{ color: '#62C848', fontSize: 16 }}>
                  Contact Us
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 0.1, padding: 10 }}></View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ss: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  sss: {
    height: 50,
    width: '95%',
    borderWidth: 1.5,
    borderColor: 'white',
    justifyContent: 'center',
    borderBottomColor: '#72A650',
    padding: 10,
  },
  view: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
