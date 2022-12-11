import React from "react";
import { TouchableOpacity, Button } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";

const NewPostButton = () => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate("NewPost");
  };

  return (
    <TouchableOpacity
      style={[styles.button, styles.shadowProp]}
      onPress={onPress}
      activeOpacity={0.4}
    >
      <FontAwesome5 name="pencil-alt" size={24} color="#fff" />
    </TouchableOpacity>
  );
};

export default NewPostButton;
