import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import GanttBlockEditorStyles from "./GanttBlockEditorStyle";
import OriginTasks from "../../FakeData/OriginTasks";
import OriginalSchedule from "../../FakeData/OriginalSchedule";

class GanttBlockEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: "View",
            title: this.props.booked === 1? this.props.content.title: "",
            unsavedTitle: "",
            unsavedId: 0
        };
    }

    renderContent() {
        if (this.props.booked === 1) {
            return (
                <Text>
                    {this.props.content.title}
                </Text>
            );
        }
    }

    renderEditPanel() {
        let {mode} = this.state;
        if (mode === "Edit") {
            return (
                <View>
                    <TouchableHighlight onPress={() => this.handleUnsavedClear()}>
                        <Text>
                            Clear
                        </Text>
                    </TouchableHighlight>
                    {this.renderTaskList()}
                </View>
            );
        }
    }

    renderTaskList() {
        let availableTasks = [];
        for (let i = 0; i < OriginTasks.length; i++) {
            if (OriginTasks[i].status === "To-Do" || OriginTasks[i].status === "In Progress") {
                availableTasks.push(
                    (<TouchableHighlight
                        onPress={() => this.handleUnsavedChange(OriginTasks[i].title, OriginTasks[i].id)}
                    >
                        <View>
                            <Text>
                                {OriginTasks[i].title}
                            </Text>
                            <Text>
                                {"Deadline: " + OriginTasks[i].deadline}
                            </Text>
                        </View>
                    </TouchableHighlight>)
                );
            }
        }
        return availableTasks;
    }

    render() {
        let {mode} = this.state;
        return (
            <View>
                <Text>
                    {this.props.month + "-" + this.props.day + "-" + this.props.year + "   " + this.props.hour + ":00"}
                </Text>
                {this.renderContent()}
                <TouchableHighlight
                    onPress={() => this.handleEditPressed()}
                >
                    <Text>
                        {mode === "View"? "Edit": "Save"}
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => this.props.return()}
                >
                    <Text>
                        Back
                    </Text>
                </TouchableHighlight>
                {this.renderEditPanel()}
            </View>
        );
    }

    handleEditPressed () {
        let {mode} = this.state;
        if (mode === "View") {
            this.setState({
                mode: "Edit"
            });
        }
        else {
            let {unsavedTitle, unsavedId} = this.state;
            let {title} = this.state;
            if (this.props.booked === 1 && unsavedId > 0) {
                this.props.content.title = unsavedTitle;
                this.props.content.taskId = unsavedId;
                title = unsavedTitle;
            }
            else if (this.props.booked === 0 && unsavedId > 0) {
                OriginalSchedule.push({
                    title: unsavedTitle,
                    taskId: unsavedId,
                    date: new Date(this.props.year, this.props.month, this.props.day, this.props.hour)
                });
                title = unsavedTitle;
            }
            else if (this.props.booked === 1 && unsavedId < 0) {
                this.props.content.date = new Date(1, 1, 1, 1);
                title = 0;

            }
            this.setState({
                title: title,
                mode: "View",
                unsavedTitle: "",
                unsavedId: 0
            });
        }
    }

    handleUnsavedClear() {
        this.setState({
            unsavedTitle: "",
            unsavedId: -1
        });
    }

    handleUnsavedChange(nTitle, nId) {
        this.setState({
            unsavedTitle: nTitle,
            unsavedId: nId
        });
    }
}

export default GanttBlockEditor;
