import React from 'react';
import { StyleSheet} from 'react-native';

const KanbanStyles = StyleSheet.create({
    container:{
        position:'absolute',
        left:0,
        right:0,
        top:120,
        flexWrap: "wrap",
        height: 745,
        // alignItems:'center'
    },
    renderTabs : {
        backgroundColor: "#baefab",
        textAlign: "center",
        flexDirection: 'row',
        justifyContent:'space-evenly',
        flexWrap:'wrap',
        height: 35,

    },
    renderTasks: {
        display: 'flex',
        flexDirection: 'row',
    },
    tasks:{
        alignItems:'center',
        // justifyContent:'center',
    },
    taskItems: {
        width: 400,
        marginBottom: 5,
    },
    checkedTab:{
        backgroundColor: "#FFFFFF",
    },

});

export default KanbanStyles;
