import React, { useState } from "react";
import {Text, View, Image, ImageBackground, TouchableOpacity, ScrollView, Pressable, TextInput, Keyboard} from "react-native";
import PieChart from "react-native-expo-pie-chart";
import { useStoreState, useStoreActions } from "easy-peasy";
import styles from '../styles/shoppingListSyles';
import uuid from 'react-native-uuid';

export default function ShoppingList({navigation}) {

/* -------------------- Local State Variables -------------------- */
const [searchText, setSearchText] = useState('');
const [searching, setSearching] = useState(false);
const [itemString, setItemString] = useState('');
const [deleteItems, setDeleteItems] = useState(false);

/* -------------------- Redux State Variables -------------------- */
const shoppingList = useStoreState(state => state.shoppingList);
const setShoppingList = useStoreActions(actions => actions.setShoppingList);
const purchasedList = useStoreState(state => state.purchasedList);
const setPurchasedList = useStoreActions(actions => actions.setPurchasedList);

/* -------------------- Redux State Colors -------------------- */
const headerColor = useStoreState(state => state.headerColor);
const pageColor = useStoreState(state => state.pageColor);
const bannerColor = useStoreState(state => state.bannerColor);

/* -------------------- Handler Functions -------------------- */

const enterPressHandler = () => {
  let newShoppingList = shoppingList;
  newShoppingList.push({name: itemString, id: uuid.v4()})
  setShoppingList(newShoppingList);
  setItemString('')
}

const uncheckPressHandler = (item) => {
  let newPurchasedList = purchasedList;
  newPurchasedList.push({...item});
  setPurchasedList(newPurchasedList);
  let newShoppingList = shoppingList.filter((grocery) => grocery.name != item.name);
  setShoppingList(newShoppingList);
}

const checkPressHandler = (item) => {
  let newPurchasedList = purchasedList.filter((grocery) => grocery.name != item.name);
  setPurchasedList(newPurchasedList);
  let newShoppingList = shoppingList;
  newShoppingList.push({...item});
  setShoppingList(newShoppingList);
}

const deleteUncheckPressHandler = (item) => {
  let newShoppingList = shoppingList.filter((grocery) => grocery.name != item.name);
  setShoppingList(newShoppingList);
}

const deleteCheckPressHandler = (item) => {
  let newPurchasedList = purchasedList.filter((grocery) => grocery.name != item.name);
  setPurchasedList(newPurchasedList);
}

const deleteItemsPressHandler = () => {
  setDeleteItems(!deleteItems);
}

/* -------------------- Render Method -------------------- */
  return (
    <View style={[styles.wholeScreen]}>

      <View style={[styles.pushDown, {backgroundColor: headerColor}]}></View>

      <View style={[styles.backButtonSection, {backgroundColor: headerColor}]}>
        <ImageBackground
            source={require('../img/banner8.png')}
            style={[styles.banner, {overflow: 'hidden'}]}
            resizeMode='contain'
            imageStyle={[{tintColor: bannerColor}]}
            >
            <TouchableOpacity
                onPress={() => {navigation.navigate('HomeScreen')}}
                style={[styles.backIconTouch]}
                >
            <Image
                source={require('../icons/go-back.png')}
                style={[styles.backIcon, {tintColor: bannerColor}]}
                />
            </TouchableOpacity>
        </ImageBackground>
      </View> 

    <ScrollView 
      style={[styles.smallMargins]}
      keyboardShouldPersistTaps={'always'}
    >

      <View style={[styles.outline, styles.settingOption, styles.centerItems]}>
        <Text style={[styles.AmaticSCRegular, styles.fontLarge]}>Shopping List</Text>
      </View>

      <View style={[styles.flex, styles.verticalMargins]}>
          <TextInput
            placeholder=' add grocery items...'
            style={[styles.input, styles.outline]}
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text);
              text === '' ? setSearching(false) : setSearching(true);
              text != '' ? setItemString(text) : setItemString('');
            }}
            searchText={searchText}
            setSearchText={setSearchText}
          />

          <Pressable 
            style={[styles.clearButton]}
            onPress={() => {
                setSearchText('');
                setSearching(false);
                Keyboard.dismiss();   
            }}
          >
            <Text style={[styles.AmaticSCBold, styles.fontMedium]}>Clear</Text>
          </Pressable>

          <Pressable 
            style={[styles.clearButton]}
            onPress={() => {
                setSearchText('');
                setSearching(false);
                enterPressHandler();
                Keyboard.dismiss();   
            }}
          >
            <Text style={[styles.AmaticSCBold, styles.fontMedium]}>Enter</Text>
          </Pressable>

        </View>

      <View>
        <Text style={[styles.AmaticSCBold, styles.fontMedium]}>Not Purchased:</Text>
      </View>

      <View style={[styles.outline, styles.shoppingList]}>

        <ScrollView>
          {shoppingList.map((item) => {
            return(
              <View>

                <View style={[styles.flex]}>

                  <Pressable
                    style={[]}
                    key={uuid.v4()}
                    onPress={() => {uncheckPressHandler({...item})}}
                  >
                    <Image
                      source={require('../icons/uncheck.png')}
                      style={[styles.uncheckIcon]}
                    />
                  </Pressable>

                  <Text style={[styles.AmaticSCBold, styles.fontMedium]}>{item.name}</Text>

                  {deleteItems ? 
                  <View style={[styles.deleteItem]}>
                  <Pressable
                  style={[]}
                  key={uuid.v4()}
                  onPress={() => {deleteUncheckPressHandler({...item})}}
                  >
                    <Image
                      source={require('../icons/delete.png')}
                      style={[styles.deleteIcon]}
                      />
                  </Pressable>
                  </View> : null}

                      </View>
              </View>
            
          )})}
        </ScrollView>
      </View>

      <View>
        <Text style={[styles.AmaticSCBold, styles.fontMedium]}>Purchased:</Text>
      </View>

      <View style={[styles.outline, styles.shoppingList]}>

        <ScrollView>
        {purchasedList.map((item) => {
            return(
              <View>

                <View style={[styles.flex]}>

                  <Pressable
                    key={uuid.v4()}
                    onPress={() => {checkPressHandler({...item})}}
                  >
                    <Image
                      source={require('../icons/check.png')}
                      style={[styles.uncheckIcon]}
                      tintColor='#40AAF2'
                    />
                  </Pressable>

                  <Text style={[styles.AmaticSCBold, styles.fontMedium]}>{item.name}</Text>

                </View>

                  {deleteItems ? 
                  <View style={[styles.deleteItem]}>
                    <Pressable
                      style={[]}
                      key={uuid.v4()}
                      onPress={() => {deleteCheckPressHandler({...item})}}
                    >
                      <Image
                        source={require('../icons/delete.png')}
                        style={[styles.deleteIcon]}
                      />
                    </Pressable>
                  </View> : null}

              </View>
            )})}
        </ScrollView>
      </View>

      <Pressable
        style={[styles.deleteButton, { backgroundColor: deleteItems ? '#40AAF2' : '#E42323' }]}
        onPress={() => {deleteItemsPressHandler()}}
      >
        <View style={[styles.flex]}>
          <Text style={[styles.fontMedium, styles.AmaticSCBold, styles.smallMargins, styles.deleteButtonText]}>{ deleteItems ? 'Done!' : 'Delete Items'}</Text>
        </View>
      </Pressable>

      <View style={[styles.navView]}></View>

    </ScrollView>
    </View>
  );
}