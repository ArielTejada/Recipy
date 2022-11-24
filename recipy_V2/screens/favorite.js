import React from "react";
import {Text, View, ScrollView, Pressable, ImageBackground, Image, Dimensions} from "react-native";
import styles from '../styles/favorite-styles';
import { useStoreState, useStoreActions } from "easy-peasy";
const {height, width} = Dimensions.get('window');

export default function Favorite({navigation}) {

/* -------------------- Redux State Variables -------------------- */
const refresh = useStoreState(state => state.refresh);
const setRefresh = useStoreActions(actions => actions.setRefresh);

const likedRecipes = useStoreState(state => state.likedRecipes);
const recommendedRecipes = useStoreState(state => state.recommendedRecipes);
const renderedRecommended = useStoreState(state => state.renderedRecommended);

const setCurrentRecipeMacros = useStoreActions(actions => actions.setCurrentRecipeMacros); 
const setCurrentRecipeTitle = useStoreActions(actions => actions.setCurrentRecipeTitle); 
const setCurrentRecipe = useStoreActions(actions => actions.setCurrentRecipe); 
const setIngredientsRequired = useStoreActions(actions => actions.setIngredientsRequired); 
const setRecipeDescription = useStoreActions(actions => actions.setRecipeDescription); 
const setSteps = useStoreActions(actions => actions.setSteps); 
const setRecipeLink = useStoreActions(actions => actions.setRecipeLink); 
const setRecipeID = useStoreActions(actions => actions.setRecipeID); 

/* -------------------- Redux State Colors -------------------- */
const headerColor = useStoreState(state => state.headerColor);
const pageColor = useStoreState(state => state.pageColor);
const bannerColor = useStoreState(state => state.bannerColor);

/* -------------------- Handler Functions -------------------- */

const likedRecipePress  = (title = 'Loading...', desc = 'Loading...', macros = 'Loading...', reqs = 'Loading...', steps = 'Loading...', recipe = 'Loading...', link='Loading...', id='Loading...') => {
  setCurrentRecipeTitle(title);
  setRecipeDescription(desc);
  setCurrentRecipeMacros(macros);
  setIngredientsRequired(reqs);
  setSteps(steps);
  setCurrentRecipe(recipe);
  setRecipeLink(link);
  setRecipeID(id);
  navToRecipe();
}

const navToRecipe = () => {navigation.navigate('LikedRecipe')}

/* -------------------- Render Method -------------------- */
  return (
    <View style={[styles.wholeScreen, {backgroundColor: pageColor}]}>
      
      <View style={[styles.pushDown, {backgroundColor: headerColor}]}></View>

      <View style={[styles.header, {backgroundColor: headerColor}]}>
        <Text style={[styles.headerText]}>Recommendations</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
      >

      <View style={[styles.pageMargins]}>

      <View>
        <Text style={[styles.AmaticSCBold, styles.fontLarge]}>Liked Recipes:</Text>
      </View>

      <View style={[styles.likedRecipeScrollView]}>
        <ScrollView style={[]}>
          {likedRecipes.map((recipe) => {
            return(
            <Pressable 
              style={[styles.outline]}
              key={recipe.id}
              onPress={() => likedRecipePress(
                recipe.title, recipe.desc, recipe.macros.split("\n").join(" ").split(",").join(", "), 
                recipe.reqs, recipe.steps,  recipe.recipe, recipe.link, recipe.id,
              )} 
            >
              <ImageBackground
                source={require('../img/banner71.png')}
                style={[styles.recipeBack]}
              >
                <Text style={[styles.AmaticSCBold, styles.fontLarge, styles.textCenter]}>{recipe.title}</Text>
              </ImageBackground>
            </Pressable>
          )})}
        </ScrollView>
      </View>

      <View>
        <Text style={[styles.AmaticSCBold, styles.fontLarge]}>Recommended Recipes: {renderedRecommended ? "TRUE" : "FALSE"}</Text>
      </View>

      {renderedRecommended ?  
      <View style={[styles.outline, styles.recommededScrollView]}>
        <ScrollView horizontal={true}>
  
        </ScrollView>
      </View> : <View></View>}

      </View>
      <View style={[styles.navView]}></View>
      </ScrollView>
    </View>
  );
}
