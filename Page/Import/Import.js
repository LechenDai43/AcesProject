import React, { Component } from "react";
import {View, TouchableHighlight, Text, TextInput} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import TaskDetail from "../TaskDetail/TaskDetail";
import ImportStyles from "./ImportStyle";
import OriginTasks from "../FakeData/OriginTasks";
import ImportedTasks from "../FakeData/ImportedTasks";

class Import extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: "Choose",
            pickerValue: "Canvas",
            username: "",
            password: "",
            pointer: -1,
            stack: []
        };
    }

    renderBody() {
        let {mode} = this.state;
        if (mode === "Choose") {
            let {pickerValue} = this.state;
            return (
                <View style={ImportStyles.importcontainer}>
                    <View>
                        <Text style={ImportStyles.importtext}>From: </Text>
                        <DropDownPicker
                            onChangeItem={(v) => this.setState({pickerValue: v.value})}
                            items={[
                                {label: "Canvas", value: "Canvas"},
                                {label: "OutLook", value: "OutLook"}
                            ]}
                            containerStyle={{height: 40, width: 200}}
                            defaultValue={pickerValue}
                           
                        />
                    </View>
                    <View >
                        <Text style={ImportStyles.importtext}>Username: </Text>
                        <TextInput
                            onChangeText={(t) => this.setState({username: t})}
                            style={ImportStyles.importtext}
                        />
                    </View>
                    <View>
                        <Text style={ImportStyles.importtext}>Password: </Text>
                        <TextInput
                            secureTextEntry={true}
                            onChangeText={(t) => this.setState({password: t})}
                            style={ImportStyles.importtext}
                        />
                    </View>
                    <TouchableHighlight
                        onPress={() => this.handleSubmit()}
                    >
                        <Text style={ImportStyles.importsubmit}>Submit</Text>
                    </TouchableHighlight>
                </View>
            );
        }
        else if (mode === "Imported") {
            let {pointer, stack} = this.state;
            if (pointer > -1 && stack.length > 0 && pointer < stack.length) {
                return (
                    <TaskDetail
                        mode={"Edit"}
                        content={stack[pointer]}
                        nextText={pointer === stack.length - 1? "Finish": "Next"}
                        nextFunction={pointer === stack.length - 1? (c) => this.handleFinishTask(c): (c) => this.handleNextTask(c)}
                        deleteFunction={() => this.handleDeleteTask()}
                    />
                );
            }
            else {
                this.setState({mode: "Choose"})
            }
        }
    }

    render() {
        return (
            <View>
                {this.renderBody()}
            </View>
        );
    }

    handleSubmit() {
        let {pickerValue, password, username} = this.state;
        if (password !== "" && username !== "") {
            // Call API to import data
            this.setState({
                mode: "Imported",
                pointer: 0,
                stack: ImportedTasks
            })
        }
    }

    handleNextTask(content) {
        let newTask = {
            id: content.id,
            title: content.title,
            deadline: content.deadline,
            duration: content.duration,
            difficulty: content.difficulty,
            failed: 0,
            overdue: 0,
            progress: 0,
            status: "To-Do"
        };
        OriginTasks.push(newTask);
        let {pointer} = this.state;
        this.setState({pointer: pointer + 1});
        this.forceUpdate();
    }

    handleFinishTask(content) {
        let newTask = {
            id: content.id,
            title: content.title,
            deadline: content.deadline,
            duration: content.duration,
            difficulty: content.difficulty,
            failed: 0,
            overdue: 0,
            progress: 0,
            status: "To-Do"
        };
        OriginTasks.push(newTask);
        this.setState({
            pointer: -1,
            stack: [],
            mode: "Choose"
        });
        this.forceUpdate();
    }

    handleDeleteTask() {
        let {pointer} = this.state;
        this.setState({
            pointer: pointer + 1
        });
        this.forceUpdate();
    }
}

export default Import;
