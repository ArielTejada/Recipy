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
    }
})