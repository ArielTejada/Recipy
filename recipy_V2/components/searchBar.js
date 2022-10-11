import { View, TextInput, Text, TouchableOpacity, Image, FlatList, Button, Pressable, Keyboard } from "react-native";
import React, { useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import styles from '../styles/add-styles'
import AddIngredient from "../screens/addIngredient";
import matchFunction from "./matchFunction";

const SearchBar = ({selectedIngredients, setSelectedIngredients}) => {

    const ingredients = useStoreState(state => state.ingredients);
    const match = matchFunction;

    const [searchText, setSearchText] = useState('');
    const [searching, setSearching] = useState(false);
    const [filteredArray, setFilteredArray] = useState([]);
    // const [selectedIngredients, setSelectedIngredients] = useState([]);

    const pressHandler = (name, key) => {
        if(selectedIngredients.find(ingredient => ingredient.name === name)) {
            return;
        }
        let newList = selectedIngredients;
        newList.push({name: name, key: key});
        setSelectedIngredients(newList);
        setSearchText('');
        setSearching(false);
        Keyboard.dismiss();    
    }

    return (
        <View>    
            <View style={styles.container}>
                <TextInput
                    placeholder='add ingredient'
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
                    }}
                >
                    <Text style={styles.text}>clear</Text>
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
                               <Text style={[styles.searchResult, styles.window, styles.outline, styles.textCenter, styles.margins, styles.font20]}>{item.name}</Text> 
                            </TouchableOpacity>
                        </View>             
                    )}
                /> : <Text></Text>}
                {/* <FlatList
                    data={ingredients}
                    renderItem={({ item }) => (
                        <View>                            
                            <Text>{item.name}</Text>                
                        </View>             
                    )}
                /> */}
            </View>
        </View>
    );
}

export default SearchBar;
