import React from "react"
import {Text, View, StyleSheet, Button} from "react-native"
import styles from '../styles/account-styles'

export default function Account({navigation}) {

  return (
    <View>
      <Button
            title='Go Back'
            onPress={() => {
              navigation.navigate('HomeScreen');
            }}
          />   
      <Text style={styles.container}>Account</Text>
    </View>
  );
}