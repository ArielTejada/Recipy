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
    headerText: {
        fontFamily: 'Festive-Regular',
        fontSize: RFPercentage(7),
        textAlign: 'center',
    },

    /* -------------- Headers --------------*/
    header: {
        width: width,
        height: height/8.5,
    },
    pushDown: {
        width: width,
        height: height/25,
        backgroundColor: '#2196F3',
    },

    /* -------------- Position --------------*/
    center: {
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    
    /* -------------- Styling --------------*/
    outline: {
        borderWidth: 1,
        borderRadius: 5,
    },

    /* -------------- Size --------------*/
    wholeScreen: {
        width: width,
        height: height
    },

    /* -------------- Custom  --------------*/
})