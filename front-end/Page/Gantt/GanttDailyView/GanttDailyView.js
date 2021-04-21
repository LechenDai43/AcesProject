import React, { Component } from "react";
import { View, TouchableHighlight, Text } from 'react-native';
import GanttHourlyBlock from "../GanttHourlyBlock/GanttHourlyBlock";
import GanttDailyViewStyles from "./GanttDailyViewStyle";

const hours = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

class GanttDailyView extends Component {
    constructor(props) {
        super(props);
    }

    renderHourlyBlock() {
        let list = [];
        for (let i = 0; i < hours.length; i++) {
            let content = null;
            let booked = 0;
            for (let j = 0; j < this.props.block.length; j++) {
                if (this.props.block[j].date.getHours() === hours[i]) {
                    content = this.props.block[j];
                    booked = 1;
                    break;
                }
            }
            list.push(
                (<GanttHourlyBlock
                    hour={hours[i]}
                    booked={booked}
                    content={content}
                    handler={this.props.selectHour}
                />)
            )
        }
        return list;
    }

    render() {
        return (
            <View style={GanttDailyViewStyles.dailylist}> 
                <TouchableHighlight
                    onPress={this.props.back}
                >
                    <Text style={GanttDailyViewStyles.dailytext}>
                        Back
                    </Text>
                </TouchableHighlight>
                <Text style={GanttDailyViewStyles.dailydate}>{this.props.month + "-" + this.props.day + "-" + this.props.year}</Text>
                
                {this.renderHourlyBlock()}
            </View>
        )
    }
}

export  default GanttDailyView;
