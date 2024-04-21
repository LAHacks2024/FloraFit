import { LinearGradient } from "expo-linear-gradient";
import { collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, Image} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IconButton, Card, Text } from "react-native-paper";
import { Boss } from "../../backend/entities/raid.model";
import { globalStyles } from "../globalStyles";
import {Button} from "react-native-paper";
import Layout from "../layout";
import {styles} from "./style";
import { Users } from "../../backend/api/users";
import { AUTH } from "../../backend/environments";
import { UserPlants } from "../../backend/api/userPlants";
import { PlantStage, UserPlantDTO } from "../../backend/entities/UserPlant.model";
import { User } from "../../backend/entities/user.model";





export default function RaidScreen({ route, navigation }){

    const stopName = route.params.stopName; //route params
    const latitude = route.params.latitude; //route params
    const longitiude = route.params.longitiude; //route params

    const [user, setUser] = useState<User| undefined >(null);
    const [hasError, setHasError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('')

    useEffect(() => {
        const getBuddy = async () => {
          const currUser = await new Users().get(AUTH.currentUser.uid);
          const buddy = await new UserPlants().get(currUser.soleMateId);
          console.log(buddy);
          setUser(currUser);
  
        }
        getBuddy();
     }, []);
  

    const bossOptions = [Boss.PEAR_TREE, Boss.SOUR_FIG, Boss.THISTLE]
    const pickedBoss = bossOptions[Math.floor(Math.random()*bossOptions.length)];


    function removeFirst(arr, value) {
        var index = arr.indexOf(value);
        if (index > -1) {
          arr.splice(index, 1);
        }
        return arr;
      }

     function getDescription(boss: string) {
        if (boss == Boss.PEAR_TREE) {
            return 'Bradford pear trees, once popular for their spring flowers, are now considered invasive. They crowd out native plants, reducing biodiversity, and their weak branches are prone to breaking in storms.';
        } else if (boss == Boss.SOUR_FIG) {
            return 'The Sour Fig, also known as Hottentot-fig, is a ground-creeping plant with edible fruits and leaves. However, in places like California and Australia, this fast-growing plant can become invasive, outcompeting native vegetation and disrupting the natural balance of coastal ecosystems.';
        } else {
            return 'The Italian Thistle, an invasive plant, can aggressively outcompete native vegetation for resources. This disrupts ecosystems and reduces biodiversity in the areas it takes hold.';
        }

    }

    const onSubmit = async () => {
        // does user have sufficient items?
        const itemsArray = ['shovel', 'wheelbarrow', 'watering can']
        console.log('hi')
        if (!user || !(itemsArray.every((val) => user.inventory.includes(val)))) {
          setErrorMessage('Please have more than 50 characters');
          setHasError(true);
          await navigation.goBack();
          return;
        }
        console.log('hi')
        setHasError(false);
        setErrorMessage('');

        let newInventoryShovel = removeFirst(user.inventory, 'shovel');
        let newInventoryWC = removeFirst(newInventoryShovel, 'watering can');
        let newInventoryWB = removeFirst(newInventoryWC, 'wheelbarrow');

        const userId = AUTH.currentUser.uid;
        const users = new Users();

        await users.update(userId, {inventory: newInventoryWB});

        const userPlant = new UserPlants();
        const plant: UserPlantDTO = {
            userId: AUTH.currentUser.uid,
            plantId: 'WyQ7oPOi3M0bge42bRa4', // TODO: Remove the static
            stage: PlantStage.FIRST,
            currentStepCount: 0,
        };
        await userPlant.create(plant);

        await navigation.navigate('NewPlant');
      }

    const navigateToHome = () => {
        navigation.navigate('Home');
     };

    


    return (
        <View
        style={{
            flex:1

        }}>
            <LinearGradient
            colors={['#f06a6a', '#ffe3e3']}
            style={{
                flex:1
            }}>
        <View style={[globalStyles.header, {marginTop: 50}]}>
          <Button style={globalStyles.backButton} icon={"arrow-left-bold-circle"}
            onPress={() =>
              navigateToHome()
            }
          >
            <></>
          </Button>
           <View style={globalStyles.headerCell}>
              <View style={globalStyles.headerInnerCell}>
                 <Image source={require('../../assets/markers/raid-marker.png')} style={{width: 28, height: 28, resizeMode:'contain'}}></Image>
                 <Text style={globalStyles.headerInnerCellHeader}>Invasion!</Text>
              </View>
              <Text style={globalStyles.headerCellText}>{stopName}</Text>
           </View>
        </View>
        <View style={{flex: 1, alignContent: 'center', flexDirection: 'row', justifyContent: 'center'}}>
            {pickedBoss == Boss.THISTLE && <Image style={styles.mainImage} source={require('../../assets/bosses/italian-thistle.jpeg')}/>}
            {pickedBoss == Boss.PEAR_TREE && <Image style={styles.mainImage} source={require('../../assets/bosses/bradford-pear-tree.jpeg')}/>}
            {pickedBoss == Boss.SOUR_FIG && <Image style={styles.mainImage} source={require('../../assets/bosses/sour-fig.jpeg')}/>}
        </View>

        <View style={{marginTop: 50, width: '80%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'center', backgroundColor: 'white', borderRadius: 10, padding: 20}}>
            <Text style={{fontSize: 20, fontFamily: 'DMSans-Bold',fontWeight: 800}}>{pickedBoss}</Text>
        </View>


        <View style={{marginTop: 10, alignSelf: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 16, fontFamily: 'DMSans-Variable', textAlign: 'center', width:310}}>{getDescription(pickedBoss)}</Text>
            <Text style={{marginTop: 20, fontSize: 16, fontFamily: 'DMSans'}}>Needed Items</Text>
        </View>
        <View style={{marginTop: 20, flex: 1, alignContent: 'center', flexDirection: 'row', justifyContent: 'space-around'}} >
            <Image style={{ height: 40, width: 40, resizeMode: 'contain'}}
            source={require('../../assets/items/shovel.png')}/>
             <Image style={{ height: 40, width: 40, resizeMode: 'contain'}}
            source={require('../../assets/items/wheelbarrow.png')}/>
             <Image style={{ height: 40, width: 40, resizeMode: 'contain'}}
            source={require('../../assets/items/watering-can.png')}/>
        </View>

        <Button contentStyle={{ paddingVertical: 15, }} style={styles.submitButton} onPress={onSubmit}>
            <Text style={styles.buttonText}>check inventory</Text>
        </Button>


        </LinearGradient>


        </View>






   
    )

}


