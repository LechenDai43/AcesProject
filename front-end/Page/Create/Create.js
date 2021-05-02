import React, { Component } from "react";
import {View, TouchableHighlight, Text, TextInput} from 'react-native';
import TaskDetail from "../TaskDetail/TaskDetail";

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Null',
            year: -1,
            month: -1,
            day: -1,
            duration: -1,
            difficulty: -1
        };
    }

    render() {
        return (
            <View>
                <TaskDetail
                    mode={"Edit"}
                    content={{
                        title: 'Null',
                        deadline: "0-0-0",
                        duration: 0,
                        difficulty: 0
                    }}
                    nextText={"Create"}
                    nextFunction={(c) => this.handleFinishTask(c)}
                    deleteFunction={() => this.handleDeleteTask()}
                />
            </View>
        );
    }

    handleFinishTask(content) {
        let {title, deadline, duration, difficulty} = content;
        let dateline = deadline.split("-");
        let now = new Date(Date.now());
        let year = now.getFullYear();
        let month = now.getMonth();
        let day = now.getDate();
        if (dateline.length > 0) {
            month = dateline[0];
            day = dateline[1];
            year = dateline[2];
        }
        let data = {
            day: day,
            month: month,
            year: year,
            difficulty: difficulty,
            duration: duration,
            failed: -1,
            overdue: -1,
            progress: 0,
            status: "To-Do",
            title: title,
            email: this.props.email
        };
        console.log(data);
        // connect backend api
    }

    handleDeleteTask() {

    }
}

export default Create;
