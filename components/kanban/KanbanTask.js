import React, { Component } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import {Card} from 'react-native-elements';

class KanbanTask extends Component {
    constructor() {
        super("");
        this.state = {
            title: "",
            duedate: "",
            difficulty: -1,
            status: ""
        };
    }

    render(){
        return (
            <Card>
                <Text className="kanban-task-title">{this.state.title}</Text>
                <Text className="kanban-task-duedate">{this.state.duedate}</Text>
            </Card>
        );
    }
}

export default KanbanTask;
