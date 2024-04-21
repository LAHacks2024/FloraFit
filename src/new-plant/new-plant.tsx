import {View, Text, Image, TouchableOpacity, Animated} from "react-native";
import Layout from "../layout.tsx";
import {Button, IconButton} from "react-native-paper";
import {styles} from "./style.tsx";
import {globalStyles} from "../globalStyles.ts";
import {AUTH} from "../../backend/environments.ts";
import {PropsWithChildren, useEffect, useRef, useState} from "react";
import {Images} from "../../backend/api/images.ts";
import {UserPlants} from "../../backend/api/userPlants.ts";
import {Users} from "../../backend/api/users.ts";
import { PlantStage } from "../../backend/entities/UserPlant.model.ts";
import { Plants } from "../../backend/api/plants.ts";

import type {ViewStyle} from 'react-native';

type FadeInViewProps = PropsWithChildren<{style: ViewStyle}>;

const FadeInView: React.FC<FadeInViewProps> = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};

export default function NewPlant({navigation}) {

  const handleClose = () => {
    navigation.navigate('Home');
  };


  return (
    <Layout>
      <View style={styles.header}>
        <IconButton icon={'close'} onPress={handleClose} iconColor={'#000'} size={35}></IconButton>
        <Text style={styles.headerText}>New Plant Unlocked</Text>
      </View>
      <View>
         <FadeInView style={styles.subtitle}>
            <Text style={styles.descText}>you can go to settings to pick them as your next sole mate!</Text>
         </FadeInView>

         <View style={{flex: 1, alignItems: 'center', marginTop: 30}}>
          <Image style={{
            width: 300,
            height: 300, 
            resizeMode: 'contain'
          }} source={require('../../assets/plants/seed.png')}></Image>
        </View>
      </View>
    </Layout>
  );
}