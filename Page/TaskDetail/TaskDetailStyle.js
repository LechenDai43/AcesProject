import React from 'react';
import { StyleSheet} from 'react-native';

const TaskDetailStyles = StyleSheet.create({
    taskcontainer:{
        alignContent:'center',
        height: 400,
        width: 300,
        backgroundColor: "#baefab",
        borderColor: "#20232a",
        borderRadius: 20,
    },
    tasktext:{
        fontSize: 15,
        fontWeight: "bold",
        fontFamily:'Arial',
        paddingLeft: 10,
        paddingTop: 5
    },
    taskinput:{
        marginLeft:5,
        paddingLeft:5
    },
    taskbutton:{
        backgroundColor: "white",
        marginTop:5,
        paddingTop:5,
        borderColor: "white",
        borderRadius: 20,
        textAlign: "center",
        height:30,
        width:80,
        fontSize: 15,
        fontWeight: "bold",
        fontFamily:'Arial',
        marginLeft:10
    }
});

export default TaskDetailStyles;
