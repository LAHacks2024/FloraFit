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
import ChangeSole from "./src/changeSole/changeSole.tsx";
import PlantDex from "./src/plantDex/plantDex.tsx";
import Journal from "./src/journal/journal.tsx";
import Evolution from './src/evolve-buddy/evolve-buddy.tsx';
import SignUpPage from './src/signup_page/signup';
import RaidScreen from './src/raid/raid.tsx';
import NewPlant from './src/new-plant/new-plant.tsx';
import OtherJournalers from './src/stop-other-journals/stop-other-journals.tsx';

const Stack = createStackNavigator();

export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    'DMSans': require('./assets/fonts/static/DMSans-Bold.ttf'),
    'DMSans-Medium-Italic-24': require('./assets/fonts/static/DMSans_24pt-ExtraLightItalic.ttf'),
    'PressStart2P': require('./assets/fonts/PressStart2P-Regular.ttf'),
    'DMSans-Variable': require('./assets/fonts/DMSans-VariableFont_opsz,wght.ttf'),
    'DMSans-Bold': require('./assets/fonts/static/DMSans-Bold.ttf')
  });


  if (!fontsLoaded && !fontError) {
    return null;
  }

  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Home" component={Map} />
        <Stack.Screen name="Landing" component={Landing} options={{
          headerShown: false

          }}/>

        <Stack.Screen name="Stop" component={Stop} />
        <Stack.Screen name="StopJournaling" component={StopJournaling} />
        <Stack.Screen name="LogInPage" component={LogInPage} />
        <Stack.Screen name={"Settings"} component={Settings} options={{
          headerShown: false
        }} />
        <Stack.Screen name={"ChangeSole"} component={ChangeSole} options={{
          headerShown: false
        }} />
        <Stack.Screen name={"PlantDex"} component={PlantDex} options={{
          headerShown: false
        }} />        

        <Stack.Screen name="Greenhouse" component={Greenhouse} options={{
          headerShown: false
        }} />
        <Stack.Screen name="Journal" component={Journal} options={{
          headerShown: false
        }} />        
        <Stack.Screen name="SignUpPage" component={SignUpPage} />
        <Stack.Screen name="Raid" component={RaidScreen} options={{
          headerShown: false
        }} />  
        <Stack.Screen name="Evolution" component={Evolution} />
        <Stack.Screen name="NewPlant" component={NewPlant} />
        <Stack.Screen name={"OtherJournalers"} component={OtherJournalers} />
      </Stack.Navigator>
    </NavigationContainer>
  );
    
}

