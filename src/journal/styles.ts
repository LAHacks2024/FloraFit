import {StyleSheet} from "react-native";

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
  }
});