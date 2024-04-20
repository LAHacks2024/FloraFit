import * as React from 'react';
// import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import Test from './src/test'
import { AppRegistry, View } from 'react-native';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import {expo as appName} from './app.json'
import { Button } from 'react-native-paper';
import {Users} from "./backend/api/users";
import {AUTH} from "./backend/environments";
import {Plants} from "./backend/api/plants";
import {PlantDTO} from "./backend/entities/plant.model";


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <View
        style={{justifyContent:'center', flex:1}}
      >
        <Test />
      </View>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName.name, () => App);

