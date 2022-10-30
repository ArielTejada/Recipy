import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Image } from "react-native";
import { useStoreState, useStoreActions } from "easy-peasy";

/* -------------------- Screens -------------------- */
import Home from "../screens/home";
import Settings from '../screens/settings'
import Favorite from '../screens/favorite'
import Pantry from '../screens/pantry'
import AddStack from "./addStack";

const Tab = createBottomTabNavigator();

/* -------------------- Colors -------------------- */
const lightNotFocused = 'black'
const ligthFocused = 'white'
const darkNotFocused = 'black'
const darkFocused = '#A4A9AD'
const halloweenNotFocused = 'black'
const halloweenFocused = '#09FF00'

const BottomNavBar = () => {

/* -------------------- Redux State Variables -------------------- */
const lightEnabled = useStoreState(state => state.lightEnabled);
const darkEnabled = useStoreState(state => state.darkEnabled);
const halloweenEnabled = useStoreState(state => state.halloweenEnabled);

    return (
        <Tab.Navigator screenOptions={{
            tabBarHideOnKeyboard: true,
            tabBarShowLabel: false,
            headerShown: false,
            
            tabBarStyle: {
                position: 'absolute',
                height: 70,
                borderTopEndRadius: 10,
                borderTopStartRadius: 10,
                backgroundColor: 
                    halloweenEnabled ? '#FF7100' : 
                    darkEnabled ? '#4A576F' : 
                    lightEnabled ? '#2196F3' : 'white'
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
                                tintColor: !focused & halloweenEnabled ? halloweenNotFocused : focused & halloweenEnabled ? halloweenFocused : 
                                !focused & darkEnabled ? darkNotFocused : focused & darkEnabled ? darkFocused: 
                                !focused & lightEnabled ? lightNotFocused : focused & lightEnabled ? ligthFocused : 'black'
                            }}
                        />
                        <Text style={{
                            color: !focused & halloweenEnabled ? halloweenNotFocused : focused & halloweenEnabled ? halloweenFocused : 
                            !focused & darkEnabled ? darkNotFocused : focused & darkEnabled ? darkFocused: 
                            !focused & lightEnabled ? lightNotFocused : focused & lightEnabled ? ligthFocused : 'black'
                        }}>Home</Text>
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
                                tintColor: !focused & halloweenEnabled ? halloweenNotFocused : focused & halloweenEnabled ? halloweenFocused : 
                                !focused & darkEnabled ? darkNotFocused : focused & darkEnabled ? darkFocused: 
                                !focused & lightEnabled ? lightNotFocused : focused & lightEnabled ? ligthFocused : 'black'
                            }}
                        />
                        <Text style={{
                            color: !focused & halloweenEnabled ? halloweenNotFocused : focused & halloweenEnabled ? halloweenFocused : 
                            !focused & darkEnabled ? darkNotFocused : focused & darkEnabled ? darkFocused: 
                            !focused & lightEnabled ? lightNotFocused : focused & lightEnabled ? ligthFocused : 'black'
                        }}>Pantry</Text>
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
                                tintColor: !focused & halloweenEnabled ? halloweenNotFocused : focused & halloweenEnabled ? halloweenFocused : 
                                !focused & darkEnabled ? darkNotFocused : focused & darkEnabled ? darkFocused: 
                                !focused & lightEnabled ? lightNotFocused : focused & lightEnabled ? ligthFocused : 'black'
                            }}
                        />
                        <Text style={{
                            color: !focused & halloweenEnabled ? halloweenNotFocused : focused & halloweenEnabled ? halloweenFocused : 
                            !focused & darkEnabled ? darkNotFocused : focused & darkEnabled ? darkFocused: 
                            !focused & lightEnabled ? lightNotFocused : focused & lightEnabled ? ligthFocused : 'black'
                        }}>Favorite</Text>
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
                                tintColor: !focused & halloweenEnabled ? halloweenNotFocused : focused & halloweenEnabled ? halloweenFocused : 
                                !focused & darkEnabled ? darkNotFocused : focused & darkEnabled ? darkFocused: 
                                !focused & lightEnabled ? lightNotFocused : focused & lightEnabled ? ligthFocused : 'black'
                            }}
                        />
                        <Text 
                            style={{
                                color: !focused & halloweenEnabled ? halloweenNotFocused : focused & halloweenEnabled ? halloweenFocused : 
                                !focused & darkEnabled ? darkNotFocused : focused & darkEnabled ? darkFocused: 
                                !focused & lightEnabled ? lightNotFocused : focused & lightEnabled ? ligthFocused : 'black'
                            }}>Settings</Text>
                    </View>
                )
            }}/>
        </Tab.Navigator>
    );
}

export default BottomNavBar;