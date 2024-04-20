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
    fontSize: 12,
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
    fontWeight: "bold",
    fontSize: 20,
  },
  content: {
    paddingHorizontal: 25,
    flex: 1,
    alignItems: "center"
  },
});