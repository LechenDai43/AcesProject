import React from 'react';
import { StyleSheet} from 'react-native';

const KanbanUnprogressTaskStyles = StyleSheet.create({
    list:{
        marginBottom:10,
        padding:4,
        alignItems: "center",
        justifyContent:'space-between',
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "Cochin"
    },
    content:{
        fontSize: 15,
        paddingBottom:2,
    }
});

export default KanbanUnprogressTaskStyles;
