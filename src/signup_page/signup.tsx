import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import { Users } from '../../backend/api/users.ts';

import React, { useState } from 'react';

// import { Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import {styles} from './style.ts'
import {TextInput} from 'react-native-paper'
import { User } from 'firebase/auth';
import { UserDTO } from '../../backend/entities/user.model.ts';

enum status {
  LOGGING_IN,
  NOT_LOGGING_IN,
  ERROR
}

export default function SignUpPage({navigation}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUserName] = useState('')
    
    // Updates the buddy to user
  const handleNewUser = async () => {
    const user = new Users()
            user.createUser(email, password, username)
            const newUser: UserDTO = {
                name: username,
                email: email,
                picture: '',
                inventory: []
            }
            await user.create(newUser);


            navigation.navigate('Home')

   };


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
          > Sign Up </Text>

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
{/* setting the user name */}
          <View 
          style={{
            marginLeft: 30,
            width: 300,
            marginTop: 40
          }}>
            <TextInput
            label='User Name'
            value={username}
            onChangeText={(text)=>setUserName(text)}
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
          onPress={async () => {
            await handleNewUser();
          }}>
            <Text
            style={{
              fontWeight: 'bold',
              fontFamily: 'DMSans',
              alignContent: 'center',
              color:'white',
              textAlign: 'center'
            }}> Sign Up </Text>
          </TouchableOpacity>
        <Image
        style={{
          height:200,
          width:200,
          marginTop: 30,
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
