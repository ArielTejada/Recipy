import React, { useState } from "react";
import {Text, View, Image, Pressable, TouchableWithoutFeedback, Keyboard, ScrollView, TouchableOpacity, ImageBackground} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useStoreState, useStoreActions } from "easy-peasy";

import styles from '../styles/home-styles';

export default function Home({navigation}) {

/* -------------------- Redux State Variables -------------------- */
  const category = useStoreState(state => state.category);
  const ingredients = useStoreState(state => state.ingredients)
  const setCategory = useStoreActions(actions => actions.setCategory);  
  const setCategoryList = useStoreActions(actions => actions.setCategoryList); 

  const lightEnabled = useStoreState(state => state.lightEnabled);
  const darkEnabled = useStoreState(state => state.darkEnabled);
  const halloweenEnabled = useStoreState(state => state.halloweenEnabled);

/* -------------------- Handler Functions -------------------- */
  const addIngredientHandler = () => {navigation.navigate('AddIngredient')}

  const profilePressHandler = () => {navigation.navigate('Account')}

  const categoryPressHandler = () => {
    navigation.navigate('Category');
  }

  const pressFruit = () => {
    setCategory('Fruits');
    setCategoryList(ingredients.filter((ingredient => ingredient['type'] == 'fruit')));
    categoryPressHandler();
  }

  const pressProtein = () => {
    setCategory('Protein');
    setCategoryList(ingredients.filter((ingredient => ingredient['type'] == 'meat' || ingredient['type'] == 'fish')));
    categoryPressHandler();
  }

  const pressDairy = () => {
    setCategory('Dairy');
    setCategoryList(ingredients.filter((ingredient => ingredient['type'] == 'dairy')));
    categoryPressHandler();
  }

  const pressVeggies = () => {
    setCategory('Veggies');
    setCategoryList(ingredients.filter((ingredient => ingredient['type'] == 'vegetable')));
    categoryPressHandler();
  }

  const pressGrain = () => {
    setCategory('Grain');
    setCategoryList(ingredients.filter((ingredient => ingredient['type'] == 'grains')));
    categoryPressHandler();
  }
  const pressHerbs = () => {
    setCategory('Herbs');
    setCategoryList(ingredients.filter((ingredient => ingredient['type'] == 'herbs' || ingredient['type'] == 'nuts')));
    categoryPressHandler();
  }

/* -------------------- Test Data -------------------- */
  const recipes = [
    {image: '../img/caesar-salad.jpg', name: 'Caesar Salad'},
    {image: '../img/chicken-chow-mein.jpg',name: 'Chicken Chow Mein'},
    {image: '../img/swedish-meatballs.jpeg',name: 'Swedish Meatballs'},
  ];

/* -------------------- Render Method -------------------- */
  return (
    <View style={[
      styles.wholeScreen, 
      lightEnabled ? {backgroundColor: 'white'} :
      darkEnabled ? {backgroundColor: '#A4A9AD'} :
      halloweenEnabled ? {backgroundColor: '#FFB703'} : {backgroundColor: '#2196F3'}
  ]}>

    <ScrollView>
      <TouchableWithoutFeedback 
        onPress={() => {
        Keyboard.dismiss();
      }}>
        <View>

        <View style={[
          styles.pushDown,
          lightEnabled ? {backgroundColor: '#2196F3'} :
          darkEnabled ? {backgroundColor: '#4A576F'} :
          halloweenEnabled ? {backgroundColor: '#FF7739'} : {backgroundColor: '#2196F3'}
        ]}></View>

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
          <Pressable
            onPress={addIngredientHandler}
            style={[styles.center, styles.margins]}
          >
            <Text 
              style={[styles.addButton, styles.fontMedium]}
            >Add Ingredient</Text>
          </Pressable>

          <View>
            <ImageBackground
              source={require('../img/categories.png')}
              resizeMode='contain'
              style={[styles.caterories]}
            >
              <TouchableOpacity 
                style={[styles.categoryButton, styles.category1]}
                onPress={pressFruit}
              >
                <Text style={[styles.categoryText]}>Fruits</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.categoryButton, styles.category2]}
                onPress={pressProtein}
              >
                <Text style={[styles.categoryText]}>Protein</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.categoryButton, styles.category3]}
                onPress={pressDairy}
              >
                <Text style={[styles.categoryText]}>Dairy</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.categoryButton, styles.category4]}
                onPress={pressVeggies}
              >
                <Text style={[styles.categoryText]}>Veggies</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.categoryButton, styles.category5]}
                onPress={pressGrain}
              >
                <Text style={[styles.categoryText]}>Grain</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.categoryButton, styles.category6]}
                onPress={pressHerbs}
              >
                <Text style={[styles.categoryText]}>Herbs</Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </View>
      </TouchableWithoutFeedback> 
    </ScrollView>
    </View>
  );
}
