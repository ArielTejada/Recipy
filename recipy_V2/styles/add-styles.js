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
    AmaticSCRegular: {
        fontFamily: 'AmaticSC-Regular'
    },
    AmaticSCBold: {
        fontFamily: 'AmaticSC-Bold'
    },
    recentlyUsedText: {
        fontFamily: 'AmaticSC-Bold',
        fontSize: RFPercentage(5),
    },

    /* -------------- Headers --------------*/
    header: {
        fontFamily: 'Festive-Regular',
        fontSize: RFPercentage(7),
        width: width,
        height: height/8.5,
        textAlign: 'center',
        backgroundColor: '#2196F3',
    },
    pushDown: {
        width: width,
        height: height/25,
        backgroundColor: '#2196F3',
    },
    backButtonSection: {
        width: width,
        height: height/14,
        backgroundColor: '#2196F3',
    },

    /* -------------- Images --------------*/
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
    sidesImage: {
        width: width,
        height: 1060 * (width /1060),   // actual height x (width / actual width)
        borderWidth: 1,
        borderRadius: 5,
        marginTop: height/100
    },
    banner: {
        width: width,
        height: height/8,
        top: -height/23,
    },
    addIcon: {
        width: '30%',
        height: '60%',
        position: 'absolute',
        top: '20%',
        left: '100%'
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
    fridgeMargins: {
        marginTop: height/10,
        top: -height/10
    },
    ingredientMargins :{
        marginLeft: width/10,
        marginRight: width/8,
        top: height/15
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
    flex: {
        display: 'flex'
    },
    flexRow:{
        flexDirection:"row",
        flexWrap:"wrap",
    },
    absolute: {
        position: 'absolute',
        top: height/3.5
    },

    /* -------------- Styling --------------*/
    outline: {
        borderWidth: 1,
        borderRadius: 5,
    },
    roundBTN: {
        borderWidth: 2,
        borderRadius: 15,
        borderColor: '#2196f3',
        marginHorizontal: 5,
        paddingHorizontal: 3,
        marginTop: 2,
        height: width/12,
    },
    searchBar: {
        position: 'absolute'
    },

    /* -------------- Size --------------*/
    wholeScreen: {
        width: width,
        height: height
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
        width: width/2.3,
        height: height/20,
        backgroundColor: 'white',
    },
    notfocused: {
        backgroundColor: 'white'
    },
    focused: {
        backgroundColor: '#2196f3',
    },
    selectedIngredients : {
        width: width - RFPercentage(1),
        height: width / 10,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    recentlyUsed: {
        borderWidth: 1,
        borderRadius: 5,
        width: width/2.2,
        height: height/13,
        marginLeft: width/3.6,
        marginTop: height/100,
        paddingHorizontal: width/20,
        backgroundColor: '#E8E8E8',
        alignItems: 'flex-start',
    },
})