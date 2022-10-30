import React, { useState } from "react";
import {Text, View, Switch, Pressable} from "react-native";
import styles from '../styles/settings-styles';
import { useStoreState, useStoreActions } from "easy-peasy";

export default function Settings() {

/* -------------------- Redux State Variables -------------------- */
  const lightEnabled = useStoreState(state => state.lightEnabled);
  const darkEnabled = useStoreState(state => state.darkEnabled);
  const halloweenEnabled = useStoreState(state => state.halloweenEnabled);

  const setLightEnabled = useStoreActions(actions => actions.setLightEnabled);
  const setDarkEnabled = useStoreActions(actions => actions.setDarkEnabled);
  const setHalloweenEnabled = useStoreActions(actions => actions.setHalloweenEnabled);

  /* -------------------- Handler Functions -------------------- */
  const lightSwitch = () => {setLightEnabled(lightEnabled => !lightEnabled);}
  const darkSwitch = () => {setDarkEnabled(darkEnabled => !darkEnabled);}
  const halloweenSwitch = () => {setHalloweenEnabled(halloweenEnabled => !halloweenEnabled);}

/* -------------------- Render Method -------------------- */
  return (
    <View style={[
      styles.wholeScreen, 
      lightEnabled ? {backgroundColor: 'white'} :
      darkEnabled ? {backgroundColor: '#A4A9AD'} :
      halloweenEnabled ? {backgroundColor: '#FD9702'} : {backgroundColor: '#2196F3'}
    ]}>

      <View style={[
        styles.pushDown, 
        lightEnabled ? {backgroundColor: '#2196F3'} :
        darkEnabled ? {backgroundColor: '#4A576F'} :
        halloweenEnabled ? {backgroundColor: '#FF7100'} : {backgroundColor: '#2196F3'}
      ]}></View>

      <Text style={[
        styles.header, 
        lightEnabled ? {backgroundColor: '#2196F3'} :
        darkEnabled ? {backgroundColor: '#4A576F', color: '#A4A9AD'} :
        halloweenEnabled ? {backgroundColor: '#FF7100'} : {backgroundColor: '#2196F3'}
      ]}>Settings</Text>
      
      <View style={[styles.outline, styles.smallMargins, styles.settingOption, styles.centerItems]}>
        <Text style={[styles.font1, styles.fontLarge]}>Display Settings</Text>
      </View>

      <View style={[styles.settingOption, styles.width70, styles.inline]}>
        <View style={[styles.width70, styles.textCenter]}>
          <Text style={[styles.font1, styles.fontLarge]}>Light Mode</Text>
        </View>
        <View style={[styles.width30, styles.centerItems]}>
          <Switch
            trackColor={{ false: "#CCCCCC", true: "#CCCCCC" }}
            thumbColor={lightEnabled ? '#2196F3' : 'gray'}
            onValueChange={lightSwitch}
            value={lightEnabled}
            style={[styles.switch]}
          />
        </View>
      </View>

      <View style={[styles.settingOption, styles.width70, styles.inline]}>
        <View style={[styles.width70, styles.textCenter]}>
          <Text style={[styles.font1, styles.fontLarge]}>Dark Mode</Text>
        </View>
        <View style={[styles.width30, styles.centerItems]}>
          <Switch
            trackColor={{ false: "#CCCCCC", true: "#CCCCCC" }}
            thumbColor={darkEnabled ? '#2196F3' : 'gray'}
            onValueChange={darkSwitch}
            value={darkEnabled}
            style={[styles.switch]}
          />
        </View>
      </View>

      <View style={[styles.settingOption, styles.width70, styles.inline]}>
        <View style={[styles.width70, styles.textCenter]}>
          <Text style={[styles.font1, styles.fontLarge]}>Halloween Mode</Text>
        </View>
        <View style={[styles.width30, styles.centerItems]}>
          <Switch
            trackColor={{ false: "#CCCCCC", true: "#CCCCCC" }}
            thumbColor={halloweenEnabled ? '#09FF00' : 'gray'}
            onValueChange={halloweenSwitch}
            value={halloweenEnabled}
            style={[styles.switch]}
          />
        </View>

      </View>

    </View>
  );
}
