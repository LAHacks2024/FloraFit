import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';

import React from 'react';
import {styles} from "./style";
import {Button} from "react-native-paper";
import {globalStyles} from "../globalStyles";


export default function Stop({route, navigation}) {
   const navigateToHome = () => {
      navigation.navigate('Home');
   };

   const navigateToStopJournaling = (stopName: string) => {
      navigation.navigate('StopJournaling', {
         stopName: 'natural bridges',
         city: 'santa cruz'
      });
   };

    return (
      <View style={styles.container}>
         <View style={globalStyles.header}>
           <Button style={globalStyles.backButton} icon={"arrow-left-bold-circle"}
             onPress={() =>
               navigateToHome()
             }
           >
             <></>
           </Button>
            <View style={globalStyles.headerCell}>
               <View style={globalStyles.headerInnerCell}>
                  <Image source={require('../../assets/markers/marker-bw.png')} style={{width: 28, height: 28}}></Image>
                  <Text style={globalStyles.headerInnerCellHeader}>Root Route</Text>
               </View>
               <Text style={globalStyles.headerCellText}>natural bridges beach</Text>
            </View>
         </View>

         <View style={globalStyles.content}>
           <Image style={styles.mainImage} source={require('../../assets/natural-bridges.png')}/>

           <TouchableOpacity
             onPress={() =>
               navigateToStopJournaling('natural bridges')
             }
             style={styles.button}
           >
             <Text>{'Write a journal entry for this stop'}</Text>
           </TouchableOpacity>
         </View>
         {/*<TouchableOpacity*/}
         {/*         onPress={() =>*/}
         {/*            navigateToStopJournaling('natural bridges')*/}
         {/*         }*/}
         {/*      >*/}
         {/*         <Text>{'See who else has visited this stop'}</Text>*/}
         {/*</TouchableOpacity>*/}
         {/*<TouchableOpacity*/}
         {/*         onPress={() =>*/}
         {/*            navigateToStopJournaling('natural bridges')*/}
         {/*         }*/}
         {/*      >*/}
         {/*         <Text>{'Use item at this stop'}</Text>*/}
         {/*</TouchableOpacity>*/}
      </View>
    );


}
