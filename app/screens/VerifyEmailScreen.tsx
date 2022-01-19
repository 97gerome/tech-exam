import React, { useContext, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput'

import { AppContext } from '../context/context';
import Loader from '../components/Loader';

const VerifyEmailScreen = () => {

    const verificationAPI = 'https://6gksn8nxyh.execute-api.us-east-1.amazonaws.com/prod/confirm-email';

    const { setUser, authToken, setAuthToken  } = useContext(AppContext);

    const [verficationCode, setVerificationCode] = useState<string>('');
    const [isLoading, setLoading] = useState<boolean>(false);

    const handleVerification = async () => {
        if (verficationCode.length >= 5) {
            try {
                setLoading(true);
                const response = await fetch(verificationAPI, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `bearer ${authToken}`
                    },
                    body: JSON.stringify({
                        emailConfirmCode: verficationCode
                    })
                });
                if (response.ok) {
                    const json = await response.json();
                    setLoading(false);
                    setUser(json.user);
                    setAuthToken(json.authToken);
                } else {
                    setLoading(false);
                    Alert.alert('Invalid verification code');
                    throw Error(`Error ${response.status}`);
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            Alert.alert('Verification code must be at least 5 characters');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Please verify your email</Text>
            <Text style={styles.paragraph}>A verification code has been sent to your email account.</Text>
            <View style={styles.form}>
                <CustomTextInput placeholder='12345' setState={setVerificationCode} keyboardType='numeric' />
                <CustomButton title='Verify' onPress={handleVerification} />
            </View>
            {isLoading && <Loader />}
        </View>
    )
}

export default VerifyEmailScreen;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingTop: 100,
        alignItems: 'center',
        backgroundColor: '#FFAB76'
    },
    form: {
        width: '70%',
        alignItems: 'center',
        marginVertical: 50
    },
    title: {
        alignSelf: 'flex-start',
        paddingHorizontal: 30,
        fontSize: 34,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    paragraph: {
        width: '80%',
        marginVertical: 20,
        fontSize: 17,
        fontWeight: 'normal',
        color: '#FFFFFF'
    }
})
