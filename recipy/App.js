import React, {useState} from "react";
import {Text, View} from "react-native";
import {AppLoading} from 'expo'
import Home from './screens/home';

export default function App() {

  const [fontsLoaded, setFontsLoaded] = useState(false);
  
    return (
      <View>
        <Home />
      </View>
    );

}