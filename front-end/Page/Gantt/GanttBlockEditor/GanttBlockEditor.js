import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import GanttBlockEditorStyles from "./GanttBlockEditorStyle";
import TaskService from "../../../Service/Task.service"

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
                <Text style={GanttBlockEditorStyles.blocktext}>
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
                        <Text style={GanttBlockEditorStyles.blockbuttonclear}>
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
        let OriginTasks =  this.props.task;
        for (let i = 0; i < OriginTasks.length; i++) {
            if (OriginTasks[i].status === "To-Do" || OriginTasks[i].status === "In Progress") {
                availableTasks.push(
                    (<TouchableHighlight
                        onPress={() => this.handleUnsavedChange(OriginTasks[i].title, OriginTasks[i].id)}
                    >
                        <View style={GanttBlockEditorStyles.buttoneditlist}>
                            <Text style={GanttBlockEditorStyles.blocktext}>
                                {OriginTasks[i].title}
                            </Text>
                            <Text style={GanttBlockEditorStyles.blocktext}>
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
            <View style={GanttBlockEditorStyles.blockcontainer}>
                <Text style={GanttBlockEditorStyles.blocktitle}>
                    {this.props.month + "-" + this.props.day + "-" + this.props.year + "   " + this.props.hour + ":00"}
                </Text>
                {this.renderContent()}
                <TouchableHighlight
                    onPress={() => this.handleEditPressed()}
                >
                    <Text style={GanttBlockEditorStyles.blockbuttonedit}>
                        {mode === "View"? "Edit": "Save"}
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => this.props.return()}
                >
                    <Text style={GanttBlockEditorStyles.blockbuttonback}>
                        Back
                    </Text>
                </TouchableHighlight>
                {this.renderEditPanel()}
            </View>
        );
    }

    handleEditPressed () {
        let {mode} = this.state;
        console.log(mode);
        if (mode === "View") {
            this.setState({
                mode: "Edit"
            });
        }
        else {
            let {unsavedTitle, unsavedId} = this.state;
            let {title} = this.state;
            console.log(unsavedTitle);
            if (this.props.booked === 1 && unsavedId !== 0 && !(unsavedId < 0)) {
                // update
                let data  = {
                    year: this.props.year,
                    month: this.props.month,
                    day: this.props.day,
                    hour: this.props.hour,
                    email: this.props.email,
                    title: unsavedTitle,
                    task_id: unsavedId
                };
                console.log(data);
                let result = TaskService.alterDailySchedule(data);
                this.setState({title: unsavedTitle});
            }
            else if (this.props.booked === 0 && unsavedId !== 0 && !(unsavedId < 0)) {
                let data  = {
                    year: this.props.year,
                    month: this.props.month,
                    day: this.props.day,
                    hour: this.props.hour,
                    email: this.props.email,
                    title: unsavedTitle,
                    task_id: unsavedId
                };
                console.log(data);
                let result = TaskService.addDailySchedule(data);
                this.setState({title: unsavedTitle});
            }
            else if (this.props.booked === 1 && unsavedId < 0) {
                // delete
                let data = {
                    year: this.props.year,
                    month: this.props.month,
                    day: this.props.day,
                    hour: this.props.hour,
                    email: this.props.email
                };
                let result = TaskService.removeDailySchedule(data);
                this.setState({title: null})

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
        console.log(nTitle);
        this.setState({
            unsavedTitle: nTitle,
            unsavedId: nId
        });
    }
}

export default GanttBlockEditor;
