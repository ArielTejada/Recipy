import React, { useState } from "react";
import {Text, View, StyleSheet, Button, TouchableWithoutFeedback, TouchableOpacity, Keyboard} from "react-native";
import styles from '../styles/add-styles';

import SearchBar from "../components/searchBar"
import { FlatList } from "react-native-gesture-handler";

export default function AddIngredient({navigation}) {

const [selectedIngredients, setSelectedIngredients] = useState([]);
const [refresh, setRefresh] = useState(false);

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
        <View style={[styles.margins, styles.outline, styles.selected, styles.font20]}>
          <Text style={styles.font20}>Selected Ingredients</Text>
          <Text></Text>
          <FlatList
                    data={selectedIngredients}
                    renderItem={({ item }) => (
                        <View>                            
                            <Text style={styles.font20}>{item.name}</Text>                
                        </View>             
                    )}
                />
        </View>
      </View>
    </TouchableOpacity>
  );
}
