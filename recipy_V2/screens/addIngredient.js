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
  // getIngredients(data);
  // console.log(json[0]);
  setScanned(false);
  setShouldShow(!shouldShow);
  // console.log(json[0]['title'].toLowerCase());
  // console.log(ingredients.length);
  // console.log(validateIngredient(json[0]['title'].toLowerCase(),ingredients));
  // result = validateIngredient(json[0]['title'].toLowerCase(),ingredients);
  // if (true){
  //   // setBarcodeText(result.name);
  //   setBarcodeText("milk");
  // }
  console.log(selectedIngredients);
  // let list =selectedIngredients;
  let list = []
  list.push("milk");
  console.log(list);
  let together = selectedIngredients.concat(list);
  console.log(together);
  // setSelectedIngredients(together);
  // following two give the "undefined is not an object (evaluating 'ingredient.name.replace')"
  // list.push("milk")
  // list.push({"id":"1","brand": "Elmhurst", "category": "Food, Beverages & Tobacco > Beverages > Non-Dairy Milk", "color": "", "currency": "", "description": "INGREDIENTS: FILTERED WATER, HAZELNUTS, CANE SUGAR, ALMONDS, NATURAL FLAVORS, SALT.", "dimension": "", "ean": "0018944000048", "elid": "292315447067", "highest_recorded_price": 33.16, "images": ["https://i5.walmartimages.com/asr/a308e2f8-68d9-46fe-aab3-87de3f09e6d4_1.dc3154bdb9655e531ae9f414af2a8e5e.png?odnHeight=450&odnWidth=450&odnBg=ffffff", "https://target.scene7.com/is/image/Target/GUEST_190cb48b-13da-4f1b-8ef9-d94f62282eea?wid=1000&hei=1000"], "lowest_recorded_price": 4.99, "model": "Elmhurst Milked", "offers": [{"availability": "", "condition": "New", "currency": "", "domain": "walmart.com", "link": "https://www.upcitemdb.com/norob/alink/?id=x2v223z2y253e494v2&tid=1&seq=1668353399&plt=21a2111ce7087ac209384f8df3c5b822", "list_price": "", "merchant": "Wal-Mart.com", "price": 5.98, "shipping": "5.99", "title": "Elmhurst Milked Hazelnut Milk, 32 fl oz", "updated_t": 1581645909}, {"availability": "", "condition": "New", "currency": "", "domain": "target.com", "link": "https://www.upcitemdb.com/norob/alink/?id=x2s263w2x253a484u2&tid=1&seq=1668353399&plt=73fba671d86a72324ecd171da30e2a66", "list_price": "", "merchant": "Target", "price": 4.99, "shipping": "", "title": "Elmhurst Milked Hazelnuts Milk Substitute - 1qt", "updated_t": 1598412001}], "size": "", "title": "MILKED HAZELNUTS", "upc": "018944000048", "weight": ""});
  // setSelectedIngredients(list);
  // setHaveIngredients();
  // setRefresh(!refresh);
};

if (hasPermission === null){
  return <Text>Requesting for camera permission</Text>;
}

if (hasPermission === false){
  return <Text>No access to camera</Text>;
}

const validateIngredient = ({ingredient,list}) => {
  let result = [];
  for(let i = 0; i < list.length; i++){
    console.log(list[i].name);
    if (ingredient.includes(list[i].name)){
      result.push(list[i]);
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

      <Button 
        title = "Barcode Scanner" 
        onPress={() => setShouldShow(!shouldShow)}
      />
      <FlatList
          data={json}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>{item.title}, {item.upc}</Text>
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
            {recentlyUsed.map((ingredient) => {
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