import React, { useState, useEffect } from "react";
import {FlatList, StyleSheet, Button, Text, View, Image, TouchableWithoutFeedback, TouchableOpacity, Keyboard, ScrollView, ImageBackground, Pressable} from "react-native";
import styles from '../styles/add-styles';
import { useStoreState, useStoreActions } from "easy-peasy";

/* -------------------- Components -------------------- */
import SearchBar from "../components/searchBar"
import { BarCodeScanner } from 'expo-barcode-scanner';
import { SafeAreaInsetsContext } from "react-native-safe-area-context";

export default function AddIngredient({navigation}) {

/* -------------------- Local State Variables -------------------- */
const [hasPermission, setHasPermission] = useState(null);
const [scanned, setScanned] = useState(false);
const [shouldShow, setShouldShow] = useState(false);
const [json, setJson] = useState([]);

/* -------------------- Redux State Variables -------------------- */
const ingredients = useStoreState(state => state.ingredients);
const selectedIngredients = useStoreState(state => state.selectedIngredients);
const setSelectedIngredients = useStoreActions(actions => actions.setSelectedIngredients);//use this
const refresh = useStoreState(state => state.refresh);
const setRefresh = useStoreActions(actions => actions.setRefresh);
const setHaveIngredients = useStoreActions(actions => actions.setHaveIngredients);
const setGenerateRecipes = useStoreActions(actions => actions.setGenerateRecipes); 

const recentlyUsed = useStoreState(state => state.recentlyUsed);
const setRecentlyUsed = useStoreActions(actions => actions.setRecentlyUsed); 

const dietOption = useStoreState(state => state.dietOption);
const removedIngredients = useStoreState(state => state.removedIngredients);

/* -------------------- Redux State Colors -------------------- */
const headerColor = useStoreState(state => state.headerColor);
const pageColor = useStoreState(state => state.pageColor);
const bannerColor = useStoreState(state => state.bannerColor);

/* -------------------- Handler Functions -------------------- */
useEffect(() => {
  const getBarCodeScannerPermissions = async() => {
    const {status} = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };
  getBarCodeScannerPermissions();
}, []);

const getIngredients = async (data) => {
  try {
   const response = await fetch('https://api.upcitemdb.com/prod/trial/lookup?upc='+data);
   const json = await response.json();
   setJson(json.items);
 } catch (error) {
   console.error(error);
 } 
}

const handleBarCodeScanned = ({type,data}) => {
  setScanned(true);
  alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  getIngredients(data);
  // console.log(json[0]===undefined);
  if(json[0]===undefined){//sometimes the async function fires a bit too late so the variable doesn't get assigned properly
    alert('An error has occured.\n Please rescan your barcode');
    setScanned(false);
    setShouldShow(!shouldShow);
    return;
  }
  setScanned(false);
  setShouldShow(!shouldShow);
  // console.log(json[0]['title'].toLowerCase());
  // console.log(ingredients.length);
  // console.log(validateIngredient(json[0]['title'].toLowerCase(),ingredients));
  console.log("This is ingredients" + ingredients.length);
  const result = validateIngredient(json[0]['title'].toLowerCase(),ingredients);
  console.log(result);
  if(selectedIngredients.find(ingredient => ingredient.name === result)) {
    return;
  }
  console.log(selectedIngredients);
  // let list =selectedIngredients;
  let list = selectedIngredients;
  list.push({"name":result});
  console.log(list);
  setSelectedIngredients(list);
  setHaveIngredients();
};

if (hasPermission === null){
  return <Text>Requesting for camera permission</Text>;
}

if (hasPermission === false){
  return <Text>No access to camera</Text>;
}

const validateIngredient = (ingredient,list) => {
  // let result = [];
  let result ="";
  for(let i = 0; i < list.length; i++){
    console.log(list[i].name);
    if (ingredient.includes(list[i].name)){
      // result.push(list[i]);
      result=list[i].name
      break;
    }
  }
  return result;
};

const selectedListPress = (ingredientObj) => {
  let newList = selectedIngredients.filter((ingredient) => ingredient.id != ingredientObj.id);
  setSelectedIngredients(newList);
  setHaveIngredients();
  console.log(`removed ${ingredientObj.name} num ingredients: ${newList.length}`);
}

const recentPressHandler = (ingredientObj) => {  
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

/* -------------------- Render Method -------------------- */
  return (
    <View style={[styles.wholeScreen, {backgroundColor: pageColor}]}>

      {shouldShow ? null:
      <Pressable 
        keyboardShouldPersistTaps='always'
        onPress={() => {Keyboard.dismiss();}}
      >

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

      <SearchBar
        selectedIngredients={selectedIngredients}
        setSelectedIngredients={setSelectedIngredients}
      />

      <View style={[styles.barcodeView]}>
        <View style={[styles.barcodeAreaText]}>
          <Text style={[styles.AmaticSCBold, styles.fontMedium]}>Add Ingredients with our scanner!</Text>
        </View>
        <Pressable 
          style={[styles.barcodeButton, styles.outline, styles.flexRow2]}
          onPress={() => setShouldShow(!shouldShow)}
        >
          <View style={[styles.barcodeButtonText]}>
            <Text style={[styles.AmaticSCBold, styles.fontMedium, {color: 'white'}]}>Barcode Scanner</Text>
          </View>
          
          <Image
            source={require('../icons/scan2-black.png')}
            style={[styles.scanImage]}
          />
        </Pressable>
      </View>

      <FlatList
          data={json}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>{item.title}</Text>
          )}
        />
      <View style={[styles.margins, styles.selected, styles.fontSmall]}>
          <View style={[styles.selectedIngredients, styles.outline]}>
            <ScrollView horizontal={true}>
              {selectedIngredients.map((ingredient) => {
                return (
                <Pressable 
                  key={ingredient.id}
                  style={[styles.roundBTN, styles.flex]}
                  onPress={() => selectedListPress(ingredient)}
                >
                  <Text style={[styles.fontSmall, styles.textCenter]}>{ingredient.name.replace('_', ' ')}</Text>
                </Pressable>)
              })}
            </ScrollView>
          </View>

          <Text style={[styles.AmaticSCBold, styles.fontMedium, styles.textCenter]}>Recently Used Ingredients:</Text>

        <ImageBackground
          source={require('../img/searchItems.png')}
          style={styles.sidesImage}
          resizeMode='contain'
          imageStyle={[{tintColor: headerColor}]}
        >

          <ScrollView style={[]}>
            {recentlyUsed.filter((ingredient) => {
              if(dietOption === "default"){return true}
              return ingredient[dietOption] === "TRUE"
            }).filter((ingredient) => removedIngredients.some((item) => item.name === ingredient.name) === false).map((ingredient) => {
              return (
                <TouchableOpacity 
                  key={ingredient.id} 
                  style={[styles.recentlyUsed]}
                  onPress={() => {recentPressHandler({...ingredient})}}
                >
                    <Text style={[styles.recentlyUsedText]}>{ingredient.name.replace('_', ' ')}</Text>  
                    <Image
                      source={require('../icons/add.png')}
                      style={[styles.addIcon]}
                      resizeMode='contain'
                    />
                </TouchableOpacity>   
              )})}
          </ScrollView>
        </ImageBackground>

      </View>
      
      </Pressable>}
      {shouldShow ?
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      /> : null}
    </View>
  );
}