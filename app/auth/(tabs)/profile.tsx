
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

/* Colors
Midnight blue #16253D
Dusk #002C54
Golden #EFB509
Bronze #CD7213
*/

const profile = () => {
  return (
    <View style={styles.main}>
      <Text style={styles.heading1}>Profile</Text>
    </View>
  )
}

export default profile

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#16253D',
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
    }
})

