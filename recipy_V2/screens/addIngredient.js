import React, { useState, useEffect } from "react";
import {StyleSheet,Text, View, Button, TouchableWithoutFeedback, TouchableOpacity, Keyboard} from "react-native";
import styles from '../styles/add-styles';
import { useStoreState, useStoreActions } from "easy-peasy";

import SearchBar from "../components/searchBar"
import { FlatList } from "react-native-gesture-handler";
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function AddIngredient({navigation}) {

// const [selectedIngredients, setSelectedIngredients] = useState([]);
const selectedIngredients = useStoreState(state => state.selectedIngredients);
const setSelectedIngredients = useStoreActions(actions => actions.setSelectedIngredients);
// const [refresh, setRefresh] = useState(false);
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
    <TouchableOpacity 
      keyboardShouldPersistTaps='always'
      onPress={() => {
      Keyboard.dismiss();
      setRefresh(!refresh);
    }}>
      <View>
        <Button
            title='Go Back'
            style={styles.button}
            onPress={() => {
              navigation.navigate('HomeScreen');
            }}
          />   
        <SearchBar
          selectedIngredients={selectedIngredients}
          setSelectedIngredients={setSelectedIngredients}
        />
        <Button title = "Barcode Scanner" onPress={() => setShouldShow(!shouldShow)}/>
        {shouldShow ?
      <BarCodeScanner
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style = {StyleSheet.absoluteFillObject}
      />:null}
      {scanned && <Button title = {'Tap to Return'} onPress ={onPress}/>}
        <View style={[styles.margins, styles.outline, styles.selected, styles.fontSmall]}>
          <Text style={styles.fontSmall}>Selected Ingredients</Text>
          <Text></Text>
          <FlatList
              data={selectedIngredients}
              renderItem={({ item }) => (
                  <View>                            
                      <Text style={styles.fontSmall}>{item.name}</Text>                
                  </View>             
              )}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
