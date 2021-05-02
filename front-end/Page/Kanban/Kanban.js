import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import KanbanTab from "./KanbanTab/KanbanTab";
import KanbanUnprogressTask from "./KanbanUnprogressTask/KanbanUnprogressTask";
import KanbanProgressTask from "./KanbanProgressTask/KanbanProgressTask";
import KanbanStyles from "./KanbanStyle";
import KanbanTabBox from "./KanbanTabBox/KanbanTabBox";
import KanbanTaskSimpleView from "./KanbanTaskSimpleView/KanbanTaskSimpleView";
import { ScrollView} from 'react-native';
import TaskService from "../../Service/Task.service"

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
            currentTab: "To-Do",
            // This variable holds what the list of boxes is for
            mode: "Unknown",
            // This variable holds the id of the pressed task
            taskId: -1,
            listHeight: 0,
            lookingTas: 0
        }
        this.tasks = [];
    }

    onUpdate() {
        let result = TaskService.getTask({'email': this.props.email});
        let self = this;
        result.then((result_data) => {
            let taskKeys = Object.keys(result_data.data);
            let tasks = [];
            taskKeys.forEach((key) => {
                let task = result_data.data[key];
                if (task.title !== 'Null') {
                    console.log(typeof task.deadline.day);
                    let formattedTask = {
                        id: key,
                        title: task.title,
                        deadline: task.deadline.month.toString().concat("-").concat(task.deadline.day.toString()).concat("-").concat(task.deadline.year.toString()),
                        duration: task.duration,
                        difficulty: task.difficulty,
                        status: task.status,
                        failed: task.failed,
                        overdue: task.overdue,
                        progress: task.progress
                    };
                    tasks.push(formattedTask);
                }
            });
            self.tasks = tasks;
        });
    }

    // This renders the clickable tabs
    renderTabs () {
        let {toggledTabs, currentTab} = this.state;
        let toggledTabElements = [];
        for (let i = 0; i < toggledTabs.length; i += 1) {
            toggledTabElements.push(
                (<TouchableHighlight
                    style={currentTab === toggledTabs[i]? KanbanStyles.checkedTab: null}
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
        let OriginTasks = this.tasks;

        // If the tabs is not a progressed tab
        if (unprogressedTab.has(currentTab)) {
            for (let i = 0; i < OriginTasks.length; i += 1) {
                let task = OriginTasks[i];
                if (task.status === currentTab) {
                    displayedTasks.push(
                        (<TouchableHighlight
                            style={[KanbanStyles.taskItems]}
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
            for (let i = 0; i < OriginTasks.length; i += 1) {
                let task = OriginTasks[i];
                if (task.status === currentTab) {
                    displayedTasks.push(
                        (<TouchableHighlight
                            style={[KanbanStyles.taskItems]}

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

        let OriginTasks = this.tasks;
        // Get the id of the chosen task
        let {taskId} = this.state;
        // Prepare the target task
        let target = null;
        // Find the target task by the id
        for (let i = 0; i < OriginTasks.length; i += 1) {
            if (OriginTasks[i].id === taskId) {
                target = OriginTasks[i];
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
        this.onUpdate();
        return (
            <View style={[KanbanStyles.container]}>
                <View style={[KanbanStyles.renderTabs]}>
                    {this.renderTabs()}
                </View>

                <ScrollView
                    contentContainerStyle={[KanbanStyles.tasks]}
                    scrollEnabled={true}
                >
                    {this.renderTasks()}
                </ScrollView>

                {this.renderTaskSimpleView()}
                {this.renderBoxList()}

            </View>
        );
    }

    // This function handle a press on a tab
    clickTabHandler(key) {
        let {mode, lookingTask} = this.state;
        if (mode === "More" || mode === "Transfer" || lookingTask > 0) {
            return null;
        }

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
        let OriginTasks = this.tasks;
        let {mode} = this.state;
        if (mode === "More" || mode === "Transfer") {
            return null;
        }

        // Prepare the target task
        let target = null;
        // Find the target task by the id
        for (let i = 0; i < OriginTasks.length; i += 1) {
            if (OriginTasks[i].id === key) {
                target = OriginTasks[i];
                break;
            }
        }


        // If the task is not found, then render nothing
        if (target === null) {
            return null;
        }
        this.setState({
            taskId: key,
            lookingTask: 1
        });
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
        let OriginTasks = this.tasks;
        // Get the id of the chosen task
        let {taskId} = this.state;
        // Prepare the target task
        let target = -1;
        // Find the target task by the id
        for (let i = 0; i < OriginTasks.length; i += 1) {
            if (OriginTasks[i].id === taskId) {
                target = i;
                break;
            }
        }

        // If the task is not found, then do nothing
        if (target === -1) {
            return null;
        }

        this.setState({
            mode: "Unknown",
            lookingTask: 0
        });

        let oldStatus = OriginTasks[target].status;
        let task_id = OriginTasks[target].id;
        // Set the status of that task to the corresponding key
        console.log(this.props.email)
        let data = {
            email: this.props.email,
            task_id: task_id,
            status: key,
            duration: OriginTasks[target].duration
        };
        let result = TaskService.setTaskStatus(data);
        if (oldStatus !== key) {
            this.closeTaskSimpleView();
        }
    }

    // This handles if the clicked task is to be transferred
    toggleTransferMode() {
        this.setState({mode: "Transfer"})
    }

    // This close opened task simple view
    closeTaskSimpleView() {
        console.log("triger close task simple view")
        this.setState({
            mode: "Unknown",
            taskId: -1,
            lookingTask: 0
        })
    }

    openTask(taskId) {

    }
}

export default Kanban;
