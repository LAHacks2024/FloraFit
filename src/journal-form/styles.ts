import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  left: {
    borderRightColor: '#972626',
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderBottomColor: '#759CB8',
    width: '20%',
  },
  right: {
    borderBottomWidth: 2,
    borderBottomColor: '#759CB8',
    width: '80%',
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 50,
    marginLeft: 20,
  },
  topHeader: {
    paddingTop: 35,
  },
  innerText: {
    fontSize: 23,
    color: '#000',
    paddingHorizontal: 9.2,
    paddingVertical: 3,
    fontStyle: "italic",
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 25,
    margin: 20,
    minHeight: 550,
    justifyContent: 'flex-start'
  },
  modalHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  modalText: {
    fontSize: 20,
    color: '#000',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    },
  button: {
    margin: 20,
    padding: 10,
    backgroundColor: '#759CB8',
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