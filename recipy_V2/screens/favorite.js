import React from "react";
import {Text, View, StyleSheet} from "react-native";
import styles from '../styles/favorite-styles';
import { useStoreState, useStoreActions } from "easy-peasy";

export default function Favorite() {

/* -------------------- Redux State Variables -------------------- */
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
        <Text style={[styles.headerText]}>Favorites</Text>
      </View>

    </View>
  );
}
