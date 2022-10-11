import React from "react"
import {StyleSheet, Dimensions} from "react-native"

let width = Dimensions.get('window').width; 

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
        width: 50,
        height: 50,
        top: 5, 
        left: 5,
    },
    banner: {
        width: 410, 
        height: 210,
        zIndex: 0
    },
    absolute: {
        position: 'absolute' 
    },
    font20: {
        fontSize: 20
    },
    font30 : {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#43a1c9',
    },
    button: {
        width: width -= 250,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#43a1c9',
        color: 'white',
        textAlign: 'center'
    },
    tag: {
        top: -90, 
        left: 20,
    },
    card: {
        width: 290, 
        height: 180,
        marginVertical: 10,
        marginHorizontal: 10
    },
    title: {
        width: 200,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#43a1c9',
        color: 'white',
        textAlign: 'center'
    }
})