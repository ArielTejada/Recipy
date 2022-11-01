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

/* -------------------- Redux State Colors -------------------- */
  const headerLight = useStoreState(state => state.headerLight);
  const headerDark = useStoreState(state => state.headerDark);
  const headerHalloween = useStoreState(state => state.headerHalloween);
  const pageLight = useStoreState(state => state.pageLight);
  const pageDark = useStoreState(state => state.pageDark);
  const pageHalloween = useStoreState(state => state.pageHalloween);

  /* -------------------- Handler Functions -------------------- */
  const lightSwitch = () => {setLightEnabled(lightEnabled => !lightEnabled);}
  const darkSwitch = () => {setDarkEnabled(darkEnabled => !darkEnabled);}
  const halloweenSwitch = () => {setHalloweenEnabled(halloweenEnabled => !halloweenEnabled);}

/* -------------------- Render Method -------------------- */
  return (
    <View style={[
      styles.wholeScreen, 
      lightEnabled ? {backgroundColor: pageLight} :
      darkEnabled ? {backgroundColor: pageDark} :
      halloweenEnabled ? {backgroundColor: pageHalloween} : {backgroundColor: pageLight}
    ]}>

      <View style={[
        styles.pushDown, 
        lightEnabled ? {backgroundColor: headerLight} :
        darkEnabled ? {backgroundColor: headerDark} :
        halloweenEnabled ? {backgroundColor: headerHalloween} : {backgroundColor: headerLight}
      ]}></View>

      <View style={[
          styles.header, 
          lightEnabled ? {backgroundColor: headerLight} :
          darkEnabled ? {backgroundColor: headerDark, color: '#A4A9AD'} :
          halloweenEnabled ? {backgroundColor: headerHalloween} : {backgroundColor: headerLight}
        ]}>
        <Text style={[styles.headerText]}>Settings</Text>
      </View>
      
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
