import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginForm from '../components/LoginForm';
import { useAuth } from '@/contexts/AuthContext';
import BottomTabNavigator from '@/components/BottomTabNavigator';

const Stack = createNativeStackNavigator();

const App = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Main" component={BottomTabNavigator} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="Login" component={LoginForm} options={{ headerShown: false }}  />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
