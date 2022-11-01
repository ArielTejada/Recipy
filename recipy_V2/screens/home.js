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

  /* -------------------- Redux State Colors -------------------- */
  const headerLight = useStoreState(state => state.headerLight);
  const headerDark = useStoreState(state => state.headerDark);
  const headerHalloween = useStoreState(state => state.headerHalloween);
  const pageLight = useStoreState(state => state.pageLight);
  const pageDark = useStoreState(state => state.pageDark);
  const pageHalloween = useStoreState(state => state.pageHalloween);
  const bannerLight = useStoreState(state => state.bannerLight);
  const bannerDark = useStoreState(state => state.bannerDark);
  const bannerHalloween = useStoreState(state => state.bannerHalloween);

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
      lightEnabled ? {backgroundColor: pageLight} :
      darkEnabled ? {backgroundColor: pageDark} :
      halloweenEnabled ? {backgroundColor: pageHalloween} : {backgroundColor: pageLight}
    ]}>

    <ScrollView>
      <TouchableWithoutFeedback 
        onPress={() => {
        Keyboard.dismiss();
      }}>
        <View>

        <View style={[
          styles.pushDown, 
          lightEnabled ? {backgroundColor: headerLight} :
          darkEnabled ? {backgroundColor: headerDark} :
          halloweenEnabled ? {backgroundColor: headerHalloween} : {backgroundColor: headerLight}
        ]}></View>

          <ImageBackground
            source={require('../img/banner3.png')}
            style={[styles.banner]}
            imageStyle={[
              lightEnabled ? {tintColor: bannerLight} :
              darkEnabled ? {tintColor: bannerDark} :
              halloweenEnabled ? {tintColor: bannerHalloween} : {tintColor: bannerLight}
            ]}
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
            style={[styles.addButton]}
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
