import React, { useState, useEffect } from "react";
import {Text, View, Image, Pressable, TouchableWithoutFeedback, Keyboard, ScrollView, TouchableOpacity, ImageBackground, FlatList} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useStoreState, useStoreActions } from "easy-peasy";
import axios from 'axios';

import styles from '../styles/home-styles';

export default function Home({navigation}) {

/* -------------------- Local State Variables -------------------- */
  const [recievedData, setRecievedData] = useState(false);
  
/* -------------------- Redux State Variables -------------------- */
  const refresh = useStoreState(state => state.refresh);
  const setRefresh = useStoreActions(actions => actions.setRefresh);
  const ingredients = useStoreState(state => state.ingredients);
  const setCategory = useStoreActions(actions => actions.setCategory);  
  const setCategoryList = useStoreActions(actions => actions.setCategoryList); 
  const selectedIngredients = useStoreState(state => state.selectedIngredients);
  const setSelectedIngredients = useStoreActions(actions => actions.setSelectedIngredients);
  const haveIngredints = useStoreState(state => state.haveIngredients);
  const setHaveIngredients = useStoreActions(actions => actions.setHaveIngredients);

  const Recipes = useStoreState(state => state.Recipes);
  const setRecipes = useStoreActions(actions => actions.setRecipes); 
  const setCurrentRecipeMacros = useStoreActions(actions => actions.setCurrentRecipeMacros); 
  const setCurrentRecipeTitle = useStoreActions(actions => actions.setCurrentRecipeTitle); 
  const setCurrentRecipe = useStoreActions(actions => actions.setCurrentRecipe); 
  const setIngredientsRequired = useStoreActions(actions => actions.setIngredientsRequired); 
  const setRecipeDescription = useStoreActions(actions => actions.setRecipeDescription); 
  const setSteps = useStoreActions(actions => actions.setSteps); 
  const setRecipeLink = useStoreActions(actions => actions.setRecipeLink); 
  
  const generateColor = useStoreState(state => state.generateColor);
  const haveIngredients = useStoreState(state => state.haveIngredients);
  const generateRecipes = useStoreState(state => state.generateRecipes);
  const setGenerateRecipes = useStoreActions(actions => actions.setGenerateRecipes); 

  const dietOption = useStoreState(state => state.dietOption);
  const removedIngredients = useStoreState(state => state.removedIngredients);

/* -------------------- Redux State Colors -------------------- */
  const headerColor = useStoreState(state => state.headerColor);
  const pageColor = useStoreState(state => state.pageColor);
  const bannerColor = useStoreState(state => state.bannerColor);
  
/* -------------------- Handler Functions -------------------- */
  const addIngredientHandler = () => {navigation.navigate('AddIngredient')}
  const profilePressHandler = () => {navigation.navigate('Account')}
  const categoryPressHandler = () => {navigation.navigate('Category')}
  const navToRecipe = () => {navigation.navigate('Recipe');}

  const getRecipes = async (ingredients) => {
    await axios({
      method: 'get',
      url: 'https://recipy-ingredients-backend.herokuapp.com/search/' + ingredients,
    }).then((response) => {
      setRecipes(response.data);
    }).then(() => {
      console.log(Recipes)
      setRefresh(!refresh);
    });
    setRefresh(!refresh);
  }

  const pressGenerate = async () => {
    if(haveIngredients && generateRecipes){
      setGenerateRecipes();
    }
    if(haveIngredients && !generateRecipes){
      let ingredientString = returnIngredientString(selectedIngredients, 'name')
      await getRecipes(ingredientString);
      setGenerateRecipes();
      setRecievedData(true);
    }
    return;
  }

  const returnIngredientString = (ingredients, attr) => {
    let output = [];
    for (let i = 0; i < ingredients.length; i++){
      output.push(ingredients[i][attr]);
    }
    return output.join(",");
  }

  const recipePressHandler = (title = 'Loading...', desc = 'Loading...', macros = 'Loading...', reqs = 'Loading...', steps = 'Loading...', recipe = 'Loading...', link='Loading...') => {
    setCurrentRecipeTitle(title);
    setRecipeDescription(desc);
    setCurrentRecipeMacros(macros);
    setIngredientsRequired(reqs);
    setSteps(steps);
    setCurrentRecipe(recipe);
    setRecipeLink(link);
    navToRecipe();
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

  const selectedListPress = (ingredientObj) => {
    let newList = selectedIngredients.filter((ingredient) => ingredient.id != ingredientObj.id);
    setSelectedIngredients(newList);
    setHaveIngredients();
    setRefresh(!refresh);
    if (newList.length == 0){
      setGenerateRecipes();
      setRecievedData(false);
    }
    setRefresh(!refresh);
    console.log(`removed ${ingredientObj.name} num ingredients: ${newList.length}`);
  }

  
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

          <View>
            <Text style={[styles.fontLarge, styles.recipeText]}>Selected Ingredients: </Text>
          </View>

          <View style={[styles.selectedIngredients, styles.outline, styles.margins]}>
            <ScrollView horizontal={true}>
              {selectedIngredients.map((ingredient) => {
                return (
                <Pressable 
                  key={ingredient.id}
                  style={[styles.roundBTN, styles.flex]}
                  onPress={() => selectedListPress({...ingredient})}
                >
                  <Text style={[styles.fontSmall, styles.textCenter]}>{ingredient.name.replace('_', ' ')}</Text>
                </Pressable>)
              })}
            </ScrollView>
          </View>

          { recievedData && generateRecipes ?
          (<View>

            <View>
              <Text style={[styles.fontLarge, styles.recipeText]}>You have {Object.values(Recipes["TITLE"]).length} Recipe(s): </Text>
            </View>

            <View style={[styles.recipeView]}>
              <ScrollView horizontal={true}>

                {/* <Pressable 
                  style={[styles.outline, styles.card]}
                  onPress={() => recipePressHandler('Title Loading...', 'Desc Loading...', 'Macros Loading...', 'Reqs Loading...', 'Steps Loading...', 'Recipe Loading...')}
                >
                  <ImageBackground
                    source={require('../img/recipeBack.jpg')}
                    style={[styles.recipeBack]}
                  >
                    <Text style={[styles.recipePressableText]}>Recipe Title</Text>
                  </ImageBackground>
                </Pressable> */}
              
              {Object.values(Recipes["TITLE"]).map((recipe, index) => {
                return(
                  <Pressable 
                    key={index}
                    style={[styles.outline, styles.card]}
                    onPress={() => recipePressHandler(
                      Object.values(Recipes["TITLE"])[index], 
                      Object.values(Recipes["DESCRIPTION"])[index], 
                      Object.values(Recipes["MACROS"])[index].split("\n").join(" ").split(",").join(", "), 
                      Object.values(Recipes["has_ingredients"])[index], 
                      Object.values(Recipes["INGREDIENTS"])[index], 
                      Object.values(Recipes["DIRECTIONS"])[index],
                      Object.values(Recipes["LINK"])[index],
                    )}
                  >
                    <ImageBackground
                      source={require('../img/recipe2.png')}
                      style={[styles.recipeBack]}
                    >
                      <Text style={[styles.recipePressableText]}>{Object.values(Recipes["TITLE"])[index]}</Text>
                    </ImageBackground>
                  </Pressable>
                )})}

              </ScrollView>
            </View>

          </View>)  : <View style={[styles.outline, styles.selectedIngredients]}></View>
        }
          
        </View>
      </TouchableWithoutFeedback> 

      <View style={[styles.navView]}></View>
      
    </ScrollView>
    </View>
  );
}
