import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      flex: 1,
      width: '100%'
    },
    content: {
      marginHorizontal: 25,
      paddingHorizontal: 25,
      paddingVertical: 35,
      backgroundColor: '#fff',
      flex: 1,
      marginBottom: 25,
      borderRadius: 15,
    },
    question: {
      paddingBottom: 25,
      borderBottomColor: '#E2E2E2',
      borderBottomWidth: 2,
    },
    textInput:{
      marginTop: 25,
      borderBottomWidth: 0,
      paddingHorizontal: 0,
      paddingVertical: 15,
      borderWidth: 0,
      height: '100%',
      flex: 1,
    },
    submitButton: {
      backgroundColor: '#2A3779',
      marginHorizontal: 25,
      marginBottom: 35,
      borderRadius: 15,
    },
    buttonText: {
      fontWeight: "bold",
      fontSize: 15,
    }
  });