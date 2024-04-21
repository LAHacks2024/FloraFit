import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0f0f0f',
      margin: 0,
      padding: 0,

    },
    image: {
      flex: 1,
      justifyContent: 'center',
      padding: 0,
      margin: 0,
    },
    map: {
      flex: 1,
      width: '100%'
    },
    background: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: 300,
    },
    table: {
      position: 'absolute',
      height: 80,
      bottom: '20%',
      left: '10%',
      width: '100%',
      alignSelf: "center",
    },

    left: {
      borderRightColor: '#972626',
    },
    topHeader: {
      paddingTop: 35,
    },
    text: {},
  });