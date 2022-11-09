import React from "react"
import {Text, View, TouchableOpacity, Image, ImageBackground, ScrollView, Pressable, Animated} from "react-native"
import styles from '../styles/category-styles'
import { useStoreState, useStoreActions } from "easy-peasy";

export default function Category({navigation}) {

  /* -------------------- Redux State Variables -------------------- */
  const category = useStoreState(state => state.category);
  const categoryList = useStoreState(state => state.categoryList);  
  const selectedIngredients = useStoreState(state => state.selectedIngredients);
  const setSelectedIngredients = useStoreActions(actions => actions.setSelectedIngredients);
  const setHaveIngredients = useStoreActions(actions => actions.setHaveIngredients);

  const refresh = useStoreState(state => state.refresh);
  const setRefresh = useStoreActions(actions => actions.setRefresh);

/* -------------------- Redux State Colors -------------------- */
  const headerColor = useStoreState(state => state.headerColor);
  const pageColor = useStoreState(state => state.pageColor);
  const bannerColor = useStoreState(state => state.bannerColor);


/* -------------------- Handler Functions -------------------- */
const selectedListPress = (ingredientObj) => {
  let newList = selectedIngredients.filter((ingredient) => ingredient.id != ingredientObj.id);
  setSelectedIngredients(newList);
  setHaveIngredients();
  console.log(`removed ${ingredientObj.name} num ingredients: ${newList.length}`);
}

  const categoryPressHandler = (ingredientObj) => {   
    if(selectedIngredients.find(ingredient => ingredient.name === ingredientObj.name)) {
        return;
    }
    let newList = selectedIngredients;
    newList.push({...ingredientObj});
    setSelectedIngredients(newList);
    setHaveIngredients();
    setRefresh(!refresh);
    console.log(`added: ${ingredientObj.name} num ingredients: ${newList.length}`);
}

  const refreshPage = () => {
    setRefresh();
  }

/* -------------------- Pressable Animations -------------------- */

  const animated = new Animated.Value(1);
    const fadeIn = () => {
      Animated.timing(animated, {
        toValue: 0.4,
        duration: 100,
        useNativeDriver: true,
      }).start();
    };
    
    const fadeOut = () => {
      Animated.timing(animated, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    };

/* -------------------- Render Method -------------------- */
  return (
    <View style={[styles.wholeScreen, {backgroundColor: pageColor}]}>

      <View style={[styles.pushDown, {backgroundColor: headerColor}]}></View>

      <View style={[styles.backButtonSection, {backgroundColor: headerColor}]}>

        <ImageBackground
          source={require('../img/banner1.png')}
          style={[styles.banner, {overflow: 'hidden'}, styles.outline, {borderColor: 'white'},]}
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

      <View style={[styles.header, {backgroundColor: headerColor}]}>
        <Text style={[styles.headerText]}>Category: {category}</Text>
      </View>
      

      <View style={[styles.selectedIngredients, styles.outline, styles.margins]}>
        <ScrollView horizontal={true}>
          {selectedIngredients.map((ingredient) => {
            return (
            <Pressable 
              key={ingredient.id}
              style={[styles.roundBTN, styles.flex]}
              onPress={() => selectedListPress(ingredient)}
            >
              <Text style={[styles.fontSmall, styles.textCenter, { color: 'black'}]}>{ingredient.name.replace('_', ' ')}</Text>
            </Pressable>)
          })}
        </ScrollView>
      </View>

      <View style={[styles.absolute]}>
        <ImageBackground
          source={require('../img/searchItems.png')}
          style={[styles.backImage]}
          resizeMode='contain'
          imageStyle={[{tintColor: headerColor}]}
          ></ImageBackground>
      </View>

        <ScrollView style={[styles.ingredientMargins]}>
          <View style={[styles.flexRow, styles.centerItems]}>
            {categoryList.map((ingredient) => {
              return (
              <TouchableOpacity 
                key={ingredient.id}
                style={[styles.roundBTN]}
                onPress={() => {categoryPressHandler({...ingredient})}}
                onPressIn={() => fadeIn}
                onPressOut={() => fadeOut}
              >
                <Text style={[styles.fontSmall, styles.textCenter, { color: 'black'}]}>{ingredient.name.replace('_', ' ')}</Text>
              </TouchableOpacity>)
            })}
          </View>
        </ScrollView>
    </View>
  );
}