import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Image } from "react-native";

/* -------------------- Screens -------------------- */
import Home from "../screens/home";
import Settings from '../screens/settings'
import Favorite from '../screens/favorite'
import Pantry from '../screens/pantry'
import AddStack from "./addStack";

const Tab = createBottomTabNavigator();

const BottomNavBar = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarHideOnKeyboard: true,
            tabBarShowLabel: false,
            headerShown: false,
            
            tabBarStyle: {
                position: 'absolute',
                height: 70
            }
        }}>
            <Tab.Screen 
                name="Home" 
                component={AddStack} 
                options={{
                tabBarIcon: ({focused}) => (
                    <View>
                        <Image
                            source={require('../icons/home-black.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                justifyContent: 'center',
                                alignSelf: 'center',
                                tintColor: focused ? '#2196F3' : 'black'
                            }}
                        />
                        <Text style={{color: focused ? '#2196F3' : 'black'}}>Home</Text>
                    </View>
                )
            }}/>
            <Tab.Screen 
                name="Pantry" 
                component={Pantry} 
                options={{
                tabBarIcon: ({focused}) => (
                    <View>
                        <Image
                            source={require('../icons/fridge4-black.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                justifyContent: 'center',
                                alignSelf: 'center',
                                tintColor: focused ? '#2196F3' : 'black'
                            }}
                        />
                        <Text style={{color: focused ? '#2196F3' : 'black'}}>Pantry</Text>
                    </View>
                )
            }}/>
            <Tab.Screen 
                name="Favorite" 
                component={Favorite} 
                options={{
                tabBarIcon: ({focused}) => (
                    <View>
                        <Image
                            source={require('../icons/heart3-black.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                justifyContent: 'center',
                                alignSelf: 'center',
                                tintColor: focused ? '#2196F3' : 'black'
                            }}
                        />
                        <Text style={{color: focused ? '#2196F3' : 'black'}}>Favorite</Text>
                    </View>
                )
            }}/>
            <Tab.Screen 
                name="Settings" 
                component={Settings} 
                options={{
                tabBarIcon: ({focused}) => (
                    <View>
                        <Image
                            source={require('../icons/settings-black.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                justifyContent: 'center',
                                alignSelf: 'center',
                                tintColor: focused ? '#2196F3' : 'black'
                            }}
                        />
                        <Text 
                            style={{color: focused ? '#2196F3' : 'black'}}>Settings</Text>
                    </View>
                )
            }}/>
        </Tab.Navigator>
    );
}

export default BottomNavBar;