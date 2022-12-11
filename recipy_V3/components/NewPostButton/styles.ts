import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    // positon: "absolute",
    borderRadius: 60,
    width: 65,
    height: 65,
    bottom: 80,
    left: 335,
    backgroundColor: "#6a0dad",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.8,
    marginBottom: -65,
  },
  shadowProp: {
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.7,
    shadowRadius: 16.0,

    elevation: 12,
  },
});

export default styles;
