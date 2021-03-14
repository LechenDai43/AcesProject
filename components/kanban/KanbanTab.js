import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Card} from 'react-native-elements';

class KanbanTab extends Component {
    constructor() {
        super();
        this.title = "";
    }

    render(): React.ReactNode {
        return (
            <Text className="kanban-task-title">{this.title}</Text>
        );
    }
}

export default KanbanTab;
