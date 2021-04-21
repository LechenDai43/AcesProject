import React, { Component } from 'react';
import { Text, View } from 'react-native';
import KanbanUnprogressTaskStyles from "./KanbanUnprogressTaskStyle";

class KanbanUnprogressTask extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style = {KanbanUnprogressTaskStyles.list}>
                <Text style = {KanbanUnprogressTaskStyles.title}>{this.props.detail.title}</Text>
                <Text style = {KanbanUnprogressTaskStyles.content}>{"Deadline: " + this.props.detail.deadline}</Text>
            </View>
        );
    }
}

export default KanbanUnprogressTask;
