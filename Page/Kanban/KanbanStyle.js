import React from 'react';
import { StyleSheet} from 'react-native';

const KanbanStyles = StyleSheet.create({
    renderTabs : {
        backgroundColor: "#efbaab",
        marginBottom:30,
        marginTop:0,
        borderColor: "#20232a",
        borderRadius: 6,
        textAlign: "center",
        flexDirection: 'row',
        justifyContent:'space-evenly',
        flexWrap:'wrap',
    },
    renderTasks: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center'
    }

});

export default KanbanStyles;
