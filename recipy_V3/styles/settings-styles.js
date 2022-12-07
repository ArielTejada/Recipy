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
    justifyContent: "center",
    paddingLeft: width / 30,
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

  /* -------------- Position --------------*/
  center: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  centerItems: {
    justifyContent: "center",
    alignItems: "center",
  },
  inline: {
    display: "flex",
    flexDirection: "row",
  },
  smallMargins: {
    marginHorizontal: width / 30,
    marginVertical: height / 100,
  },
  horizontalMargins: {
    marginHorizontal: width / 30,
  },
  flex: {
    display: "flex",
    flexDirection: "row",
  },

  /* -------------- Styling --------------*/
  outline: {
    borderWidth: 1,
    borderRadius: 5,
  },
  pageColor: {
    backgroundColor: "white",
    height: height,
  },

  /* -------------- Size --------------*/
  wholeScreen: {
    width: width,
    height: height,
  },
  width70: {
    width: width * 0.7,
    height: height / 10,
  },
  width30: {
    width: width * 0.3,
    height: height / 10,
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },

  /* -------------- Buttons  --------------*/
  removedElement: {
    borderWidth: 2,
    borderRadius: 15,
    marginHorizontal: width / 150,
    marginVertical: height / 200,
    paddingHorizontal: width / 50,
    marginTop: 2,
    height: width / 12,
    backgroundColor: "#60DEF7",
  },
  clearButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "#2196f3",
    width: width / 6,
    borderWidth: 1,
    borderRadius: 5,
  },

  /* -------------- Custom  --------------*/
  navView: {
    width: width,
    height: height / 3,
  },
  dietOptions: {
    alignItems: "center",
  },
  selectedIngredients: {
    width: width - RFPercentage(4),
    height: width / 10,
  },
  input: {
    backgroundColor: "white",
    width: width / 1.3,
    height: height / 15,
    fontSize: RFPercentage(3),
  },
  searchBar: {},
  searchElement: {
    width: width / 2,
    textAlign: "center",
    alignItems: "center",
  },
  searchPushUp: {
    width: width / 2,
    height: height / 2,
  },
  backIcon: {
    width: width / 9,
    height: width / 9,
    tintColor: "white",
    marginLeft: 10,
    marginTop: -75,
  },
});
