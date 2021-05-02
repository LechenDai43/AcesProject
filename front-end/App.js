import { StatusBar } from 'expo-status-bar';
import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import Footer from "./Page/Footer/Footer";
import Kanban from "./Page/Kanban/Kanban";
import Header from "./Page/Header/Header";
import Gantt from "./Page/Gantt/Gantt";
import Import from "./Page/Import/Import";
import LogIn from "./Page/LogIn/LogIn";
import Register from "./Page/Register/Register";
import { registerRootComponent } from 'expo'; // import it explicitly
import TaskService from "./Service/Task.service"

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: "LogIn",
            userEmail: "",
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
        let {page, userEmail} = this.state;
        if (page === "Import") {
            return (
                <Import/>
            );
        }
        else if (page === "Calendar") {
            return (
                <Gantt
                    email={userEmail}
                />
            );
        }
        else if (page === "Kanban") {
            return (
                <Kanban
                    email={userEmail}
                />
            )
        }
        else if(page === "LogIn") {
            return (
                <View style = {lstyles.container}>
                    <LogIn
                        handler={(mail) => this.afterLogin(mail)}
                    />
                    <TouchableHighlight
                        onPress = {()=> this.changePage("Register",-1)}
                    >
                        <Text>Don't have an account?</Text>
                    </TouchableHighlight>
                </View>
            )
        }
        else if(page === "Register") {
            return (
                <Register
                    style = {lstyles.container}
                    handler={(mail) => this.afterLogin(mail)}
                />
            )
        }
        else {
            return (
                <Kanban/>
            )
        }
    }

    renderFooterOrNot() {
        let {page} = this.state;
        if (page !== 'LogIn' && page !== 'Register') {
            return (
                <Footer
                    redirect={(p) => this.changePage(p, -1)}
                    page={page}
                />
            );
        }
    }

    afterLogin(email) {
        this.setState({
            page: 'Kanban',
            userEmail: email,
        });
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
                {this.renderFooterOrNot()}
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

const lstyles = StyleSheet.create({
    container:{
        height: 300,
        width: 300,
        backgroundColor:"#FFFFFF",
        borderColor: "#20232a",
        borderRadius: 20
    }
})

export default App;
