import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';;

import LoginScreen from './app/screens/LoginScreen';
import VerifyEmailScreen from './app/screens/VerifyEmailScreen';
import MainScreen from './app/screens/MainScreen';

import { AppContext } from './app/context/context';

import { User } from './app/interfaces/interfaces';

const Stack = createNativeStackNavigator();

const App = () => {

  const [user, setUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);

  const getLogInData = async () => {
    try {
      const authToken = await AsyncStorage.getItem('authToken');
      const user = await AsyncStorage.getItem('user');
      if (authToken && user){
        const json = await JSON.parse(user);
        if(json.emailVerifiedAt){
          setUser(json);
          setAuthToken(authToken);
        }
      }
    } catch (err){
      console.log(err);
    } finally {
    }
  }

  const setLogInData = async (user: User, authToken: string) => {
    try {
      await AsyncStorage.multiSet([['user', JSON.stringify(user)], ['authToken', authToken]]);
    } catch (err){
      console.log(err);
    }
  }

  const removeLogInData = async () => {
    try {
      await AsyncStorage.multiRemove(['user', 'authToken']);
    } catch (err){
      console.log(err);
    }
  }

  useEffect(() => {
   getLogInData();
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser, authToken, setAuthToken, getLogInData, setLogInData, removeLogInData }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {authToken ?
            user?.emailVerifiedAt ?
              <Stack.Screen name='Main' component={MainScreen} />
              :
              <Stack.Screen name='VerifyEmail' component={VerifyEmailScreen} />
            :
            <Stack.Screen name='LogIn' component={LoginScreen} />
          }
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFAB76',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40
  },
});
