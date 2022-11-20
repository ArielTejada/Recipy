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
    AmaticSCRegular: {
        fontFamily: 'AmaticSC-Regular',
    },
    AmaticSCBold: {
        fontFamily: 'AmaticSC-Bold',
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
    backButtonSection: {
        width: width,
        height: 460 * (width / 3043),
        backgroundColor: '#2196F3',
    },

    /* -------------- Images --------------*/
    backIcon: {
        width: width/9,
        height: width/9,
        tintColor: 'white',
        top: height/50
    },
    banner: {
        width: width,
        height: 460 * (width / 3043),     // actual height x (width / actual width)
        // top: -height/23,
    },
    uncheckIcon: {
        width: wp('6%'),
        height: hp('4%'),
        marginHorizontal: wp('2%'),
        marginVertical: hp('1%')
    },
    trashIcon: {
        width: wp('10%'),
        height: hp('6%'),
        marginLeft: width/15
    },
    deleteIcon: {
        width: wp('7%'),
        height: hp('5%'),
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
        marginVertical: height/100
    },
    horizontalMargins:{
        marginHorizontal: width/30,
    },
    verticalMargins:{
        marginVertical: height/100,
    },
    flex: {
        display: 'flex',
        flexDirection: 'row'
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

    /* -------------- Buttons  --------------*/
    clearButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#2196f3',
        width: width/6,
        borderWidth: 1,
        borderRadius: 5,
    },
    deleteButton: {
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#40AAF2',
        width: width/2
    },
    deleteItem: {
        width: wp('7%'),
        height: hp('5%'),
        position: 'absolute',
        left: width/1.2
    },
    
    /* -------------- Custom  --------------*/
    navView: {
        width: width,
        height: height/5,
    },
    shoppingList: {
        marginVertical: height/80
    },
    input : {
        backgroundColor: 'white',
        width: width/1.67,
        height: height/15,
        fontSize: RFPercentage(3),
    },

})