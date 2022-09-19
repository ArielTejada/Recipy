import React, {useState} from "react";
import {Text, View} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import BottomNavBar from "./navigation/bottomNavBar";

import Home from './screens/home';

export default function App() {
  
    return (
        <NavigationContainer>
          <BottomNavBar/>
        </NavigationContainer>
    );

}