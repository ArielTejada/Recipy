import React, {useState} from "react";
import {Text, View} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import BottomNavBar from "./navigation/bottomNavBar";
import { StoreProvider, createStore } from "easy-peasy";
import model from './state/model'

import Home from './screens/home';

const store = createStore(model);

export default function App() {
  
    return (
      <StoreProvider store={store}>
        <NavigationContainer>
          <BottomNavBar/>
        </NavigationContainer>
      </StoreProvider>
    );

}