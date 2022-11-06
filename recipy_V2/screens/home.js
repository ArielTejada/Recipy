import React, { useState } from "react";
import {Text, View, Image, Pressable, TouchableWithoutFeedback, Keyboard, ScrollView, TouchableOpacity, ImageBackground} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useStoreState, useStoreActions } from "easy-peasy";

import styles from '../styles/home-styles';

export default function Home({navigation}) {

/* -------------------- Redux State Variables -------------------- */
  const ingredients = useStoreState(state => state.ingredients)
  const setCategory = useStoreActions(actions => actions.setCategory);  
  const setCategoryList = useStoreActions(actions => actions.setCategoryList); 

/* -------------------- Redux State Colors -------------------- */
  const headerColor = useStoreState(state => state.headerColor);
  const pageColor = useStoreState(state => state.pageColor);
  const bannerColor = useStoreState(state => state.bannerColor);

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
    <View style={[styles.wholeScreen, {backgroundColor: pageColor}]}>

    <ScrollView>
      <TouchableWithoutFeedback 
        onPress={() => {
        Keyboard.dismiss();
      }}>
        <View>

        <View style={[styles.pushDown, {backgroundColor: headerColor}]}></View>

          <ImageBackground
            source={require('../img/banner3.png')}
            style={[styles.banner]}
            imageStyle={[{tintColor: bannerColor}]}
          >
            <Image
              source={require('../img/recipylogo.png')}
              style={[styles.logo]}
            />
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
          <View style={[styles.center]}>
          <Pressable
            onPress={addIngredientHandler}
            style={[styles.addButton, {backgroundColor: bannerColor}]}
          >
            <Text 
              style={[styles.fontMedium, {fontFamily: 'AmaticSC-Bold'}]}
            >Add Ingredient</Text>
          </Pressable>
          </View>

          <View>
            <ImageBackground
              source={require('../img/categories.png')}
              resizeMode='contain'
              style={[styles.caterories]}
            >
              <TouchableOpacity 
                style={[styles.categoryButton, styles.category1, {backgroundColor: bannerColor}]}
                onPress={pressFruit}
              >
                <Text style={[styles.categoryText]}>Fruits</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.categoryButton, styles.category2, {backgroundColor: bannerColor}]}
                onPress={pressProtein}
              >
                <Text style={[styles.categoryText]}>Protein</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.categoryButton, styles.category3, {backgroundColor: bannerColor}]}
                onPress={pressDairy}
              >
                <Text style={[styles.categoryText]}>Dairy</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.categoryButton, styles.category4, {backgroundColor: bannerColor}]}
                onPress={pressVeggies}
              >
                <Text style={[styles.categoryText]}>Veggies</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.categoryButton, styles.category5, {backgroundColor: bannerColor}]}
                onPress={pressGrain}
              >
                <Text style={[styles.categoryText]}>Grain</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.categoryButton, styles.category6, {backgroundColor: bannerColor}]}
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
