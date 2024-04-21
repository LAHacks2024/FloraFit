import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    paddingVertical: 25,
    paddingLeft: 15,
    paddingRight: 30,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 25,
  },
  containerStyle: {
    backgroundColor: 'white',
    padding: 25,
  },
});