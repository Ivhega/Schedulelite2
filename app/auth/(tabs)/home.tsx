
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const home = () => {
  return (
    <View style={styles.main}>
      <Text style={styles.heading1}>Welcome to</Text>
      <Text style={styles.heading2}>SchedulElite!</Text>
    </View>
  )
}

export default home

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'red',
    },
    heading1: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 35,
        fontWeight: 'bold',
        marginLeft: '23%',
        marginTop: 60,
        fontFamily: 'Arial',
        color: 'yellow',
    },
    heading2: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 35,
        fontWeight: 'bold',
        marginLeft: '20%',
        marginTop: 5,
        fontFamily: 'Arial',
        color: 'yellow',
    }


})

