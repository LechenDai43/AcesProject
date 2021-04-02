import React, { Component } from "react";
import { StyleSheet, Text, View } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";
import FooterStyles from "./FooterStyle";


class Footer extends Component {
    constructor(props) {
        // props should include the following functions/variables
        // props.redirect(string): a function to change page
        super(props);
        this.state = {
            // This variable is holding the current page
            current: "Home",
            // This variable is holding all the pages in this app
            allPage: new Set(["Home", "Calendar", "Kanban", "Timer", "Account"])
        };
    }

    changePage(key) {
        let {page, allPage} = this.state;
        // If set the page to the current page or an unknown page
        if (key === page || (!allPage.has(key))) {
            return false;
        }
        // If set the page to a valid page
        else {
            this.setState({current: key});
            this.props.redirect(key);
        }
    }

    render() {
        let {page, allPage} = this.state;
        return (
            <View
                style={[FooterStyles.parent]}
            >
                <Icon.Button
                    name={"table"}
                    onPress={() => this.changePage("Calendar")}
                    style={[FooterStyles.icon]}
                />
                <Icon.Button
                    name={"carryout"}
                    onPress={() => this.changePage("Kanban")}
                    style={[FooterStyles.icon]}
                />
                <Icon.Button
                    name={"home"}
                    onPress={() => this.changePage("Home")}
                    style={[FooterStyles.icon]}
                />
                <Icon.Button
                    name={"dashboard"}
                    onPress={() => this.changePage("Timer")}
                    style={[FooterStyles.icon]}
                />
                <Icon.Button
                    name={"user"}
                    onPress={() => this.changePage("Account")}
                    style={[FooterStyles.icon]}
                />
            </View>
        );
    }
}

export default Footer;
