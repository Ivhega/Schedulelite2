
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';

import RNPickerSelect from 'react-native-picker-select';

/* Colors
Midnight blue #16253D
Dusk #002C54
Golden #EFB509
Bronze #CD7213
*/


const Home = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <ScrollView>
    <View style={styles.main}>
        <View style={styles.logoContainer}>
          <Image source={require('../../../assets/images/schedulelite.jpg')} style={styles.logoImage} />
          <Text style={styles.heading1}>Welcome to SchedulElite!</Text>
          
        </View>

      <Text style={styles.normaltext}>We're excited to help assist you with your studies!</Text>
      <Text style={styles.normaltext}>Please let us know what kind of service you're looking for:</Text>

      <RNPickerSelect
        onValueChange={(value) => setSelectedValue(value)}
        items={[
          { label: 'Academic Tutoring', value: 'Academic Tutoring' },
          { label: 'Language Learning', value: 'Language Learning' },
          { label: 'Skill Development', value: 'Skill Development' },
        ]}
        style={pickerSelectStyles}
        placeholder={{ label: 'Select an option...', value: '' }}
      />

      {selectedValue !== '' && (
          <Text style={styles.normaltext}>
            Please select an available day for {selectedValue} to look at:
          </Text>
        )}

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
    </ScrollView>
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
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
  },
  heading1: {
    fontSize: 35,
    fontWeight: 'bold',
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
    marginTop: 30,
    marginBottom: 40,
  },
  selectedValue: {
    marginTop: 10,
    fontSize: 16,
    color: '#EFB509',
  },
  normaltext: {
    fontSize: 20,
    color: '#EFB509',
    marginTop: 20,
    textAlign: 'center',
  },
  logoImage: {
    
    width: 80,
    height: 80,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#EFB509',
    margin: 5,
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, 
    backgroundColor: 'white',
    marginBottom: 10,
    marginTop:20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, 
    backgroundColor: 'white',
    marginBottom: 10,
    marginTop: 20,
  },
};
