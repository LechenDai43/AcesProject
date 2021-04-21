import React from 'react';
import { StyleSheet} from 'react-native';

const GanttHourlyBlockStyles = StyleSheet.create({
    hourcontainer: {
        alignItems: "center",
        justifyContent:'space-between',
        marginTop:2,        
    },
    hourtab: {
        backgroundColor: "#baefab",
        marginBottom:1,
        marginTop:1,
        borderColor: "#20232a",
        borderRadius: 6,
        textAlign: "center",
        height:30,
        width:250,
        justifyContent:'center',

    },
    hourtext: {
        alignContent:'center',
        fontSize: 10,
        fontFamily:'Arial'
    },
    hourtask: {
        alignContent:'center',
        fontSize: 12,
        fontFamily:'Arial',
        fontWeight: "bold",
    }
});

export default GanttHourlyBlockStyles;
