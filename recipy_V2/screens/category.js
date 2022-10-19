import React from "react"
import {Text, View, TouchableOpacity, Image, ImageBackground} from "react-native"
import styles from '../styles/add-styles'
import { useStoreState, useStoreActions } from "easy-peasy";

export default function Category({navigation}) {

  /* -------------------- Redux State Variables -------------------- */
  const category = useStoreState(state => state.category);
  const setCategory = useStoreActions(actions => actions.setCategory);  

/* -------------------- Render Method -------------------- */
  return (
    <View>
      <View style={styles.pushDown}></View> 
      <View style={[styles.backButtonSection]}>
        <ImageBackground
          source={require('../img/banner1.png')}
          style={styles.banner}
        >
          <TouchableOpacity
          onPress={() => {navigation.navigate('HomeScreen')}}
          style={[styles.backIconTouch]}
        >
          <Image
            source={require('../icons/go-back.png')}
            style={styles.backIcon}
          />
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <View>
        <Text style={[styles.header]}>{category}</Text>
      </View>
    </View>
  );
}