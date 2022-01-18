import React from 'react';
import { StyleSheet, Text, View, useWindowDimensions, Image, TouchableOpacity } from 'react-native';

import { ToDo } from '../interfaces/interfaces';
import DeleteToDo from './DeleteToDo';

interface ToDoItemProps {
    toDo: ToDo;
    completeToDo: Function;
    confirmDeleteToDo: Function;
}

const ToDoItem = (props: ToDoItemProps) => {

    const { width : screenWidth} = useWindowDimensions();

    const { toDo, completeToDo, confirmDeleteToDo } = props;

    if(toDo.completedAt)return (
        <View style={{...styles.container, width: screenWidth - 20 }}>
            <View style={styles.itemContainer}>
                <Text style={styles.label} numberOfLines={2} ellipsizeMode='tail'>{toDo.name}</Text>
                <View style={{ ...styles.completionContainer, backgroundColor: '#96CEB4' }}>
                    <Image style={styles.image} source={require('../assets/check-mark.png')} />
                </View>
            </View>
            <DeleteToDo  toDo={toDo} confirmDeleteToDo={confirmDeleteToDo}/>
        </View>
    )

    return (
        <View style={{...styles.container, width: screenWidth - 20}}>
            <View style={{ ...styles.itemContainer}}>
                <Text style={styles.label} numberOfLines={2} ellipsizeMode='tail'>{toDo.name}</Text>
                <TouchableOpacity onPress={() => completeToDo(toDo.id)}>
                    <View style={{ ...styles.completionContainer, backgroundColor: '#FFEEAD' }}>
                    </View>
                </TouchableOpacity>
            </View>
            <DeleteToDo toDo={toDo} confirmDeleteToDo={confirmDeleteToDo}/>
        </View>
    )
}

export default ToDoItem;;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 5
    },
    itemContainer: {
        flexDirection: 'row',
        flexGrow: 1,
        flexShrink: 1,
        height: 80,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        overflow: 'hidden'
    },
    label: {
        fontSize: 17,
        paddingHorizontal: 30,
        flexShrink: 1
    },
    completionContainer: {
        height: 80,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 30,
        width: 30
    }
})
