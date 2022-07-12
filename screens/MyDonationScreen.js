import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import { Card, Icon, ListItem } from 'react-native-elements';
import MyHeader from '../components/MyHeader.js';
import firebase from 'firebase';
import db from '../config.js';

export default class MyDonationScreen extends Component {
  constructor() {
    super();
    this.state = {
      donorId: firebase.auth().currentUser.email,
      allDonations: [],
    };
  }

  getAllDonations = () => {
    this.requestRef = db
      .collection('all_donations')
      .where('emailId', '==', this.state.donorId)
      .onSnapshot((snapshot) => {
        var dbDonations = [];
        snapshot.docs.map((doc) => {
          var donation = doc.data();
          donation['doc_id'] = doc.id;
          dbDonations.push(donation);
        });
        this.setState({
          allDonations: dbDonations,
        });
        console.log(this.state.allDonations);
      });
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => (
    <ListItem
      key={i}
      title={item.donationId}
      subtitle={'Donated to : ' + item.nameOfNGO}
      leftElement={
        <Image source={{ uri: item.image }} style={{ width: 50, height: 50 }} />
      }
      titleStyle={{ color: '#62C848', fontWeight: 'bold' }}
      subtitleStyle={{ color: '#72A650' }}
      bottomDivider
      onPress={() => {
        this.props.navigation.navigate('DonationDetails', { details: item });
      }}
    />
  );

  componentDidMount() {
    this.getAllDonations();
  }

  componentWillUnmount() {
    this.requestRef();
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <MyHeader navigation={this.props.navigation} title="Donation List" />
        <View style={{ flex: 1, backgroundColor: 'white,' }}>
          {this.state.allDonations.length === 0 ? (
            <View style={styles.subtitle}>
              <Text style={{ fontsize: 20 }}>No Donated Clothes</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.allDonations}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
