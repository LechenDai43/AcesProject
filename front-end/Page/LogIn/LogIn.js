import React, { Component } from "react";
import {View, TouchableHighlight, Text, TextInput} from 'react-native';
import LogInStyles from "./LogInStyle";

class LogIn extends Component{
    constructor(props){
        super(props);
        this.state ={
            text:""
        };

    }
    renderBody(){
        return(
            <View style={LogInStyles.logincontainer}>
                <Text style={LogInStyles.logintext}>Log In</Text>
                <View>
                    <Text style={LogInStyles.logintext}>Username:</Text>
                    <TextInput
                        placeholder = "Type username"
                    />
                </View>
                <View>
                    <Text style={LogInStyles.logintext}>Password: </Text>
                    <TextInput
                        placeholder = "Type password"
                    />
                </View>
                <View>
                    <TouchableHighlight
                        onPress={() => this.handleSubmit()}
                        style ={LogInStyles.loginsubmit}
                        >
                        <Text style={LogInStyles.logintext}>Submit</Text>
                    </TouchableHighlight>
                    <Text>{this.state.text}</Text>
                </View>
            </View>
        );
    }
    render(){
        return(
            <View>
                {this.renderBody()}
            </View>
        )

    }
    handleSubmit(){
        //connnect to canvas api
        this.setState({
            text: "Connect to Canvas"
        })
    }
}
export default LogIn;