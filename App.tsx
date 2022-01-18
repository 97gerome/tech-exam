import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, ActivityIndicator, View } from 'react-native';

import LoginScreen from './app/screens/LoginScreen';

import { AuthContext, UserContext } from './app/context/context';

import { User } from './app/interfaces/interfaces';
import VerifyEmailScreen from './app/screens/VerifyEmailScreen';
import MainScreen from './app/screens/MainScreen';

const App = () => {

  const [user, setUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  if(isLoading){
    return (
      <View style={styles.container}>
          <ActivityIndicator color='#FFFFFF'/>
      </View>
    );
  } else if(authToken && user){
    return (
      <UserContext.Provider value={{user, setUser}}>
        <AuthContext.Provider value={{ authToken, setAuthToken }}>
          <View style={styles.container}>
            {user.emailVerifiedAt ? <MainScreen /> : <VerifyEmailScreen />}
          </View>
        </AuthContext.Provider>
      </UserContext.Provider>
    );
  }

  return (
    <UserContext.Provider value={{user, setUser}}>
      <AuthContext.Provider value={{ authToken, setAuthToken }}>
        <View style={styles.container}>
          <LoginScreen setLoading={setLoading}/>
        </View>
      </AuthContext.Provider>
    </UserContext.Provider>
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
