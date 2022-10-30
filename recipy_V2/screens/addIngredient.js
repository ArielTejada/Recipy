import React, { useState, useEffect } from "react";
import {StyleSheet, Button, Text, View, Image, TouchableWithoutFeedback, TouchableOpacity, Keyboard, ScrollView, ImageBackground, Pressable} from "react-native";
import styles from '../styles/add-styles';
import { useStoreState, useStoreActions } from "easy-peasy";

/* -------------------- Components -------------------- */
import SearchBar from "../components/searchBar"
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function AddIngredient({navigation}) {

/* -------------------- Local State Variables -------------------- */
const [hasPermission, setHasPermission] = useState(null);
const [scanned, setScanned] = useState(false);
const [shouldShow, setShouldShow] = useState(false);

/* -------------------- Redux State Variables -------------------- */
const selectedIngredients = useStoreState(state => state.selectedIngredients);
const setSelectedIngredients = useStoreActions(actions => actions.setSelectedIngredients);
const refresh = useStoreState(state => state.refresh);
const setRefresh = useStoreActions(actions => actions.setRefresh);

const lightEnabled = useStoreState(state => state.lightEnabled);
const darkEnabled = useStoreState(state => state.darkEnabled);
const halloweenEnabled = useStoreState(state => state.halloweenEnabled);

/* -------------------- Handler Functions -------------------- */
useEffect(() => {
  const getBarCodeScannerPermissions = async() => {
    const {status} = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };
  getBarCodeScannerPermissions();
}, []);

const handleBarCodeScanned = ({type,data}) => {
  setScanned(true);
  alert(`Bar code with type ${type} and data ${data} has been scanned!`);
};

if (hasPermission === null){
  return <Text>Requesting for camera permission</Text>;
}

if (hasPermission === false){
  return <Text>No access to camera</Text>;
}

const onPress = () => {
  setScanned(false);
  setShouldShow(!shouldShow);
}

const selectedListPress = (key) => {
  console.log(`clicked ${key}`);
  let newList = selectedIngredients.filter((ingredient) => ingredient.key != key);
  console.log(newList);
  setSelectedIngredients(newList);
}

/* -------------------- Render Method -------------------- */
  return (
    <View style={[
      {flex:1}, styles.wholeScreen, 
      lightEnabled ? {backgroundColor: 'white'} :
      darkEnabled ? {backgroundColor: '#A4A9AD'} :
      halloweenEnabled ? {backgroundColor: '#FFB703'} : {backgroundColor: '#2196F3'}
      ]}>

      {shouldShow ? null:
      <TouchableOpacity 
        keyboardShouldPersistTaps='always'
        onPress={() => {
        Keyboard.dismiss();
        setRefresh(!refresh);
      }}>

        <View style={[
          styles.pushDown, 
          lightEnabled ? {backgroundColor: '#2196F3'} :
          darkEnabled ? {backgroundColor: '#4A576F'} :
          halloweenEnabled ? {backgroundColor: '#FF7739'} : {backgroundColor: '#2196F3'}
        ]}></View>

        <View style={[
          styles.backButtonSection,
          lightEnabled ? {backgroundColor: '#2196F3'} :
          darkEnabled ? {backgroundColor: '#4A576F', color: '#A4A9AD'} :
          halloweenEnabled ? {backgroundColor: '#FF7739'} : {backgroundColor: '#2196F3'}
        ]}>

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

      <SearchBar
        selectedIngredients={selectedIngredients}
        setSelectedIngredients={setSelectedIngredients}
      />

      <Button 
        title = "Barcode Scanner" 
        onPress={() => setShouldShow(!shouldShow)}
      />
      
      <View style={[styles.margins, styles.selected, styles.fontSmall]}>
        <ImageBackground
          source={require('../img/searchItems.png')}
          style={styles.sidesImage}
          resizeMode='contain'
        >
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
        </ImageBackground>
      </View>
      
      </TouchableOpacity>}
      {shouldShow ?
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      /> : null}
      {scanned && <Button title = {'Tap to Return'} onPress ={onPress}/>}
    </View>
  );
}