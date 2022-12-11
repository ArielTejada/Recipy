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
  container: {
    flexDirection: "row",
    marginHorizontal: width / 40,
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
  window: {
    flexDirection: "row",
    alignSelf: "stretch",
  },
  margins: {
    marginVertical: height / 300,
    marginHorizontal: width / 40,
  },
  jarsMargin: {
    marginTop: height / 9,
    marginHorizontal: width / 40,
  },

  /* -------------- Images --------------*/
  banner: {
    width: width,
    height: 500 * (width / 2500),
    position: "absolute",
  },
  pantryImage: {
    width: width,
    height: 2682 * (width / 1170),
  },
  jar: {
    width: width / 5,
    height: (580 * (width / 400)) / 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: height / 14,
  },
  jarLabel: {
    marginTop: 5,
    width: width / 6.2,
    height: height / 24,
    textAlignVertical: "center",
    textAlign: "center",
    color: "black",
    fontSize: RFPercentage(2.2),
    borderRadius: 8,
    overflow: "hidden",
  },

  /* -------------- Styling --------------*/
  outline: {
    borderWidth: 1,
    borderRadius: 5,
  },

  /* -------------- Size --------------*/
  wholeScreen: {
    width: width,
    height: height,
  },

  /* -------------- Custom  --------------*/
  input: {
    backgroundColor: "white",
    width: width / 2.5,
    height: height / 15,
    fontSize: RFPercentage(3),
    display: "flex",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "#ff5349",
    width: width / 6.6,
    borderWidth: 1,
    borderRadius: 5,
  },
  searchResult: {
    width: width / 2,
    height: height / 20,
    fontFamily: "AmaticSC-Bold",
    marginLeft: "auto",
    marginRight: "auto",
  },
  clear: {
    fontSize: RFPercentage(3),
    color: "white",
  },
  searchArea: {
    width: width,
    height: height / 3,
    backgroundColor: "white",
  },
  navView: {
    width: width,
    height: height / 8,
  },
  datePicker: {
    width: width / 1.1,
    height: height / 5,
    marginHorizontal: width / 20,
    marginVertical: height / 10,
    // backgroundColor: "white",
  },
});
