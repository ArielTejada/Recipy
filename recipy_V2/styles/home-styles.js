import React from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {StyleSheet, Dimensions} from "react-native";
const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        fontFamily: 'Festive-Regular',
        fontSize: 40,
        padding: 10,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#43a1c9',
    },
    accountIcon : {
        width: wp('12%'),
        height: hp('9%'),
        top: 6, 
        left: 6,
    },
    banner: {
        width: width, 
        height: width/1.9,
        zIndex: 0
    },
    absolute: {
        position: 'absolute' 
    },
    fontSmall: {
        fontSize: RFPercentage(3)
    },
    fontMedium: {
        fontSize: RFPercentage(4)
    },
    fontLarge: {
        fontSize: RFPercentage(5)
    },
    button: {
        width: wp('50%'),
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#2196F3',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Festive-Regular',
    },
    tag: {
        top: -90, 
        left: 20,
    },
    card: {
        width: width/2.2, 
        height: height/4,
        marginVertical: RFValue(8),
        marginHorizontal: RFValue(8)
    },
    title: {
        width: width/2.5,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#2196F3',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Festive-Regular',
    },
    center : {
        alignItems: 'center'
    }
})