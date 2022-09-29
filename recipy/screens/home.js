import React, { useState } from "react";
import {Text, View, Image, TouchableWithoutFeedback, Keyboard, Button} from "react-native";
import styles from '../styles/home-styles';
import AddStack from "../navigation/addStack";

import SearchBar from "../components/searchBar";
import AddIngredient from "./addIngredient";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function Home({navigation}) {

  const addHandler = () => {
    navigation.navigate('AddIngredient');
  }

  return (
    <TouchableWithoutFeedback 
      onPress={() => {
      Keyboard.dismiss();
    }}>
      <View>
        <Image
          source={require('../img/banner2.png')}
          style={{ 
            width: 410, 
            height: 210 
          }}
        />
        <Button
          title='add indgredient'
          onPress={addHandler}
        />      
      </View>
    </TouchableWithoutFeedback> 
  );
}
