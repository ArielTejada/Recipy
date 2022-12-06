import React from "react";

import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window").height;
const { width } = Dimensions.get("window").width;
const height_logo = height * 0.28;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2694F9",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 25,
  },

  welcomeMessage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 350,
  },
  footer: {
    flex: 1.7,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  pie_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pie: {
    width: 210,
    height: 230,
    marginLeft: 310,
    marginBottom: 10,
    marginTop: 120,
  },
  salad_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  salad: {
    width: 45,
    height: 55,
    marginRight: 359,
    marginBottom: 525,
    marginTop: 340,
  },
  apple_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  apple: {
    width: 70,
    height: 65,
    marginBottom: 809,
    marginTop: 790,
    marginRight: 235,
  },
  title: {
    color: "#fff",
    fontSize: 60,
    fontWeight: "bold",
    fontFamily: "Quicksand-SemiBold",
  },
  title2: {
    color: "#fff",
    fontSize: 60,
    fontWeight: "bold",
    fontFamily: "Quicksand-SemiBold",
    marginLeft: 50,
  },
  text: {
    color: "#fff",
    marginBottom: -90,
    paddingBottom: 20,
    marginLeft: 6,
    marginTop: 55,
    fontWeight: "bold",
    fontSize: 22,
    fontFamily: "Quicksand-SemiBold",
  },

  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },
  signInButton: {
    alignItems: "center",
    marginTop: -160,
  },
  signUpButton: {
    alignItems: "center",
    marginBottom: 60,
    marginTop: -140,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -3, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  signIn: {
    width: 330,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "#2694F9",
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "Quicksand-SemiBold",
  },
});
