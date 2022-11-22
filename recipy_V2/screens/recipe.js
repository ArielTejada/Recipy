import React from "react"
import {Text, View, Image, ImageBackground, TouchableOpacity, ScrollView, Pressable, Share, Linking} from "react-native";
import PieChart from "react-native-expo-pie-chart";
import { useStoreState, useStoreActions } from "easy-peasy";
import styles from '../styles/recipe-styles';

export default function Recipe({navigation}) {

/* -------------------- Redux State Variables -------------------- */
const currentRecipeMacros = useStoreState(state => state.currentRecipeMacros);
const currentRecipeTitle = useStoreState(state => state.currentRecipeTitle);
const ingredientsRequired = useStoreState(state => state.ingredientsRequired);
const currentRecipe = useStoreState(state => state.currentRecipe);
const steps = useStoreState(state => state.steps);
const recipeDescription = useStoreState(state => state.recipeDescription);
const recipeLink = useStoreState(state => state.recipeLink);

/* -------------------- Redux State Colors -------------------- */
const headerColor = useStoreState(state => state.headerColor);
const pageColor = useStoreState(state => state.pageColor);
const bannerColor = useStoreState(state => state.bannerColor);

let macroNumbers = []

const findMacros = () => {
  let num = ''

  for (let i = 0; i < currentRecipeMacros.length; i++){
    if (!isNaN(currentRecipeMacros[i])){
      num += currentRecipeMacros[i]
    }
    if (isNaN(currentRecipeMacros[i])){
      if(num === ''){
        continue;
      }
      macroNumbers.push(num.trim());
      num = ''
    }
  }
}

findMacros();

const calories = Number(macroNumbers[0])
const fat = Number(macroNumbers[1])
const carbs = Number(macroNumbers[3])
const protein = Number(macroNumbers[5])
const totalMacros = fat + carbs + protein;
const percentages =[[(fat/totalMacros).toFixed(2)], [(carbs/totalMacros).toFixed(2)], [(protein/totalMacros).toFixed(2)]]


/* -------------------- Handler Functions -------------------- */

const sendLink = () => {
  Share.share({
    message: recipeLink,
  })
    .then((result) => console.log(result))
    .catch((errorMsg) => console.log(errorMsg));
}

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

        <View style={[styles.macrosView, styles.outline]}>
          <View style={[]}>
            <View style={[styles.macroVisual]}>
              <Text style={[styles.macroVisualText]}>Fat  {percentages[0] * 100}%   </Text>
              <View style={[styles.box1]}></View>
            </View>
            <View style={[styles.macroVisual]}>
              <Text style={[styles.macroVisualText]}>Carbs  {percentages[1] * 100}%   </Text>
              <View style={[styles.box2]}></View>
            </View>
            <View style={[styles.macroVisual]}>
              <Text style={[styles.macroVisualText]}>Protein  {percentages[2] * 100}%   </Text>
              <View style={[styles.box3]}></View>
            </View>
          </View>
          <View style={[styles.pieChart]}>
            <PieChart
              data={[
                {key: 'Fat', count: percentages[0]*100, color: '#1ED760',},
                {key: 'Carbs', count: percentages[1]*100, color: '#007ACC',},
                {key: 'Protein', count: percentages[2]*100, color: '#F52727',},
              ]}
              length={100}
            />
          </View>
        </View>

        <Text style={[styles.recipeHeaderText]}>Ingredients Required:</Text>
        <Text style={[styles.recipeDataText]}>{ingredientsRequired}</Text>

        <Text style={[styles.recipeHeaderText]}>Directions:</Text>
        <Text style={[styles.recipeDataText]}>{steps}</Text>
        <Text style={[styles.recipeDataText]}>{currentRecipe}</Text>

        <Text style={[styles.recipeHeaderText]}>Link:</Text>
        <Text style={[styles.link]} onPress={() => Linking.openURL(recipeLink)}>{recipeLink}</Text>

        <Pressable 
          style={[styles.sendLink, styles.outline]}
          onPress={() => sendLink()}
        >
          <Text style={[styles.sendText]}>Send This Link To A Friend!</Text>
        </Pressable>
          
      </View>

      <View style={[styles.navView]}></View>

    </ScrollView>
    </View>
  );
}