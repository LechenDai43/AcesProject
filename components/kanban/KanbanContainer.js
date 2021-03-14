import React, { Component } from 'react';
import KanbanTask from "./KanbanTask";
import StatusEnum from "./StatusEnum";
import KanbanTab from "./KanbanTab";
import { StyleSheet, Text, View } from 'react-native';
import {Card, ButtonGroup} from 'react-native-elements';
import Footer from "../common/Footer";
import KanbanBoxList from "./KanbanBoxList";


export default class KanbanContainer extends React.Component {
    constructor () {
        super();
        this.state = {
            "items": [],
            "tabs": [],
            "boxList": new KanbanBoxList(this),
            "keyStatus": "Todo",
            "index": 0,
            "added": false,
            "addedTab": null,
            "newTabFunction": (tabName) => {
                this.state.index = 3;
                this.state.added = true;
                this.state.keyStatus = tabName;
                var newTab = new KanbanTab();
                newTab.title = tabName;
                this.state.addedTab = newTab;
                this.forceUpdate();

            }
        }
        let rawdata = "{\n" +
            "  \"tasks\": [\n" +
            "    {\n" +
            "      \"title\": \"Sprint 3 Presentation\",\n" +
            "      \"duedate\": \"3-14-2021\",\n" +
            "      \"estimate\": 5,\n" +
            "      \"difficulty\": 8,\n" +
            "      \"status\": \"In Progress\",\n" +
            "      \"failed\": false,\n" +
            "      \"overdue\": false\n" +
            "    },\n" +
            "    {\n" +
            "      \"title\": \"Sprint 3 Project Notebook\",\n" +
            "      \"duedate\": \"3-18-2021\",\n" +
            "      \"estimate\": 3,\n" +
            "      \"difficulty\": 13,\n" +
            "      \"status\": \"Todo\",\n" +
            "      \"failed\": false,\n" +
            "      \"overdue\": false\n" +
            "    },\n" +
            "    {\n" +
            "      \"title\": \"Sprint 3 Individual Assignment\",\n" +
            "      \"duedate\": \"3-18-2021\",\n" +
            "      \"estimate\": 1,\n" +
            "      \"difficulty\": 3,\n" +
            "      \"status\": \"Todo\",\n" +
            "      \"failed\": false,\n" +
            "      \"overdue\": false\n" +
            "    },\n" +
            "    {\n" +
            "      \"title\": \"Sprint 3 Peer Feedback\",\n" +
            "      \"duedate\": \"3-19-2021\",\n" +
            "      \"estimate\": 4,\n" +
            "      \"difficulty\": 3,\n" +
            "      \"status\": \"Requested\",\n" +
            "      \"failed\": false,\n" +
            "      \"overdue\": false\n" +
            "    },\n" +
            "    {\n" +
            "      \"title\": \"Sprint 2 Peer Feedback\",\n" +
            "      \"duedate\": \"3-5-2021\",\n" +
            "      \"estimate\": 4,\n" +
            "      \"difficulty\": 3,\n" +
            "      \"status\": \"Done\",\n" +
            "      \"failed\": false,\n" +
            "      \"overdue\": false\n" +
            "    }\n" +
            "  ]\n" +
            "}\n";

        let all_task = JSON.parse(rawdata);
        var tasks = all_task.tasks;
        let self = this;


        tasks.forEach(function (element) {
            var kanbantask = new KanbanTask();
            kanbantask.state.title = element.title;
            kanbantask.state.duedate = element.duedate;
            kanbantask.state.difficulty = element.difficulty;
            kanbantask.state.status = element.status;
            self.state.items.push(kanbantask);
        });

        var mainTabs = ["Todo", "In Progress", "More"];
        mainTabs.forEach(function (element) {
            var tab = new KanbanTab();
            tab.title = element;
            self.state.tabs.push(tab);
        });

        this.setState({"keyStatus": "Todo"});
        this.setState({"index": 0})
    }

    renderTabs() {
        var tabs = [];
        for (var i = 0; i < this.state.tabs.length; i++) {
            if (i == 0) {
                var tab0 = this.state.tabs[i];
                tabs.push({element: () => tab0});
            }
            if (i == 1) {
                var tab1 = this.state.tabs[i];
                tabs.push({element: () => tab1});
            }
            if (i == 2) {
                var tab2 = this.state.tabs[i];
                tabs.push({element: () => tab2});
            }
        }
        if (this.state.added) {
            var tab3 = this.state.addedTab;
            tabs.push({element: () => tab3});
        }
        return tabs;
    }

    renderTasks() {
        if (this.state.index < 2) {
            this.state.added = false;
        }
        if (this.state.index !== 2) {
            var tasks = [];
            for (var i = 0; i < this.state.items.length; i++) {
                var task = this.state.items[i];
                if (task.state.status === this.state.keyStatus) {
                    tasks.push(task.render());
                }
            }
            return tasks;
        }
        else {
            return this.state.boxList.render();
        }
    }

    openMoreTab(tabName) {
        this.setState({"index": 3});
        this.setState({"keyStatus": tabName});
        var newTab = new KanbanTab();
        newTab.setState({"title": tabName});
        this.setState({"addedTab": newTab});
        this.renderTasks();
    }

    render(): React.ReactNode {
        const updateIndex = (index) => {
            var n = index;

            this.setState({"index": index});
            if (index == 0) {
                this.setState({"keyStatus": "Todo"})
            }
            else if (index == 1) {
                this.setState({"keyStatus": "In Progress"})
            }
            // this.index = index;
        }
        return (
            <Card>
                <ButtonGroup buttons={this.renderTabs()}
                             onPress={updateIndex}
                />
                <Card id={"task-tab"}>
                    {this.renderTasks()}
                </Card>
            </Card>
        );
    }
}

