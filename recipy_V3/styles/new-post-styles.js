import React from "react";

import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    backgroundColor: "f2f2f2",
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    marginBottom: 10,
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6a0dad",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 7,
  },
  buttonText: {
    color: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: "Quicksand-SemiBold",
    fontSize: 18,
  },
  profilePic: {
    backgroundColor: "#b1f2ff",
    borderRadius: 60,
    width: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 7,
    marginLeft: 0,
  },
  inputsContainer: {
    marginTop: -15,
    marginLeft: 20,
  },
  PostContentInput: {
    maxHeight: 200,
    maxWidth: 320,
    width: 320,
    fontSize: 20,
    fontFamily: "Quicksand-SemiBold",
    marginBottom: 40,
  },

  imageUrlContent: {
    maxHeight: 100,
    maxWidth: 320,
    fontSize: 16,
    fontFamily: "Quicksand-SemiBold",
  },

  entirePostContainer: {
    flexDirection: "row",
    padding: 15,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    paddingBottom: 4,
    width: 300,
  },

  imageSelectInput: {
    fontSize: 20,
    fontFamily: "Quicksand-SemiBold",
    color: "#6a0dad",
    marginVertical: 15,
  },

  imagePreview: {
    marginLeft: -83,
    width: 390,
    height: 310,
    borderRadius: 20,
    overflow: "hidden",
  },
  imageSelectPic: {
    marginLeft: 25,
    marginBottom: 30,
  },
});
