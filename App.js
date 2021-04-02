import { StatusBar } from 'expo-status-bar';
import React, { Component } from "react";
import { StyleSheet, Text, View } from 'react-native';
import KanbanContainer from "./components/kanban/KanbanContainer";
import Footer from "./Page/Footer/Footer";
import Kanban from "./Page/Kanban/Kanban";

class App extends Component {
    constructor(props) {
        super(props);
    }

    changePage(page, taskId) {

    }

    render(): React.ReactNode {
        return (
            <View style={styles.container}>
                <Kanban
                    openTask={(taskID) => this.changePage("Task", taskID)}
                />
                <Footer
                    redirect={(page) => this.changePage(page, -1)}
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
