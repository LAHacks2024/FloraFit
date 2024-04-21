import { TouchableOpacity, View } from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE}  from 'react-native-maps';
import {LocationObject, requestForegroundPermissionsAsync, getCurrentPositionAsync, watchPositionAsync, LocationAccuracy } from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import { Image, Text} from 'react-native';
import { styles} from "./style";
import { Pedometer } from 'expo-sensors';
import { PlantStage, UserPlant } from '../../backend/entities/UserPlant.model';
import {Images} from "../../backend/api/images.ts";
import {UserPlants} from "../../backend/api/userPlants.ts";
import {Users} from "../../backend/api/users.ts";
import {AUTH} from "../../backend/environments.ts";


export default function Map({navigation}) {

   const [buddy, setBuddy] = useState<UserPlant | undefined >(null);
   const [user, setUser] = useState<User | undefined >(null);


   useEffect(() => {
      const getBuddy = async () => {
        const currUser = await new Users().get(AUTH.currentUser.uid);
        const buddy = await new UserPlants().get(currUser.soleMateId);
        console.log(buddy);
        setBuddy(buddy);
        setUser(currUser);

      }
      getBuddy();
   }, []);


   // user location and stops state
   const [location, setLocation] = useState<LocationObject | null>(null);
   const [stops, setStops] = useState<Array<any>>([]);
   const [raids, setRaids] = useState<Array<any>>([]);
   const mapRef = useRef<MapView>(null);

   // step count state
   const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
   const [stepCount, setStepCount] = useState(0);
   const [currentStepCount, setCurrentStepCount] = useState(0);

   // pedometer handling
   const subscribe = async () => {
      const isAvailable = await Pedometer.isAvailableAsync();
      setIsPedometerAvailable(String(isAvailable));
  
      if (isAvailable) {
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - 1);
  
        const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
        if (pastStepCountResult) {
          setStepCount(pastStepCountResult.steps);
        }
        if (user?.inventory.length == 0 && pastStepCountResult.steps > 1000) {
            navigateToNewItem();
         
        }
   
  
        return Pedometer.watchStepCount(result => {
         setStepCount((count) => count + result.steps);
         setCurrentStepCount(result.steps);
        });
      }
    };
  

   useEffect(() => {
      const subscription = subscribe();
      return () => subscription && subscription.remove();
   }, []);
   

   // stops and redirection handling
   const navigateToStop = (stopName: string, location: string) => {
      navigation.navigate('Stop', {
         stopName: stopName,
         location: location,
      });
   };

   const navigateToRaid = (stopName: string, latitude: string, longitude: string) => {
      navigation.navigate('Raid', {
         stopName: stopName,
         latitude: latitude,
         longitude: longitude,
      });
   };

   const navigateToGreenHouse = () => {
      navigation.navigate('Greenhouse');
   };

   const navigateToEvolution = () => {
      navigation.navigate('Evolution');
   };
   const navigateToNewItem = () => {
      navigation.navigate('NewItem');
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
        // timeInterval: 3000, /** apparently this is android only */
        distanceInterval: 250, /** 10 meters walked, update position */
      }, (response) => {
            //console.log('hi', response.coords.latitude, response.coords.longitude)

            /** getting normal stops */
            fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${response.coords.latitude},${response.coords.longitude}&radius=500&type=park&key=${'AIzaSyDG6bq8Ocb1SO_B68CFlWyL6sJXG19YbXk'}`)
               .then(response => response.json())
               .then(json => {
                 // console.log(json.results)
                 setStops(json.results);
               })
               .catch(error => {
                 console.error(error);
            });
            fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${response.coords.latitude},${response.coords.longitude}&radius=500&type=parking&key=${'AIzaSyDG6bq8Ocb1SO_B68CFlWyL6sJXG19YbXk'}`)
               .then(response => response.json())
               .then(json => {
                 // console.log(json.results)
                 setRaids(json.results);
               })
               .catch(error => {
                 console.error(error);
            });
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

            {
               stops.map((stop, index) => (
                  <Marker 
                     coordinate={{
                        latitude: stop.geometry.location.lat,
                        longitude: stop.geometry.location.lng,
                     }}
                     onPress={() => navigateToStop(stop.name, stop.plus_code.compound_code)}
                  >
                     <Image source={require('../../assets/markers/stop-marker.png')} style={{height: 85, width:85, resizeMode: 'contain'}} />

                  </Marker>

               ))
            }

{
               raids.map((stop, index) => (
                  <Marker 
                     coordinate={{
                        latitude: stop.geometry.location.lat,
                        longitude: stop.geometry.location.lng,
                     }}
                     onPress={() => navigateToRaid(stop.name, stop.geometry.location.lat, stop.geometry.location.lng)}
                  >
                     <Image source={require('../../assets/markers/raid-marker.png')} style={{height: 85, width:85, resizeMode: 'contain'}} />

                  </Marker>

               ))
            }

         </MapView>
         <View style={styles.topLeft}>
            <Image source={require('../../assets/step-icon.png')} style={{height: 100, width: 100, resizeMode: 'contain'}}/>
            {isPedometerAvailable && <Text>Steps {stepCount}</Text>}
            {currentStepCount > 5 && 
            
            <TouchableOpacity
               style={styles.touchableLeft}
               onPress={() => navigateToEvolution()}
            > 
               <Text>Level Up Your Buddy!</Text>
            </TouchableOpacity>}

         </View>
         <View style={styles.bottomRow}>
            <TouchableOpacity
               style={styles.touchableLeft}
               onPress={() => navigateToGreenHouse()}
            > 
               <Image source={require('../../assets/buttons/greenhouse.png')} style={{height: 66, width: 66}}/>
            </TouchableOpacity>
            <TouchableOpacity
               style={[styles.touchable, styles.touchableRight]}
               onPress={() => {
                 navigation.navigate('Settings');
               }}
            > 
               <Image source={require('../../assets/avatars/dino-buddy.png')} style={{
                width: 60,
                 height: 60,
                 position: 'absolute',
                top: 0,
               }}/>
            </TouchableOpacity>
         </View>
      </View>
    );


}
