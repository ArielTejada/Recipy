import React, { useState } from "react";
import {ImageBackground, View, StyleSheet, Button, Text, TouchableOpacity} from "react-native"
import styles from '../styles/home-styles';

export default function RecipeCard({image, name}) {

  return (
    <View>
        <ImageBackground
            source={image}
            style={[styles.card]}
        />
        <View style={styles.tag}>
          <Text style={[styles.fontMedium, styles.title]}>{name}</Text>
          <TouchableOpacity>
            <Text style={[styles.fontSmall, styles.button]}>Get This Recipe!</Text>
          </TouchableOpacity>
        </View>
        
    </View>
  );
}