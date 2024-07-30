import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'

/* Colors
Midnight blue #16253D
Dusk #002C54
Golden #EFB509
Bronze #CD7213
*/

const profile = () => {
  return (
    <ScrollView>
    <View style={styles.main}>
      <Text style={styles.heading1}>Profile</Text>
      <View style={styles.profileContainer}>
        <Image 
          source={require('../../../assets/images/user.jpeg')}
          style={styles.profileImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>Name: Adam De Vlaming</Text>
          <Text style={styles.text}>Role: Teacher</Text>
          <Text style={styles.text}>Course: Gaming</Text>
          <Text style={styles.text}>Schedules: Monday - Friday </Text>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
      <Text style={styles.text}>Description:</Text>
      <Text style={styles.text}>I have a long experience. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </Text>
      </View>
      <View style={styles.descriptionContainer}>
      <Text style={styles.text}>Courses:</Text>
      <Text style={styles.text}>My courses are awesome. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </Text>
      </View>
    </View>
    </ScrollView>
  )
}

export default profile

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#16253D',
  },
  heading1: {
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 60,
    color: '#CD7213',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    margin: 20,
  },
  textContainer: {
    flexDirection: 'column',
  },
  text: {
    fontSize: 18,
    color: '#EFB509',
    marginBottom: 5,
  },
  descriptionContainer: {
    flexDirection: 'column',
    marginLeft: 50,
    marginRight: 50,
    marginTop: 50,
  },
})
