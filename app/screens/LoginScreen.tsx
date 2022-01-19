import React, { useContext, useState } from 'react';
import { View, StyleSheet, Alert, Image } from 'react-native';

import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import Loader from '../components/Loader';

import { AppContext } from '../context/context';


const LoginScreen = () => {

    const loginAPI = 'https://6gksn8nxyh.execute-api.us-east-1.amazonaws.com/prod/login';
    
    const { setUser, setAuthToken, setLogInData } = useContext(AppContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState<boolean>(false);

    const handleLogin = async () => {
        if(email.length > 0 && password.length > 0){
            try {
                setLoading(true);
                const response = await fetch(loginAPI,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email, 
                        password: password
                    })
                });
                if(response.ok){
                    const json = await response.json();
                    setUser(json.user);
                    setAuthToken(json.authToken);
                    setLogInData(json.user, json.authToken);
                } else {
                    setLoading(false);
                    Alert.alert('Incorrect Email/Password');
                    throw Error('Incorrect Email/Password');
                }
            } catch (err){
                console.log(err);
            }
        } else {
            Alert.alert('Invalid Email/Password', 'All fields must be filled');
        }
    }

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/icon.png')}/>
            <CustomTextInput placeholder={'Email'} setState={setEmail} keyboardType={'email-address'}/>
            <CustomTextInput placeholder={'Password'} setState={setPassword} secureTextEntry={true} keyboardType={'default'}/>
            <CustomButton title={'Login'} onPress={handleLogin}/>
            {isLoading && <Loader />}
        </View>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFAB76'
    },
    logo: {
        position: 'absolute',
        top: 100,
        height: 80,
        width: 80
    }
})
