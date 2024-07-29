/*
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

/*
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

      <Text style={styles.normalText}>We're excited to help assist you with your studies!</Text>
      <Text style={styles.normalText}>Please let us know what kind of service you're looking for:</Text>

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
          <Text style={styles.normalText}>
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
  normalText: {
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
*/

import { ScrollView, StyleSheet, Text, View, Image, Button, Alert, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-native-calendars';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

const Home = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [markedDates, setMarkedDates] = useState({});
  const [bookings, setBookings] = useState([]);
  const [studentName, setStudentName] = useState('');

  useEffect(() => {
    // Fetch instructors from MockAPI
    axios.get('https://668e9654bf9912d4c92eede2.mockapi.io/tasks/instructors')
      .then(response => {
        setInstructors(response.data);
      })
      .catch(error => {
        console.error('Error fetching instructors:', error);
      });

    // Fetch bookings from MockAPI
    axios.get('https://668e9654bf9912d4c92eede2.mockapi.io/tasks/bookings')
      .then(response => {
        setBookings(response.data);
      })
      .catch(error => {
        console.error('Error fetching bookings:', error);
      });
  }, []);

  useEffect(() => {
    // Update marked dates based on selected instructor
    if (selectedInstructor) {
      const instructor = instructors.find(inst => inst.id === selectedInstructor);
      if (instructor) {
        const availability = instructor.availability.reduce((acc, date) => {
          acc[date] = { available: true, marked: true, dotColor: '#EFB509' };
          return acc;
        }, {});
        setMarkedDates(availability);
      }
    } else {
      setMarkedDates({});
    }
  }, [selectedInstructor, instructors]);

  const handleBooking = () => {
    if (selectedDate && selectedInstructor && studentName) {
      const isBooked = bookings.some(
        booking => booking.date === selectedDate && booking.instructorId === selectedInstructor
      );

      if (isBooked) {
        Alert.alert('Error', 'This date is already booked for the selected instructor.');
      } else {
        axios.post('https://668e9654bf9912d4c92eede2.mockapi.io/tasks/bookings', {
          date: selectedDate,
          instructorId: selectedInstructor,
          category: selectedCategory,
          studentName: studentName,
        })
        .then(response => {
          Alert.alert('Success', 'Your booking has been made.');
          setBookings([...bookings, response.data]);
        })
        .catch(error => {
          console.error('Error making booking:', error);
          Alert.alert('Error', 'There was a problem making your booking.');
        });
      }
    } else {
      Alert.alert('Error', 'Please fill out all fields.');
    }
  };

  const filteredInstructors = instructors.filter(instructor => instructor.category === selectedCategory);

  return (
    <ScrollView>
      <View style={styles.main}>
        <View style={styles.logoContainer}>
          <Image source={require('../../../assets/images/schedulelite.jpg')} style={styles.logoImage} />
          <Text style={styles.heading1}>Welcome to SchedulElite!</Text>
        </View>

        <Text style={styles.normalText}>We're excited to help assist you with your studies!</Text>

        <Text style={styles.normalText}>Please enter your name for booking:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your name"
          value={studentName}
          onChangeText={setStudentName}
        />

        <Text style={styles.normalText}>Please let us know what kind of service you're looking for:</Text>

        <RNPickerSelect
          onValueChange={(value) => setSelectedCategory(value)}
          items={[
            { label: 'Academic Tutoring', value: 'Academic Tutoring' },
            { label: 'Language Learning', value: 'Language Learning' },
            { label: 'Skill Development', value: 'Skill Development' },
          ]}
          style={pickerSelectStyles}
          placeholder={{ label: 'Select an option...', value: '' }}
        />

        <Text style={styles.normalText}>Select an Instructor:</Text>

        <RNPickerSelect
          onValueChange={(value) => setSelectedInstructor(value)}
          items={filteredInstructors.map(instructor => ({
            label: instructor.name,
            value: instructor.id,
          }))}
          style={pickerSelectStyles}
          placeholder={{ label: 'Select an instructor...', value: '' }}
        />

        {selectedCategory !== '' && (
          <>
            <Text style={styles.normalText}>
              Please select an available day for {selectedCategory}:
            </Text>

            <Calendar
              current={new Date().toISOString().split('T')[0]}
              markedDates={{
                ...markedDates,
                [selectedDate]: {
                  selected: true,
                  selectedColor: '#002C54',
                },
              }}
              onDayPress={(day) => {
                const dateString = day.dateString;
                if (markedDates[dateString]?.available) {
                  setSelectedDate(dateString);
                } else {
                  Alert.alert('Error', 'This date is not available for the selected instructor.');
                }
              }}
              monthFormat={'yyyy MM'}
              hideArrows={false}
              hideExtraDays={true}
              hideDayNames={false}
              showWeekNumbers={false}
              onPressArrowLeft={(subtractMonth) => subtractMonth()}
              onPressArrowRight={(addMonth) => addMonth()}
              style={styles.calendar}
            />

            <Button title="Book" onPress={handleBooking} />
          </>
        )}

      </View>
    </ScrollView>
  );
};

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
  normalText: {
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
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: 'white',
    color: 'black',
    paddingHorizontal: 10,
    marginVertical: 10,
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
    marginTop: 20,
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
