import { StatusBar } from 'expo-status-bar';
import React, { Component } from "react";
import { StyleSheet, Text, View } from 'react-native';
import OriginalSchedule from "./Page/FakeData/OriginalSchedule";
import OriginTasks from "./Page/FakeData/OriginTasks";
import Footer from "./Page/Footer/Footer";
import Kanban from "./Page/Kanban/Kanban";
import Header from "./Page/Header/Header";
import Gantt from "./Page/Gantt/Gantt";
import Import from "./Page/Import/Import";

class App extends Component {
    constructor(props) {
        super(props);

        let tasks = [];
        for (let ii = 0; ii < OriginTasks.length; ii += 1) {
            tasks.push(OriginTasks[ii]);
        }

        let schedule = [];
        for (let ii = 0; ii < OriginalSchedule.length; ii += 1) {
            schedule.push(OriginalSchedule[ii]);
        }

        this.state = {
            tasks: tasks,
            schedule: schedule,
            page: "Calendar"
        };
    }

    changePage(page, taskId) {
        if (taskId < 0) {
            this.setState({
                page: page
            });
        }
        else {
            this.setState({
                page: page,
                taskId: taskId
            })
        }
    }

    renderPage() {
        let {page} = this.state;
        if (page === "Import") {
            return (
                <Import/>
            );
        }
        else if (page === "Calendar") {
            return (
                <Gantt/>
            );
        }
        else if (page === "Kanban") {
            return (
                <Kanban/>
            )
        }
        else {
            return (
                <Kanban/>
            )
        }
    }

    render() {
        let {page} = this.state;
        return (
            <View style={styles.container}>
                <Header
                    addHandler={() => this.changePage("Add", -1)}
                    importHandler={() => this.changePage("Import", -1)}
                />
                {this.renderPage()}
                <Footer
                    redirect={(p) => this.changePage(p, -1)}
                    page={page}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: '#fff',
    alignItems: "stretch",
    justifyContent: 'center',
  },
});

export default App;
