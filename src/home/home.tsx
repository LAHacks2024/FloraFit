import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE}  from 'react-native-maps';
import { styles } from './style.tsx';
import {LocationObject, requestForegroundPermissionsAsync, getCurrentPositionAsync, watchPositionAsync, LocationAccuracy } from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

export default function Map() {

   const [location, setLocation] = useState<LocationObject | null>(null);
   const mapRef = useRef<MapView>(null);
   const navigation = useNavigation();

   const navigateToStop = (stopName: string, location: string) => {
      navigation.navigate('Stop', {
         stopName: 'natural bridges',
         location: 'santa cruz'
      });
   };

   const navigateToGreenHouse = () => {
      navigation.navigate('Stop', {
         stopName: 'natural bridges',
         location: 'santa cruz'
      });
   };

   async function requestLocationPermission() { 
      const {granted} = await requestForegroundPermissionsAsync();
  
      if(granted) {
          const currentPosition = await getCurrentPositionAsync();
          setLocation(currentPosition);
  
        }
   }

   useEffect(()=> {
      requestLocationPermission();
  
    }, []);

   useEffect(()=> {
      watchPositionAsync({
        accuracy: LocationAccuracy.Highest, 
        timeInterval: 1000,
        distanceInterval: 1,
      }, (response) => {
          setLocation(response);
          mapRef.current?.animateCamera({
            pitch: 70,
            center: response.coords
          })
      })
    }, [])

    return (
      <View style={styles.container}>
        <MapView 
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location?.coords.latitude,
            longitude: location?.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          }}>
            <Marker coordinate={{
               latitude: location?.coords.latitude,
               longitude: location?.coords.longitude,
            }}>
               <Image source={require('../../assets/avatars/dino-buddy.png')} style={{height: 85, width:85, resizeMode: 'contain'}} />

            </Marker>

            {/** Hard-coded marker for testing redirecting */}
            <Marker 
               coordinate={{
                  latitude: location ? location?.coords.latitude + .0001 : 2,
                  longitude: location ? location?.coords.longitude + .0001: 2,
               }}
               onPress={() => navigateToStop('bleh', 'bleh')}
            >
               <Image source={require('../../assets/markers/stop-marker.png')} style={{height: 85, width:85, resizeMode: 'contain'}} />

            </Marker>

         </MapView>
         <View style={styles.bottomRow}>
            <TouchableOpacity
               style={styles.touchableLeft}
               onPress={() => console.log("press")}
            > 
               <Image source={require('../../assets/buttons/greenhouse.png')} style={{height: 66, width: 66}}/>
            </TouchableOpacity>
            <TouchableOpacity
               style={styles.touchableRight}
               onPress={() => console.log("press")}
            > 
               <Image source={require('../../assets/buttons/ellipse.png')} style={{height: 66, width: 66}}/>
            </TouchableOpacity>
         </View>
      </View>
    );


}
