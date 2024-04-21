import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Animated } from 'react-native';
import { styles } from './style.ts';
import React, { useEffect, useRef } from 'react';


export default function Landing({ navigation }) {


    const fadeAnim = useRef(new Animated.Value(0)).current;   
    
    Animated.timing(fadeAnim, {
      toValue: 600,
      duration: 20000,
      useNativeDriver: true,
    }).start();
  //  };

    const AnimatedImage = Animated.createAnimatedComponent(Image);
    return (
      <View style={styles.container}>
        <ImageBackground
        source={require('../../assets/images/landing_page.png')}
        resizeMode='cover'
        style={{flex:1, justifyContent:'center'}}>
        <View style={styles.circle}>
          <Text></Text>
        </View>

        <Animated.Image
        source={require('../../assets/clouds.png')}
        resizeMode='cover'
        style={[
          styles.clouds, 
          {
            transform: [{translateX: fadeAnim}]
          }
        ]}/>
          <Text style={styles.title}>Flora Fit</Text>

        <View
        style={styles.accountButtons}>

          <TouchableOpacity
          style={styles.button}
          >
            <Text
            style={styles.button_text}
            onPress={()=>navigation.navigate('LogInPage')}>
              Log In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.button}
          >
            <Text
            style={styles.button_text}
            onPress={()=>navigation.navigate('SignUpPage')}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        </ImageBackground>
      </View>
    );


}
