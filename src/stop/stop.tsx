import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';

import React from 'react';
import {styles} from "./style";


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
         <View>
            <View>
               <TouchableOpacity
                  onPress={() =>
                     navigateToHome()
                  }
               >
                  <Text>Back</Text>
               </TouchableOpacity>

            </View>
            <View>
               <View>
                  <Image source={require('../../assets/markers/marker-bw.png')} style={{width: 28, height: 28}}></Image>
                  <Text>Root Route</Text>
               </View>
               <Text>natural bridges beach</Text>
            </View>
         </View>
         <Image source={require('../../assets/natural-bridges.png')}/>
         <TouchableOpacity
                  onPress={() =>
                     navigateToStopJournaling('natural bridges')
                  }
               >
                  <Text>{'Write a journal entry for this stop'}</Text>
         </TouchableOpacity>
         <TouchableOpacity
                  onPress={() =>
                     navigateToStopJournaling('natural bridges')
                  }
               >
                  <Text>{'See who else has visited this stop'}</Text>
         </TouchableOpacity>
         <TouchableOpacity
                  onPress={() =>
                     navigateToStopJournaling('natural bridges')
                  }
               >
                  <Text>{'Use item at this stop'}</Text>
         </TouchableOpacity>
         
         {
            /**
             <FlatList
            data={['Write a journal entry for this stop', 'See who else has visited this stop', 'Use item at this stop']}
            renderItem={({ item, index }) => (
               <TouchableOpacity
                  onPress={() =>
                     navigateToStopJournaling('natural bridges')
                  }
               >
                  <Text>{item}</Text>
               </TouchableOpacity>
            )}
         />
             */
           
}
      </View>
    );


}
