import React, { SetStateAction, useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { UserContext } from '../context/context';

interface AccountButtonProps {
    setShowLogOut: React.Dispatch<SetStateAction<boolean>>
}

const AccountButton = (props: AccountButtonProps) => {

    const { user } = useContext(UserContext);

    const { setShowLogOut } = props;

    return (
        <TouchableOpacity style={styles.button} onPress={() => setShowLogOut(true)}>
            <Text style={styles.text}>{user.name.substring(0, 1)}</Text>
        </TouchableOpacity>
    )
}

export default AccountButton;

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        right: 0,
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: '#FF6363',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20
    },
    text: {
        fontSize: 24,
        color: '#FFFFFF'
    }
})
