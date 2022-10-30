import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Image, FlatList, Button, Pressable, Keyboard } from "react-native";
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

/* -------------------- Redux State Variables -------------------- */
  const ingredients = useStoreState(state => state.ingredients);

  const lightEnabled = useStoreState(state => state.lightEnabled);
  const darkEnabled = useStoreState(state => state.darkEnabled);
  const halloweenEnabled = useStoreState(state => state.halloweenEnabled);

  return (
    <View style={[
        styles.wholeScreen, 
        lightEnabled ? {backgroundColor: 'white'} :
        darkEnabled ? {backgroundColor: '#A4A9AD'} :
        halloweenEnabled ? {backgroundColor: '#FFB703'} : {backgroundColor: '#2196F3'}
    ]}>

      <View style={[
        styles.pushDown, 
        lightEnabled ? {backgroundColor: '#2196F3'} :
        darkEnabled ? {backgroundColor: '#4A576F'} :
        halloweenEnabled ? {backgroundColor: '#FF7739'} : {backgroundColor: '#2196F3'}
      ]}></View>

      <View >

      <Text style={[
        styles.header, 
        lightEnabled ? {backgroundColor: '#2196F3'} :
        darkEnabled ? {backgroundColor: '#4A576F', color: '#A4A9AD'} :
        halloweenEnabled ? {backgroundColor: '#FF7739'} : {backgroundColor: '#2196F3'}
      ]}>Pantry</Text>

        <Text style={[styles.fontSmall, styles.margins]}>Add ingredients to your pantry:</Text>
        <SearchBar/>
      </View>
      <View>    
            <View style={styles.container}>
                <TextInput
                    placeholder=' add ingredient'
                    style={[styles.input, styles.outline]}
                    value={searchText}
                    onChangeText={(text) => {
                        setSearchText(text);
                        text === '' ? setSearching(false) : setSearching(true);
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
                    }}
                >
                    <Text style={styles.clear}>clear</Text>
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
                                    pressHandler(item.name, item.key);
                                }}
                            >
                               <Text style={[styles.searchResult, styles.window, styles.outline, styles.textCenter, styles.margins, styles.fontSmall]}>{item.name}</Text> 
                            </TouchableOpacity>
                        </View>             
                    )}
                /> : <Text></Text>}
            </View>
        </View>
    </View>
  );
}