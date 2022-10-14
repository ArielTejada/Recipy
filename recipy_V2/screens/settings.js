import React from "react"
import {Text, View, StyleSheet} from "react-native"
import styles from '../styles/settings-styles'

export default function Settings() {

  return (
    <View>
      <View style={styles.pushDown}></View>
      <Text style={styles.header}>Settings</Text>
    </View>
  );
}
