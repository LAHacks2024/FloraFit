import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      flex: 1,
      width: '100%'
    },
    tinyLogo: {
      width: 50,
      height: 50,
    },
    bottomRow: {
      flex: 1,
      height: 80,
      bottom: 20,
      width: '100%',
      flexDirection:'row',
      position:'absolute',
      alignSelf: "center",
      justifyContent: "space-around",
      backgroundColor: "transparent",
      borderWidth: 0.5,
      borderRadius: 20
    },
    touchable: {
      height: 70,
    },
  touchableLeft: {}, // TODO
  touchableRight: {} // TODO
  });