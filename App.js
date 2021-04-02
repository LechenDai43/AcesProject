import { StatusBar } from 'expo-status-bar';
import React, { Component } from "react";
import { StyleSheet, Text, View } from 'react-native';
import KanbanContainer from "./components/kanban/KanbanContainer";
import Footer from "./Page/Footer/Footer";

class App extends Component {
    constructor(props) {
        super(props);
    }

    changePage(page) {
        console.log(page);
        this.forceUpdate();
    }

    render(): React.ReactNode {
        return (
            <View style={styles.container}>
                <Footer
                    redirect={(page) => this.changePage(page)}
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
