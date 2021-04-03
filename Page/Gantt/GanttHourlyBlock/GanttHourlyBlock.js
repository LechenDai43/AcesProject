import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import GanttHourlyBlockStyles from "./GanttHourlyBlockStyle";

class GanttHourlyBlock extends Component {
    constructor(props) {
        super(props);
    }

    renderContent() {
        if (this.props.booked === 1) {
            return (
                <Text>
                    {this.props.content.title}
                </Text>
            );
        }
        else {
            return (
                <View>

                </View>
            );
        }
    }

    render() {
        return (

            <TouchableHighlight
                onPress={() => this.handleClick()}
            >
                <View>
                    <Text>{this.props.hour}</Text>
                        {this.renderContent()}
                </View>
            </TouchableHighlight>
        );
    }

    handleClick() {
        this.props.handler(this.props.hour);
    }
}

export default GanttHourlyBlock;
