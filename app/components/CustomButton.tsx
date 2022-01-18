import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CustomButtonProps {
    title: string;
    onPress: Function;
}

const CustomButton = (props: CustomButtonProps) => {

    const {title, onPress} = props;

    return (
        <TouchableOpacity style={styles.button} onPress={() => onPress()}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton;

const styles = StyleSheet.create({
    button: {
        height: 50,
        width: '80%',
        backgroundColor: '#FF6363',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        borderRadius: 20
    },
    text: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold'
    }
})