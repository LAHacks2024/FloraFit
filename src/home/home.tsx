import { TouchableOpacity, View } from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE}  from 'react-native-maps';
import {LocationObject, requestForegroundPermissionsAsync, getCurrentPositionAsync, watchPositionAsync, LocationAccuracy } from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import { Image, Text} from 'react-native';
import {styles} from "./style";
import { Pedometer } from 'expo-sensors';

export default function Map({navigation}) {

   const [location, setLocation] = useState<LocationObject | null>(null);
   const [stops, setStops] = useState<Array<any>>([]);
   const timeAppOpened = new Date();
   const mapRef = useRef<MapView>(null);
   const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
   const [stepCount, setStepCount] = useState(0);
   const [currentStepCount, setCurrentStepCount] = useState(0);

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
        if (pastStepCountResult.steps > 1000) {
         console.log('you deserve an item')
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
   

   const navigateToStop = (stopName: string, location: string) => {
      navigation.navigate('Stop', {
         stopName: stopName,
         location: location,
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
        // timeInterval: 3000, /** apparently this is android only */
        distanceInterval: 80, /** 10 meters walked, update position */
      }, (response) => {
            console.log('hi', response.coords.latitude, response.coords.longitude)
            fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${response.coords.latitude},${response.coords.longitude}&radius=500&type=park&key=${'AIzaSyDG6bq8Ocb1SO_B68CFlWyL6sJXG19YbXk'}`)
               .then(response => response.json())
               .then(json => {
                 console.log(json.results)
                 setStops(json.results);
               })
               .catch(error => {
                 console.error(error);
            });
            // update and check for distance travelled if one of the following is true
            // (1) app loads - in which case, set initial location
            // (2) user has travelled a sufficient distance since they opened the app, in which case, update initial location and stops displayed.
            // otherwise, merely update current location (no step refreshes)
               /**
                *                fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=cruise&location=${response.coords.latitude},${response.coords.longitude}&radius=70000&type=university&key=${'AIzaSyDG6bq8Ocb1SO_B68CFlWyL6sJXG19YbXk'}`)
               .then(response => response.json())
               .then(json => {
                 console.log(json)
               })
               .catch(error => {
                 console.error(error);
               });
                */
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

         </MapView>
         <View style={styles.topLeft}>
            {isPedometerAvailable && <Text>Steps {stepCount}</Text>}
            {isPedometerAvailable && <Text>Steps {currentStepCount}</Text>}

         </View>
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
