import React, { Component } from 'react';
import { Text, View } from 'react-native';
import KanbanProgressTaskStyles from "./KanbanProgressTaskStyle";

class KanbanProgressTask extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>{this.props.detail.title}</Text>
                <View>
                    <Text>{"Deadline: " + this.props.detail.deadline}</Text>
                    <Text>{"Progress: " + this.props.detail.progress + "/" + this.props.detail.duration}</Text>
                </View>
            </View>
        );
    }
}

export default KanbanProgressTask;
