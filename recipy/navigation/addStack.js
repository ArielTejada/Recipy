import React, { useState } from "react";
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from "../screens/home";
import AddIngredient from '../screens/addIngredient'

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
      </Stack.Navigator>
    );
}

export default AddStack;

