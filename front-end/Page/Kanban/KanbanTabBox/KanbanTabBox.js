import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import KanbanTabBoxStyle from "./KanbanTabBoxStyle";

class KanbanTabBox extends Component {
    constructor(props) {
        super(props);
    }

    renderBox() {
        // Get the list of all the tabs
        let tabs = this.props.list;
        // Prepare the return variable
        let elements = [];
        // Populate the return array
        for (let i = 0; i < tabs.length; i += 1) {
            elements.push(
                (<TouchableHighlight
                    onPress={() => this.props.handler(tabs[i])}
                >
                    <Text style={KanbanTabBoxStyle.tabs}>
                        {tabs[i]}
                    </Text>
                </TouchableHighlight>)
            )
        }

        return elements;
    }

    render() {
        return (
            <View style={KanbanTabBoxStyle.tabBox}>
                {this.renderBox()}
            </View>
        );
    }
}

export default KanbanTabBox;
