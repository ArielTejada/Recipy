import React from "react"
import {Text, View, StyleSheet} from "react-native"
import styles from '../styles/favorite-styles'

export default function Favorite() {

  return (
    <View>
      <View style={styles.pushDown}></View>
      <Text style={styles.header}>Favorite Ingredients</Text>
    </View>
  );
}
