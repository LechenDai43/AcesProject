import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import OriginTasks from "../FakeData/OriginTasks";
import KanbanTab from "./KanbanTab/KanbanTab";
import KanbanUnprogressTask from "./KanbanUnprogressTask/KanbanUnprogressTask";
import KanbanProgressTask from "./KanbanProgressTask/KanbanProgressTask";
import KanbanStyles from "./KanbanStyle";
import KanbanTabBox from "./KanbanTabBox/KanbanTabBox";
import KanbanTaskSimpleView from "./KanbanTaskSimpleView/KanbanTaskSimpleView";

let tasks = [];
for (let ii = 0; ii < OriginTasks.length; ii += 1) {
    tasks.push(OriginTasks[ii]);
}

// These variables holds what tabs are progressed and what are not
const unprogressedTab = new Set(["To-Do", "Done", "Requested", "Freeze"]);
const progressedTab = new Set(["In Progress", "Failed", "Overdue"]);

class Kanban extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // This variable holds all the possible tabs
            tabs: ["To-Do", "In Progress", "Done", "Failed", "Requested", "Overdue", "Freeze"],
            // This variable holds all the tabs shown on the bar
            toggledTabs: ["To-Do", "In Progress", "Done", "More"],
            // This variable holds the current showing tab
            currentTab: "Done",
            // This variable holds what the list of boxes is for
            mode: "Unknown",
            // This variable holds the id of the pressed task
            taskId: -1
        }
    }

    // This renders the clickable tabs
    renderTabs () {
        let {toggledTabs} = this.state;
        let toggledTabElements = [];
        for (let i = 0; i < toggledTabs.length; i += 1) {
            toggledTabElements.push(
                (<TouchableHighlight
                    onPress={() => this.clickTabHandler(toggledTabs[i])}
                >
                    <KanbanTab
                        title={toggledTabs[i]}
                    />
                </TouchableHighlight>)
            );
        }
        return toggledTabElements;
    }

    // This renders the tasks under the current tab
    renderTasks() {
        // Get the current tab from the state
        let {currentTab} = this.state;
        // Prepare return variable
        let displayedTasks = [];

        // If the tabs is not a progressed tab
        if (unprogressedTab.has(currentTab)) {
            for (let i = 0; i < tasks.length; i += 1) {
                let task = tasks[i];
                if (task.status === currentTab) {
                    displayedTasks.push(
                        (<TouchableHighlight

                            onPress={() => this.clickTaskHandler(task.id)}
                        >
                            <KanbanUnprogressTask
                                detail={{
                                    title: task.title,
                                    deadline: task.deadline
                                }}
                            />
                        </TouchableHighlight>)
                    );
                }
            }
        }
        // If the tab is a progressed tab
        else if (progressedTab.has(currentTab)) {
            for (let i = 0; i < tasks.length; i += 1) {
                let task = tasks[i];
                if (task.status === currentTab) {
                    displayedTasks.push(
                        (<TouchableHighlight

                            onPress={() => this.clickTaskHandler(task.id)}
                        >
                            <KanbanProgressTask
                                detail={{
                                    title: task.title,
                                    deadline: task.deadline,
                                    progress: task.progress,
                                    duration: task.duration
                                }}
                            />
                        </TouchableHighlight>)
                    );
                }
            }
        }

        return displayedTasks;
    }

    // This function renders the full list of tabs when necessary
    renderBoxList() {
        let {mode, tabs} = this.state;
        if (mode === "More") {
            return (
                (<KanbanTabBox
                    list={tabs}
                    handler={(value) => this.moreModeHandler(value)}
                />)
            );
        }
        else if (mode === "Transfer") {
            return (
                (<KanbanTabBox
                    list={tabs}
                    handler={(value) => this.transferModeHandler(value)}
                />)
            );
        }

    }

    // This function renders the simple view of a task when necessary
    renderTaskSimpleView() {
        // Get the id of the chosen task
        let {taskId} = this.state;
        // Prepare the target task
        let target = null;
        // Find the target task by the id
        for (let i = 0; i < tasks.length; i += 1) {
            if (tasks[i].id === taskId) {
                target = tasks[i];
                break;
            }
        }

        // If the task is not found, then render nothing
        if (target === null) {
            return null;
        }

        // If the task is found, then open the simple view
        return (
            <KanbanTaskSimpleView
                detail={target}
                handler={() => this.toggleTransferMode()}
                close={() => this.closeTaskSimpleView()}
                redirect={() => this.props.openTask(taskId)}
            />
        );

    }

    render() {
        return (
            <View>
                <View style={KanbanStyles.renderTabs}>
                    {this.renderTabs()}
                </View>

                <View>
                    {this.renderTasks()}
                </View>
                
                {this.renderTaskSimpleView()}
                {this.renderBoxList()}

            </View>
        );
    }

    // This function handle a press on a tab
    clickTabHandler(key) {
        // If the more tab is pressed, then render the list of boxes
        if (key === "More") {
            this.setState({mode: "More"});
        }
        // Otherwise, check the validation of the pressed tab and render tasks on valid case
        else {
            // Set the mode back to unknown, so the list of boxes is not rendered
            this.setState({mode: "Unknown"});

            // Get all the toggled tabs
            let {toggledTabs} = this.state;
            let tabsSet = new Set(toggledTabs);
            // Check the validation
            if (tabsSet.has(key)) {
                this.setState({currentTab: key});
            }

            // If any new opened tab is not used anymore, hide it
            let temSet = new Set(["To-Do", "In Progress", "Done", "More"]);
            if (temSet.has(key)) {
                this.setState({toggledTabs: ["To-Do", "In Progress", "Done", "More"]})
            }
        }
    }

    // This handles the click of a task
    clickTaskHandler(key) {
        // Prepare the target task
        let target = null;
        // Find the target task by the id
        for (let i = 0; i < tasks.length; i += 1) {
            if (tasks[i].id === key) {
                target = tasks[i];
                break;
            }
        }


        // If the task is not found, then render nothing
        if (target === null) {
            return null;
        }
        this.setState({taskId: key});
    }

    // This handles the click of tab boxes when the mode is more
    moreModeHandler (key) {
        // Get all the available tabs
        let {tabs, toggledTabs} = this.state;
        let tabSet = new Set(tabs);
        let toggledSet = new Set(toggledTabs);

        // Check if a new tab is clicked
        if (tabSet.has(key) && (! toggledSet.has(key))) {
            this.setState({
                mode: "Unknown",
                toggledTabs: ["To-Do", "In Progress", "Done", "More", key],
                currentTab: key
            });
        }
    }

    // This handles the click of tab boxes when the mode is transfer
    transferModeHandler (key) {
        // Get the id of the chosen task
        let {taskId} = this.state;
        // Prepare the target task
        let target = -1;
        // Find the target task by the id
        for (let i = 0; i < tasks.length; i += 1) {
            if (tasks[i].id === taskId) {
                target = i;
                break;
            }
        }

        // If the task is not found, then do nothing
        if (target === -1) {
            return null;
        }

        this.setState({mode: "Unknown"})
        // Set the status of that task to the corresponding key
        tasks[target].status = key;
        // Change some other fields if necessary
        if (key === "Done") {
            tasks[target].progress = tasks[target].duration;
        }
        else if (key === "Failed") {
            tasks[target].failed = 1;
        }
        else if (key === "Overdue") {
            tasks[target].failed = 1;
            tasks[target].overdue = 1;
        }
        else if (key === "Freeze" || key === "Requested") {
            tasks[target].duration = 0;
            tasks[target].progress = 0;
        }

    }

    // This handles if the clicked task is to be transferred
    toggleTransferMode() {
        this.setState({mode: "Transfer"})
    }

    // This close opened task simple view
    closeTaskSimpleView() {
        this.setState({
            mode: "Unknown",
            taskId: -1
        })
    }
}

export default Kanban;
