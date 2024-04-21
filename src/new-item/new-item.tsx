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
import { User } from "../../backend/entities/user.model.ts";

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

export default function NewItem({navigation}) {

  const handleClose = () => {
    navigation.navigate('Home');
  };

  const itemOptions = ['shovel', 'wheelbarrow', 'watering can'];
  const pickedItem = itemOptions[Math.floor(Math.random()*itemOptions.length)];

  const [user, setUser] = useState<User| undefined >(null);
  useEffect(() => {
   const getBuddy = async () => {
     const users = new Users();
     const currUser = await users.get(AUTH.currentUser.uid);
     const inventory = currUser.inventory;
     inventory.push(pickedItem);
     users.update(AUTH.currentUser.uid, {inventory: inventory});
     setUser(currUser);

   }
   getBuddy();
}, []);



  return (
    <Layout>
      <View style={styles.header}>
        <IconButton icon={'close'} onPress={handleClose} iconColor={'#000'} size={35}></IconButton>
        <Text style={styles.headerText}>Item Found!</Text>
      </View>
      <View>
         <FadeInView style={styles.subtitle}>
            <Text style={styles.descText}>as you walk, you might find things to help you on your journey</Text>
         </FadeInView>

         <View style={{flex: 1, alignItems: 'center', marginTop: 30}}>
          {pickedItem == 'watering can' && <Image style={{
            width: 300,
            height: 300, 
            resizeMode: 'contain'
          }} source={require('../../assets/items/watering-can.png')}></Image>}
          {pickedItem == 'shovel' && <Image style={{
            width: 300,
            height: 300, 
            resizeMode: 'contain'
          }} source={require('../../assets/items/shovel.png')}></Image>}
          {pickedItem == 'wheelbarrow' && <Image style={{
            width: 300,
            height: 300, 
            resizeMode: 'contain'
          }} source={require('../../assets/items/wheelbarrow.png')}></Image>}
        </View>
      </View>
    </Layout>
  );
}