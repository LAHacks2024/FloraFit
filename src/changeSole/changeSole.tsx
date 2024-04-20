import Layout from "../layout.tsx";
import React, {useEffect, useState} from "react";
import {Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {ActivityIndicator, IconButton} from "react-native-paper";
import {UserPlants} from "../../backend/api/userPlants.ts";
import {AUTH, STORAGE} from "../../backend/environments.ts";
import {UserPlant} from "../../backend/entities/UserPlant.model.ts";
import {Plant} from "../../backend/entities/plant.model.ts";
import {Plants} from "../../backend/api/plants.ts";
import { getDownloadURL, uploadBytes, ref, deleteObject } from "firebase/storage";
import {Images} from "../../backend/api/images.ts";


const { width } = Dimensions.get('window');
const windowWidth = width;
export const gap = 12;
const itemPerRow = 4;
const totalGapSize = (itemPerRow - 1) * gap;
export const childWidth = (windowWidth - totalGapSize) / itemPerRow;

interface UserPlantsExtended extends UserPlant {
  plantDetails: Plant;
  plantImage: string;
}

export default function ChangeSole({navigation}) {
  const [userPlants, setUserPlants] = useState<UserPlantsExtended[]>([]);
  const [firstLoaded, setFirstLoaded] = useState<boolean>(true)
  const plantCache = new Map<string, Plant>();
  const plantImageCache = new Map<string, string>();

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
        let plantImage: string = '';

        // Check to see if the image exists
        if (plantImageCache.has(plant.stage)) {
          plantImage = plantImageCache.get(plant.stage);
        }

        // Otherwise, fetch the image
        else {
          const tempImage = await new Images().getImage(plant.stage);
          plantImageCache.set(plant.stage, tempImage);
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

  // First loaded
  if (firstLoaded) {
    return (
      <Layout>
        <View style={styles.header}>
          <IconButton icon={'close'} onPress={handleClose} iconColor={'#000'} size={35}></IconButton>
          <Text style={styles.headerText}>Settings</Text>
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
        <Text style={styles.headerText}>Settings</Text>
      </View>
      <View style={styles.content}>
        <SafeAreaView>
          <ScrollView>
            {userPlants.map((item: UserPlantsExtended) => (
              <View key={item.id}>
                <Image source={{uri: item.plantImage}} style={{width: 100, height: 100}}></Image>
                <Text>
                  {item.plantDetails.name}
                </Text>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </View>
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
  itemsWrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: -(gap / 2),
    marginHorizontal: -(gap / 2),
  },
  singleItem: {
    marginHorizontal: gap / 2,
    minWidth: childWidth,
    maxWidth: childWidth,
  },
});