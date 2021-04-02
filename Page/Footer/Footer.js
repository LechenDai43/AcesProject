import React, { Component } from "react";
import { View } from 'react-native';
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
        let {current, allPage} = this.state;
        // If set the page to the current page or an unknown page
        if (key === current || (!allPage.has(key))) {
            return false;
        }
        // If set the page to a valid page
        else {
            this.setState({current: key});
            this.props.redirect(key);
        }
    }

    render() {
        let {current, allPage} = this.state;
        let page = current;
        let uncheckedIcon = [FooterStyles.icon];
        let checkedIcon = [FooterStyles.icon, FooterStyles.checked];
        return (
            <View
                style={[FooterStyles.parent]}
            >
                <Icon.Button
                    name={"table"}
                    onPress={() => this.changePage("Calendar")}
                    style={page === "Calendar"? checkedIcon: uncheckedIcon}
                />
                <Icon.Button
                    name={"carryout"}
                    onPress={() => this.changePage("Kanban")}
                    style={page === "Kanban"? checkedIcon: uncheckedIcon}
                />
                <Icon.Button
                    name={"home"}
                    onPress={() => this.changePage("Home")}
                    style={page === "Home"? checkedIcon: uncheckedIcon}
                />
                <Icon.Button
                    name={"dashboard"}
                    onPress={() => this.changePage("Timer")}
                    style={page === "Timer"? checkedIcon: uncheckedIcon}
                />
                <Icon.Button
                    name={"user"}
                    onPress={() => this.changePage("Account")}
                    style={page === "Account"? checkedIcon: uncheckedIcon}
                />
            </View>
        );
    }
}

export default Footer;
