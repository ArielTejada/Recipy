import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image, Dimensions, FlatList } from "react-native";
import React, { useState } from "react";

import DropDownSearch from '../components/dropDownSearch'

let width = Dimensions.get('window').width; 
width -= 70;

const SearchBar = (props) => {

    const testArr = [
        {name: 'apple', key: '1'},
        {name: 'banana', key: '2'},
        {name: 'pear', key: '3'},
        {name: 'apple cider', key: '4'},
        {name: 'mango', key: '5'},
        {name: 'peach', key: ''},
        {name: 'coconut', key: '6'},
        {name: 'bread', key: '7'},
    ]

    const [searchText, setSearchText] = useState('');
    const [searching, setSearching] = useState(false);

    return (
        <View>    
            <View style={styles.container}>
                <TextInput
                    placeholder='add ingredient'
                    style={styles.input}
                    value={props.searchText}
                    onChangeText={(text) => {
                        setSearchText(text);
                        text === '' ? setSearching(false) : setSearching(true);
                    }}
                    searchText={searchText}
                    setSearchText={setSearchText}
                />
                <Image
                    source={require('../icons/scan2-black.png')}
                    style={styles.icon}
                />
            </View>
            <View>
                <Text>{searchText}</Text>
                <Text>{searching ? "True" : "False"}</Text>
            </View>
        </View>
    );
}

export default SearchBar;

const styles = StyleSheet.create({
    container : {
        flexDirection: 'row',
        alignSelf: 'stretch',
        margin: 10,
        marginLeft: 10
    },
    input : {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        width: width,
        height: 50
    },
    icon: {
        width: 50,
        height: 50
    }
});