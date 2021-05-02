import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import { makeRedirectUri, useAuthRequest, useAutoDiscovery } from 'expo-auth-session';


const SubmitAuth = ()=>{

    const discovery = useAutoDiscovery('https://login.microsoftonline.com/482198bb-ae7b-4b25-8b7a-6d7f32faa083/v2.0');

    const [request, response, promptAsync] = useAuthRequest(
      {
        clientId: 'c80aa4a4-b8c4-414d-8b99-c99e1d0e4401',
        scopes: ['openid', 'profile', 'email', 'offline_access'],
        redirectUri: makeRedirectUri({
          scheme: 'exp://192.168.1.137:19000'
          }),
      },
      discovery
    );

    return (
      <View>
        <TouchableHighlight
          onPress={() => {promptAsync();}}
          style={SubmitAuthStyles.authsubmit}
          >
          <Text style = {SubmitAuthStyles.authtext}>Export</Text>
        </TouchableHighlight>
      </View>
      
    );

}

const SubmitAuthStyles = StyleSheet.create({
    authtext:{
        fontSize: 15,
        fontWeight: "bold",
        fontFamily:'Arial',
        paddingTop: 6,
        paddingLeft: 10,
        paddingTop:10
    },
    authsubmit:{
        marginLeft: 10,
        marginBottom:5,
        paddingLeft:5,
        height: 30,
        width: 80,
        backgroundColor: "#FFFFFF",
    }
});
  

export default SubmitAuth;