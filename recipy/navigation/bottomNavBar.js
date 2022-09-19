import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Image } from "react-native";

// Screens
import Home from "../screens/home";
import Settings from '../screens/settings'
import Favorite from '../screens/favorite'

const Tab = createBottomTabNavigator();

const BottomNavBar = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
                position: 'absolute',
                height: 70
            }
        }}>
            <Tab.Screen name="Home" component={Home} options={{
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
                                tintColor: focused ? '#43a1c9' : 'black'
                            }}
                        />
                        <Text style={{color: focused ? '#43a1c9' : 'black'}}>Home</Text>
                    </View>
                )
            }}/>
            <Tab.Screen name="Favorite" component={Favorite} options={{
                tabBarIcon: ({focused}) => (
                    <View>
                        <Image
                            source={require('../icons/favorite-black.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                justifyContent: 'center',
                                alignSelf: 'center',
                                tintColor: focused ? '#43a1c9' : 'black'
                            }}
                        />
                        <Text style={{color: focused ? '#43a1c9' : 'black'}}>Favorite</Text>
                    </View>
                )
            }}/>
            <Tab.Screen name="Settings" component={Settings} options={{
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
                                tintColor: focused ? '#43a1c9' : 'black'
                            }}
                        />
                        <Text style={{color: focused ? '#43a1c9' : 'black'}}>Settings</Text>
                    </View>
                )
            }}/>
        </Tab.Navigator>
    );
}

export default BottomNavBar;