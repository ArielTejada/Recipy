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
    recipeTitle: {
        fontFamily: 'AmaticSC-Bold',
        fontSize: RFPercentage(7),
        textAlign: 'center'
    },
    recipeHeaderText: {
        fontFamily: 'AmaticSC-Bold',
        fontSize: RFPercentage(4),
        marginTop: height/30
    },
    recipeDataText: {
        fontSize: RFPercentage(2.5),
    },

    /* -------------- Headers --------------*/
    backButtonSection: {
        width: width,
        height: height/14,
        backgroundColor: '#2196F3',
        zIndex: 1
    },

    /* -------------- Images --------------*/
    banner: {
        width: width,
        height: height/8,
        top: -height/23,
    },
    backIcon: {
        width: width/9,
        height: width/9,
        tintColor: 'white',
        top: width/15
    },
    backIconTouch: {
        width: width/9,
        height: width/5,
        zIndex: 5
    },

    /* -------------- Position --------------*/
    center : {
        alignItems: 'center'
    },
    margins: {
        marginVertical: height/80
    },
    tag: {
        top: -90, 
        left: 20,
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    absolute: {
        position: 'absolute' 
    },
    pushDown: {
        width: width,
        height: height/25,
        backgroundColor: 'white',
    },

    /* -------------- Styling --------------*/
    outline: {
        borderWidth: 1,
        borderRadius: 5,
    },
    pageMargins: {
        marginHorizontal: width/20
    },

    /* -------------- Size --------------*/
    wholeScreen: {
        width: width,
        height: height
    },
    
    /* -------------- Buttons --------------*/

    
    /* -------------- Custom  --------------*/
    navView: {
        width: width,
        height: height/4
    },
    recipeCard: {

    },
})