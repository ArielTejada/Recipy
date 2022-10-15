import React from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {StyleSheet, Dimensions} from "react-native";
const {height, width} = Dimensions.get('window');

export default StyleSheet.create({

    /* -------------- Typography --------------*/
    fontSmall: {
        fontSize: RFPercentage(3)
    },
    fontMedium: {
        fontSize: RFPercentage(4)
    },
    fontLarge: {
        fontSize: RFPercentage(5)
    },
    textCenter: {
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white'
    },

    /* -------------- Headers --------------*/
    pushDown: {
        width: width,
        height: height/25,
        backgroundColor: '#2196F3',
    },
    backButtonSection: {
        width: width,
        height: 'auto',
        backgroundColor: '#2196F3',
    },

    /* -------------- Images --------------*/
    icon: {
        width: RFPercentage(7),
        height: RFPercentage(7),
    },
    sidesImage: {
        width: width,
        height: height - RFPercentage(28),
    },

    /* -------------- Position --------------*/
    center: {
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    margins: {
        marginVertical: 5,
        marginHorizontal: 10,
    },
    window: {
        flexDirection: 'row',
        alignSelf: 'stretch',
    },
    container : {
        flexDirection: 'row',
        alignSelf: 'stretch',
        margin: 10,
        marginLeft: 10
    },
    outline: {
        borderWidth: 1,
        borderRadius: 5,
    },
    selected: {
        width: width,
        height: height,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    halfWidth: {
        width: width/2,
        marginLeft: 'auto',
        marginRight: 'auto'
    },

    /* -------------- Styling --------------*/
    outline: {
        borderWidth: 1,
        borderRadius: 5,
    },
    
    /* -------------- Custom  --------------*/
    input : {
        backgroundColor: 'white',
        width: width -80,
        height: 50,
        fontSize: 20
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#2196f3',
        width: 60
    },
    searchResult: {
        width: width/2,
        height: height/20,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
})