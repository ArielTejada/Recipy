import React, { useState } from "react";
import {Text, View, Image, TouchableWithoutFeedback, Keyboard, Button, TouchableOpacity, ImageBackground} from "react-native";
import styles from '../styles/home-styles';
import AddStack from "../navigation/addStack";

import SearchBar from "../components/searchBar";
import AddIngredient from "./addIngredient";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function Home({navigation}) {

  const addIngredientHandler = () => {
    navigation.navigate('AddIngredient');
  }

  const profilePressHandler = () => {
    navigation.navigate('Account');
  }

  return (
    <TouchableWithoutFeedback 
      onPress={() => {
      Keyboard.dismiss();
    }}>
      <View>
        <ImageBackground
          source={require('../img/banner2.png')}
          style={styles.banner}
        >
          <TouchableOpacity 
          onPress={profilePressHandler}
          style={[styles.absolute]}
          >
            <Image
              source={require('../icons/account3-black.png')}
              style={[styles.accountIcon]}
            />
          </TouchableOpacity>
        </ImageBackground>
        <Button
          title='add indgredient'
          onPress={addIngredientHandler}
        />      
      </View>
    </TouchableWithoutFeedback> 
  );
}
