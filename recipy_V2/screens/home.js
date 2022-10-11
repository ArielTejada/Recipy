import React, { useState } from "react";
import {Text, View, Image, TouchableWithoutFeedback, Keyboard, Button, TouchableOpacity, ImageBackground} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import styles from '../styles/home-styles';

// Components
import AddStack from "../navigation/addStack";
import SearchBar from "../components/searchBar";
import RecipeCard from "../components/RecipeCard";

// Screens
import AddIngredient from "./addIngredient";

const Stack = createStackNavigator();

export default function Home({navigation}) {

  const addIngredientHandler = () => {
    navigation.navigate('AddIngredient');
  }

  const profilePressHandler = () => {
    navigation.navigate('Account');
  }

  const recipes = [
    {image: '../img/caesar-salad.jpg', name: 'Caesar Salad'},
    {image: '../img/chicken-chow-mein.jpg',name: 'Chicken Chow Mein'},
    {image: '../img/swedish-meatballs.jpeg',name: 'Swedish Meatballs'},
  ];

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
              source={require('../icons/chef6.png')}
              style={[styles.accountIcon]}
            />
          </TouchableOpacity>
        </ImageBackground>
        <TouchableOpacity
          onPress={addIngredientHandler}
          style={[styles.center]}
        >
          <Text 
            style={[styles.button, styles.fontMedium]}
          >Add Ingredient</Text>
        </TouchableOpacity>
        <Text style={styles.fontMedium}>Results</Text> 
            
      <RecipeCard
        image={require('../img/caesar-salad.jpg')}
        name={'caesar salad'}
        style={styles.banner}
      />
      </View>
    </TouchableWithoutFeedback> 
  );
}
