import { StyleSheet } from 'react-native'; 

import Constants from 'expo-constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: Constants.statusBarHeight,
    paddingTop: 20,
  },
  status: {
    marginTop: 150,
    alignItems:'center',
    fontSize: 35,
    textAlign: 'center',
  },
  timer: {
    fontSize: 90,
    color: '#F3420F',
    padding: 10,
  },
  startStopBtn: {
    paddingTop: 10,
    paddingRight: 30,
    paddingBottom: 10,
    paddingLeft: 30,
    marginRight: 15,
    borderWidth: 1,
    borderRadius: 20,
  },
  resetBtn: {
    paddingTop: 10,
    paddingRight: 30,
    paddingBottom: 10,
    paddingLeft: 30,
    marginRight: 15,
    borderWidth: 1,
    borderRadius: 20,
  },
  btnContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  startStopBtnText: {
    color: '#F8997E',
    fontSize: 25,
  },
  resetBtnText: {
    color: '#F8997E',
    fontSize: 25,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 18,
    color: '#4A5568',
    paddingRight: 10,
    paddingTop: 5,
    fontWeight: 'bold',
  },
  input: {
    color: '#667EEA',
    borderWidth: 1,
    borderColor: '#4A5568',
    borderRadius: 10,
    fontSize: 18,
    padding: 8,
    textAlign: 'center',
    marginLeft: 5,
    maxWidth: 60,
    minWidth: 40
  },
});
