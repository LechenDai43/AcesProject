import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const FooterStyles = StyleSheet.create({
    icon: {
        backgroundColor: "#abefba",
        height: 60,
        paddingRight: 22,
        paddingLeft: 26
    },
    parent: {
        flexDirection: "row",
        backgroundColor: "#abefba",
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
        flexWrap: "wrap"
    },
    checked: {
        backgroundColor: "#78cd87",
    }
});

export default FooterStyles;
