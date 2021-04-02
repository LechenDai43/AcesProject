import React from 'react';
import { StyleSheet} from 'react-native';

const HeaderStyles = StyleSheet.create({
    logo: {
        position: "absolute",
        left: 30,
        color: "#baefab",
        fontWeight: "bold",
        fontSize: 30
    },
    parent: {
        flexDirection: "row",
        backgroundColor: "#efbaab",
        position: "absolute",
        left: 0,
        right: 0,
        top: 50,
        alignItems: "center",
        flexWrap: "wrap",
        height: 70
    },
    rightEdge: {
        position: "absolute",
        right: 30,
        alignItems: "center",
        flexWrap: "wrap"
    },
    rightTouch: {
        margin: 5,
        width: 120,
        alignItems: "center"
    }
});

export default HeaderStyles;
