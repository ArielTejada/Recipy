import React from "react";
import {Text, View, StyleSheet} from "react-native";
import styles from '../styles/favorite-styles';
import { useStoreState, useStoreActions } from "easy-peasy";

export default function Favorite() {

/* -------------------- Redux State Variables -------------------- */
const lightEnabled = useStoreState(state => state.lightEnabled);
const darkEnabled = useStoreState(state => state.darkEnabled);
const halloweenEnabled = useStoreState(state => state.halloweenEnabled);

/* -------------------- Render Method -------------------- */
  return (
    <View style={[
      styles.wholeScreen, 
      lightEnabled ? {backgroundColor: 'white'} :
      darkEnabled ? {backgroundColor: '#A4A9AD'} :
      halloweenEnabled ? {backgroundColor: '#FFB703'} : {backgroundColor: '#2196F3'}
    ]}>
      
      <View style={[
        styles.pushDown, 
        lightEnabled ? {backgroundColor: '#2196F3'} :
        darkEnabled ? {backgroundColor: '#4A576F'} :
        halloweenEnabled ? {backgroundColor: '#FF7739'} : {backgroundColor: '#2196F3'}
      ]}></View>

      <Text style={[
        styles.header, 
        lightEnabled ? {backgroundColor: '#2196F3'} :
        darkEnabled ? {backgroundColor: '#4A576F', color: '#A4A9AD'} :
        halloweenEnabled ? {backgroundColor: '#FF7739'} : {backgroundColor: '#2196F3'}
      ]}>Favorites</Text>

    </View>
  );
}
