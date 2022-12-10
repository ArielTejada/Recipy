import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
  /* -------------- Typography --------------*/
  fontSmall: {
    fontSize: RFPercentage(3),
  },
  fontMedium: {
    fontSize: RFPercentage(4),
  },
  fontLarge: {
    fontSize: RFPercentage(5),
  },
  AmaticSCRegular: {
    fontFamily: "AmaticSC-Regular",
  },
  AmaticSCBold: {
    fontFamily: "AmaticSC-Bold",
  },
  textCenter: {
    textAlignVertical: "center",
    textAlign: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  headerText: {
    fontFamily: "Festive-Regular",
    fontSize: RFPercentage(7),
    textAlign: "center",
  },

  /* -------------- Headers --------------*/
  header: {
    width: width,
    height: height / 8.5,
  },
  pushDown: {
    width: width,
    height: height / 25,
    backgroundColor: "#2196F3",
  },
  backButtonSection: {
    width: width,
    height: height / 14,
    backgroundColor: "#2196F3",
    zIndex: 1,
  },

  /* -------------- Images --------------*/
  backIcon: {
    width: width / 9,
    height: width / 9,
    tintColor: "white",
    top: width / 15,
  },
  backIconTouch: {
    width: width / 9,
    height: width / 5,
    zIndex: 5,
  },
  sidesImage: {
    width: width,
    height: height - RFPercentage(28),
  },
  banner: {
    width: width,
    height: 280 * (width / 1442),
    top: -height / 25,
  },
  backImage: {
    width: width,
    height: 1060 * (width / 1060), // actual height x (width / actual width)
  },

  /* -------------- Position --------------*/
  center: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  centerItems: {
    justifyContent: "center",
    alignItems: "center",
  },
  margins: {
    marginVertical: 5,
    marginHorizontal: 10,
  },
  fridgeMargins: {
    marginTop: height / 10,
    top: -height / 10,
  },
  ingredientMargins: {
    marginHorizontal: width / 40,
    marginVertical: height / 60,
  },
  window: {
    flexDirection: "row",
    alignSelf: "stretch",
  },
  container: {
    flexDirection: "row",
    alignSelf: "stretch",
    margin: 10,
    marginLeft: 10,
  },
  outline: {
    borderWidth: 1,
    borderRadius: 5,
  },
  selected: {
    width: width,
    height: height,
    marginLeft: "auto",
    marginRight: "auto",
  },
  halfWidth: {
    width: width / 2,
    marginLeft: "auto",
    marginRight: "auto",
  },
  flex: {
    display: "flex",
  },
  flexRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  absolute: {
    position: "absolute",
    top: height / 3.5,
  },

  /* -------------- Styling --------------*/
  outline: {
    borderWidth: 1,
    borderRadius: 5,
  },
  transparent: {
    position: "absolute",
    zIndex: 1,
    left: RFPercentage(18),
  },
  roundBTN: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "black",
    marginHorizontal: width / 150,
    marginVertical: height / 200,
    paddingHorizontal: width / 50,
    height: width / 10,
    backgroundColor: "#7CDCFE",
  },

  /* -------------- Custom  --------------*/
  selectedScrollView: {
    height: height/8
  },
  navView: {
    width: width,
    height: height / 8,
  },
  input: {
    backgroundColor: "white",
    width: width - 80,
    height: 50,
    fontSize: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "#2196f3",
    width: 60,
  },
  searchResult: {
    fontFamily: "AmaticSC-Bold",
    width: width / 2.3,
    height: height / 20,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "white",
  },
  notfocused: {
    backgroundColor: "white",
  },
  focused: {
    backgroundColor: "#2196f3",
  },
  selectedIngredients: {
    width: width / 1.05,
    height: height/14,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
