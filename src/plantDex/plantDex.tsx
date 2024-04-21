import {FlatList, View, Text} from "react-native";
import {useEffect, useState} from "react";
import {Plant} from "../../backend/entities/plant.model.ts";
import {Plants} from "../../backend/api/plants.ts";
import {Images} from "../../backend/api/images.ts";
import Layout from "../layout.tsx";
import {styles} from "./styles.ts";
import {IconButton, Modal, PaperProvider, Portal} from "react-native-paper";
import {globalStyles} from "../globalStyles.ts";

export default function PlantDex({navigation}) {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [visible, setVisible] = useState(false);

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
               <View style={globalStyles.optionButton}>
                 <Text style={globalStyles.optionButtonText}>{item.name}</Text>
               </View>
             );
           }}
           keyExtractor={(item) => item.id}
         />
       </View>
       <Portal>
         <Modal visible={visible} contentContainerStyle={styles.containerStyle}>
           <Text>Example Modal.  Click outside this area to dismiss.</Text>
         </Modal>
       </Portal>
     </Layout>
   </PaperProvider>
  );
}