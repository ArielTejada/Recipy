import { View, TextInput, Text, TouchableOpacity, Image, FlatList, Button, Pressable, Keyboard } from "react-native";
import React, { useState } from "react";
import styles from '../styles/add-styles'
import AddIngredient from "../screens/addIngredient";

const SearchBar = ({selectedIngredients, setSelectedIngredients}) => {

    const testArr = [
        {name: 'apple', key: '1'},
        {name: 'banana', key: '2'},
        {name: 'pear', key: '3'},
        {name: 'apple cider', key: '4'},
        {name: 'mango', key: '5'},
        {name: 'peach', key: '7'},
        {name: 'coconut', key: '8'},
        {name: 'apricot', key: '9'},
        {name: 'pickle', key: '10'},
        {name: 'plum', key: '11'},
        {name: 'prune', key: '12'},
        {name: 'bison', key: '13'},
        {name: 'berry', key: '14'},
    ]

    const match = (ingredient, list) => {
        let result = [];
        let check = false;
        for(let i = 0; i < list.length; i++){
            for(let j = 0; j < ingredient.length; j++){
                if(ingredient[j] != list[i].name[j]){
                    check = false;
                    break;
                } else {
                    check = true;
                }
            }
            if(check){
               result.push(list[i]); 
               check = false; 
            }
        }
        return result;
    }

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
                        text != '' ? setFilteredArray(match(text.toLowerCase(), testArr)) : setFilteredArray([]);
                        
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
                    data={selectedIngredients}
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
