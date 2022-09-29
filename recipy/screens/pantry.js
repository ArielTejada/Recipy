import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Image, FlatList, Button, Pressable, Keyboard } from "react-native";
import styles from '../styles/pantry-styles'

import { SearchBar } from "react-native-screens";

export default function Pantry() {

  const [searchText, setSearchText] = useState('');
  const [searching, setSearching] = useState(false);
  const [filteredArray, setFilteredArray] = useState([]);

  return (
    <View>
      <View >
        <Text style={styles.banner}>Pantry</Text>
        <Text style={[styles.font20, styles.margins]}>Add ingredients to your pantry:</Text>
        <SearchBar/>
      </View>
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
                <TextInput
                  placeholder="add expiration"
                  style={[styles.input, styles.outline]}
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
            </View>
        </View>
    </View>
    
    
  );
}