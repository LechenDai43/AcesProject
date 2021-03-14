import React, { Component } from 'react';

import {Button, StyleSheet, Text, View} from 'react-native';
import {Card} from 'react-native-elements';

class KanbanBoxList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "parent": props
        };
    }

    render(){
        const setStatus = (newStatus) => {
            this.state.parent.state.newTabFunction(newStatus);
            console.log(newStatus);
        }
        return (
            <Card>
                <Button className="kanban-box-name" title="Todo" onPress={() => setStatus("Todo")}></Button>
                <Button className="kanban-box-name" title="In Progress" onPress={() => setStatus("In Progress")}></Button>
                <Button className="kanban-box-name" title="Done" onPress={() => setStatus("Done")}></Button>
                <Button className="kanban-box-name" title="Failed" onPress={() => setStatus("Failed")}></Button>
                <Button className="kanban-box-name" title="Requested" onPress={() => setStatus("Requested")}></Button>
                <Button className="kanban-box-name" title="Overdue" onPress={() => setStatus("Overdue")}></Button>
                <Button className="kanban-box-name" title="Freeze" onPress={() => setStatus("Freeze")}></Button>
            </Card>
        );
    }
}

export default KanbanBoxList;
