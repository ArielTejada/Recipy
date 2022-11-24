import React, { useState } from "react";
import { createStackNavigator } from '@react-navigation/stack';

import FavoriteScreen from "../screens/favorite";
import LikedRecipe from "../screens/likedRecipe";

const Stack = createStackNavigator();

function LikedStack(){
    return(
      <Stack.Navigator
        initialRouteName="FavoriteScreen"
        screenOptions={{
          headerMode: 'screen',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: 'tomato' },
          tabBarShowLabel: false,
          headerShown: false,
        }}
      >
        <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
        <Stack.Screen name="LikedRecipe" component={LikedRecipe} />
      </Stack.Navigator>
    );
}

export default LikedStack;

