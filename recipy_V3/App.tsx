import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

import React, { useState, useEffect, useMemo, useReducer, useRef } from "react";
import { useFonts } from "expo-font";
import { Amplify, Auth, API, graphqlOperation } from "aws-amplify";
import { StoreProvider, createStore } from "easy-peasy";
import * as Font from "expo-font";
import { withAuthenticator, AmplifyTheme } from "aws-amplify-react-native";

import { AuthProvider } from "./Context/AuthContext";
import AppNav from "./navigation/AppNav";
import model from "./state/model";
import awsconfig from "./src/aws-exports";
import { getUser } from "./src/graphql/queries";
import { createUser } from "./src/graphql/mutations";
import { CreateUserInput } from "./src/API";

Amplify.configure(awsconfig);

const store = createStore(model);

Font.loadAsync({
  // The following fonts are loaded successfully
  Quicksand: require("./assets/fonts/Quicksand-SemiBold.ttf"),
});

function App() {
  const getRandImg = () => {
    // free stock image!
    return "https://images.unsplash.com/photo-1530878955558-a6c31b9c97db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bmljZXxlbnwwfHwwfHw%3D&w=1000&q=80";
  };
  const saveUser = async (user) => {
    console.log(user);
    await API.graphql(graphqlOperation(createUser, { input: user }));
  };

  useEffect(() => {
    const updateUser = async () => {
      // Get  current user thats authenticated
      const userInfo = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });

      // Check if the user is already in the db
      if (userInfo) {
        const userData = await API.graphql(
          graphqlOperation(getUser, { id: userInfo.attributes.sub })
        );
        if (!userData.data.getUser) {
          const user = {
            id: userInfo.attributes.sub,
            name: userInfo.attributes.name,
            email: userInfo.attributes.email,
            username: userInfo.username,
            image: getRandImg(),
          };
          await saveUser(user);
        } else {
          console.log("User already in db");
        }
      }
      // If they dont, add them
    };
    updateUser();
  }, []);

  /* -------------------- Async Font Loading -------------------- */
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "GrandHotel-Regular": require("./assets/fonts/GrandHotel-Regular.ttf"),
        "Festive-Regular": require("./assets/fonts/Festive-Regular.ttf"),
        "AmaticSC-Regular": require("./assets/fonts/AmaticSC-Regular.ttf"),
        "AmaticSC-Bold": require("./assets/fonts/AmaticSC-Bold.ttf"),
        "Courgette-Regular": require("./assets/fonts/Courgette-Regular.ttf"),
        "Quicksand-SemiBold": require("./assets/fonts/Quicksand-SemiBold.ttf"),
        "Quicksand-Bold": require("./assets/fonts/Quicksand-Bold.ttf"),
        "Quicksand-Regular": require("./assets/fonts/Quicksand-Regular.ttf"),
        "Nunito-Medium": require("./assets/fonts/Nunito-Medium.ttf"),
        "Nunito-SemiBold": require("./assets/fonts/Nunito-SemiBold.ttf"),
        "Nunito-Regular": require("./assets/fonts/Nunito-Regular.ttf"),
      });
    };
    loadFonts();
  }, []);

  /* -------------------- Return Method -------------------- */

  return (
    <AuthProvider>
      <StoreProvider store={store}>
        <AppNav />
      </StoreProvider>
    </AuthProvider>
  );
}

const signUpConfig = {
  header: "Create a new account!",
  hideAllDefaults: true,
  signUpFields: [
    {
      label: "Name",
      key: "name",
      required: true,
      displayOrder: 1,
      type: "string",
    },
    {
      label: "Email",
      key: "email",
      required: true,
      displayOrder: 2,
      type: "string",
    },
    {
      label: "Username",
      key: "preferred_username",
      required: true,
      displayOrder: 3,
      type: "string",
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 4,
      type: "password",
    },
  ],
};

const customTheme = {
  ...AmplifyTheme,
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 20,
    width: "100%",
    backgroundColor: "#FFF",
  },
  button: {
    ...AmplifyTheme.button,
    backgroundColor: "#2694F9",
    width: 330,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
    marginLeft: 5,
    shadowColor: "#171717",
    shadowOffset: { width: -3, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonDisabled: {
    backgroundColor: "#2694f9",
    width: 300,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
    marginLeft: 15,
    shadowColor: "#171717",
    shadowOffset: { width: -3, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    opacity: 0.5,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 22,
    fontFamily: "Quicksand",
  },
  sectionFooterLink: {
    fontSize: 16,
    color: "#2694f9",
    alignItems: "baseline",
    textAlign: "center",
    fontFamily: "Quicksand",
    opacity: 0.9,
  },
  sectionHeaderText: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
  },
  sectionFooter: {
    width: "100%",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  sectionFooterLinkDisabled: {
    fontSize: 14,
    color: "#2694f9",
    alignItems: "baseline",
    textAlign: "center",
    opacity: 0.5,
  },
};

export default withAuthenticator(App, {
  signUpConfig,
  theme: customTheme,
});
