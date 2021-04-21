import React from 'react';
import { StyleSheet} from 'react-native';

const KanbanTaskSimpleViewStyle = StyleSheet.create({
    detail :{
        position:'absolute',
        alignItems: "center",
        backgroundColor: '#DEF9D7',
        fontSize: 50,
        margin:20,
        padding:5,
        marginLeft:3,
        marginRight:3,
        height: 200,
        top:50,
        right:10,
        left:10,
        justifyContent:'center',  
        borderColor:'#EEE1FA',
        borderWidth:5,
        borderRadius: 50,
        zIndex:1,
    },

    font : {
        fontSize: 15,
        fontWeight: "bold",
    },
    topDetail:{
        position:'relative',
        fontSize:15,
        marginBottom:10,
        marginLeft:-40,
    },
});

export default KanbanTaskSimpleViewStyle;
