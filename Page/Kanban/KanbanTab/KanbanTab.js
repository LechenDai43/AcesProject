import React, { Component } from 'react';
import { Text } from 'react-native';
import KanbanTabStyles from "./KanbanTabStyle";

class KanbanTab extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Text>
                {this.props.title}
            </Text>
        );
    }
}

export default KanbanTab;
