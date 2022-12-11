import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "../screens/Home";
import Pantry from "../screens/Pantry";
import Explore from "../screens/Explore";
import NewPost from "../screens/NewPost";
import AddIngredient from "../screens/addIngredient";
import Recipe from "../screens/recipe";
import Category from "../screens/category";
import Settings from "../screens/Settings";
import Favorites from "../screens/Favorites";
import LikedRecipe from "../screens/likedRecipe";
import ShoppingList from "../screens/shoppingList";

import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
  MaterialIcons,
  AntDesign,
  Feather,
  Fontisto,
} from "@expo/vector-icons";
import { Colors } from "react-native-paper";
import ProfilePic from "../components/ProfilePic";
import styles from "../components/Social-Feed/styles";

/**
 *
 */

const HomeStack = createNativeStackNavigator();
const PantryStack = createNativeStackNavigator();
const ShoppingListStack = createNativeStackNavigator();
const FavoritesStack = createNativeStackNavigator();
const LikedRecipesStack = createNativeStackNavigator();
const ExploreStack = createNativeStackNavigator();
const NewPostStack = createNativeStackNavigator();
const AddIngredientStack = createNativeStackNavigator();
const RecipeStack = createNativeStackNavigator();
const CategoryStack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTab = () => (
  <Tab.Navigator
    initialRouteName="Home"
    barStyle={{
      backgroundColor: "transparent",
      position: "absolute",
      overflow: "hidden",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,

      background: "transparent",
    }}
  >
    <Tab.Screen
      name="Overview"
      component={HomeStackScreen}
      options={{
        barStyle: { background: "transparent" },
        tabBarLabel: "Home",
        tabBarColor: "#2694F9",
        tabBarIcon: ({ color }) => (
          <Ionicons
            name="ios-home"
            color={color}
            size={26}
            style={{ marginRight: -3, marginVertical: -3, paddingTop: 2 }}
          />
        ),
      }}
    />
    <Tab.Screen
      name="PantryScreen"
      component={PantryStackScreen}
      options={{
        tabBarStyle: { background: "transparent" },
        labelStyle: { paddingTop: 10 },
        tabBarLabel: "Pantry",
        tabBarColor: "#ff5349",
        tabBarIcon: ({ color }) => (
          <Fontisto
            name="shopping-basket"
            color={color}
            size={25}
            style={{ marginRight: -3, marginVertical: -3, paddingTop: 2 }}
          />
        ),
      }}
    />
    <Tab.Screen
      name="FavoritesScreen"
      component={FavoritesStackScreen}
      options={{
        tabBarStyle: { background: "transparent" },
        labelStyle: { paddingTop: 10 },
        tabBarLabel: "Favorites",
        tabBarColor: "#b71282",
        tabBarIcon: ({ color }) => (
          <FontAwesome
            name="heart"
            color={color}
            size={24}
            style={{ marginRight: -3, marginVertical: -3, paddingTop: 2 }}
          />
        ),
      }}
    />
    <Tab.Screen
      name="ShoppingListScreen"
      component={ShoppingListStackScreen}
      options={{
        tabBarLabel: "Grocery List",
        tabBarColor: "#3DBE29",
        tabBarIcon: ({ color }) => (
          <Feather
            name="list"
            color={color}
            size={27}
            style={{ marginRight: -3, marginTop: -3, paddingTop: 2 }}
          />
        ),
      }}
    />
    <Tab.Screen
      name="ExploreScreen"
      component={ExploreStackScreen}
      options={{
        tabBarLabel: "Explore",
        tabBarColor: "#6a0dad",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons
            name="creation"
            size={26}
            color={color}
            style={{ marginRight: -3, marginVertical: -3, paddingTop: 2 }}
          /> // subject to change
          // <AntDesign name="find" size={24} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator
    screenOptions={{
      // headerShown: false,
      headerStyle: {
        backgroundColor: "#2694F9",
        background: "transparent",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: "Home",
        headerLeft: () => (
          // <AntDesign.Button
          //   name="menu-fold"
          //   size={23}
          //   backgroundColor="#2694F9"
          //   onPress={() => navigation.openDrawer()}
          // ></AntDesign.Button>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{ marginTop: -5 }}
          >
            <ProfilePic size={40} />
          </TouchableOpacity>
        ),
      }}
    />
    <AddIngredientStack.Screen
      name="AddIngredient"
      component={AddIngredient}
      options={{
        title: "Add Ingredient",
        headerLeft: () => (
          // <AntDesign.Button
          //   name="menu-fold"
          //   size={23}
          //   backgroundColor="#2694F9"
          //   onPress={() => navigation.openDrawer()}
          // ></AntDesign.Button>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{ marginTop: -5 }}
          >
            <ProfilePic size={40} />
          </TouchableOpacity>
        ),
      }}
    />
    <CategoryStack.Screen
      name="Category"
      component={Category}
      options={{
        title: "Category",
        headerLeft: () => (
          // <AntDesign.Button
          //   name="menu-fold"
          //   size={23}
          //   backgroundColor="#2694F9"
          //   onPress={() => navigation.openDrawer()}
          // ></AntDesign.Button>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{ marginTop: -5 }}
          >
            <ProfilePic size={40} />
          </TouchableOpacity>
        ),
      }}
    />
    <RecipeStack.Screen
      name="Recipe"
      component={Recipe}
      options={{
        title: "Recipes",
        headerLeft: () => (
          // <AntDesign.Button
          //   name="menu-fold"
          //   size={23}
          //   backgroundColor="#2694F9"
          //   onPress={() => navigation.openDrawer()}
          // ></AntDesign.Button>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{ marginTop: -5 }}
          >
            <ProfilePic size={40} />
          </TouchableOpacity>
        ),
      }}
    />
  </HomeStack.Navigator>
);

const PantryStackScreen = ({ navigation }) => (
  <PantryStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#ff5349",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <PantryStack.Screen
      name="Pantry"
      component={Pantry}
      options={{
        headerLeft: () => (
          // <AntDesign.Button
          //   name="menu-fold"
          //   size={23}
          //   backgroundColor="#ff5349"
          //   onPress={() => navigation.openDrawer()}
          // ></AntDesign.Button>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{ marginTop: -5 }}
          >
            <ProfilePic size={40} />
          </TouchableOpacity>
        ),
      }}
    />
  </PantryStack.Navigator>
);
const FavoritesStackScreen = ({ navigation }) => (
  <FavoritesStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#b71282",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <FavoritesStack.Screen
      name="Favorites"
      component={Favorites}
      options={{
        headerLeft: () => (
          // <AntDesign.Button
          //   name="menu-fold"
          //   size={23}
          //   backgroundColor="#3DBE29"
          //   onPress={() => navigation.openDrawer()}
          // ></AntDesign.Button>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{ marginTop: -5 }}
          >
            <ProfilePic size={40} />
          </TouchableOpacity>
        ),
      }}
    />
    <LikedRecipesStack.Screen
      name="LikedRecipe"
      component={LikedRecipe}
      options={{
        title: "Liked Recipes",
        headerLeft: () => (
          // <AntDesign.Button
          //   name="menu-fold"
          //   size={23}
          //   backgroundColor="#2694F9"
          //   onPress={() => navigation.openDrawer()}
          // ></AntDesign.Button>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{ marginTop: -5 }}
          >
            <ProfilePic size={40} />
          </TouchableOpacity>
        ),
      }}
    />
  </FavoritesStack.Navigator>
);
const ShoppingListStackScreen = ({ navigation }) => (
  <ShoppingListStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#3DBE29",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <ShoppingListStack.Screen
      name="Shopping List"
      component={ShoppingList}
      options={{
        headerLeft: () => (
          // <AntDesign.Button
          //   name="menu-fold"
          //   size={23}
          //   backgroundColor="#3DBE29"
          //   onPress={() => navigation.openDrawer()}
          // ></AntDesign.Button>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{ marginTop: -5 }}
          >
            <ProfilePic size={40} />
          </TouchableOpacity>
        ),
      }}
    />
  </ShoppingListStack.Navigator>
);
const ExploreStackScreen = ({ navigation }) => (
  <ExploreStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#6a0dad",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <ExploreStack.Screen
      name="Explore"
      component={Explore}
      options={{
        headerLeft: () => (
          // <AntDesign.Button
          //   name="menu-fold"
          //   size={23}
          //   backgroundColor="#6a0dad"
          //   onPress={() => navigation.openDrawer()}
          // ></AntDesign.Button>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{ marginTop: -5 }}
          >
            <ProfilePic size={40} />
          </TouchableOpacity>
        ),
      }}
    />
    <NewPostStack.Screen
      name="NewPost"
      component={NewPost}
      options={{
        title: "New Post",
        headerLeft: () => (
          // <AntDesign.Button
          //   name="menu-fold"
          //   size={23}
          //   backgroundColor="#2694F9"
          //   onPress={() => navigation.openDrawer()}
          // ></AntDesign.Button>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{ marginTop: -5 }}
          >
            <ProfilePic size={40} />
          </TouchableOpacity>
        ),
      }}
    />
  </ExploreStack.Navigator>
);

export default MainTab;
