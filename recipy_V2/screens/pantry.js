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

  /* -------------------- Redux State Colors -------------------- */
  const headerLight = useStoreState(state => state.headerLight);
  const headerDark = useStoreState(state => state.headerDark);
  const headerHalloween = useStoreState(state => state.headerHalloween);
  const pageLight = useStoreState(state => state.pageLight);
  const pageDark = useStoreState(state => state.pageDark);
  const pageHalloween = useStoreState(state => state.pageHalloween);

  /* -------------------- Render Method -------------------- */

  return (
    <View style={[
      styles.wholeScreen, 
      lightEnabled ? {backgroundColor: pageLight} :
      darkEnabled ? {backgroundColor: pageDark} :
      halloweenEnabled ? {backgroundColor: pageHalloween} : {backgroundColor: pageLight}
    ]}>

      <Pressable 
        keyboardShouldPersistTaps='always'
        onPress={() => {Keyboard.dismiss();}}
        style={[styles.wholeScreen]}
      >

      <View style={[
        styles.pushDown, 
        lightEnabled ? {backgroundColor: headerLight} :
        darkEnabled ? {backgroundColor: headerDark} :
        halloweenEnabled ? {backgroundColor: headerHalloween} : {backgroundColor: headerLight}
      ]}></View>

      <View style={[
          styles.header, 
          lightEnabled ? {backgroundColor: headerLight} :
          darkEnabled ? {backgroundColor: headerDark, color: '#A4A9AD'} :
          halloweenEnabled ? {backgroundColor: headerHalloween} : {backgroundColor: headerLight}
      ]}>
        <Image
          source={require('../img/banner71.png')}
          style={[styles.banner,]}
        />
        <Text style={[styles.headerText]}>Pantry</Text>
      </View>

        <Text style={[styles.fontSmall, styles.margins]}>Add ingredients to your pantry:</Text>
        <SearchBar/>

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
        </Pressable>
    </View>
  );
}