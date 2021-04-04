import React from 'react';
import { StyleSheet} from 'react-native';

const GanttBlockEditorStyles = StyleSheet.create({
    blockcontainer:{
        alignContent:'center',
        height: 500,
        width: 300,
        backgroundColor: "#baefab",
        borderColor: "#20232a",
        borderRadius: 20,
    },
    blocktitle:{
        alignContent:'center',
        padding: 50,
        fontSize: 20,
        fontWeight: "bold",
        fontFamily:'Arial'
    },
    blockbuttonedit:{
        alignContent:'flex-end',
        fontWeight: "bold",
        fontFamily:'Arial',
        paddingTop:30,
        paddingLeft:50
    },
    blockbuttonback:{
        alignContent:'flex-end',
        fontWeight: "bold",
        fontFamily:'Arial',
        paddingLeft:50
    },
    blockbuttonclear:{
        alignContent:'flex-end',
        fontWeight: "bold",
        fontFamily:'Arial',
        paddingLeft:50
    },
    blocktext:{
        alignContent:'center',
        paddingLeft:50,
        fontSize: 15,
        fontFamily:'Arial'
    },
    buttoneditlist:{
        alignContent:'center',
        borderColor:'black',
        marginBottom:1,
        marginTop:1,
        borderRadius: 6,
        textAlign: "center",
        justifyContent:'center',
        paddingTop: 10
    }

});

export default GanttBlockEditorStyles;
