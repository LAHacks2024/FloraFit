import {FlatList, View, Text, TouchableOpacity, Image} from "react-native";
import {useEffect, useState} from "react";
import {Plant} from "../../backend/entities/plant.model.ts";
import {Plants} from "../../backend/api/plants.ts";
import Layout from "../layout.tsx";
import {styles} from "./styles.ts";
import {IconButton, Modal, PaperProvider, Portal} from "react-native-paper";
import {globalStyles} from "../globalStyles.ts";
import {Images} from "../../backend/api/images.ts";

export default function PlantDex({navigation}) {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [visible, setVisible] = useState(false);
  const [modalContent, setModalContent] = useState<Plant>()
  const [image, setImage] = useState<string>('')
  const [cacheImages, setCacheImages] = useState<Map<string, string>>(new Map())

  const handleClose = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const getPlants = async () => {
      const plants = new Plants();
      const plantsData: Plant[] = await plants.getAll();
      setPlants(plantsData);
    }

    getPlants();
  }, []);

  const handlePlantClick = async (plant: Plant) => {
    // Checks to see the image is already cached based off the plant's ID
    if (cacheImages.has(plant.id)) {
      setImage(cacheImages.get(plant.id));
    } else {
      // Saves the image path to cache
      const imagePath = await new Images().getImage(plant.imageURL);
      cacheImages.set(plant.id, imagePath);
      setCacheImages(cacheImages);
      setImage(imagePath);
    }

    setModalContent(plant);
    setVisible(true);
  };

  return (
   <PaperProvider>
     <Layout>
       <View style={styles.header}>
         <IconButton icon={'close'} onPress={handleClose} iconColor={'#000'} size={35}></IconButton>
         <Text style={styles.headerText}>PlantDex</Text>
       </View>
       <View style={styles.content}>
         <FlatList
           data={plants}
           contentContainerStyle={{
             gap: 15,
           }}
           renderItem={({item}) => {
             return (
               <TouchableOpacity onPress={async () => {
                 await handlePlantClick(item);
               }} style={globalStyles.optionButton}>
                 <Text style={globalStyles.optionButtonText}>{item.name}</Text>
               </TouchableOpacity>
             );
           }}
           keyExtractor={(item) => item.id}
         />
       </View>
       <Portal>
         <Modal onDismiss={() => {
            setVisible(false);
            setModalContent(undefined);
         }} visible={visible} contentContainerStyle={styles.containerStyle}>
           <IconButton icon={'close'} onPress={() => {
             setVisible(false);
             setModalContent(undefined);
           }} iconColor={'#000'} size={35}></IconButton>
           <Image style={styles.modalImage} source={{uri: image}}></Image>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{modalContent?.name}</Text>
              <Text style={styles.modalDescription}>{modalContent?.description}</Text>
            </View>
         </Modal>
       </Portal>
     </Layout>
   </PaperProvider>
  );
}