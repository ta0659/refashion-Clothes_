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
import { LinearGradient } from 'expo-linear-gradient';

export default class RedeemCoupons extends Component {
  render() {
    return (
      <View style={{flex:1,backgroundColor: '#F9F9F9',}}>
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
            text: 'Coupons Information',
            style: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
          }}
          backgroundColor="#62C848"
        />

        <ScrollView style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.view}>
  
            <Text style={{ fontSize: 20, marginTop: 10 }}>Hi User!</Text>
            <Text style={{ fontSize: 20 }}>Welcome to your "Coupon World"</Text>
            <Text style={{ fontSize: 20 }}>You are a Recycle Champ</Text>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.earned}> Tolat Coupons earned</Text>
              <Text
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 10,
                }}>
                {' '}
              </Text>
            </View>

            <View style={styles.touchableopacity}>
              <LinearGradient
                colors={['#D0E07A', '#62C848']}
                start={{ x: -1, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttons}>
                <TouchableOpacity
                //onPress={() => this.addRecycles()}
                >
                  <Text style={styles.buttonText}>Redeem</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            <Text style={styles.text2}>{''}</Text>

            <View style={styles.text1}></View>
            <Text style={styles.points}>
              Each point is equal to 1 rupee and you need minimum 500 points to
              start redeeming
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  earned: {
    margin: 10,
    fontSize: 20,
  },
  points: {
    borderWidth: 1,
    fontSize: 18,
    width: '80%',
    height: 100,
    padding: 10,
    textAlign: 'center',
    backgroundColor:'#fff'
  },
  touchableopacity: {
    alignItems: 'center',
  },
  buttons: {
    padding: 10,
    width: '100%',
    borderRadius: 10,
    textAlign: 'center',
    margin: 10,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
  text1: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: '10%',
    textAlign: 'center',
    borderWidth: 1,
    marginBottom: 10,
    borderColor: '#fcc005',
    borderRadius: 10,
  },
  text2: {
    fontSize: 20,
    padding: 5,
    color: '#62C848',
  },
    view: {
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
