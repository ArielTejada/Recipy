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
    font1: {
        fontFamily: 'AmaticSC-Regular',
    },
    textCenter: {
        justifyContent: 'center',
        paddingLeft: width/30
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
    centerItems: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    inline: {
        display: 'flex',
        flexDirection: 'row'
    },
    smallMargins: {
        marginHorizontal: width/30,
        marginVertical: height/60
    },

    /* -------------- Styling --------------*/
    outline: {
        borderWidth: 1,
        borderRadius: 5,
    },
    pageColor: {
        backgroundColor: 'white',
        height: height
    },

    /* -------------- Size --------------*/
    wholeScreen: {
        width: width,
        height: height
    },
    width70: {
        width: width * .7,
        height: height/10
    },
    width30: {
        width: width * .3,
        height: height/10.
    },
    switch: {
        transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }]
    },
    
    /* -------------- Custom  --------------*/
    navView: {
        width: width,
        height: height/8
    },
})