import * as React from 'react';
// import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import Test from './src/test'
import { AppRegistry, View } from 'react-native';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import {expo as appName} from './app.json'
import { Button } from 'react-native-paper';


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
        <Button icon="camera" mode="contained">
          Press Me!
        </Button>
      </View>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName.name, () => App);

