import {View, Text, Image, TouchableOpacity} from "react-native";
import Layout from "../layout.tsx";
import {Button, IconButton} from "react-native-paper";
import {styles} from "./style.tsx";
import {globalStyles} from "../globalStyles.ts";
import {AUTH} from "../../backend/environments.ts";
import {useEffect, useState} from "react";
import {Images} from "../../backend/api/images.ts";
import {UserPlants} from "../../backend/api/userPlants.ts";
import {Users} from "../../backend/api/users.ts";
import { PlantStage } from "../../backend/entities/UserPlant.model.ts";
import { Plants } from "../../backend/api/plants.ts";

export default function Evolution({navigation}) {
  const [buddyImage, setBuddyImage] = useState<string>('')

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
        <Text style={styles.headerText}>Settings</Text>
      </View>
      <View>
         <Text>Your buddy is leveling up!</Text>
         <View style={styles.buddyIcon}>
          {buddyImage ? <Image style={{
            width: 100,
            height: 100,
          }} source={{uri: buddyImage}}></Image> : null}
        </View>
      </View>
    </Layout>
  );
}