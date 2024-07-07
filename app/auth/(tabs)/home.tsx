
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';

/* Colors
Midnight blue #16253D
Dusk #002C54
Golden #EFB509
Bronze #CD7213
*/

const Home = () => {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <View style={styles.main}>
      <Text style={styles.heading1}>Welcome to</Text>
      <Text style={styles.heading2}>SchedulElite!</Text>
      <Calendar
        // Current date
        current={new Date().toISOString().split('T')[0]}
        // Marked dates
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: '#002C54',
          },
        }}
        // Handler which gets executed on day press
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        // Month format in calendar title
        monthFormat={'yyyy MM'}
        // Handler which gets executed when visible month changes in calendar
        onMonthChange={(month) => {
          console.log('month changed', month);
        }}
        // Hide month navigation arrows
        hideArrows={false}
        // Do not show days of other months in month page
        hideExtraDays={true}
        // If hideArrows=false and hideExtraDays=false, change the direction of the arrows
        // to be RTL
        //firstDay={1}
        // Hide day names
        hideDayNames={false}
        // Show week numbers to the left. Default = false
        showWeekNumbers={false}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={(addMonth) => addMonth()}
        style={styles.calendar}
      />
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#16253D',
    paddingHorizontal: 10,
  },
  heading1: {
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 60,
    fontFamily: 'Arial',
    color: '#EFB509',
  },
  heading2: {
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 5,
    fontFamily: 'Arial',
    color: '#EFB509',
  },
  calendar: {
    marginTop: 20,
  },
});
