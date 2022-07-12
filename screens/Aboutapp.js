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
  List,
  SafeAreaView,
  Linking,
  WebView,
  ScrollView,
} from 'react-native';
import { ListItem, Icon, Header } from 'react-native-elements';
import MyHeader from '../components/MyHeader';
import { SearchBar } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';

export default class Aboutapp extends Component {
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
      <View style={styles.Container}>
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
            text: 'About App',
            style: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
          }}
          backgroundColor="#62C848"
        />
        <ScrollView>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={require('../assets/refashion3.png')}
              style={styles.bookImage}
            />

            <Text
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                color: '#62C848',
                fontSize: 20,
                marginTop: 30,
              }}>
              Hi {this.state.firstName}!
            </Text>

            <Text
              style={{
                padding: 10,
                fontSize: 16,
                color: '#62C848',
                borderWidth: 0.5,
                borderColor: '#fcc005',
                textAlign:'center',
              }}>
              Contribute to sustainable fashion. Donate.. Recycle.. DIY.. yuor
              clothes in this app. While donating please donate good condition
              clothes. Old clothes r bad condition clothes should be given to
              Recycle or do DIY of it. While giving clothes for donation or
              recycle put clear photo of that clothe/ clothes. You can see your
              donated clothes details in My Donation screen and recycle cloth
              details in My Recycle screen. Update you profile or ask query
              about app from setting screen.
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bookImage: {
    margin: 20,
    width: '85%',
    height: 300,
    borderRadius: 150,
  },
});
