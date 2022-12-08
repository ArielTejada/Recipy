import React, {
  useState,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useContext,
} from "react";
import { useFonts } from "expo-font";
import { View, Text, Button, StatusBar, ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Lottie from "lottie-react-native";

import * as Font from "expo-font";
import { AppLoading } from "expo";
import { AuthContext } from "../Context/AuthContext";
/**
 * Import all the necessary screens/ components
 */

import MainTab from "./MainTab";
import Settings from "../screens/Settings";
import Favorites from "../screens/Favorites";
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from "react-native-paper";

import { DrawerContent } from "./DrawerContent";

// Implementing Root Stack Structure for splash

import RootStack from "./RootStack";

const Drawer = createDrawerNavigator();

const AppNav = (props) => {
  const { isLoading, setIsLoading, userToken, setUserToken } =
    useContext(AuthContext);

  const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props) => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: "#3DBE29", borderLeftWidth: 15 }}
        text1Style={{
          fontSize: 17,
        }}
        text2Style={{
          fontSize: 12,
        }}
      />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props) => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: "red", borderLeftWidth: 15 }}
        text1Style={{
          fontSize: 17,
        }}
        text2Style={{
          fontSize: 12,
        }}
      />
    ),
  };

  const initLoginState = {
    isLoading: true,
    email: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initLoginState);

  // toggleTheme: () => {
  //   setIsDarkTheme((isDarkTheme) => !isDarkTheme);
  // },
  useEffect(() => {
    setTimeout(async () => {
      // setisLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
    }, 3500);
  }, []);

  const cmAnimation = useRef();

  const playAnimation = () => {
    cmAnimation.current.play();
  };

  useEffect(() => {
    if (cmAnimation.current) {
      setTimeout(() => {
        cmAnimation.current?.reset();
        cmAnimation.current?.play();
      }, 0);
    }
  }, [cmAnimation.current]);
  if (loginState.isLoading) {
    return (
      <View
        style={{
          backgroundColor: "#2694f9",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Lottie
          ref={cmAnimation}
          source={require("../assets/img/pizza-lottie.json")}
          style={{ width: 400, height: 400 }} // 400 x 300
          loop={true}
          speed={1}
          renderMode={"SOFTWARE"}
        />
      </View>
    );
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        {userToken !== null ? (
          <Drawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} />}
          >
            <Drawer.Screen
              name="HomeDrawer"
              component={MainTab}
              options={{ headerShown: false }}
            />

            <Drawer.Screen
              name="Settings"
              component={Settings}
              options={{ headerShown: false }}
            />
            {/* <Drawer.Screen
              name="Favorites"
              component={Favorites}
              options={{ headerShown: false }}
            /> */}
          </Drawer.Navigator>
        ) : (
          <RootStack />
        )}
        {/*  */}
      </NavigationContainer>

      <Toast config={toastConfig} />
    </PaperProvider>
  );
};

export default AppNav;
