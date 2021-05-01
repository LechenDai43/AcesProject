import React, { Component } from "react";
import {View, TouchableHighlight, Text, TextInput} from 'react-native';
import LogInStyles from "../LogIn/LogInStyle";
import RegisterStyles from "./RegisterStyle";

class Register extends Component{
    constructor(props){
        super(props);
        this.state ={
            text:""
        };
    }
    render(){
        return(
            <View style={LogInStyles.logincontainer}>
                <Text style={RegisterStyles.registertext}>Create An Account:</Text>
                <View>
                    <Text style={RegisterStyles.registertext}>Create Username:</Text>
                    <TextInput
                        placeholder = "Type username"
                    />
                </View>
                <View>
                    <Text style={RegisterStyles.registertext}>Create Password: </Text>
                    <TextInput
                        placeholder = "Type password"
                    />
                </View>
                <View>
                    <Text style={RegisterStyles.registertext}>Confrim Password: </Text>
                    <TextInput
                        placeholder = "Retype password"
                    />
                </View>
                <View>
                    <TouchableHighlight
                            onPress={() => this.handleSubmit()}
                            style={RegisterStyles.registersubmit}
                            >
                            <Text style={RegisterStyles.registertext}>Submit</Text>
                    </TouchableHighlight>
                    <Text>{this.state.text}</Text>
                </View>
            </View>
        )
        
    }

    handleSubmit(){
        this.setState({
            text: "Added to backend database"
        })
    }

}
export default Register;