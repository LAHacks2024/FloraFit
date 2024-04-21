import {StyleSheet} from "react-native";

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
    fontFamily: 'DMSans',
  },
  subtitle: {
   alignContent: 'center',
  },
  descText: {
   textAlign: 'center',
   fontFamily: 'DMSans-Medium-Italic-24',
   fontSize: 20,

  },
  mainImages: {
    justifyContent: 'center',
    width: 250,
    alignSelf: 'center',
    marginBottom: 50,
  },
  userProfilePic: {
    width: 150,
    height: 150,
    borderRadius: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    overflow: 'hidden',
    backgroundColor: '#C4E2F8',
    borderWidth: 3,
    borderColor: '#fff',
  },
  userImage: {
    width: 150,
    height: 150,
  },
  buddyIcon: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: '#C4E2F8',
    borderWidth: 3,
    borderColor: '#fff',
    alignSelf: 'center',
    overflow: 'hidden',
    position: 'absolute',
    bottom: -20,
    right: 0,
  },
  options: {
      flex: 1,
    paddingHorizontal: 25,
    gap: 10,
  },
  logOutButton: {
    backgroundColor: '#BA1F1F',
    padding: 15,
    borderRadius: 10,
    alignSelf: 'flex-end',
    marginBottom: 25,
    marginHorizontal: 25,
  },
  logOutText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  }
});