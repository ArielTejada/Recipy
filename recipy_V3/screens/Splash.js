import { Text, View, TouchableOpacity } from "react-native";
import React, { useState, useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AuthContext } from "../Context/AuthContext";
import styles from "../styles/splash-styles";

const Splash = ({ navigation }) => {
  // useFont hook to extract and use custom fonts

  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  return (
    /**
     * ! Structure:  Different components grouped in terms of nested capabilities + usability
     * ! Seperated text components for welcomeMessage -> Welcome to : Recipy, thus holding them in a greater hierarchical status
     * ! Easily adjust and format images, since we can move them freely without disturbing
     * ! message components
     * Different color schemes/ gradients can be implemented. Styles are tentative and always subject to change!
     */

    <View style={styles.container}>
      <View style={styles.welcomeMessage}>
        <View style={styles.header}>
          <View style={styles.pie_container}>
            {/*       using animatable styles in order to create fading and bouncing animations         */}
            <Animatable.Image
              animation="fadeInUpBig"
              /**
               * Pie vector image from Figma plugin
               * Author: GameIcons
               * License:CC BY 3.0
               */
              source={require("../assets/img/Pie-V2-Vector.png")}
              style={styles.pie}
              resizeMode="contain"
            />
          </View>
          <View style={styles.salad_container}>
            <Animatable.Image
              animation="fadeInUpBig"
              /**
               * Salad bowl vector image from Figma plugin
               * Author: Microsoft Corporation
               * License: MIT
               */
              source={require("../assets/img/Salad-V2-Vector.png")}
              style={styles.salad}
              resizeMode="contain"
            />
          </View>
          <View style={styles.apple_container}>
            <Animatable.Image
              animation="fadeInUpBig"
              /**
               * Apple vector image from Figma plugin
               * Author: Microsoft Corporation
               * License: MIT
               */
              source={require("../assets/img/Apple-Vector.png")}
              style={styles.apple}
              resizeMode="contain"
            />
          </View>
        </View>
        <Animatable.View animation="fadeInUpBig">
          <Text style={styles.title}>Welcome to</Text>
          <Text style={styles.title2}> Recipy!</Text>
          <Text style={styles.text}>The meal generator that cares</Text>
        </Animatable.View>
      </View>
      <Animatable.View animation="fadeInUpBig">
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => login()}
          style={[styles.signInButton, styles.shadowProp]} // here we are using a shadow prop to create an underlying shadow effect on the buttons
        >
          <LinearGradient colors={["#ffffff", "#ffffff"]} style={styles.signIn}>
            <Text style={styles.textSign}>Let's Go</Text>
            <MaterialIcons name="navigate-next" color="#2694F9" size={20} />
          </LinearGradient>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

export default Splash;
