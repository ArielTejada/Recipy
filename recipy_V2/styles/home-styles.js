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
        width: width/4,
        height: height/20,
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: '#2196F3',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'AmaticSC-Bold',
    },
    recipePressableText: {
        fontFamily: 'AmaticSC-Bold',
        fontSize: RFPercentage(4),
        textAlign: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
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
    recipeImages: {
        width: width/2,
        height: height/5, 
    },
    recipeBack: {
        width: width/2.25, 
        height: height/5.2,
        justifyContent: 'center',
        // backgroundColor: '#60DEF7'
    },

    /* -------------- Position --------------*/
    center : {
        alignItems: 'center'
    },
    margins: {
        marginVertical: height/80,
        marginLeft: width/50,
        marginRight: width/50,
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
    flex: {
        display: 'flex'
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
        width: wp('40%'),
        borderWidth: 1,
        borderRadius: 6,
        color: 'black',
        alignItems: 'center',
        marginRight: wp('2%'),
        marginLeft: wp('2%'),
        marginVertical: wp('2%')
    },
    categoryButton: {
        borderWidth: 1,
        borderRadius: 6,
        width: width/4.3,
        height: width/9,
        textAlign: 'center',
    },
    roundBTN: {
        borderWidth: 2,
        borderRadius: 15,
        borderColor: 'black',
        marginHorizontal: width/150,
        marginVertical: height/200,
        paddingHorizontal: width/50,
        marginTop: 2,
        height: width/12,
        backgroundColor: '#60DEF7',
    },
    
    /* -------------- Custom  --------------*/
    card: {
        width: width/2.2, 
        height: height/5.1,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'black',
    },
    selectedIngredients : {
        width: width - RFPercentage(2.2),
        height: width / 10,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    navView: {
        width: width,
        height: height/8
    },
    recipeView: {
        width: width - (width/25),
        height: height/5,
        marginHorizontal: width/50,
        borderWidth: 2,
        borderRadius: 5,
    },
    recipeText: {
        fontFamily: 'AmaticSC-Bold',
        marginHorizontal: width/50,
        textAlign: 'center'
    }
})