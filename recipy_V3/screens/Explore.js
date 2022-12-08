import { Alert, StyleSheet, View, Text } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import Feed from "../components/Feed";
import NewPostButton from "../components/NewPostButton";
import * as Animatable from "react-native-animatable";
import Lottie from "lottie-react-native";

const Explore = (props) => {
  const [isLoading, setisLoading] = useState(true);

  const cmAnimation = useRef();

  const playAnimation = () => {
    cmAnimation.current.play();
  };

  useEffect(() => {
    setTimeout(() => setisLoading(false), 3800);
    if (cmAnimation.current) {
      setTimeout(() => {
        cmAnimation.current?.reset();
        cmAnimation.current?.play();
      }, 0);
    }
  }, [cmAnimation.current]);
  if (isLoading) {
    return (
      <View
        style={{
          backgroundColor: "#F2F2F2",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          bottom: 50,
        }}
      >
        <Lottie
          ref={cmAnimation}
          source={require("../assets/img/spin-plate-purple.json")}
          style={{ width: 400, height: 400 }}
          loop={true}
          speed={1.5}
          renderMode={"SOFTWARE"}
        />
      </View>
    );
  } else {
    return (
      <Animatable.View animation="fadeInRightBig" style={{ flex: 1 }}>
        <View style={styles.container}>
          <Feed />
        </View>
      </Animatable.View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Explore;
