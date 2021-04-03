import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import KanbanProgressTask from "../KanbanProgressTask/KanbanProgressTask";
import KanbanTaskSimpleViewStyle from "./KanbanTaskSimpleViewStyle";

class KanbanTaskSimpleView extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <View style = {KanbanTaskSimpleViewStyle.detail}>
                <KanbanProgressTask
                    detail={{
                        title: this.props.detail.title,
                        deadline: this.props.detail.deadline,
                        progress: this.props.detail.deadline,
                        duration: this.props.detail.duration
                    }}
                />
                <Text>
                    {"Difficulty: " + this.props.detail.difficulty}
                </Text>
                <TouchableHighlight
                    onPress={() => this.props.handler()}
                >
                    <Text>
                        Change Status
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => this.props.close()}
                >
                    <Text style = {KanbanTaskSimpleViewStyle.font}>
                        CLOSE
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => this.props.redirect()}
                >
                    <Text style = {KanbanTaskSimpleViewStyle.font}>
                        DETAIL
                    </Text>
                </TouchableHighlight>

            </View>
        );
    }
}


export default KanbanTaskSimpleView;
