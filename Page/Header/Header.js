import React, { Component } from "react";
import { View, TouchableHighlight, Text } from 'react-native';
import HeaderStyles from "./HeaderStyle";

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>
                    Efficiency++
                </Text>
                <View>
                    <TouchableHighlight>
                        <Text>
                            Add Tasks...
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight>
                        <Text>
                            Import Tasks...
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}


export default Header;
