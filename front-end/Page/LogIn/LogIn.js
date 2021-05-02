import React, { Component } from "react";
import {View, TouchableHighlight, Text, TextInput} from 'react-native';
import LogInStyles from "./LogInStyle";
import UserService from "../../Service/User.service";

class LogIn extends Component{
    constructor(props){
        super(props);
        this.state ={
            text:"",
            password: "",
            key: ""
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
                        onChangeText={(text) => this.setState({key: text})}
                        defaultValue={this.state.key}
                    />
                </View>
                <View>
                    <Text style={LogInStyles.logintext}>Password: </Text>
                    <TextInput
                        placeholder = "Type password"
                        onChangeText={(text) => this.setState({password: text})}
                        defaultValue={this.state.password}
                        secureTextEntry={true}
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
        let {key, password} = this.state;
        const sha256 = require('js-sha256');
        sha256(password);
        let hash = sha256.create().hex();
        let data = {
            'username': key
        };
        let result = UserService.loginUser(data);
        let self = this;
        result.then((result_data) => {
            if (result_data.data === "Not Found") {
                self.setState({text: "The username does not exist."});
            }
            else {
                let {email, password} = result_data.data;
                if (password !== hash) {
                    self.setState({text: "The password is not correct."});
                }
                else {
                    self.props.handler(email);
                }
            }
        })
    }
}
export default LogIn;
