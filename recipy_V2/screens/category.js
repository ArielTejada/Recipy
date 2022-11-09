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

  const lightEnabled = useStoreState(state => state.lightEnabled);
  const darkEnabled = useStoreState(state => state.darkEnabled);
  const halloweenEnabled = useStoreState(state => state.halloweenEnabled);

/* -------------------- Redux State Colors -------------------- */
  const headerColor = useStoreState(state => state.headerColor);
  const pageColor = useStoreState(state => state.pageColor);
  const bannerColor = useStoreState(state => state.bannerColor);


/* -------------------- Handler Functions -------------------- */
  const selectedListPress = (key) => {
    console.log(`clicked ${key}`);
    let newList = selectedIngredients.filter((ingredient) => ingredient.key != key);
    console.log(newList);
    setSelectedIngredients(newList);
    setHaveIngredients();
  }

  const pressHandler = (name, key) => {   
    if(selectedIngredients.find(ingredient => ingredient.name === name)) {
        return;
    }
    let newList = selectedIngredients;
    newList.push({name: name, key: key});
    setSelectedIngredients(newList);
    setHaveIngredients();
    setRefresh(!refresh);
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

      <View style={[
          styles.header, 
          lightEnabled ? {backgroundColor: '#2196F3'} :
          darkEnabled ? {backgroundColor: '#4A576F', color: '#A4A9AD'} :
          halloweenEnabled ? {backgroundColor: '#FF7739'} : {backgroundColor: '#2196F3'}
        ]}>
        <Text style={[styles.headerText]}>Category: {category}</Text>
      </View>
      

      <View style={[styles.selectedIngredients, styles.outline, styles.margins]}>
        <ScrollView horizontal={true}>
          {selectedIngredients.map((ingredient) => {
            return (
            <Pressable 
              key={ingredient.key}
              style={[styles.roundBTN, styles.flex]}
              onPress={() => selectedListPress(ingredient.key)}
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
          imageStyle={[{tintColor: bannerColor}]}
          ></ImageBackground>
      </View>

        <ScrollView style={[styles.ingredientMargins]}>
          <View style={[styles.flexRow, styles.centerItems]}>
            {categoryList.map((ingredient) => {
              return (
              <TouchableOpacity 
                key={ingredient.id}
                style={[styles.roundBTN]}
                onPress={() => {pressHandler(ingredient.name, ingredient.id)}}
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