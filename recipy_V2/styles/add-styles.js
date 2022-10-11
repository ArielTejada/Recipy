import React from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {StyleSheet, Dimensions} from "react-native";
const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    container : {
        flexDirection: 'row',
        alignSelf: 'stretch',
        margin: 10,
        marginLeft: 10
    },
    input : {
        backgroundColor: 'white',
        width: width -80,
        height: 50,
        fontSize: 20
    },
    icon: {
        width: 30,
        height: 30,
        alignSelf: 'center'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#2196f3',
        width: 60
    },
    searchResult: {
        height: 40,
    },
    text: {
        fontSize: 18,
        color: 'white'
    },
    margins: {
        marginVertical: 5,
        marginHorizontal: 10,
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
    selected: {
        height: 'auto'
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