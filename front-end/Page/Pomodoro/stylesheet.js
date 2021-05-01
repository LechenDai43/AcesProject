import { StyleSheet } from 'react-native'; 

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerContainer: {
    borderRadius: 5,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    position: 'absolute',
    top: 80
  },
  timer: {
    fontSize: 50,
    paddingLeft: 6,
    paddingRight: 3,
  },
  label: {
    fontSize: 40,
    marginTop: 20,
    marginBottom: 25,
    alignSelf: 'center'
  },
  smallLabel: {
    fontSize: 20,
    marginTop: 0,
    marginBottom: 25,
    alignSelf: 'center',
  },
  labelContainer: {
    height: 60,        
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: 5,
    marginBottom: 20
  },
  menu: {
    marginLeft: 10,
    marginRight: 10,
  },
  dropdownTextStyle: {
    fontSize: 20
  },
  textStyle: {
    fontSize: 20,
  },
  dropdownButtonStyle: {
    width: 30,
    backgroundColor: "#dddddd",
    borderRadius: 5,
    alignItems: 'center'
  },
  menuContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  menuLabel: {
    fontSize: 20
  },
  infoBox: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 60
  },
  infoText: {
    fontSize: 15
  },
  image: {
    width: 50, 
    height: 50,
    position: 'absolute',
    bottom: 8
  }
});