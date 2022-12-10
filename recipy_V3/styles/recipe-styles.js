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
  recipeTitle: {
    fontFamily: "AmaticSC-Bold",
    fontSize: RFPercentage(7),
    textAlign: "center",
  },
  recipeHeaderText: {
    fontFamily: "AmaticSC-Bold",
    fontSize: RFPercentage(4),
    marginTop: height / 30,
  },

  recipeDataText: {
    // backgroundColor: "blue",
    fontSize: RFPercentage(2.5),
  },
  sendText: {
    fontFamily: "AmaticSC-Bold",
    fontSize: RFPercentage(3.8),
    textAlign: "center",
    textAlignVertical: "center",
    paddingHorizontal: width / 100,
  },
  link: {
    textDecorationLine: "underline",
    fontSize: RFPercentage(2.5),
    paddingBottom: height / 40,
  },

  /* -------------- Headers --------------*/
  backButtonSection: {
    width: width,
    height: height / 14,
    backgroundColor: "#2196F3",
    zIndex: 1,
  },

  /* -------------- Images --------------*/
  banner: {
    width: width,
    height: 280 * (width / 1442),
    top: -height / 22,
  },
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

  /* -------------- Position --------------*/
  center: {
    alignItems: "center",
  },
  margins: {
    marginVertical: height / 80,
  },
  tag: {
    top: -90,
    left: 20,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  absolute: {
    position: "absolute",
  },
  pushDown: {
    width: width,
    height: height / 25,
    backgroundColor: "white",
  },

  /* -------------- Styling --------------*/
  outline: {
    borderWidth: 1,
    borderRadius: 5,
  },
  pageMargins: {
    marginHorizontal: width / 20,
  },

  /* -------------- Size --------------*/
  wholeScreen: {
    width: width,
    height: height,
  },
  /* -------------- Buttons --------------*/
  linkButton: {
    backgroundColor: "#39CD7B",
    paddingHorizontal: width / 50,
    width: width / 2.2,
    height: height / 16,
  },
  likeButton: {
    paddingHorizontal: width / 50,
    width: width / 2.5,
    height: height / 16,
  },
  buttonsSection: {
    width: width / 1.1,
    height: height / 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  /* -------------- Custom  --------------*/
  navView: {
    width: width,
    height: height / 4.5,
  },

  /* -------------- Macros Visual  --------------*/
  macrosView: {
    width: width / 1.12,
    height: height / 5.8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  macroBoxArea: {
    width: width/2.8,
    height: height/5.8,
  },
  macroVisual: {
    width: width/2.8,
    height: height/25,
    display: "flex",
    flexDirection: "row",
    marginLeft: wp("5%"),
    marginTop: hp("1.1%"),
  },
  macroVisualText: {
    fontFamily: "AmaticSC-Bold",
    fontSize: RFPercentage(3),
  },
  box1: {
    backgroundColor: "#1ED760",
    width: wp("3%"),
    height: hp("2%"),
    marginTop: hp("1.5%"),
    marginLeft: wp("2%"),
  },
  box2: {
    backgroundColor: "#007ACC",
    width: wp("3%"),
    height: hp("2%"),
    marginTop: hp("1.5%"),
    marginLeft: wp("2%"),
  },
  box3: {
    backgroundColor: "#F52727",
    width: wp("3%"),
    height: hp("2%"),
    marginTop: hp("1.5%"),
    marginLeft: wp("2%"),
  },
  pieChart: {
    marginLeft: width/4.5
  },
});
