import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';

import React from 'react';
import {styles} from "./style";
import {Button} from "react-native-paper";
import {globalStyles} from "../globalStyles";
import Layout from "../layout.tsx";


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

   console.log('stop route: ')
   console.log(route)

    return (
      <Layout>
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
               <Text style={globalStyles.headerCellText}>{route.params.stopName}</Text>
            </View>
         </View>

         <View style={globalStyles.content}>
           <Image style={styles.mainImage} source={require('../../assets/natural-bridges.png')}/>

           <TouchableOpacity
             onPress={() =>
               navigateToStopJournaling('natural bridges')
             }
             style={globalStyles.optionButton}
           >
             <Text style={globalStyles.optionButtonText}>{'Write a journal entry for this stop'}</Text>
           </TouchableOpacity>

           <TouchableOpacity
             onPress={() =>{
              //  navigateToStopJournaling('natural bridges')
              console.log(route)
              navigation.navigate('OtherJournalers', route)
             }
             }
             style={globalStyles.optionButton}
           >
             <Text style={globalStyles.optionButtonText}>{'See who else has journaled at this stop'}</Text>
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
      </Layout>
    );


}
