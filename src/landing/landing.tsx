import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { styles } from './style.ts';

import React from 'react';

// import { Button } from 'react-native-paper';


export default function Landing({ navigation }) {

    return (
      <View style={styles.container}>
        <Text>Hi</Text>
        <View>
        <Image source={require('../../assets/avatars/dino-buddy.png')} 
          style={{height: 90, width:90, resizeMode: 'contain'}} 
        />


        <TouchableOpacity
        style={styles.login_and_signup_button}
        >
          <Text
          style={styles.button_text}
          onPress={()=>navigation.navigate('LogInPage')}>
            Log In
          </Text>



        </TouchableOpacity>




        </View>
      </View>
    );


}
