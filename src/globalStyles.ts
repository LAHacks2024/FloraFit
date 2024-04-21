import {StyleSheet} from "react-native";

export const globalStyles = StyleSheet.create({
  header: {
    width: '100%',
    paddingHorizontal: 25,
    paddingVertical: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerCell: {
    gap: 10,
    alignItems: "flex-end",
  },
  headerCellText: {
    fontStyle: "italic",
    fontSize: 16,
  },
  backButton: {
    transform: [{scale: 3}],
  },
  headerInnerCell: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  headerInnerCellHeader: {
    fontSize: 30,
    fontFamily: 'DMSans-Bold',
    fontWeight: 'bold',
  },
  content: {
    paddingHorizontal: 25,
    flex: 1,
    alignItems: "center"
  },
  optionButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 25,
    paddingHorizontal: 15,
    borderRadius: 15,
    shadowColor: "rgba(0,0,0)",
    shadowRadius: 23,
    width: "100%",
    marginBottom: 10,
  },
  optionButtonText: {
    fontSize: 17,
    fontWeight: "500",
    color: '#000',
  }
});