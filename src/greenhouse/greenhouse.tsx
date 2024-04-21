import { 
  View, 
  Image, 
  ImageBackground, 
  TouchableOpacity 
} from 'react-native';


import React from 'react';
import {styles} from "./style";
import { LinearGradient } from 'expo-linear-gradient';
import { IconButton } from 'react-native-paper';
import { UserPlant } from '../../backend/entities/UserPlant.model';
import { useState } from 'react';

export default function Greenhouse({navigation}) {
    const [userPlantCollection, setUserPlantCollection] = useState<UserPlant[]>([]);
    return (
      <View style={styles.container}>
        <LinearGradient
            // Background Linear Gradient
            colors={[ '#b5dcf8','#e3eef6']}
            style={{flex:1}}
          >
          <View style={[styles.left, styles.topHeader]}>
            <IconButton style={{marginBottom: 45}} size={40} icon={'close'} onPress={() => navigation.navigate('Home')} />
          </View>
          <ImageBackground source={require('../../assets/greenhouse.png')} style={styles.image}>
            {/* <Text style={styles.text}>Inside</Text> */}
            <TouchableOpacity
              style={styles.table}
              onPress={() => navigation.navigate('Journal')}
            >
              <Image source={require('../../assets/table.png')} style={{width: 100, height: 110, resizeMode: 'contain'}}></Image>
            </TouchableOpacity>
          </ImageBackground>

          {/* adding the user plants */}

        </LinearGradient>
      </View>
    );


}
