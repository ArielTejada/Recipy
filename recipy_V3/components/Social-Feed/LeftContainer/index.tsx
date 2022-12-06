import React from "react";
import { View, StyleSheet } from "react-native";
import { UserType } from "../../../types";
import ProfilePic from "../../ProfilePic";

export type LeftContainerProps = {
  user: UserType;
};

const LeftContainer = ({ user }: LeftContainerProps) => (
  <View>
    <ProfilePic image={user.image} color={"#b1f2ff"} />
  </View>
);

// #FE7979

export default LeftContainer;
