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

export default function Evolution({navigation}) {
  const [buddyImage, setBuddyImage] = useState<string>('');

  // Gets the buddy image
  useEffect(() => {
    const getBuddyImage = async () => {
      const currUser = await new Users().get(AUTH.currentUser.uid);
      const buddies = new UserPlants();
      const plants = new Plants();
      const buddy = await buddies.get(currUser.soleMateId);
      if (buddy.stage == PlantStage.FIRST) {
         await buddies.update(currUser.soleMateId, {stage: PlantStage.SECOND});
         const buddyImage = await new Images().getImage(PlantStage.SECOND);
         setBuddyImage(buddyImage);

      } else if (buddy.stage == PlantStage.SECOND) {
         await buddies.update(currUser.soleMateId, {stage: PlantStage.THIRD});
         const plant = await plants.get(buddy.plantId);
         const buddyImage = await new Images().getImage(plant.name);
         setBuddyImage(buddyImage);
      }
    }
    getBuddyImage();
  }, []);

  const handleClose = () => {
    navigation.goBack();
  };


  return (
    <Layout>
      <View style={styles.header}>
        <IconButton icon={'close'} onPress={handleClose} iconColor={'#000'} size={35}></IconButton>
        <Text style={styles.headerText}>Level Up!</Text>
      </View>
      <View>
         <FadeInView style={styles.subtitle}>
            <Text style={styles.descText}>your solemate has evolved</Text>
         </FadeInView>

         <View style={{flex: 1, alignItems: 'center', marginTop: 30}}>
          {buddyImage ? <Image style={{
            width: 300,
            height: 300, 
            resizeMode: 'contain'
          }} source={{uri: buddyImage}}></Image> : null}
        </View>
      </View>
    </Layout>
  );
}