import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#bbdef8'
      // backgroundColor: '#fff',
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    map: {
      flex: 1,
      width: '100%'
    },
    button: {
      borderRadius: 10,
      backgroundColor: '#2A3779',
      padding:15,
      width: 150,
    },
    button_text: {
      // flex: 1,
      fontWeight: 'bold',
      fontFamily: 'DMSans',
      fontSize: 20,
      textAlign:'center',
      color:'white'
    },
    circle: {
      width: 150,
      height: 150,
      borderRadius: 200,
      backgroundColor: '#f4eab7',
      // marginBottom: 90,
      marginLeft: 300,
      // marginTop: 20,
      // marginBottom:900,
      position:'absolute',
      top: -40,
    },
    title: {
      fontFamily:'PressStart2P',
      fontSize: 60,
      textAlign: 'center',
      alignSelf: 'center',
      color: '#3d61a7',
      // marginTop: 20
      position: 'absolute',
      width: 300,
      top: 120,
    },
    accountButtons: {
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'space-around',
      width: '100%',
      position:'absolute',
      bottom: 50,
    },
    clouds: {
      marginTop: 30,
      marginLeft: 40,
      height: 150,
      width: 400,
      position: 'absolute',
      // width: 1200,
      // height: 1200,
      top: 1,
      right: 2,
      // left: 50,
      transform: [
        {
          translateX: 0
        },
      ],      
      
    },
    // background: {
    //   position: 'absolute',
    //   width: 1200,
    //   height: 1200,
    //   top: 0,
    //   opacity: 0.2,
    //   transform: [
    //     {
    //       translateX: 0,
    //     },
    //     {
    //       translateY: 0,
    //     },
    //   ],      
    // }, 
  });