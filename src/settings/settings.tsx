import {View, Text, Image, TouchableOpacity} from "react-native";
import Layout from "../layout.tsx";
import {ActivityIndicator, Button, IconButton} from "react-native-paper";
import {styles} from "./styles.ts";
import {globalStyles} from "../globalStyles.ts";
import {AUTH} from "../../backend/environments.ts";
import {useEffect, useState} from "react";
import {Images} from "../../backend/api/images.ts";
import {UserPlants} from "../../backend/api/userPlants.ts";
import {Users} from "../../backend/api/users.ts";
import { Plants } from "../../backend/api/plants.ts";
import { PlantStage } from "../../backend/entities/UserPlant.model.ts";

export default function Settings({navigation}) {
  const [buddyImage, setBuddyImage] = useState<string>('')

  // Gets the buddy image
  useEffect(() => {
    const getBuddyImage = async () => {
      const currUser = await new Users().get(AUTH.currentUser.uid);
      const buddy = await new UserPlants().get(currUser.soleMateId);
      const plant = await new Plants().get(buddy.plantId)
      let buddyImage: string;
      if (buddy.stage == PlantStage.THIRD ) {
        buddyImage = await new Images().getImage(plant.imageURL);
      } else {
        buddyImage = await new Images().getImage(buddy.stage);
      }

      setBuddyImage(buddyImage);
    }
    getBuddyImage();
  }, []);

  const handleClose = () => {
    navigation.goBack();
  };

  const handleLogOut = async () => {
    await AUTH.signOut();
    navigation.navigate('Landing');
  }

  const handleSoleMate = () => {
    navigation.navigate('ChangeSole');
  };

  return (
    <Layout>
      <View style={[styles.header, {marginTop: 50}]}>
        <IconButton icon={'close'} onPress={handleClose} iconColor={'#000'} size={35}></IconButton>
        <Text style={styles.headerText}>Settings</Text>
      </View>
      <View style={styles.mainImages}>
        <View style={styles.userProfilePic}>
          <Image style={styles.userImage} source={require('../../assets/avatars/dino-buddy.png')}></Image>
        </View>
        <View style={styles.buddyIcon}>
          {buddyImage ? <Image style={{
            width: 100,
            height: 100,
            resizeMode: 'contain'
          }} source={{uri: buddyImage}}></Image> :
          <ActivityIndicator style={{
            width: 100,
            height: 100,
            alignSelf: 'center'
          }} size='large'></ActivityIndicator>
          }
        </View>
      </View>

      <View style={styles.options}>
        <TouchableOpacity onPress={handleSoleMate} style={globalStyles.optionButton}>
          <Text style={globalStyles.optionButtonText}>Change Sole Mate</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          navigation.navigate('PlantDex');
        }} style={globalStyles.optionButton}>
          <Text style={globalStyles.optionButtonText}>View PlantDex</Text>
        </TouchableOpacity>

        <TouchableOpacity style={globalStyles.optionButton}>
          <Text style={globalStyles.optionButtonText}>See Inventory</Text>
        </TouchableOpacity>

        <TouchableOpacity style={globalStyles.optionButton}>
          <Text style={globalStyles.optionButtonText}>Change Other Profile Information</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleLogOut} style={styles.logOutButton}>
        <Text style={styles.logOutText}>log out</Text>
      </TouchableOpacity>
    </Layout>
  );
}