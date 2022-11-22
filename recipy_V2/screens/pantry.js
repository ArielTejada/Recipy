import React, { useState } from "react";
import { Button,View, TextInput, Text, TouchableOpacity, Image, ImageBackground, FlatList, ScrollView, Pressable, Keyboard } from "react-native";
import styles from '../styles/pantry-styles';
import matchFunction from "../components/matchFunction";
import { useStoreState, useStoreActions } from "easy-peasy";

/* -------------------- Components -------------------- */
import { SearchBar } from "react-native-screens";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Notifications from 'expo-notifications';


export default function Pantry() {

/* -------------------- Local State Variables -------------------- */
  const [searchText, setSearchText] = useState('');
  const [searching, setSearching] = useState(false);
  const [filteredArray, setFilteredArray] = useState([]);
  const match = matchFunction;
  const [filler,setFiller]= useState("");
  const [text,setText] =useState("change me");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // const [date,setDate] = useState(new Date(1666870995000));
  const [date,setDate] = useState(new Date());
  const [output,setOutput]= useState("");
  const [time,setTime]=useState(0);

  let addIngredient = {name: '', key: ''}
  let addDate = null;

/* -------------------- Redux State Variables -------------------- */
  const refresh = useStoreState(state => state.refresh);
  const setRefresh = useStoreActions(actions => actions.setRefresh);

  const ingredients = useStoreState(state => state.ingredients);
  const pantryItems = useStoreState(state => state.pantryItems);
  const setPantryItems = useStoreActions(actions => actions.setPantryItems);

/* -------------------- Redux State Colors -------------------- */
  const headerColor = useStoreState(state => state.headerColor);
  const pageColor = useStoreState(state => state.pageColor);
  const bannerColor = useStoreState(state => state.bannerColor);

/* -------------------- Handler Functions -------------------- */
  const ingredientPressHandler = (name, key) => {  
    Keyboard.dismiss();
    addIngredient.name = name;
    addIngredient.key = key;
    setSearchText(name);
    setSearching(false);
    setRefresh(!refresh);
  }

  const enterPressHandler = () => {
    let newPantryItems = pantryItems;
    console.log("ingredient: " + addIngredient);
    console.log("date: " +addDate);
    newPantryItems.push({addIngredient, addDate})
    setPantryItems(newPantryItems);
    addIngredient = {name: '', key: ''};
    addDate = null;
  }

  const pantryPressHandler = (key) => {
    let newPantryList = pantryItems.filter((ingredient) => ingredient.key != key);
    setPantryItems(newPantryList);
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  
  const handleConfirm = (date) => {
    // console.warn("A date has been picked: ", date);
    setDate(date);
    // setOutput(date.getTime());
    // setTime(date.getTime()-Date.now()-(48*60*60*1000))
    setTime(date.toLocaleDateString())
    hideDatePicker();
  };

  const updateText = () => {
    setText(filler);
  }

  async function schedulePushNotification(filler,time) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got a notification! 📬",
        body: 'Your '+ filler +' is expiring in two days! Better use it soon!',
        data: { data: 'goes here' },
      },
      trigger: { 
        // repeats: false,
        // weekday: 2,
        // hour: 4,
        // minute: 2,
        seconds:2
      },
    });
  }
  /* -------------------- Render Method -------------------- */

  return (
    <View style={[styles.wholeScreen, {backgroundColor: pageColor}]}>

      <Pressable 
        keyboardShouldPersistTaps='always'
        onPress={() => {Keyboard.dismiss();}}
        style={[styles.wholeScreen]}
      >

      <View style={[styles.pushDown, {backgroundColor: headerColor}]}></View>

      <View style={[styles.header, {backgroundColor: headerColor}]}>
        <Image
          source={require('../img/bakeryV2.png')}
          style={[styles.banner, {tintColor: bannerColor}]}
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
                        text === '' ? (setSearching(false), addIngredient = {name: '', key: ''}): setSearching(true);
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
                        enterPressHandler();
                    }}
                >
                    <Text style={styles.clear}>Enter</Text>
                </Pressable>
            </View>

            <View>
            <Button title="Pick Date" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={Date.now()-24*60*60*1000}
      />
      <Button onPress={() =>schedulePushNotification(filler,time)}title="click here">Click me</Button>
            {/* <Text>{date.toLocaleDateString()}</Text> */}
            <Text>{time}</Text>
                {searching ? <Text>Searching : True</Text> : <Text>Searching : False</Text>}
                {searching ? 
                <FlatList
                    keyboardShouldPersistTaps='always'
                    data={filteredArray}
                    renderItem={({ item }) => (
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    ingredientPressHandler(item.name, item.key);
                                }}
                            >
                               <Text style={[styles.searchResult, styles.outline, styles.textCenter, styles.margins, styles.fontMedium]}>{item.name.replace('_', ' ')}</Text> 
                            </TouchableOpacity>
                        </View>             
                    )}
                /> : <Text></Text>}
            </View>

        </View>

        <View>

          <ImageBackground
            source={require('../img/pantry.png')}
            style={[styles.pantryImage]}
          >

            <ScrollView style={[styles.jarsMargin]}>
              <View style={[{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}]}>
                {pantryItems.map((ingredient) => {
                  return (
                  <TouchableOpacity style={[styles.jar]} key={ingredient.key} onPress={() => {pantryPressHandler(ingredient.key)}}>
                    <ImageBackground
                      source={require('../img/glassjar.png')}
                      style={[styles.jar]}
                    >
                        <Text style={[styles.fontSmall, styles.jarLabel]}>{ingredient.name.replace('_', ' ')}</Text>
                        <Text style={[styles.fontSmall, styles.jarLabel]}>{ingredient.date.replace('_', ' ')}</Text>
                    </ImageBackground>
                  </TouchableOpacity>)
                })}
              </View>
            </ScrollView>

          </ImageBackground>

        </View>

        </Pressable>
    </View>
  );
}