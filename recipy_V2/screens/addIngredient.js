import React, { useState, useEffect } from "react";
import {Text, View, Button, TouchableWithoutFeedback, TouchableOpacity, Keyboard} from "react-native";
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
