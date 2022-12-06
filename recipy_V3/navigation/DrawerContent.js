import { StyleSheet, View, Button } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import {
  Avatar,
  Title,
  useTheme,
  Caption,
  Paragraph,
  Drawer,
  Text,
  Switch,
  Colors,
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  Ionicons,
  MaterialIcons,
  SimpleLineIcons,
  AntDesign,
  Entypo,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Amplify, Auth, API, graphqlOperation } from "aws-amplify";
import { getUser } from "../src/graphql/queries";
import styles from "../styles/drawerContent-styles";

import { AuthContext } from "../Context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

export function DrawerContent(props) {
  const paperTheme = useTheme();

  const { colors } = useTheme();

  const [isDarkMode, setIsDarkMode] = useState(false);

  const { logout, toggleTheme } = useContext(AuthContext);

  const { userInfo } = useContext(AuthContext);

  return (
    /**  Creating a base user profile display in a drawer menu
     *
     */
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView style={styles.container}>
        <View styles={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              {/* Placeholder image taken from Pexels.com --> Free stock image provider */}
              <Avatar.Image
                source={require("../assets/img/chef-profile.png")}
                size={85}
                // backgroundColor={"#2694f9"}
                backgroundColor={"#b1f2ff"}
                // backgroundColor={"gray"}
              />
              <View
                style={{
                  flexDirection: "column",
                  marginLeft: 15,
                  marginTop: 10, // subject to change
                }}
              >
                <Text style={styles.title}>Welcome,</Text>
                <Text style={styles.title}>Chef!</Text>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <AntDesign name="home" color={colors.text} size={24} />
              )}
              label="Home"
              labelStyle={{ fontSize: 17, color: colors.text }}
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons
                  name="bookmarks-outline"
                  color={colors.text}
                  size={size}
                />
              )}
              label="Favorites"
              labelStyle={{ fontSize: 17, color: colors.text }}
              inactiveTintColor="black"
              onPress={() => {
                props.navigation.navigate("FavoritesScreen");
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Feather name="list" size={size} color="black" />
              )}
              label="Grocery List"
              labelStyle={{ fontSize: 17, color: colors.text }}
              inactiveTintColor="black"
              onPress={() => {
                props.navigation.navigate("ShoppingListScreen");
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <SimpleLineIcons
                  name="settings"
                  color={colors.text}
                  size={size}
                />
              )}
              label="Settings"
              labelStyle={{ fontSize: 17, color: colors.text }}
              inactiveTintColor="black"
              onPress={() => {
                props.navigation.navigate("Settings");
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Ionicons name="exit-outline" color={colors.text} size={size} />
          )}
          label="Sign Out"
          labelStyle={{ fontSize: 17, color: colors.text }}
          onPress={() => {
            [Auth.signOut(), logout()];
          }}
        />
      </Drawer.Section>
    </View>
  );
}
