import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'DMSans',
    },
    map: {
      flex: 1,
      width: '100%'
    },
    tinyLogo: {
      width: 50,
      height: 50,
    },
    topLeft: {
      position:'absolute',
      top: 10,
      left: 10,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: 10,

      backgroundColor: 'rgba(241, 252, 240, 0.5)',
      borderRadius: 10,

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
      borderRadius: 20
    },
    touchable: {
      height: 70,
      width: 70,
      overflow: "hidden",
      backgroundColor: '#BCDCC9',
      borderWidth: 3,
      borderColor: '#fff',
      borderRadius: 50,
    },
  touchableLeft: {
    padding: 10,
  },
  touchableRight: {
  padding: 10,
  },
  pedometerTxt: {
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    textAlign: 'center',
  }
  });