import React, { useState, useEffect } from "react";
import {StyleSheet, Button, Text, View, Image, TouchableWithoutFeedback, TouchableOpacity, Keyboard, ScrollView, ImageBackground, Pressable, TextInput } from "react-native";
import styles from '../styles/add-styles';
import { useStoreState, useStoreActions } from "easy-peasy";

/* -------------------- Components -------------------- */
import SearchBar from "../components/searchBar"
import { BarCodeScanner } from 'expo-barcode-scanner';

import * as Notifications from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function AddIngredient({navigation}) {

/* -------------------- Local State Variables -------------------- */
const [hasPermission, setHasPermission] = useState(null);
const [scanned, setScanned] = useState(false);
const [shouldShow, setShouldShow] = useState(false);
const [filler,setFiller]= useState("");
const [text,setText] =useState("change me");
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
const [date,setDate] = useState(new Date(1666870995000));
const [output,setOutput]= useState("");
const [time,setTime]=useState(0);

/* -------------------- Redux State Variables -------------------- */
const selectedIngredients = useStoreState(state => state.selectedIngredients);
const setSelectedIngredients = useStoreActions(actions => actions.setSelectedIngredients);
const refresh = useStoreState(state => state.refresh);
const setRefresh = useStoreActions(actions => actions.setRefresh);

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
const bannerLight = useStoreState(state => state.bannerLight);
const bannerDark = useStoreState(state => state.bannerDark);
const bannerHalloween = useStoreState(state => state.bannerHalloween);

/* -------------------- Handler Functions -------------------- */
useEffect(() => {
  const getBarCodeScannerPermissions = async() => {
    const {status} = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };
  getBarCodeScannerPermissions();
}, []);

const handleBarCodeScanned = ({type,data}) => {
  setScanned(true);
  alert(`Bar code with type ${type} and data ${data} has been scanned!`);
};

if (hasPermission === null){
  return <Text>Requesting for camera permission</Text>;
}

if (hasPermission === false){
  return <Text>No access to camera</Text>;
}

const onPress = () => {
  setScanned(false);
  setShouldShow(!shouldShow);
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
  console.warn("A date has been picked: ", date);
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

const selectedListPress = (key) => {
  console.log(`clicked ${key}`);
  let newList = selectedIngredients.filter((ingredient) => ingredient.key != key);
  console.log(newList);
  setSelectedIngredients(newList);
}

/* -------------------- Render Method -------------------- */
  return (
    <View style={[
      {flex:1}, styles.wholeScreen, 
      lightEnabled ? {backgroundColor: pageLight} :
      darkEnabled ? {backgroundColor: pageDark} :
      halloweenEnabled ? {backgroundColor: pageHalloween} : {backgroundColor: pageLight}
    ]}>

      {shouldShow ? null:
      <Pressable 
        keyboardShouldPersistTaps='always'
        onPress={() => {Keyboard.dismiss();}}
      >

        <View style={[
          styles.pushDown, 
          lightEnabled ? {backgroundColor: headerLight} :
          darkEnabled ? {backgroundColor: headerDark} :
          halloweenEnabled ? {backgroundColor: headerHalloween} : {backgroundColor: headerLight}
        ]}></View>

        <View style={[
          styles.backButtonSection,
          lightEnabled ? {backgroundColor: headerLight} :
          darkEnabled ? {backgroundColor: headerDark} :
          halloweenEnabled ? {backgroundColor: headerHalloween} : {backgroundColor: headerLight}
        ]}>

          <ImageBackground
            source={require('../img/banner1.png')}
            style={[styles.banner, {overflow: 'hidden'}]}
            resizeMode='contain'
            imageStyle={[
              lightEnabled ? {tintColor: 'white'} :
              darkEnabled ? {tintColor: bannerDark} :
              halloweenEnabled ? {tintColor: bannerHalloween} : {tintColor: bannerLight}
            ]}
          >
            <TouchableOpacity
            onPress={() => {navigation.navigate('HomeScreen')}}
            style={[styles.backIconTouch]}
          >
            <Image
              source={require('../icons/go-back.png')}
              style={[
                styles.backIcon,
                lightEnabled ? {tintColor: 'white'} :
                darkEnabled ? {tintColor: bannerDark} :
                halloweenEnabled ? {tintColor: bannerHalloween} : {tintColor: bannerLight}
              ]}
            />
            </TouchableOpacity>
          </ImageBackground>
          
        </View>

      <SearchBar
        selectedIngredients={selectedIngredients}
        setSelectedIngredients={setSelectedIngredients}
      />

      <Button 
        title = "Barcode Scanner" 
        onPress={() => setShouldShow(!shouldShow)}
      />
      
      <View style={[styles.margins, styles.selected, styles.fontSmall]}>
        <ImageBackground
          source={require('../img/searchItems.png')}
          style={styles.sidesImage}
          resizeMode='contain'
          imageStyle={[
            lightEnabled ? {tintColor: '#2196F3'} :
            darkEnabled ? {tintColor: bannerDark} :
            halloweenEnabled ? {tintColor: bannerHalloween} : {tintColor: bannerLight}
          ]}
        >
          <View style={[styles.selectedIngredients, styles.outline]}>
            <ScrollView horizontal={true}>
              {selectedIngredients.map((ingredient) => {
                return (
                <Pressable 
                  key={ingredient.key}
                  style={[styles.roundBTN, styles.flex]}
                  onPress={() => selectedListPress(ingredient.key)}
                >
                  <Text style={[styles.fontSmall, styles.textCenter]}>{ingredient.name.replace('_', ' ')}</Text>
                </Pressable>)
              })}
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
      
      </Pressable>}
      {shouldShow ?
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      /> : null}
      {scanned && <Button title = {'Tap to Return'} onPress ={onPress}/>}
      <Text>Enter your Ingredient below!</Text>
      {/* <Text>there is no {text}</Text> */}
      <TextInput placeholder="Ingredient"
      onChangeText={(value) => setFiller(value)}/>
      <StatusBar style="auto" />
      {/* <Button onPress={()=>updateText()} title="click here"/>  */}
      <Text>{date.toLocaleDateString()}</Text>
      <Button title="Pick Date" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={Date.now()-24*60*60*1000}
      />
      <Button onPress={() =>schedulePushNotification(filler,time)}title="click here">Click me</Button>
    </View>
  );
}