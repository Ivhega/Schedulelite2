
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { AuthProvider } from '@/contexts/AuthContext';
import { schedulelite as appName } from '@/app.json';

const Main = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

AppRegistry.registerComponent(appName, () => Main);
