import React, { useState, useEffect } from "react";
import {StyleSheet, Button, Text, View, Image, TouchableWithoutFeedback, TouchableOpacity, Keyboard, ScrollView, ImageBackground} from "react-native";
import styles from '../styles/add-styles';
import { useStoreState, useStoreActions } from "easy-peasy";

import SearchBar from "../components/searchBar"
import { FlatList } from "react-native-gesture-handler";
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function AddIngredient({navigation}) {

const selectedIngredients = useStoreState(state => state.selectedIngredients);
const setSelectedIngredients = useStoreActions(actions => actions.setSelectedIngredients);

const refresh = useStoreState(state => state.refresh);
const setRefresh = useStoreActions(actions => actions.setRefresh);
const [hasPermission, setHasPermission] = useState(null);
const [scanned, setScanned] = useState(false);
const [shouldShow, setShouldShow] = useState(false);

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