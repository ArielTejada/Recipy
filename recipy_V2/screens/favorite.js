import React from "react";
import {Text, View, StyleSheet} from "react-native";
import styles from '../styles/favorite-styles';
import { useStoreState, useStoreActions } from "easy-peasy";

export default function Favorite() {

/* -------------------- Redux State Variables -------------------- */


/* -------------------- Redux State Colors -------------------- */
const headerColor = useStoreState(state => state.headerColor);
const pageColor = useStoreState(state => state.pageColor);
const bannerColor = useStoreState(state => state.bannerColor);

/* -------------------- Render Method -------------------- */
  return (
    <View style={[styles.wholeScreen, {backgroundColor: pageColor}]}>
      
      <View style={[styles.pushDown, {backgroundColor: headerColor}]}></View>

      <View style={[styles.header, {backgroundColor: headerColor}]}>
        <Text style={[styles.headerText]}>Favorites</Text>
      </View>

    </View>
  );
}
