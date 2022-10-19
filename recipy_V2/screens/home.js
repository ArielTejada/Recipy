import React, { useState } from "react";
import {Text, View, Image, Pressable, TouchableWithoutFeedback, Keyboard, ScrollView, TouchableOpacity, ImageBackground} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useStoreState, useStoreActions } from "easy-peasy";

import styles from '../styles/home-styles';

export default function Home({navigation}) {

/* -------------------- Redux State Variables -------------------- */
  const category = useStoreState(state => state.category);
  const setCategory = useStoreActions(actions => actions.setCategory);  

/* -------------------- Handler Functions -------------------- */
  const addIngredientHandler = () => {navigation.navigate('AddIngredient')}

  const profilePressHandler = () => {navigation.navigate('Account')}

  const categoryPressHandler = () => {
    navigation.navigate('Category');
  }

  const pressFruit = () => {
    setCategory('Fruit');
    categoryPressHandler();
  }

  const pressProtein = () => {
    setCategory('Protein');
    categoryPressHandler();
  }

  const pressDairy = () => {
    setCategory('Dairy');
    categoryPressHandler();
  }

  const pressVeggies = () => {
    setCategory('Veggies');
    categoryPressHandler();
  }

  const pressGrain = () => {
    setCategory('Grain');
    categoryPressHandler();
  }
  const pressOil = () => {
    setCategory('Oil');
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
              source={require('../img/categories.jpg')}
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
                onPress={pressOil}
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
