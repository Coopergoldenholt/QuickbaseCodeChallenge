/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
} from 'react-native';
import Form from './app/views/Form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SetAuthToken from './app/views/SetAuthToken/SetAuthToken';



const App = () => {
  const [authToken, setAuthToken] = useState('')

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('authToken')
      if (value !== null) {
        // value previously stored
        setAuthToken(value)
      }
    } catch (e) {
      // error reading value
    }
  };

  const storeData = async (token: string) => {
    try {
      await AsyncStorage.setItem('authToken', token)
      getData()
    } catch (e) {
      // saving error
    }
  }

  return (
    authToken ?
      <Form authToken={authToken} /> :
      <SetAuthToken storeToken={storeData} />
  );
};

export default App;
