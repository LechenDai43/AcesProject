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
                content: this.props.content,
                title: this.props.content.title,
                deadline: this.props.content.deadline,
                duration: this.props.content.duration,
                difficulty: this.props.content.difficulty,
            });
            content = this.props.content;
        }
        if (mode === "View") {
            return (
                <View style={TaskDetailStyles.taskcontainer}>
                    <View>
                        <Text style={TaskDetailStyles.tasktext}>Title:</Text>
                        <Text style={TaskDetailStyles.tasktext}>{content.title}</Text>
                    </View>
                    <View>
                        <Text style={TaskDetailStyles.tasktext}>Deadline:</Text>
                        <Text style={TaskDetailStyles.tasktext}>{content.deadline}</Text>
                    </View>
                    <View>
                        <Text style={TaskDetailStyles.tasktext}>Estimate Time:</Text>
                        <Text style={TaskDetailStyles.tasktext}>{content.duration}</Text>
                        <Text style={TaskDetailStyles.tasktext}>Estimate Difficulty:</Text>
                        <Text style={TaskDetailStyles.tasktext}>{content.difficulty}</Text>
                    </View>
                    <TouchableHighlight
                        onPress={() => this.setState({mode: "Edit"})}
                    >
                        <Text style={TaskDetailStyles.taskbutton}>Edit</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={() => this.props.nextFunction(content)}
                    >
                        <Text style={TaskDetailStyles.taskbutton}>{this.props.nextText}</Text>
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
            let {title} = this.state;
            return (
                <View style={TaskDetailStyles.taskcontainer}>
                    <View>
                        <Text style={TaskDetailStyles.tasktext}>Title:</Text>
                        <TextInput
                            onChangeText={(t) => this.setState({title: t})}
                            value={title}
                            style={TaskDetailStyles.tasktext}
                        />
                    </View>
                    <View>
                        <Text style={TaskDetailStyles.tasktext}>Deadline:</Text>
                        <View>
                            <Text style={TaskDetailStyles.tasktext}>Year:</Text>
                            <TextInput
                                onChangeText={(t) => this.setState({year: t})}
                                keyboardType="numeric"
                                value={year}
                                style={TaskDetailStyles.tasktext}
                            />
                            <Text style={TaskDetailStyles.tasktext}>Month:</Text>
                            <TextInput
                                onChangeText={(t) => this.setState({month: t})}
                                keyboardType="numeric"
                                value={month}
                                style={TaskDetailStyles.tasktext}
                            />
                            <Text style={TaskDetailStyles.tasktext}>Day:</Text>
                            <TextInput
                                onChangeText={(t) => this.setState({day: t})}
                                keyboardType="numeric"
                                value={day}
                                style={TaskDetailStyles.tasktext}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={TaskDetailStyles.tasktext}>Estimate Time:</Text>
                        <TextInput
                            onChangeText={(t) => this.setState({duration: t})}
                            value={content.duration}
                            style={TaskDetailStyles.tasktext}
                        />
                        <Text style={TaskDetailStyles.tasktext}>Estimate Difficulty:</Text>
                        <TextInput
                            onChangeText={(t) => this.setState({difficulty: t})}
                            value={content.difficulty}
                            style={TaskDetailStyles.tasktext}
                        />
                    </View>
                    <TouchableHighlight
                        onPress={() => this.handleSave()}
                    >
                        <Text style={TaskDetailStyles.taskbutton}>Save</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={() => this.props.deleteFunction(this.props.content)}
                    >
                        <Text style={TaskDetailStyles.taskbutton}>Delete</Text>
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
