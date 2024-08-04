// import React, { useState } from 'react';
// import { View, TextInput, Button, Alert, StyleSheet, Text, Pressable, Modal, Image } from 'react-native';
// import { router, useRouter } from 'expo-router';

// import scheduleliteLogo from '../assets/images/schedulelite.jpg';

// //import Background from '@/components/Background';
// /* Colors
// Midnight blue #16253D
// Dusk #002C54
// Golden #EFB509
// Bronze #CD7213
// */

// const LoginForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const router = useRouter();

//   const handleLogin = () => {
//     if (email === '' || password === '') {
//       Alert.alert('Error', 'Please fill in all fields.');
//       return;
//     }

//     if (email === 'test' && password === 'test') {
//       router.push("/auth");
//     } else {
//       Alert.alert('Error', 'Invalid credentials.');
//     }
//   };

//   const handleRegister = () => {
//     setIsModalVisible(true);
//   };

//   const toggleModal = () => {
//     setIsModalVisible(!isModalVisible);
//   };

//   return (
//     //<Background style={styles.background}>
//     <View style={styles.container}>
//       <Text style={styles.title}>SCHEDULELITE</Text>
//       <Image source={require('../assets/images/schedulelite.jpg')} style={styles.logoImage} />
//       <Text style={styles.title2}>Login</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         placeholderTextColor="#d3d3d3"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         placeholderTextColor="#d3d3d3"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />

//       <View style={styles.buttons}>
//         <Pressable style={styles.press} onPress={handleLogin}>
//           <Text style={styles.login}>Login</Text>
//         </Pressable>
//         <Pressable style={styles.press} onPress={handleRegister}>
//           <Text style={styles.login}>Register</Text>
//         </Pressable>
//       </View>

//       <Modal
//         visible={isModalVisible}
//         animationType="slide"
//         onRequestClose={toggleModal}
//       >
//         <View style={styles.modalContent}>
//           <Text>Registration Unavailable At This Time</Text>
//           <Button title="Close" onPress={toggleModal} />
//         </View>
//       </Modal>
//     </View>
//     //</Background>
//   );
// };

// //<Image source={'../assets/images/schedulelite.jpg'} style={styles.logoImage} />

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 50,
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     backgroundColor: '#16253D',
//   },
//   input: {
//     height: 40,
//     width: 250,
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 20,
//     marginBottom: 12,
//     paddingHorizontal: 10,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 40,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     marginTop: 80,
//     textAlign: 'center',
//     color: '#EFB509',
//   },
//   title2: {
//     fontSize: 40,
//     fontWeight: 'bold',
//     marginBottom: 40,
//     marginTop: 30,
//     textAlign: 'center',
//     color: '#EFB509',
//   },
//   press: {
//     height: 40,
//     width: 120,
//     borderWidth: 1,
//     borderRadius: 20,
//     backgroundColor: '#EFB509',
//     margin: 5,
//     justifyContent: 'center',
//   },
//   login: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#002C54',
//   },
//   buttons: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     opacity: 1,
//   },
//   modalContent: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   background: {
//     flex: 1,
//   },
//   logoImage: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     borderWidth: 2,
//     borderColor: '#EFB509',
//     margin: 5,
//   },
// });

// export default LoginForm; 


import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text, Pressable, Modal, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();
  const router = useRouter();
  const { setUserName, setUserEmail } = useAuth();

  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
/*
    try {
      const response = await axios.get('https://668e97dbbf9912d4c92ef60f.mockapi.io/users', {
        params: { email, password }
      });
*/

  try {
    const response = await axios.get('https://66aff2df6a693a95b5378ce9.mockapi.io/student', {
      params: { email, password }
    });

      const users = response.data;
      if (users.length > 0) {
        const user = users[0];
        setUserName(user.name);
        
        setUserEmail(user.email);
        
        Alert.alert('Login successful');
        //navigation.navigate('home');
        router.push('/auth'); 
      } else {
        Alert.alert('Error', 'Invalid credentials.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while logging in.');
    }
  };

  const handleRegister = () => {
    setIsModalVisible(true);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SCHEDULELITE</Text>
      <Image source={require('../assets/images/schedulelite.jpg')} style={styles.logoImage} />
      <Text style={styles.title2}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#d3d3d3"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#d3d3d3"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.buttons}>
        <Pressable style={styles.press} onPress={handleLogin}>
          <Text style={styles.login}>Login</Text>
        </Pressable>
        <Pressable style={styles.press} onPress={handleRegister}>
          <Text style={styles.login}>Register</Text>
        </Pressable>
      </View>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContent}>
          <Text>Registration Unavailable At This Time</Text>
          <Button title="Close" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#16253D',
  },
  input: {
    height: 40,
    width: 250,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 12,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 80,
    textAlign: 'center',
    color: '#EFB509',
  },
  title2: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 40,
    marginTop: 30,
    textAlign: 'center',
    color: '#EFB509',
  },
  press: {
    height: 40,
    width: 120,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#EFB509',
    margin: 5,
    justifyContent: 'center',
  },
  login: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#002C54',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    opacity: 1,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
  },
  logoImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#EFB509',
    margin: 5,
  },
});

export default LoginForm;
