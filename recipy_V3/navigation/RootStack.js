import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Splash from "../screens/Splash";

/* Creating navigation structure for Splash, Sign in, and Sign Up Screens */

const Root = createNativeStackNavigator();
const RootStack = ({ navigation }) => (
  <Root.Navigator>
    <Root.Screen
      name="Splash"
      component={Splash}
      options={{ headerShown: false }}
    />
    {/* <Root.Screen
      name="SignIn"
      component={SignIn}
      options={{ headerShown: false }}
    />
    <Root.Screen
      name="SignUp"
      component={SignUp}
      options={{ headerShown: false }}
    /> */}
  </Root.Navigator>
);

export default RootStack;
