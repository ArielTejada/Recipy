import React from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {StyleSheet, Dimensions} from "react-native";
const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: width/40,
    },
    header: {
        fontFamily: 'Festive-Regular',
        fontSize: RFPercentage(7),
        width: width,
        height: height/8.5,
        textAlign: 'center',
        backgroundColor: '#2196F3',
    },
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
        height: height/20,
    },
    clear: {
        fontSize: RFPercentage(3),
        color: 'white',
    },
    margins: {
        marginVertical: height/300,
        marginHorizontal: width/40,
    },
    outline: {
        borderWidth: 1,
        borderRadius: 5,
    },
    textCenter: {
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    window: {
        flexDirection: 'row',
        alignSelf: 'stretch',
    },
    fontSmall: {
        fontSize: RFPercentage(3)
    },
    fontMedium: {
        fontSize: RFPercentage(4)
    },
    fontLarge: {
        fontSize: RFPercentage(5)
    }
})