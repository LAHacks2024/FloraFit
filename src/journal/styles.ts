import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  left: {
    borderRightColor: '#972626',
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderBottomColor: '#759CB8',
  },
  right: {
    borderBottomWidth: 2,
    borderBottomColor: '#759CB8',
    flex: 1,
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
  }
});