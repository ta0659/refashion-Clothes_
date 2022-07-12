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
import { ListItem } from 'react-native-elements';
import MyHeader from '../components/MyHeader';
import { SearchBar } from 'react-native-elements';

export default class DIYScreen extends Component {
  render() {
    return (
      <ScrollView>
        <MyHeader title="DIY Clothes" navigation={this.props.navigation} />
        <View style={styles.Container}>
          <Image
            source={require('../assets/diylogo.jpg')}
            style={{
              width: 200,
              height: 250,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />

          <SafeAreaView>
            <Text style={styles.textStyle}>
              {' '}
              <Text
                style={styles.hyperlinkStyle}
                onPress={() => {
                  Linking.openURL('https://youtu.be/emzwJkx-1Lw');
                }}>
                Turn Your Old Clothes Into Something New With One Cut || DIY
                Clothes Upgrade Ideas
              </Text>
            </Text>
          </SafeAreaView>

          <SafeAreaView>
            <Text style={styles.textStyle}>
              {' '}
              <Text
                style={styles.hyperlinkStyle}
                onPress={() => {
                  Linking.openURL('https://youtu.be/emzwJkx-1Lw');
                }}>
                Turn Your Old Clothes Into Something New With One Cut || DIY
                Clothes Upgrade Ideas
              </Text>
            </Text>
          </SafeAreaView>

          <SafeAreaView>
            <Text style={styles.textStyle}>
              {' '}
              <Text
                style={styles.hyperlinkStyle}
                onPress={() => {
                  Linking.openURL('https://youtu.be/RgGF_8t83Jw');
                }}>
                28 CREATIVE IDEAS TO REMAKE OLD CLOTHES AND SAVE YOUR MONEY
              </Text>
            </Text>
          </SafeAreaView>

          <SafeAreaView>
            <Text style={styles.textStyle}>
              {' '}
              <Text
                style={styles.hyperlinkStyle}
                onPress={() => {
                  Linking.openURL('https://youtu.be/RFSW41p81Dc');
                }}>
                23 EASY DIY CLOTHING IDEAS FOR BEGINNERS
              </Text>
            </Text>
          </SafeAreaView>

          <SafeAreaView>
            <Text style={styles.textStyle}>
              {' '}
              <Text
                style={styles.hyperlinkStyle}
                onPress={() => {
                  Linking.openURL('https://youtu.be/xoMov6-gTAc');
                }}>
                Transform It! 11 Smart DIY Clothing And Fashion Hack Ideas
              </Text>
            </Text>
          </SafeAreaView>

          <SafeAreaView>
            <Text style={styles.textStyle}>
              {' '}
              <Text
                style={styles.hyperlinkStyle}
                onPress={() => {
                  Linking.openURL('https://youtu.be/Nh8a6-4xI-Q');
                }}>
                7 DIY IDEAS FOR YOUR OLD CLOTHES! (NO-SEW)
              </Text>
            </Text>
          </SafeAreaView>

          <SafeAreaView>
            <Text style={styles.textStyle}>
              {' '}
              <Text
                style={styles.hyperlinkStyle}
                onPress={() => {
                  Linking.openURL('https://youtu.be/AKmLDwknvZY');
                }}>
                35 CREATIVE FASHION TIPS || EASY CLOTHING LIFE HACKS AND DIY
                IDEAS
              </Text>
            </Text>
          </SafeAreaView>

          <SafeAreaView>
            <Text style={styles.textStyle}>
              {' '}
              <Text
                style={styles.hyperlinkStyle}
                onPress={() => {
                  Linking.openURL('https://youtu.be/3WQobbwpOvU');
                }}>
                18 CLEVER DIY IDEAS FOR YOUR BORING CLOTHES
              </Text>
            </Text>
          </SafeAreaView>

          <SafeAreaView>
            <Text style={styles.textStyle}>
              {' '}
              <Text
                style={styles.hyperlinkStyle}
                onPress={() => {
                  Linking.openURL('https://youtu.be/nTGytg9LnuU');
                }}>
                33 SMART DIY CLOTHES AND FASHION IDEAS
              </Text>
            </Text>
          </SafeAreaView>

          <SafeAreaView>
            <Text style={styles.textStyle}>
              {' '}
              <Text
                style={styles.hyperlinkStyle}
                onPress={() => {
                  Linking.openURL('https://youtu.be/oIhXjUpictI');
                }}>
                28 EASY DIY CLOTHING IDEAS FOR BEGINNERS
              </Text>
            </Text>
          </SafeAreaView>

          <SafeAreaView>
            <Text style={styles.textStyle}>
              {' '}
              <Text
                style={styles.hyperlinkStyle}
                onPress={() => {
                  Linking.openURL('https://youtu.be/fyAqQ3N6zGc');
                }}>
                10 DIY CLOTHES IDEAS YOU NEED TO TRY | Cool Clothing Life Hacks
              </Text>
            </Text>
          </SafeAreaView>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    textAlign: 'center',
    borderColor: '#fcc005',
  },
  hyperlinkStyle: {
    color: 'green',
    textAlign: 'center',
  },
});
