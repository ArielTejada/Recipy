import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  postHeaderContainer: {
    flexDirection: "row",
  },
  name: {
    marginRight: 5,
    fontWeight: "bold",
  },
  username: {
    marginRight: 5,
    color: "grey",
  },
  smallDot: {
    color: "grey",
    fontWeight: "300",
  },
  createdAt: {
    marginRight: 2,
    color: "grey",
  },
  content: {
    marginTop: 10,
    lineHeight: 22,
    fontSize: 17,
    fontFamily: "Nunito-Regular",
  },
  image: {
    // width: "100%",
    marginLeft: -78.5,
    width: 390,
    height: 310,
    resizeMode: "cover",
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 25,
  },
});

export default styles;
