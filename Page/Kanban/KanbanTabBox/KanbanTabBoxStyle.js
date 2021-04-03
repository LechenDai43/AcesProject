import zIndex from '@material-ui/core/styles/zIndex';
import React from 'react';
import { StyleSheet} from 'react-native';

const KanbanTabBoxStyle = StyleSheet.create({
    tabBox : {
        position:'absolute',
        alignItems:'center',
        backgroundColor: "#DEF9D7",
        padding: 10,
        height: 250,
        width:200,
        justifyContent:'center',
        marginBottom:20,
        top: 160,
        left:125,
        right:125,
        borderColor:'#EEE1FA',
        borderWidth:5,
        borderRadius: 30,
        zIndex:2,

    },
    tabs: {
        fontSize:18,
        fontWeight: "bold",
        fontFamily:'Arial',
        padding: 5,
    }
});

export default KanbanTabBoxStyle;
