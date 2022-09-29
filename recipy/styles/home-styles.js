import React from "react"
import {StyleSheet} from "react-native"

export default StyleSheet.create({
    container: {
        fontFamily: 'GrandHotel-Regular',
        fontSize: 40,
        padding: 10,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#43a1c9',
    },
    accountIcon : {
        width: 40,
        height: 40,
        top: 10, 
        left: 10,

    },
    banner: {
        width: 410, 
        height: 210,
        zIndex: 0
    },
    absolute: {
        position: 'absolute' 
    }
})