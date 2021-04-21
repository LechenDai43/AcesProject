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
            <View style = {[KanbanTaskSimpleViewStyle.detail]}>
                {/* <View style = {[KanbanTaskSimpleViewStyle.topDetail]}> */}
                    <KanbanProgressTask
                        detail={{
                            title: this.props.detail.title,
                            deadline: this.props.detail.deadline,
                            progress: this.props.detail.progress,
                            duration: this.props.detail.duration
                        }}
                    />
                    <Text style = {[KanbanTaskSimpleViewStyle.topDetail]}>
                        {"Difficulty: " + this.props.detail.difficulty}
                    </Text>
                {/* </View> */}
                
                <TouchableHighlight
                    onPress={() => this.props.handler()}
                >
                    <Text style = {KanbanTaskSimpleViewStyle.font}>
                        CHANGE STATUS
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
