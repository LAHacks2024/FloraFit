import { StyleSheet, Text, View, Image } from 'react-native';

import React from 'react';
import {styles} from "./style";


export default function Landing() {

    return (
      <View style={styles.container}>
        <Text>Hi</Text>
        <View>
        <Image source={require('../../assets/avatars/dino-buddy.png')} style={{height: 90, width:90, resizeMode: 'contain'}} />

        </View>
      </View>
    );


}
