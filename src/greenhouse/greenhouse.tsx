import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';


import React from 'react';
import {styles} from "./style";


export default function Greenhouse({navigation}) {

  const navigateToGreenHouse = () => {
     navigation.navigate('Journal');
  };

    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../assets/greenhouse.png')} style={styles.image}>
          <Text style={styles.text}>Inside</Text>
          <TouchableOpacity
            style={styles.table}
            onPress={() => navigateToGreenHouse()}
          >
            <Image source={require('../../assets/table.png')} style={{width: 100, height: 110, resizeMode: 'contain'}}></Image>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );


}
