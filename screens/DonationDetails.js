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
import { Card, Icon, ListItem, Header } from 'react-native-elements';
import MyHeader from '../components/MyHeader.js';
import firebase from 'firebase';
import db from '../config.js';

export default class DonationDetails extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.navigation.getParam('details'));
    this.state = {
      donationId: this.props.navigation.getParam('details')['donationId'],
      address: this.props.navigation.getParam('details')['address'],
      description: this.props.navigation.getParam('details')['description'],
      preferredPickup:
        this.props.navigation.getParam('details')['preferredPickup'],
      nameOfNGO: this.props.navigation.getParam('details')['nameOfNGO'],
      transactionStatus:
        this.props.navigation.getParam('details')['transactionStatus'],
      pickUpAgent: this.props.navigation.getParam('details')['pickUpAgent'],
      pickUpDetails: this.props.navigation.getParam('details')['pickUpDetails'],
      takenFrom: this.props.navigation.getParam('details')['takenFrom'],
      ngoMessage: this.props.navigation.getParam('details')['ngoMessage'],
      donationImage: this.props.navigation.getParam('details')['image'],
    };
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Header
          leftComponent={
            <Icon
              name="arrow-back"
              type="Ionicons"
              color="#fff"
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />
          }
          centerComponent={{
            text: 'Donation Details',
            style: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
          }}
          backgroundColor="#62C848"
        />

        <ScrollView>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              marginBottom: 10,
            }}>
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <Image
                source={{ uri: this.state.donationImage }}
                style={{
                  flex: 0.4,
                  margin: 10,
                  width: '100%',
                  height: 100,
                  borderWidth: 0.5,
                  borderColor: '#fcc005',
                  borderRadius: 15,
                }}
              />
              <View
                style={{
                  flex: 0.6,
                  margin: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{ textAlign: 'center' }}>
                  Pickup Address: {this.state.address}
                </Text>
              </View>
            </View>
            <Text> Transaction Status : {this.state.transactionStatus}</Text>
            <Text style={styles.label}>Description of Donated Clothes</Text>
            <Text style={[styles.button,{height:60}]}>{this.state.description}</Text>

            <Text style={styles.label}>Preferred Date and Time of Donar</Text>
            <Text style={styles.button}>{this.state.preferredPickup}</Text>
            <Text style={styles.label}>Donated to </Text>
            <Text style={[styles.button,{height:100}]}>{this.state.nameOfNGO}</Text>

            <Text style={styles.label}>Agent who have pickedup Donation </Text>
            <Text style={styles.button}>{this.state.pickUpAgent}</Text>

            <Text style={styles.label}>Pickup Details </Text>
            <Text style={styles.button}>{this.state.pickUpDetails}</Text>

            <Text style={styles.label}>Taken from </Text>
            <Text style={styles.button}>{this.state.takenFrom}</Text>

            <Text style={styles.label}>Message of NGO </Text>
            <Text style={styles.button}>{this.state.ngoMessage}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    fontsize: 25,
    borderWidth: 1,
    width: '90%',
    height: 40,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginLeft: 15,
    borderColor: '#fcc005',
    borderRadius: 10,
  },
  label: {
    fontSize: 14,
    // color: 'grey',
    marginTop: 10,
    color: '#62C848',
    fontWeight: 'bold',
  },
});
