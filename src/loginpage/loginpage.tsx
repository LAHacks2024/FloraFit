import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';

import React, { useState } from 'react';

// import { Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import {styles} from './style.ts'
import {TextInput} from 'react-native-paper'

export default function LogInPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    return (
      <View
      style={styles.loginBackground}
      >
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
          onPress={()=>{
            

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
        {/* <Text>Hello</Text> */}
      </View>
    );
}
