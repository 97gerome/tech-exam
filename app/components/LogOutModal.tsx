import React, { SetStateAction, useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { AuthContext, UserContext } from '../context/context';

interface LogOutModalProps {
    confirmLogOut: Function;
    setShowLogOut: React.Dispatch<SetStateAction<boolean>>;
}

const LogOutModal = (props: LogOutModalProps) => {

    const { confirmLogOut, setShowLogOut } = props;

    return (
        <View style={styles.modal}>
            <TouchableOpacity style={[styles.button, styles.logOutButton]} onPress={() => confirmLogOut()}>
                <Text style={[styles.text, styles.logOutText]}>Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setShowLogOut(false)}>
                <Text style={[styles.text, styles.cancelText]}>Cancel</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LogOutModal;

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        bottom: 0,
        height: '200%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#00000077'
    },
    button: {
        height: 60,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginVertical: 5,
    },
    logOutButton: {
        backgroundColor: '#FF6363',
    },
    cancelButton: {
        backgroundColor: '#FFFFFF'
    },
    text: {
        fontSize: 17,
        fontWeight: '500'
    },
    logOutText: {
        color: '#FFFFFF'
    },
    cancelText: {
        color: '#FF6363'
    }
})
