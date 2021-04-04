import React from 'react';
import { StyleSheet} from 'react-native';

const ImportStyles = StyleSheet.create({
    importcontainer:{
        alignContent:'center',
        height: 300,
        width: 300,
        backgroundColor: "#baefab",
        borderColor: "#20232a",
        borderRadius: 20,
    },
    importtext:{
        fontSize: 15,
        fontWeight: "bold",
        fontFamily:'Arial',
        paddingLeft: 10,
        paddingTop:10
    },
    importsubmit:{
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

export default ImportStyles;
