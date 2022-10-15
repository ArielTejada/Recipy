import React, { useState, useEffect } from "react";
import {Text, View, Image, TouchableWithoutFeedback, TouchableOpacity, Keyboard, ScrollView, ImageBackground} from "react-native";
import styles from '../styles/add-styles';
import { useStoreState, useStoreActions } from "easy-peasy";

import SearchBar from "../components/searchBar"
import { FlatList } from "react-native-gesture-handler";

export default function AddIngredient({navigation}) {

// const [selectedIngredients, setSelectedIngredients] = useState([]);
const selectedIngredients = useStoreState(state => state.selectedIngredients);
const setSelectedIngredients = useStoreActions(actions => actions.setSelectedIngredients);
// const [refresh, setRefresh] = useState(false);
const refresh = useStoreState(state => state.refresh);
const setRefresh = useStoreActions(actions => actions.setRefresh);

  return (
    <TouchableOpacity 
      keyboardShouldPersistTaps='always'
      onPress={() => {
      Keyboard.dismiss();
      setRefresh(!refresh);
    }}>
      <View>
      <View style={styles.pushDown}></View> 
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('HomeScreen');
            }}
            style={[styles.backButtonSection]}
          >
            <Image
              source={require('../icons/go-back.png')}
              style={styles.icon}
            />
            <Image
              source={require('../img/banner1.png')}
              style={styles.banner}
              
            />
          </TouchableOpacity>
        <SearchBar
          selectedIngredients={selectedIngredients}
          setSelectedIngredients={setSelectedIngredients}
        />
        <View style={[styles.margins, styles.selected, styles.fontSmall]}>
          <ImageBackground
            source={require('../img/searchItems.png')}
            style={styles.sidesImage}
            resizeMode='contain'
          >
          <Text 
            style={[styles.fontSmall, styles.textCenter, styles.outline, styles.halfWidth]}
          >Selected Ingredients</Text>
          <ScrollView>
          {selectedIngredients.map((ingredient) => {
            return (
            <View>
              <Text>{ingredient.name}</Text>
            </View>)
          })}
          </ScrollView>
          </ImageBackground>
        </View>
      </View>
    </TouchableOpacity>
  );
}
