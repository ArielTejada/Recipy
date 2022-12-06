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
  headerText: {
    fontFamily: "Festive-Regular",
    fontSize: RFPercentage(7),
    textAlign: "center",
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
  recipePressableText: {
    fontFamily: "AmaticSC-Bold",
    fontSize: RFPercentage(4),
    textAlign: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
  },
  generateButtonText: {
    fontFamily: "AmaticSC-Bold",
    fontSize: RFPercentage(4),
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
  pageMargins: {
    marginHorizontal: width / 20,
  },

  /* -------------- Styling --------------*/
  outline: {
    borderWidth: 1,
    borderRadius: 5,
  },

  /* -------------- Buttons --------------*/
  generateButton: {
    width: width / 1.3,
    height: height / 16,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: height / 80,
  },

  /* -------------- Size --------------*/
  wholeScreen: {
    width: width,
    height: height,
  },
  likedRecipeScrollView: {
    width: width / 1.12,
    height: height / 3.6,
    marginBottom: height / 30,
    borderWidth: 2,
    borderRadius: 5,
  },
  recommededScrollView: {
    width: width / 1.1,
    height: height / 5,
    borderWidth: 2,
    borderRadius: 5,
  },
  navView: {
    width: width,
    height: height / 50,
  },

  /* -------------- Images --------------*/
  recipeBack: {
    width: width / 2.25,
    height: height / 5.2,
    justifyContent: "center",
    // backgroundColor: '#60DEF7'
  },
  recipeBack2: {
    width: width / 1.12,
    height: 190 * (width / 1200),
    justifyContent: "center",
    // backgroundColor: '#60DEF7'
  },
  bannerImage: {
    width: width,
    height: 460 * (width / 3043), // actual height * (width / actual width)
    tintColor: "white",
  },
  tempLogo: {
    width: width / 1.1,
    height: height / 5,
  },

  /* -------------- Custom  --------------*/
  card: {
    width: width / 2.2,
    height: height / 5.1,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "black",
  },
});
