import * as React from 'react';
// import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import {AppRegistry, View} from 'react-native';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Map from './src/home/home';
import Landing from './src/landing/landing';
import Stop from './src/stop/stop';
import StopJournaling from './src/stop-journaling/stop-journaling';
import LogInPage from './src/loginpage/loginpage';
import { useFonts } from 'expo-font';
import Greenhouse from './src/greenhouse/greenhouse';
import Settings from './src/settings/settings';

const Stack = createStackNavigator();

export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    'DMSans': require('./assets/fonts/static/DMSans-Bold.ttf'),
  });


  if (!fontsLoaded && !fontError) {
    return null;
  }

  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Home" component={Map} />
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Stop" component={Stop} />
        <Stack.Screen name="StopJournaling" component={StopJournaling} />
        <Stack.Screen name="LogInPage" component={LogInPage} />
        <Stack.Screen name={"Settings"} component={Settings} options={{
          headerShown: false
        }} />
        <Stack.Screen name="Greenhouse" component={Greenhouse} />
      </Stack.Navigator>
    </NavigationContainer>
  );
    
}

