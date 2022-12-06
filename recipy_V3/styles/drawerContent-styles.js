import React from "react";

import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window").height;
const { width } = Dimensions.get("window").width;
const height_logo = height * 0.28;

export default StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginLeft: 0,
    fontSize: 26,
    marginTop: -12,
    fontFamily: "Quicksand-Bold",
    lineHeight: 50,
  },
  userNameCaption: {
    marginLeft: 0,
    fontSize: 15,
    lineHeight: 16,
  },
  caption: {
    marginLeft: 1,
    fontSize: 16,
    lineHeight: 16,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
    paddingVertical: 15,
  },
  bottomDrawerSection: {
    marginBottom: 20,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
