import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { styles } from './style.tsx';
import Svg, { Circle, Rect } from 'react-native-svg';
import { Foreground } from "./../../assets/greenhouse.svg";
import SVGImage from 'react-native-svg-image';


import React from 'react';
import { useNavigation } from '@react-navigation/native';


export default function Greenhouse() {

  const navigation = useNavigation();


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
