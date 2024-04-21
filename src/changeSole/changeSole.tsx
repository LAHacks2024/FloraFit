import Layout from "../layout.tsx";
import React, {useEffect, useState} from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import {ActivityIndicator, IconButton, Snackbar} from "react-native-paper";
import {UserPlants} from "../../backend/api/userPlants.ts";
import {AUTH} from "../../backend/environments.ts";
import {UserPlant} from "../../backend/entities/UserPlant.model.ts";
import {Plant} from "../../backend/entities/plant.model.ts";
import {Plants} from "../../backend/api/plants.ts";
import {Images} from "../../backend/api/images.ts";
import {Users} from "../../backend/api/users.ts";

interface UserPlantsExtended extends UserPlant {
  plantDetails: Plant;
  plantImage: string;
}

export default function ChangeSole({navigation}) {
  const [userPlants, setUserPlants] = useState<UserPlantsExtended[]>([]);
  const [firstLoaded, setFirstLoaded] = useState<boolean>(true)
  const plantCache = new Map<string, Plant>();
  const plantImageCache = new Map<string, string>();
  const [visible, setVisible] = React.useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const handleClose = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const getUserPlants = async () => {
      const userPlants = new UserPlants();
      const plants: UserPlant[] = await userPlants.getWhere([['userId', '==', AUTH.currentUser.uid]]);

      // Get the metadata for each plant
      const plantDetails = new Plants();
      const plantDetailsDataPromise = plants.map(async (plant: UserPlant) => {
        let plantImage: string;

        // Check to see if the image exists
        if (plantImageCache.has(plant.stage)) {
          plantImage = plantImageCache.get(plant.stage);
        }

        // Otherwise, fetch the image
        else {
          const tempImage = await new Images().getImage(plant.stage);
          plantImageCache.set(plant.stage, tempImage);
          plantImage = tempImage;
        }

        // Check to see if the plant data exists
        if (plantCache.has(plant.plantId)) {
          return {
            ...plant,
            plantDetails: plantCache.get(plant.plantId),
            plantImage: plantImage
          } as UserPlantsExtended;
        }

        // Otherwise, fetch the plant data
        const plantData: Plant = await plantDetails.get(plant.plantId);

        // Cache the plant data
        plantCache.set(plant.plantId, plantData);

        return {
          ...plant,
          plantDetails: plantData,
          plantImage: plantImage
        } as UserPlantsExtended;
      });

      const plantDetailsData: UserPlantsExtended[] =  await Promise.all(plantDetailsDataPromise);

      setUserPlants(plantDetailsData);
      setFirstLoaded(false);
    }

    getUserPlants();
  }, []);

  // Updates the buddy to user
  const handleUpdateBuddy = async (buddyId: string) => {
   const userId = AUTH.currentUser.uid;
   const users = new Users();
   await users.update(userId, {soleMateId: buddyId});
    setVisible(true);
  };


  // First loaded
  if (firstLoaded) {
    return (
      <Layout>
        <View style={styles.header}>
          <IconButton icon={'close'} onPress={handleClose} iconColor={'#000'} size={35}></IconButton>
          <Text style={styles.headerText}>Change SoleMate</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'}></ActivityIndicator>
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <View style={styles.header}>
        <IconButton icon={'close'} onPress={handleClose} iconColor={'#000'} size={35}></IconButton>
        <Text style={styles.headerText}>Change SoleMate</Text>
      </View>
      <View style={styles.content}>
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
              data={userPlants}
              contentContainerStyle={{
                gap: 15,
                margin: 'auto',
              }}
              columnWrapperStyle={{
                justifyContent: 'space-between',
              }}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity key={item.id} onPress={async () => {
                    await handleUpdateBuddy(item.id);
                  }} style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 50,
                    height: 120,
                  }}>
                    <Image source={{uri: item.plantImage}} style={{
                      width: 50,
                      height: 120,
                      resizeMode: 'contain',
                    }}></Image>
                    <Text>{item.plantDetails.name}</Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item) => item.id}
              numColumns={4}
            >

            </FlatList>
        </SafeAreaView>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}>
        Changed SoleMate!
      </Snackbar>
    </Layout>
  );
}

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    paddingVertical: 25,
    paddingLeft: 15,
    paddingRight: 30,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
  },
});