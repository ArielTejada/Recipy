import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Image, ImageBackground, FlatList, ScrollView, Pressable, Keyboard } from "react-native";
import styles from '../styles/pantry-styles';
import matchFunction from "../components/matchFunction";
import { useStoreState, useStoreActions } from "easy-peasy";

/* -------------------- Components -------------------- */
import { SearchBar } from "react-native-screens";

export default function Pantry() {

/* -------------------- Local State Variables -------------------- */
  const [searchText, setSearchText] = useState('');
  const [searching, setSearching] = useState(false);
  const [filteredArray, setFilteredArray] = useState([]);
  const match = matchFunction;

  let addIngredient = {name: '', key: ''}
  let addDate = null;

/* -------------------- Redux State Variables -------------------- */
  const refresh = useStoreState(state => state.refresh);
  const setRefresh = useStoreActions(actions => actions.setRefresh);

  const ingredients = useStoreState(state => state.ingredients);
  const pantryItems = useStoreState(state => state.pantryItems);
  const setPantryItems = useStoreActions(actions => actions.setPantryItems);

/* -------------------- Redux State Colors -------------------- */
  const headerColor = useStoreState(state => state.headerColor);
  const pageColor = useStoreState(state => state.pageColor);
  const bannerColor = useStoreState(state => state.bannerColor);

/* -------------------- Handler Functions -------------------- */
  const ingredientPressHandler = (name, key) => {  
    Keyboard.dismiss();
    addIngredient.name = name;
    addIngredient.key = key;
    setSearchText(name);
    setSearching(false);
    setRefresh(!refresh);
  }

  const enterPressHandler = () => {
    let newPantryItems = pantryItems;
    newPantryItems.push({addIngredient, addDate})
    setPantryItems(newPantryItems);
    addIngredient = {name: '', key: ''};
    addDate = null;
  }

  const pantryPressHandler = (key) => {
    let newPantryList = pantryItems.filter((ingredient) => ingredient.key != key);
    setPantryItems(newPantryList);
  }

  /* -------------------- Render Method -------------------- */

  return (
    <View style={[styles.wholeScreen, {backgroundColor: pageColor}]}>

      <Pressable 
        keyboardShouldPersistTaps='always'
        onPress={() => {Keyboard.dismiss();}}
        style={[styles.wholeScreen]}
      >

      <View style={[styles.pushDown, {backgroundColor: headerColor}]}></View>

      <View style={[styles.header, {backgroundColor: headerColor}]}>
        <Image
          source={require('../img/bakeryV2.png')}
          style={[styles.banner, {tintColor: bannerColor}]}
        />
        <Text style={[styles.headerText]}>Pantry</Text>
      </View>

      <Text style={[styles.fontSmall, styles.margins]}>Add ingredients to your pantry:</Text>
      <SearchBar/>

      <View>  

        <View style={styles.container}>
          <TextInput
            placeholder=' add ingredient'
            style={[styles.input, styles.outline]}
            value={searchText}
            onChangeText={(text) => {
                setSearchText(text);
                text === '' ? (setSearching(false), addIngredient = {name: '', key: ''}): setSearching(true);
                text != '' ? setFilteredArray(match(text.toLowerCase(), ingredients)) : setFilteredArray([]);
            }}
            searchText={searchText}
            setSearchText={setSearchText}
          />
          <TextInput
            placeholder=" add expiration"
            style={[styles.input, styles.outline]}
          />
          <Pressable 
            style={styles.button}
            onPress={() => {
                setSearchText('');
                setSearching(false);
                enterPressHandler();
            }}
          >
              <Text style={styles.clear}>Enter</Text>
          </Pressable>
        </View>

          <View>
            {searching ? <Text>Searching : True</Text> : <Text>Searching : False</Text>}
            {searching ? 
            <FlatList
              keyboardShouldPersistTaps='always'
              data={filteredArray}
              renderItem={({ item }) => (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                        ingredientPressHandler(item.name, item.key);
                    }}
                  >
                    <Text style={[styles.searchResult, styles.outline, styles.textCenter, styles.margins, styles.fontMedium]}>{item.name.replace('_', ' ')}</Text> 
                  </TouchableOpacity>
                </View>             
              )}
            /> : <Text></Text>}
          </View>

        </View>

        <View>

          <ImageBackground
            source={require('../img/pantry.png')}
            style={[styles.pantryImage]}
          >

            <ScrollView style={[styles.jarsMargin]}>
              <View style={[{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}]}>
                {pantryItems.map((ingredient) => {
                  return (
                  <TouchableOpacity style={[styles.jar]} key={ingredient.key} onPress={() => {pantryPressHandler(ingredient.key)}}>
                    <ImageBackground
                      source={require('../img/glassjar.png')}
                      style={[styles.jar]}
                    >
                        <Text style={[styles.fontSmall, styles.jarLabel]}>{ingredient.name.replace('_', ' ')}</Text>
                        <Text style={[styles.fontSmall, styles.jarLabel]}>{ingredient.date.replace('_', ' ')}</Text>
                    </ImageBackground>
                  </TouchableOpacity>)
                })}
              </View>
            </ScrollView>

          </ImageBackground>

        </View>

        </Pressable>
    </View>
  );
}