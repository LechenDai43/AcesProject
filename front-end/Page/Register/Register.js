import React, { Component } from "react";
import {View, TouchableHighlight, Text, TextInput} from 'react-native';
import LogInStyles from "../LogIn/LogInStyle";
import RegisterStyles from "./RegisterStyle";
import UserService from "../../Service/User.service";

class Register extends Component{
    constructor(props){
        super(props);
        this.state ={
            text:"",
            email: "",
            password: "",
            repass: "",
            username: ""
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
                        onChangeText={(text) => this.setState({username: text})}
                        defaultValue={this.state.username}
                    />
                </View>
                <View>
                    <Text style={RegisterStyles.registertext}>Email:</Text>
                    <TextInput
                        placeholder = "Type email"
                        onChangeText={(text) => this.setState({email: text})}
                        defaultValue={this.state.email}
                    />
                </View>
                <View>
                    <Text style={RegisterStyles.registertext}>Create Password: </Text>
                    <TextInput
                        placeholder = "Type password"
                        onChangeText={(text) => this.setState({password: text})}
                        defaultValue={this.state.password}
                        secureTextEntry={true}
                    />
                </View>
                <View>
                    <Text style={RegisterStyles.registertext}>Confrim Password: </Text>
                    <TextInput
                        placeholder = "Retype password"
                        onChangeText={(text) => this.setState({repass: text})}
                        defaultValue={this.state.repass}
                        secureTextEntry={true}
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
        let {email, password, repass, username} = this.state;
        if (password !== repass) {
            this.setState({
                password: "",
                repass: "",
                text: "The password does not match."
            });
        }
        else if (password.length < 6) {
            this.setState({
                password: "",
                repass: "",
                text: "Password must contain at least 6 character."
            });
        }
        else if (!email.includes("@") || !email.includes(".")) {
            this.setState({
                text: "Please enter a valid email."
            });
        }
        else {
            const sha256 = require('js-sha256');
            sha256(password);
            let hash = sha256.create();
            let data = {
                'username': username,
                'email': email,
                'password': hash.hex()
            };
            let result = UserService.registerUser(data);
            let self = this;
            result.then((result_data) => {
                console.log(result_data);
                if (result_data['data'] === 'valid') {
                    self.props.handler(email);
                }
                else {
                    self.setState({
                        text: "Username or email is used."
                    })
                }
            })
        }
    }

}
export default Register;
