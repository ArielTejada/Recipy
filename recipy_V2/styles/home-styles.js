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
        color: 'white',
        textAlign: 'center',
        fontSize: RFPercentage(4.4),
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
        height: width,
    },

    /* -------------- Position --------------*/
    center : {
        alignItems: 'center'
    },
    margins: {
        marginHorizontal: RFPercentage(1),
        marginTop: RFPercentage(1)
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

    /* -------------- Ingredient Categories --------------*/
    category1: {
        position: 'absolute',
        top: RFPercentage(13),
        left: width/23
    },
    category2: {
        position: 'absolute',
        top: RFPercentage(13),
        left: width/2.7
    },
    category3: {
        position: 'absolute',
        top: RFPercentage(13),
        left: width/1.42
    },
    category4: {
        position: 'absolute',
        top: RFPercentage(42),
        left: width/23
    },
    category5: {
        position: 'absolute',
        top: RFPercentage(42),
        left: width/2.7
    },
    category6: {
        position: 'absolute',
        top: RFPercentage(42),
        left: width/1.42
    },
    
    /* -------------- Buttons --------------*/
    button: {
        width: wp('50%'),
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: '#2196F3',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Festive-Regular',
    },
    categoryButton: {
        borderWidth: 2,
        borderRadius: 20,
        width: RFPercentage(16),
        height: RFPercentage(7),
        textAlign: 'center',
        backgroundColor: '#2196F3',
    },
    
    /* -------------- Custom  --------------*/
    card: {
        width: width/2.2, 
        height: height/4,
        marginVertical: RFValue(8),
        marginHorizontal: RFValue(8)
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
})