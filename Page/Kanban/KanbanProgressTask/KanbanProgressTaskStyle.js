import React from 'react';
import { StyleSheet} from 'react-native';

const KanbanProgressTaskStyles = StyleSheet.create({
    task : {
        alignItems: "center",
        justifyContent:'space-between',
        marginTop:5,        
    },
    title :{
        alignContent:'center',
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "Cochin"
    },
    font :{
        alignContent:'center',
        fontSize: 15,
    }


});

export default KanbanProgressTaskStyles;
