import React, { Component } from "react";
import { View, TouchableHighlight, Text } from 'react-native';
import CalendarPicker from "react-native-calendar-picker";
import GanttStyles from "./GanttStyle";
import GanttDailyView from "./GanttDailyView/GanttDailyView";
import GanttBlockEditor from "./GanttBlockEditor/GanttBlockEditor";
import TaskService from "../../Service/Task.service"

const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
class Gantt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: 0,
            month: 0,
            day:0,
            hour: 0,
            dailyMode: 0
        }
        this.schedule = [];
    }

    updateSchedule(d, m, y) {
        let {day, month, year} = this.state;
        if (d > 0 && m > 0 && y > 0) {
            day = d;
            month = m;
            year = y;
        }
        if (day > 0 && month > 0 && year > 0) {
            let data  = {
                email: this.props.email,
                day: day,
                month: month,
                year: year
            };
            let result = TaskService.getDailySchedule(data);
            result.then((result_data) => {
                let slots = [];
                result_data.data.forEach((element) => {
                    let slot = {
                        id: element.task.id,
                        title: element.task.title,
                        date: new Date(element.time.year, element.time.month, element.time.day, element.time.hour)
                    };
                    slots.push(slot);
                })
                this.schedule = slots;
            });
        }
    }

    renderDailyCalender() {
        let OriginalSchedule = this.schedule;
        let {dailyMode} = this.state;
        if (dailyMode === 0) {
            return (
                <CalendarPicker
                    onDateChange={(date, type) => this.selectDate(date, type)}
                />
            );
        }
        else if (dailyMode === 1) {
            let {year, month, day} = this.state;
            let dailySchedule = [];
            for (let i = 0; i < OriginalSchedule.length; i++) {
                let event = OriginalSchedule[i];
                if (event.date.getFullYear() === year && event.date.getMonth() === month && event.date.getDate() === day) {
                    dailySchedule.push(event);
                }
            }
            return (
              <GanttDailyView
                  block={dailySchedule}
                  selectHour={(h) => this.selectHour(h)}
                  year={year}
                  month={month}
                  day={day}
                  back={() => this.setOffDaily()}
              />
            );
        }
        else if (dailyMode === 2) {
            let {year, month, day, hour} = this.state;
            let content = null;
            let booked = 0;
            for (let i = 0; i < OriginalSchedule.length; i++) {
                let event = OriginalSchedule[i];
                if (event.date.getFullYear() === year && event.date.getMonth() === month && event.date.getDate() === day && event.date.getHours() === hour) {
                    content = event;
                    booked = 1;
                    break;
                }
            }

            return (
                <GanttBlockEditor
                    booked={booked}
                    content={content}
                    year={year}
                    month={month}
                    day={day}
                    hour={hour}
                    return={() => this.setOffHourly()}
                />
            );
        }
    }

    render() {
        return (
            <View>
                {this.renderDailyCalender()}
            </View>
        );
    }

    selectDate(date, type) {
        let month = 1;
        let day = date.dayOfYear();
        let year = date.year();
        while (day > months[month - 1]) {
            day -= months[month - 1];
            if (year % 4 === 0 && month === 2) {
                day -= 1;
            }
            month += 1;
        }


        this.updateSchedule(day, month, year);
        let self = this;
        this.sleep(100).then( () => {
                self.setState({
                    year: year,
                    month: month,
                    day: day,
                    dailyMode: 1
                });
            }
        );

    }

    sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }


    selectHour (hour) {
        this.setState({
            hour: hour,
            dailyMode: 2
        })
    }

    setOffDaily() {
        let {dailyMode} = this.state;
        if (dailyMode === 1) {
            this.setState({
                dailyMode: 0
            });
        }
    }

    setOffHourly() {
        let {dailyMode} = this.state;
        if (dailyMode === 2) {
            this.setState({
                dailyMode: 1
            });
        }
    }

}

export default Gantt;
