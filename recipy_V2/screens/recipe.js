import React from "react"
import {Text, View, Image, ImageBackground, TouchableOpacity, ScrollView} from "react-native";
import { useStoreState, useStoreActions } from "easy-peasy";
import styles from '../styles/recipe-styles'

export default function Recipe({navigation}) {

/* -------------------- Redux State Variables -------------------- */
const currentRecipeMacros = useStoreState(state => state.currentRecipeMacros);
const currentRecipeTitle = useStoreState(state => state.currentRecipeTitle);
const ingredientsRequired = useStoreState(state => state.ingredientsRequired);
const currentRecipe = useStoreState(state => state.currentRecipe);
const steps = useStoreState(state => state.steps);
const recipeDescription = useStoreState(state => state.recipeDescription);

/* -------------------- Redux State Colors -------------------- */
const headerColor = useStoreState(state => state.headerColor);
const pageColor = useStoreState(state => state.pageColor);
const bannerColor = useStoreState(state => state.bannerColor);

/* -------------------- Render Method -------------------- */
  return (
    <View>

      <View style={[styles.pushDown, {backgroundColor: headerColor}]}></View>

      <View style={[styles.backButtonSection, {backgroundColor: headerColor}]}>
        <ImageBackground
            source={require('../img/banner1.png')}
            style={[styles.banner, {overflow: 'hidden'}]}
            resizeMode='contain'
            imageStyle={[{tintColor: bannerColor}]}
            >
            <TouchableOpacity
                onPress={() => {navigation.navigate('HomeScreen')}}
                style={[styles.backIconTouch]}
                >
            <Image
                source={require('../icons/go-back.png')}
                style={[styles.backIcon, {tintColor: bannerColor}]}
                />
            </TouchableOpacity>
        </ImageBackground>
      </View> 

    <ScrollView>

      <View style={[styles.pageMargins]}>
        <Text style={styles.recipeTitle}>{currentRecipeTitle}</Text>

        <Text style={[styles.recipeHeaderText]}>Description:</Text>
        <Text style={[styles.recipeDataText]}>{recipeDescription}</Text>

        <Text style={[styles.recipeHeaderText]}>Recipe Macros:</Text>
        <Text style={[styles.recipeDataText]}>{currentRecipeMacros}</Text>

        <Text style={[styles.recipeHeaderText]}>Ingredients Required:</Text>
        <Text style={[styles.recipeDataText]}>{ingredientsRequired}</Text>

        <Text style={[styles.recipeHeaderText]}>Directions:</Text>
        <Text style={[styles.recipeDataText]}>{steps}</Text>
        <Text style={[styles.recipeDataText]}>{currentRecipe}</Text>
      </View>

      <View style={[styles.navView]}></View>

    </ScrollView>
    </View>
  );
}