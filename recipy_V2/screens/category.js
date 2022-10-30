import React from "react"
import {Text, View, TouchableOpacity, Image, ImageBackground, ScrollView, Pressable} from "react-native"
import styles from '../styles/add-styles'
import { useStoreState, useStoreActions } from "easy-peasy";

export default function Category({navigation}) {

  /* -------------------- Redux State Variables -------------------- */
  const category = useStoreState(state => state.category);
  const categoryList = useStoreState(state => state.categoryList);  
  const selectedIngredients = useStoreState(state => state.selectedIngredients);
  const setSelectedIngredients = useStoreActions(actions => actions.setSelectedIngredients);

/* -------------------- Handler Functions -------------------- */
  const selectedListPress = (key) => {
    console.log(`clicked ${key}`);
    let newList = selectedIngredients.filter((ingredient) => ingredient.key != key);
    console.log(newList);
    setSelectedIngredients(newList);
  }

  const pressHandler = (name, key) => {   
    if(selectedIngredients.find(ingredient => ingredient.name === name)) {
        return;
    }
    let newList = selectedIngredients;
    newList.push({name: name, key: key});
    setSelectedIngredients(newList);
}

/* -------------------- Render Method -------------------- */
  return (
    <View>
      <View style={styles.pushDown}></View> 
      <View style={[styles.backButtonSection]}>
        <ImageBackground
          source={require('../img/banner1.png')}
          style={styles.banner}
        >
          <TouchableOpacity
          onPress={() => {navigation.navigate('HomeScreen')}}
          style={[styles.backIconTouch]}
        >
          <Image
            source={require('../icons/go-back.png')}
            style={styles.backIcon}
          />
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <View>
        <Text style={[styles.header]}>{category}</Text>
      </View>

      <View style={[styles.selectedIngredients, styles.outline]}>
        <ScrollView horizontal={true}>
          {selectedIngredients.map((ingredient) => {
            return (
            <Pressable 
              key={ingredient.key}
              style={[styles.roundBTN, styles.flex]}
              onPress={() => selectedListPress(ingredient.key)}
            >
              <Text style={[styles.fontSmall, styles.textCenter]}>{ingredient.name.replace('_', ' ')}</Text>
            </Pressable>)
          })}
        </ScrollView>
      </View>

      <View style={[styles.absolute]}>
        <ImageBackground
          source={require('../img/fridge.png')}
          style={[styles.fridgeImage]}
          resizeMode='contain'
          ></ImageBackground>
      </View>

        <ScrollView style={[styles.ingredientMargins]}>
          <View style={[styles.flexRow]}>
            {categoryList.map((ingredient) => {
              return (
              <Pressable 
                key={ingredient.id}
                style={[styles.roundBTN]}
                onPress={() => {pressHandler(ingredient.name, ingredient.id)}}
              >
                <Text style={[styles.fontSmall, styles.textCenter]}>{ingredient.name.replace('_', ' ')}</Text>
              </Pressable>)
            })}
          </View>
        </ScrollView>
    </View>
  );
}