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

/* -------------------- Render Method -------------------- */
  return (
    <View style={{flex:1}}>
      {shouldShow ? null:
      <TouchableOpacity 
        keyboardShouldPersistTaps='always'
        onPress={() => {
        Keyboard.dismiss();
        setRefresh(!refresh);
      }}>

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
                  style={[styles.roundBTN, styles.flex]}>
                  <Text style={[styles.fontSmall, styles.textCenter]}>{ingredient.name}</Text>
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