import React, { Component } from "react";
import { View, TouchableHighlight, Text } from 'react-native';
import HeaderStyles from "./HeaderStyle";

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View
                style={[HeaderStyles.parent]}
            >
                <Text
                    style={[HeaderStyles.logo]}
                >
                    Efficiency++
                </Text>
                <View
                    style={[HeaderStyles.rightEdge]}
                >
                    <TouchableHighlight
                        style={[HeaderStyles.rightTouch]}
                        onPress={() => this.props.addHandler}
                    >
                        <Text>
                            Add Tasks
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={[HeaderStyles.rightTouch]}
                        onPress={() => this.props.importHandler()}
                    >
                        <Text>
                            Import Tasks
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}


export default Header;
