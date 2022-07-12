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
import { Card, Icon, ListItem } from 'react-native-elements';
import MyHeader from '../components/MyHeader';
import { SearchBar } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config.js';

export default class MyRecycle extends Component {
  constructor() {
    super();
    this.state = {
      donorId: firebase.auth().currentUser.email,
      allRecycles: [],
    };
  }

  getAllRecycles = () => {
    this.requestRef = db
      .collection('all_recycles')
      .where('emailId', '==', this.state.donorId)
      .onSnapshot((snapshot) => {
        var allRecycles = [];
        snapshot.docs.map((doc) => {
          var donation = doc.data();
          donation['doc_id'] = doc.id;
          allRecycles.push(donation);
        });
        this.setState({
          allRecycles: allRecycles,
        });
      });
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => (
    <ListItem
      key={i}
      title={item.recycleId}
      subtitle={'Given to Recycle to:  ' + item.nameOfNGO}
      leftElement={
        <Image source={{ uri: item.image }} style={{ width: 50, height: 50 }} />
      }
      titleStyle={{ color: '#62C848', fontWeight: 'bold' }}
      subtitleStyle={{ color: '#72A650' }}
      bottomDivider
      onPress={() => {
        this.props.navigation.navigate('RecycleDetails', { details: item });
      }}
    />
  );

  componentDidMount() {
    this.getAllRecycles();
  }

  componentWillUnmount() {
    this.requestRef();
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <MyHeader navigation={this.props.navigation} title="Recycles List" />
        <View style={{ flex: 1, backgroundColor: 'white,' }}>
          {this.state.allRecycles.length === 0 ? (
            <View style={styles.subtitle}>
              <Text style={{ fontsize: 20 }}>No Recycled Clothes</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.allRecycles}
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
