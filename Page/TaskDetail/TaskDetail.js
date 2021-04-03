import React, { Component } from "react";
import {View, TouchableHighlight, Text, TextInput} from 'react-native';
import TaskDetailStyles from "./TaskDetailStyle";

class TaskDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: this.props.mode,
            content: this.props.content,
            title: this.props.content.title,
            deadline: this.props.content.deadline,
            duration: this.props.content.duration,
            difficulty: this.props.content.difficulty,
            year: 0,
            month: 0,
            day: 0
        }
    }

    render() {
        let {mode, content} = this.state;
        if (content !== this.props.content) {
            this.setState({
                mode: this.props.mode,
                content: this.props.content
            });
            content = this.props.content;
        }
        if (mode === "View") {
            return (
                <View>
                    <View>
                        <Text>Title:</Text>
                        <Text>{content.title}</Text>
                    </View>
                    <View>
                        <Text>Deadline:</Text>
                        <Text>{content.deadline}</Text>
                    </View>
                    <View>
                        <Text>Estimate Time:</Text>
                        <Text>{content.duration}</Text>
                        <Text>Estimate Difficulty:</Text>
                        <Text>{content.difficulty}</Text>
                    </View>
                    <TouchableHighlight
                        onPress={() => this.setState({mode: "Edit"})}
                    >
                        <Text>Edit</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={() => this.props.nextFunction(content)}
                    >
                        <Text>{this.props.nextText}</Text>
                    </TouchableHighlight>
                </View>
            );
        }
        else if (mode === "Edit") {
            let dateline = content.deadline.split("-");
            let now = new Date(Date.now());
            let year = now.getFullYear();
            let month = now.getMonth();
            let day = now.getDate();
            if (dateline.length > 0) {
                month = dateline[0];
                day = dateline[1];
                year = dateline[2];
            }
            return (
                <View>
                    <View>
                        <Text>Title:</Text>
                        <TextInput
                            onChangeText={(t) => this.setState({title: t})}
                            value={content.title}
                        />
                    </View>
                    <View>
                        <Text>Deadline:</Text>
                        <View>
                            <Text>Year:</Text>
                            <TextInput
                                onChangeText={(t) => this.setState({year: t})}
                                keyboardType="numeric"
                                value={year}
                            />
                            <Text>Month:</Text>
                            <TextInput
                                onChangeText={(t) => this.setState({month: t})}
                                keyboardType="numeric"
                                value={month}
                            />
                            <Text>Day:</Text>
                            <TextInput
                                onChangeText={(t) => this.setState({day: t})}
                                keyboardType="numeric"
                                value={day}
                            />
                        </View>
                    </View>
                    <View>
                        <Text>Estimate Time:</Text>
                        <TextInput
                            onChangeText={(t) => this.setState({duration: t})}
                            value={content.duration}
                        />
                        <Text>Estimate Difficulty:</Text>
                        <TextInput
                            onChangeText={(t) => this.setState({difficulty: t})}
                            value={content.difficulty}
                        />
                    </View>
                    <TouchableHighlight
                        onPress={() => this.handleSave()}
                    >
                        <Text>Save</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={() => this.props.deleteFunction(this.props.content)}
                    >
                        <Text>Delete</Text>
                    </TouchableHighlight>
                </View>
            );
        }

    }

    handleSave() {
        let {title, content, duration, difficulty, year, month, day} = this.state;
        let deadline = month + "-" + day + "-" + year;
        content.title = title;
        content.duration = duration;
        content.difficulty = difficulty;
        this.setState({
            content: content,
            deadline: deadline,
            mode: "View"
        })
    }
}

export default TaskDetail;
