import { StatusBar } from 'expo-status-bar';
import React, { Component } from "react";
import { StyleSheet, Text, View } from 'react-native';
import Footer from "./Page/Footer/Footer";
import Kanban from "./Page/Kanban/Kanban";
import Header from "./Page/Header/Header";

class App extends Component {
    constructor(props) {
        super(props);
    }

    changePage(page, taskId) {

    }

    render(): React.ReactNode {
        return (
            <View style={styles.container}>
                <Header/>
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
