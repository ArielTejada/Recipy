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
    container: {
        flexDirection: 'row',
        marginHorizontal: width/40,
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
    window: {
        flexDirection: 'row',
        alignSelf: 'stretch',
    },
    margins: {
        marginVertical: height/300,
        marginHorizontal: width/40,
    },
    jarsMargin: {
        marginTop: height/17,
        marginHorizontal: width/40
    },
    
    /* -------------- Images --------------*/
    banner: {
        width: width,
        height: 500 * (width/2500),
        position: 'absolute'
    },
    pantryImage: {
        width: width,
        height: 1700 * (width/1500)
    },
    jar: {
        width: width/4,
        height: (580 * (width/400))/4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    jarLabel: {
        width: width/5,
        height: height/11,
        backgroundColor: '#2196F3',
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
    input : {
        backgroundColor: 'white',
        width: width/2.5,
        height: height/15,
        fontSize: RFPercentage(3),
        display: 'flex'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#2196f3',
        width: width/6.6,
        borderWidth: 1,
        borderRadius: 5,
    },
    searchResult: {
        width: width/2,
        height: height/20,
        fontFamily: 'AmaticSC-Bold',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    clear: {
        fontSize: RFPercentage(3),
        color: 'white',
    },
})