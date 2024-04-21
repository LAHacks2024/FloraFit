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
    margin: 15,
    borderRadius: 15,
  },
  modalImage: {
    width: 200,
    height: 200,
    marginBottom: 15,
    alignSelf: 'center',
  },
  modalContent: {
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 15,
  },
});