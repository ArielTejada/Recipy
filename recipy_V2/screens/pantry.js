import React, { useState } from "react";
import { Button,View, TextInput, Text, TouchableOpacity, Image, ImageBackground, FlatList, ScrollView, Pressable, Keyboard } from "react-native";
import styles from '../styles/pantry-styles';
import matchFunction from "../components/matchFunction";
import { useStoreState, useStoreActions } from "easy-peasy";
import uuid from 'react-native-uuid';

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
  const [time,setTime]=useState('');

  const [addIngredient, setAddIngredient] = useState('')
  const [addDate, setAddDate] = useState('')

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
  const ingredientPressHandler = (name) => {  
    Keyboard.dismiss();
    setAddIngredient(name);
    setSearchText(name);
    setSearching(false);
    setRefresh(!refresh);
  }

  const enterPressHandler = () => {
    if(addIngredient != '' && addDate != ''){
      if(pantryItems.find(ingredient => ingredient.name === addIngredient)) { 
        setAddIngredient('');
        setAddDate('');
        setSearchText('');
        setSearching(false);
        return;
      }
      let newPantryItems = pantryItems;
      console.log("adding: ", addIngredient, ' ', addDate);
      newPantryItems.push({'name': addIngredient, 'date': addDate, 'key': uuid.v4()})
      setPantryItems(newPantryItems);
      setAddIngredient('');
      setAddDate('');
      setSearchText('');
      setSearching(false);
    }
  return;
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
    setAddDate(date.toLocaleDateString());
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

      <View>  
        <View style={styles.container}>
          <TextInput
            placeholder=' add ingredient'
            style={[styles.input, styles.outline]}
            value={searchText}
            onChangeText={(text) => {
                setSearchText(text);
                text === '' ? (setSearching(false), setAddIngredient('')) : setSearching(true);
                text != '' ? setFilteredArray(match(text.toLowerCase(), ingredients)) : setFilteredArray([]);
            }}
            searchText={searchText}
            setSearchText={setSearchText}
          />

          <Pressable
            style={[styles.input, styles.outline]}
            onPress={showDatePicker}
          >
             <Text style={[styles.fontSmall, {color: addDate === '' ? '#9E9E9E' : 'black'}]}> {addDate === '' ? 'add expiration' : addDate}</Text>
          </Pressable>
         
          <Pressable 
            style={styles.button}
            onPress={() => {
              enterPressHandler();
            }}
          >
              <Text style={styles.clear}>Enter</Text>
          </Pressable>
        </View>
      </View>


      <View style={[{alignItems: 'center', zIndex: 2}]}>
        {searching ? <Text>Searching : True</Text> : <Text>Searching : False</Text>}
        {searching ? 
        <ScrollView 
            style={[styles.searchBar]}
            keyboardShouldPersistTaps={'always'}
        >
          {filteredArray.map((ingredient) => {
            return (
              <View key={ingredient.id}>
                <TouchableOpacity onPress={() => {ingredientPressHandler(ingredient.name)}} style={[styles.outline, styles.searchResult]}>
                    <Text style={[styles.AmaticSCBold, styles.textCenter, styles.fontMedium]}>{ingredient.name.replace('_', ' ')}</Text>  
                </TouchableOpacity>
              </View>         
            )})}
        </ScrollView> : <Text></Text>}          
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        // minimumDate={Date.now()-24*60*60*1000}
      />















    {/* ------------------------------------ Visual Pantry ------------------------------------ */}

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
                        <Text style={[styles.fontSmall, styles.jarLabel]}>{ingredient.name}</Text>
                        <Text style={[styles.fontSmall, styles.jarLabel]}>{ingredient.date}</Text>
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