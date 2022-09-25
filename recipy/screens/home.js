import React, { useState } from "react";
import {Text, View, Image, TouchableWithoutFeedback, Keyboard} from "react-native"
import styles from '../styles/home-styles'

import SearchBar from "../components/searchBar";

export default function Home() {

  return (
    <TouchableWithoutFeedback 
      onPress={() => {
      Keyboard.dismiss();
    }}>
      <View>
        <Image
          source={require('../img/banner2.png')}
          style={{ width: 410, height: 210 }}
        />
        <SearchBar
        />
        
      </View>
    </TouchableWithoutFeedback> 
  );
}
