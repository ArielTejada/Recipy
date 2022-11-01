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
    categoryText : {
        color: 'black',
        textAlign: 'center',
        fontSize: RFPercentage(4),
        fontFamily: 'AmaticSC-Bold',
        textAlignVertical: 'center'
    },
    title: {
        width: width/2.5,
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: '#2196F3',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Festive-Regular',
    },

    /* -------------- Images --------------*/
    banner: {
        width: width, 
        height: width/1.9,
        zIndex: 0
    },
    accountIcon : {
        width: wp('12%'),
        height: hp('9%'),
        top: 6, 
        left: 6,
    },
    caterories: {
        flex: 1,
        width: width,
        height: width/1.1,
    },
    logo: {
        width: width/2.8,
        height: 666 * ((width/2.8)/1200),
        top: height/9.5,
        left: width/3.5
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
        flex: 1
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

    /* -------------- Size --------------*/
    wholeScreen: {
        width: width,
        height: height
    },

    /* -------------- Ingredient Categories --------------*/
    category1: {
        position: 'absolute',
        top: width/6,
        left: width/18
    },
    category2: {
        position: 'absolute',
        top: width/6,
        left: width/2.6
    },
    category3: {
        position: 'absolute',
        top: width/6,
        left: width/1.4
    },
    category4: {
        position: 'absolute',
        top: width/1.6,
        left: width/18
    },
    category5: {
        position: 'absolute',
        top: width/1.6,
        left: width/2.6
    },
    category6: {
        position: 'absolute',
        top: width/1.6,
        left: width/1.4
    },
    
    /* -------------- Buttons --------------*/
    addButton: {
        marginVertical: height/80,
        width: wp('50%'),
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: '#4BABF4',
        color: 'black',
        alignItems: 'center',
    },
    categoryButton: {
        borderWidth: 1,
        borderRadius: 6,
        width: width/4.3,
        height: width/9,
        textAlign: 'center',
        backgroundColor: '#4BABF4',
    },
    
    /* -------------- Custom  --------------*/
    card: {
        width: width/2.2, 
        height: height/4,
        marginVertical: RFValue(8),
        marginHorizontal: RFValue(8)
    },
})