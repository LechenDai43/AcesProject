import React from 'react';
import { StyleSheet} from 'react-native';

const LogInStyles = StyleSheet.create({
    logincontainer:{
        alignContent:'center',
        height: 150,
        width: 200
    },
    logintext:{
        fontSize: 15,
        fontWeight: "bold",
        fontFamily:'Arial',
        paddingTop: 6
    },
    loginsubmit:{
        marginTop:5,
        marginBottom:5,
        paddingLeft:5,
        height: 25,
        width: 70,
        backgroundColor: "#baefab",
        borderColor: "#20232a",
        borderRadius: 8
    }
});

export default LogInStyles;