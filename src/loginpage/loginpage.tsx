import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import { Users } from '../../backend/api/users.ts';

import React, { useState } from 'react';

// import { Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import {styles} from './style.ts'
import {Banner, TextInput} from 'react-native-paper'

enum status {
  LOGGING_IN,
  NOT_LOGGING_IN,
  ERROR
}

export default function LogInPage({navigation}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  const [error, setError] = useState<boolean>(false)


    return (
      <View
      style={styles.loginBackground}
      >
        <Banner visible={error}>Error!</Banner>
        <LinearGradient
          // Background Linear Gradient
          colors={[ '#b5dcf8','#e3eef6']}
          style={{flex:1}}
        >
          <Text
          style={{
            fontSize: 40,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 50,
          }}
          > Log In </Text>

          <View 
          style={{
            marginLeft: 30,
            width: 300,
            marginTop: 40
          }}>
            <TextInput
            label='Email'
            value={email}
            onChangeText={(text)=>setEmail(text)}
            ></TextInput>
          </View>
{/* setting the password */}
          <View 
          style={{
            marginLeft: 30,
            width: 300,
            marginTop: 40
          }}>
            <TextInput
            label='Password'
            value={password}
            onChangeText={(text)=>setPassword(text)}
            ></TextInput>
          </View>

          <TouchableOpacity
          style={{
            borderRadius: 10,
            backgroundColor: '#2A3779',
            padding:10,
            width: 100,
            marginTop: 40,
            marginLeft: 140,
            
          }}
          onPress={async ()=>{
            const user = new Users()
            try {
              await user.loginUser(email, password)
              navigation.navigate('Home')
              setError(false);
            } catch (err) {
              setError(true);
              console.log("error!")
            }
          }}>
            <Text
            style={{
              fontWeight: 'bold',
              fontFamily: 'DMSans',
              alignContent: 'center',
              color:'white',
              textAlign: 'center'
            }}> Log In </Text>
          </TouchableOpacity>
        <Image
        style={{
          height:200,
          width:200,
          marginTop: 200,
          flex:1,
          alignSelf: 'flex-end'
        }}
        source={require('../../assets/images/ivy-plant-watercolor-simplicity-painting-free-png 1.png')}
        ></Image>


        </LinearGradient>
      </View>
    );
}
