import React, { createContext, useState, useContext } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({
  isAuthenticated: false,
  userSkills: [],
  token: null,
  userData: null,
  signIn: () => {},
  signOut: () => {},
  setUserSkills: () => {},
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userSkills, setUserSkills] = useState([]);
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  const storeAuthData = async (authToken, user) => {
    try {
      await AsyncStorage.setItem('token', authToken);
      await AsyncStorage.setItem('userData', JSON.stringify(user));
    } catch (error) {
      console.error('Error storing auth data:', error);
    }
  };

  const loadAuthData = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      const storedUserData = await AsyncStorage.getItem('userData');
      
      if (storedToken && storedUserData) {
        setToken(storedToken);
        setUserData(JSON.parse(storedUserData));
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error loading auth data:', error);
      return false;
    }
  };

  const clearAuthData = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('userData');
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  };

  const signIn = async (authData, skills = []) => {
    try {
      const { jsonToken, ...userInfo } = authData;
      await storeAuthData(jsonToken, userInfo);
      
      setToken(jsonToken);
      setUserData(userInfo);
      setIsAuthenticated(true);
      setUserSkills(skills);
      
      // Redirect to home screen after successful authentication
      router.replace('/(tabs)/home');
    } catch (error) {
      console.error('Error during sign in:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await clearAuthData();
      setToken(null);
      setUserData(null);
      setIsAuthenticated(false);
      setUserSkills([]);
      // Redirect to auth screen after logout
      router.replace('/(auth)/AuthScreen');
    } catch (error) {
      console.error('Error during sign out:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userSkills,
        token,
        userData,
        signIn,
        signOut,
        setUserSkills,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 