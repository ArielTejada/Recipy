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
    marginLeft: -5,
    marginRight: 5,
    fontWeight: "bold",
  },
  username: {
    marginLeft: -3,
    marginRight: 2,
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
    marginLeft: -4,
    marginTop: 10,
    lineHeight: 22,
    fontSize: 17,
    fontFamily: "Nunito-Regular",
  },
  image: {
    marginLeft: -78,
    width: 350,
    height: 300,
    resizeMode: "cover",
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 25,
  },
});

export default styles;
