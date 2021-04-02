import React from 'react';
import { StyleSheet} from 'react-native';

const FooterStyles = StyleSheet.create({
    icon: {
        backgroundColor: "#abbaef",
        height: 60,
        paddingRight: 22,
        paddingLeft: 26
    },
    parent: {
        flexDirection: "row",
        backgroundColor: "#abbaef",
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
        flexWrap: "wrap"
    },
    checked: {
        backgroundColor: "#7887cd",
    }
});

export default FooterStyles;
