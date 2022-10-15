import React, { useState } from "react";
import {Text, View, Image, TouchableWithoutFeedback, Keyboard, ScrollView, TouchableOpacity, ImageBackground} from "react-native";
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

  const categoryPressHandler = () => {
    navigation.navigate('Category');
  }

  const recipes = [
    {image: '../img/caesar-salad.jpg', name: 'Caesar Salad'},
    {image: '../img/chicken-chow-mein.jpg',name: 'Chicken Chow Mein'},
    {image: '../img/swedish-meatballs.jpeg',name: 'Swedish Meatballs'},
  ];

  return (
    <ScrollView>
      <TouchableWithoutFeedback 
        onPress={() => {
        Keyboard.dismiss();
      }}>
        <View>
        <View style={styles.pushDown}></View>
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
            style={[styles.center, styles.margins]}
          >
            <Text 
              style={[styles.button, styles.fontMedium]}
            >Add Ingredient</Text>
          </TouchableOpacity>
          {/* <Text style={styles.fontMedium}>Results</Text>  */}
              
        {/* <RecipeCard
          image={require('../img/caesar-salad.jpg')}
          name={'caesar salad'}
          style={styles.banner}
        /> */}

          <View style={styles.container}>
            <ImageBackground
              source={require('../img/categories.jpg')}
              resizeMode='contain'
              style={styles.caterories}
            >
              <TouchableOpacity 
                style={[styles.categoryButton, styles.category1]}
                onPress={categoryPressHandler}
                category='fruit'
              >
                <Text style={[styles.categoryText]}>Fruits</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.categoryButton, styles.category2]}
                onPress={categoryPressHandler}
                category='protein'
              >
                <Text style={[styles.categoryText]}>Protein</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.categoryButton, styles.category3]}
                onPress={categoryPressHandler}
                category='dairy'
              >
                <Text style={[styles.categoryText]}>Dairy</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.categoryButton, styles.category4]}
                onPress={categoryPressHandler}
                category='vegetable'
              >
                <Text style={[styles.categoryText]}>Vegetables</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.categoryButton, styles.category5]}
                onPress={categoryPressHandler}
                category='grains'
              >
                <Text style={[styles.categoryText]}>Grain</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.categoryButton, styles.category6]}
                onPress={categoryPressHandler}
                category='oil'
              >
                <Text style={[styles.categoryText]}>Oil</Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </View>
      </TouchableWithoutFeedback> 
    </ScrollView>
  );
}
