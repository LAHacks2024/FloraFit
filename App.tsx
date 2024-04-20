import * as React from 'react';
// import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import Test from './src/test'
import { AppRegistry, View } from 'react-native';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Map from './src/home/home';
import Landing from './src/landing/landing';
import Stop from './src/stop/stop';
import StopJournaling from './src/stop-journaling/stop-journaling';


export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Home" component={Map} />
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Stop" component={Stop} />
        <Stack.Screen name="StopJournaling" component={StopJournaling} />
      </Stack.Navigator>

    </NavigationContainer>
  );
    
}

