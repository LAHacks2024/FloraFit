import {View, Text, Image, TouchableOpacity} from "react-native";
import Layout from "../layout.tsx";
import {Button, IconButton} from "react-native-paper";
import {styles} from "./styles.ts";
import {globalStyles} from "../globalStyles.ts";
import {AUTH} from "../../backend/environments.ts";

export default function Settings({navigation}) {
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
      <View style={styles.header}>
        <IconButton icon={'close'} onPress={handleClose} iconColor={'#000'} size={35}></IconButton>
        <Text style={styles.headerText}>Settings</Text>
      </View>
      <View style={styles.mainImages}>
        <View style={styles.userProfilePic}>
          <Image style={styles.userImage} source={require('../../assets/avatars/dino-buddy.png')}></Image>
        </View>
        <View style={styles.buddyIcon}>

        </View>
      </View>

      <View style={styles.options}>
        <TouchableOpacity onPress={handleSoleMate} style={globalStyles.optionButton}>
          <Text style={globalStyles.optionButtonText}>Change Sole Mate</Text>
        </TouchableOpacity>

        <TouchableOpacity style={globalStyles.optionButton}>
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