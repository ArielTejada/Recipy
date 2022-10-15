import React, { useState } from "react";
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from "../screens/home";
import AddIngredient from '../screens/addIngredient'
import Account from '../screens/Account'
import Category from "../screens/category";

const Stack = createStackNavigator();

function AddStack(){
    return(
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerMode: 'screen',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: 'tomato' },
          tabBarShowLabel: false,
          headerShown: false,
        }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="AddIngredient" component={AddIngredient} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="Category" component={Category} />
      </Stack.Navigator>
    );
}

export default AddStack;

