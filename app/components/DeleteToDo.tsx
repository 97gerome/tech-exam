import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import { ToDo } from '../interfaces/interfaces';

interface confirmDeleteToDoProps {
    toDo: ToDo;
    confirmDeleteToDo: Function;
}

const confirmDeleteToDo = (props: confirmDeleteToDoProps) => {

    const { toDo, confirmDeleteToDo } = props;

    return (
        <TouchableOpacity style={styles.button} onPress={() => confirmDeleteToDo(toDo)}>
            <Image style={styles.image} source={require('../assets/trash-can.png')} />
        </TouchableOpacity>
    )
}

export default confirmDeleteToDo;

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    image: {
        height: 40,
        width: 40
    }
})
