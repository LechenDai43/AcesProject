import React from 'react';
import { StyleSheet} from 'react-native';

const GanttDailyViewStyles = StyleSheet.create({
    dailylist:{
        alignContent:'center',
        margin: 5
    },
    dailytext:{
        alignContent:'flex-end',
        fontSize: 15,
        fontWeight: "bold",
        fontFamily:'Arial'
    },
    dailydate:{
        alignContent:'center',
        fontSize: 20,
        fontWeight: "bold",
        fontFamily:'Arial'
    }
});

export default GanttDailyViewStyles;
