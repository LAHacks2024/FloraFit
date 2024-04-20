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
   /**
    * FOR PLACES API:
    * https://reactnative.dev/docs/network
    * https://developers.google.com/maps/documentation/places/web-service/search-nearby#maps_http_places_nearbysearch-txt 
    * (^^ CTRL + F for examples)
    * 
    */


   const [location, setLocation] = useState<LocationObject | null>(null);
   const [initialLocation, setInitialLocation] = useState<LocationObject | null>(null);
   const timeAppOpened = new Date();
   const mapRef = useRef<MapView>(null);
   const navigation = useNavigation();

   const navigateToStop = (stopName: string, location: string) => {
      navigation.navigate('Stop', {
         stopName: 'natural bridges',
         location: 'santa cruz'
      });
   };

   const navigateToGreenHouse = () => {
      navigation.navigate('Greenhouse');
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
        timeInterval: 3000,
        distanceInterval: 1,
      }, (response) => {
            // update and check for distance travelled if one of the following is true
            // (1) app loads - in which case, set initial location
            // (2) user has travelled a sufficient distance since they opened the app, in which case, update initial location and stops displayed.
            // otherwise, merely update current location (no step refreshes)
            if (!initialLocation) {
               setInitialLocation(location);
            } else if (initialLocation && (Math.abs(initialLocation.coords.latitude -  response.coords.latitude)  > 1 || Math.abs(initialLocation.coords.longitude -  response.coords.longitude) > 1)){
               setInitialLocation(location);
               // get new stops
               /**
                * URL for us: https://maps.googleapis.com/maps/api/place/nearbysearch/json
                              ?keyword=cruise
                              &location=-33.8670522%2C151.1957362
                              &radius=1500
                              &type=restaurant
                              &key=YOUR_API_KEY
                * EXAMPLE OF ENDPOINT CALL
                * 
               fetch('https://mywebsite.com/endpoint/', {
                  method: 'POST',
                  headers: {
                     Accept: 'application/json',
                     'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                     firstParam: 'yourValue',
                     secondParam: 'yourOtherValue',
                  }),
               });
               */
            }
            setLocation(response);
            mapRef.current?.animateCamera({
               pitch: 70,
               center: response.coords
            });

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
               onPress={() => navigateToGreenHouse()}
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
