import { StatusBar } from 'expo-status-bar';
import React, { Component } from "react";
import { StyleSheet, Text, View } from 'react-native';
import OriginalSchedule from "./Page/FakeData/OriginalSchedule";
import OriginTasks from "./Page/FakeData/OriginTasks";
import Footer from "./Page/Footer/Footer";
import Kanban from "./Page/Kanban/Kanban";
import Header from "./Page/Header/Header";
import Gantt from "./Page/Gantt/Gantt";

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

    }

    render(): React.ReactNode {
        let {page} = this.state;
        return (
            <View style={styles.container}>
                <Header
                    addHandler={() => this.changePage("Add", -1)}
                    importHandler={() => this.changePage("Import", -1)}
                />
                <Gantt/>
                <Footer
                    redirect={(page) => this.changePage(page, -1)}
                    page={page}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
