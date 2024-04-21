import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';

import React, { useState } from 'react';

import { LinearGradient } from 'expo-linear-gradient';


export default function Layout({children}) {

  return (
    <View
      style={styles.loginBackground}
    >
      <LinearGradient
        // Background Linear Gradient
        colors={[ '#b5dcf8','#e3eef6']}
        style={{flex:1}}
      >
        {children}
        <Image
          style={{
            height: 200,
            width: 200,
            marginTop: 200,
            zIndex: -1,
            flex:1,
            position: "absolute",
            bottom: 0,
            alignSelf: 'flex-end'
          }}
          source={require('../assets/images/ivy-plant-watercolor-simplicity-painting-free-png 1.png')}
        ></Image>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  loginBackground: {
    flex: 1,
  }
})