import { View, TextInput, Text, TouchableOpacity, Image, FlatList, Button, Pressable, Keyboard, ScrollView, TouchableHighlight } from "react-native";
import React, { useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import styles from '../styles/add-styles'
import matchFunction from "./matchFunction";

const SearchBar = ({selectedIngredients, setSelectedIngredients}) => {

/* -------------------- State Variables -------------------- */
    const ingredients = useStoreState(state => state.ingredients);
    const match = matchFunction;
    const [searchText, setSearchText] = useState('');
    const [searching, setSearching] = useState(false);
    const [filteredArray, setFilteredArray] = useState([]);

/* -------------------- Handler Functions -------------------- */
    const pressHandler = (name, key) => {
        Keyboard.dismiss();    
        if(selectedIngredients.find(ingredient => ingredient.name === name)) {
            return;
        }
        let newList = selectedIngredients;
        newList.push({name: name, key: key});
        setSelectedIngredients(newList);
        setSearchText('');
        setSearching(false);
    }

    return (
        <View>    
            <View style={styles.container}>
                <TextInput
                    placeholder=' add ingredient...'
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
                <Pressable 
                    style={styles.button}
                    onPress={() => {
                        setSearchText('');
                        setSearching(false);
                        Keyboard.dismiss();   
                    }}
                >
                    <Text style={styles.text}>clear</Text>
                </Pressable>
            </View>
            <View>
                {searching ? <Text>Searching : True</Text> : <Text>Searching : False</Text>}
                {searching ? 
                <ScrollView 
                    style={[styles.transparent]} 
                    keyboardShouldPersistTaps='handled'
                >
                    {filteredArray.map((ingredient) => {
                        return (
                            <View key={ingredient.id}>
                                <TouchableOpacity onPress={() => {pressHandler(ingredient.name, ingredient.id)}}>
                                    <Text style={[styles.searchResult, styles.outline, styles.textCenter, styles.fontMedium]}>{ingredient.name.replace('_', ' ')}</Text>  
                                </TouchableOpacity>
                            </View>         
                        )})}
                </ScrollView> : <Text></Text>}       
            </View>
        </View>
    );
}

export default SearchBar;
