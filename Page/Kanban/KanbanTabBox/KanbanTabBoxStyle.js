import React from 'react';
import { StyleSheet} from 'react-native';

const KanbanTabBoxStyle = StyleSheet.create({
    tabBox : {
        display:'flex',
        marginTop:20,
        backgroundColor: "#efbaab",
        flexDirection: 'row',
        justifyContent:'space-evenly',
        flexWrap:'wrap',
        padding: 10,
      
    },
    tabs: {
        fontSize:17,
        fontWeight: "bold",
        fontFamily:'Arial'
    }
});

export default KanbanTabBoxStyle;
