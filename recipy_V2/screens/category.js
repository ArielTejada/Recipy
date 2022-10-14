import React from "react"
import {Text, View, StyleSheet, Button} from "react-native"
import styles from '../styles/category-styles'

export default function Category({navigation}) {

  return (
    <View>
      <View style={styles.pushDown}></View>
      <Text style={styles.header}>Category</Text>
      <Button
            title='Go Back'
            onPress={() => {
              navigation.navigate('HomeScreen');
            }}
          />   
    </View>
  );
}