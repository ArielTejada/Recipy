import React, { useState, useEffect } from "react";
import {Text, View, Image, Pressable, TouchableWithoutFeedback, Keyboard, ScrollView, TouchableOpacity, ImageBackground, FlatList} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useStoreState, useStoreActions } from "easy-peasy";

import styles from '../styles/home-styles';

export default function Home({navigation}) {

/* -------------------- Local State Variables -------------------- */
  let Recipes = [];
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(data);

  // useEffect(() => {
  //   fetch('http://127.0.0.1:5000/search/apple')
  //     .then((response) => response.json())
  //     .then((json) => setData(json))
  //     .catch((error) => console.error(error))
  //     .finally(() => setLoading(false));
  // }, []);

/* -------------------- Redux State Variables -------------------- */
  const ingredients = useStoreState(state => state.ingredients)
  const setCategory = useStoreActions(actions => actions.setCategory);  
  const setCategoryList = useStoreActions(actions => actions.setCategoryList); 
  const selectedIngredients = useStoreState(state => state.selectedIngredients);
  
  const generateColor = useStoreState(state => state.generateColor);
  const haveIngredients = useStoreState(state => state.haveIngredients);
  const generateRecipes = useStoreState(state => state.generateRecipes);
  const setGenerateRecipes = useStoreActions(actions => actions.setGenerateRecipes); 

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

  const getRecipes = async () => {
    try {
     const response = await fetch('http://127.0.0.1:5000/search/apple');
     const json = await response.json();
     console.log(json);
     Recipes[0] = json;
   } catch (error) {
     console.error(error);
   }
 }

  const pressGenerate = () => {
    if(haveIngredients){
      setGenerateRecipes();
    }
    return;
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
            imageStyle={[{tintColor: '#2196F3'}]}
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

          <View style={[styles.container]}>
            <Pressable
              onPress={addIngredientHandler}
              style={[styles.addButton, {backgroundColor: headerColor}]}
            >
              <Text 
                style={[styles.fontMedium, {fontFamily: 'AmaticSC-Bold'}]}
              >Add Ingredient</Text>
            </Pressable>
            <Pressable
              onPress={pressGenerate}
              style={[styles.addButton, {backgroundColor: generateColor}]}
            >
              <Text 
                style={[styles.fontMedium, {fontFamily: 'AmaticSC-Bold'}]}
              >Generate Recipes</Text>
            </Pressable>
          </View>

          <View>
            <ImageBackground
              source={require('../img/categories.png')}
              resizeMode='contain'
              style={[styles.caterories]}
            >

              <TouchableOpacity 
                style={[styles.categoryButton, styles.category1, {backgroundColor: headerColor}]}
                onPress={pressFruit}
              >
                <Text style={[styles.categoryText]}>Fruits</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.categoryButton, styles.category2, {backgroundColor: headerColor}]}
                onPress={pressProtein}
              >
                <Text style={[styles.categoryText]}>Protein</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.categoryButton, styles.category3, {backgroundColor: headerColor}]}
                onPress={pressDairy}
              >
                <Text style={[styles.categoryText]}>Dairy</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.categoryButton, styles.category4, {backgroundColor: headerColor}]}
                onPress={pressVeggies}
              >
                <Text style={[styles.categoryText]}>Veggies</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.categoryButton, styles.category5, {backgroundColor: headerColor}]}
                onPress={pressGrain}
              >
                <Text style={[styles.categoryText]}>Grain</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.categoryButton, styles.category6, {backgroundColor: headerColor}]}
                onPress={pressHerbs}
              >
                <Text style={[styles.categoryText]}>Herbs</Text>
              </TouchableOpacity>

            </ImageBackground>
          </View>

          {generateRecipes ?
          <View>
            <View>
              <Text style={[styles.fontLarge, styles.recipeText]}>Recipes: </Text>
            </View>
            <Text>{Recipes[0]}</Text>
            <View style={[styles.recipeView]}>
              <ScrollView horizontal={true}>
                <View>
                  <ImageBackground
                    source={require('../img/caesar-salad.jpg')}
                    style={[styles.recipeImages]}
                  >
                    <Text style={[styles.outline, styles.title, styles.fontSmall]}>Caesar Salad</Text>
                  </ImageBackground>
                </View>
                <View style={[styles.outline]}>
                  <ImageBackground
                    source={require('../img/chicken-chow-mein.jpg')}
                    style={[styles.recipeImages]}
                  >
                    <Text style={[styles.outline, styles.title, styles.fontSmall]}>Chicken Chow</Text>
                  </ImageBackground>
                </View>
              </ScrollView>
            </View>
          </View>
          : 
          <View style={[styles.outline, styles.selectedIngredients]}>
            
          </View>}
          
          
        </View>
      </TouchableWithoutFeedback> 

      <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <Text>Loading...</Text> : 
      ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>
          <Text style={{ fontSize: 18, color: 'green', textAlign: 'center'}}>{data.DESCRIPTION}</Text>
        </View>
      )}
    </View>


      <View style={[styles.navView]}></View>
    </ScrollView>
    </View>
  );
}
