import * as React from 'react';
import {Text,View,TouchableOpacity,TextInput} from 'react-native';
import {styles} from './stylesheet'
import {Vibration} from 'react-native'

const Init_work = '25';
const Init_Break = '05';
const Init_Second = '00';
const Work = 'Work';
const Break = 'Break';
const Start = 'Start';
const Stop = 'Stop';
let vibrate = () => Vibration.vibrate([500, 500, 500]);
let interval = 0;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: Init_work,
      seconds: Init_Second,
      status: Work,
      buttonLabel: Start,
      workInput: Init_work,
      breakInput: Init_Break,
    };
    this.secondsRemaining;
    this.isRunning = false;
  }
  setupInteval = () => {
    clearInterval(interval);
    interval = setInterval(() => this.tick(), 1000);
  };

  tick = () => {
    let minutes = Math.floor(this.secondsRemaining / 60);
    let seconds = this.secondsRemaining - minutes * 60;

    minutes = this.norDigits(minutes);
    seconds = this.norDigits(seconds);

    this.setState(previousState => ({
      minutes: minutes,
      seconds: seconds,
    }));

    this.secondsRemaining--;

    if (minutes == 0 && seconds == 0) {
      vibrate();
      if (this.state.status == Work) {
        this.startBreak();
      } else {
        this.startWork();
      }
    }
  };

  startStopTimer = workSession => {
    if (this.isRunning) {
      return this.pauseTimer();
    }
    this.setState(previousState => ({
      buttonLabel: Stop,
    }));

    if (!this.secondsRemaining) {
      this.secondsRemaining = this.state.minutes ? this.state.minutes * 60: Init_work * 60;
    }
    this.isRunning = true;
    this.setupInteval();
  };

  pauseTimer = () => {
    clearInterval(interval);
    this.isRunning = false;
    this.setState(previousState => ({
      buttonLabel: Start,
    }));
  };

  startWork = () => {
    const that = this;
    this.setState(previousState => ({
      minutes: that.norDigits(this.state.workInput),
      seconds: Init_Second,
      status: Work,
      buttonLabel: Stop,
    }));
    this.secondsRemaining = this.state.workInput * 60;
    this.setupInteval();
  };


  resetTimer = () => {
    const that = this;
    this.isRunning = false;
    this.secondsRemaining = 0;
    clearInterval(interval);
    this.setState(previousState => ({
      status: Work,
      buttonLabel: Start,
      seconds: Init_Second,
      minutes: that.norDigits(previousState.workInput),
    }));
  };

  startBreak = () => {
    const that = this;
    this.setState(previousState => ({
      minutes: that.norDigits(this.state.breakInput),
      seconds: Init_Second,
      status: Break,
      buttonLabel: Stop,
    }));
    this.secondsRemaining = this.state.breakInput * 60;
    this.setupInteval();
  };


  onWorkInputChange = workMin => {
    const that = this;

    this.setState(previousState => ({
      workInput: workMin,
      minutes: that.norDigits(workMin),
    }));

    this.resetTimer();
  };

  onBreakInputChange = breakMin => {
    const that = this;

    this.setState(previousState => ({
      breakInput: breakMin,
      minutes: that.norDigits(this.state.workInput),
    }));

    this.resetTimer();
  };

  norDigits = value => {
    if (value.toString().length < 2) {
      return '0' + value;
    }
    return value;
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.status}>{this.state.status}</Text>
          <Text style={styles.timer}>
            {this.state.minutes}:{this.state.seconds}
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Set up work time (mins):</Text>
          <TextInput
            defaultValue={`${this.state.workInput}`}
            maxLength={4}
            style={styles.input}
            onChangeText={this.onWorkInputChange}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Set up break time (mins):</Text>
          <TextInput
            defaultValue={`${this.state.breakInput}`}
            maxLength={4}
            style={styles.input}
            onChangeText={this.onBreakInputChange}
          />
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.startStopBtn}
            onPress={() => this.startStopTimer()}>
            <Text style={styles.startStopBtnText}>
              {this.state.buttonLabel}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.resetBtn}
            onPress={() => this.resetTimer()}>
            <Text style={styles.resetBtnText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

