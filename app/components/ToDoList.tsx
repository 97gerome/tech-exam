import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import {ToDo} from '../interfaces/interfaces';
import ToDoItem from './ToDoItem';


interface ToDoListProps {
    toDos: Array<ToDo>;
    completeToDo: Function;
    confirmDeleteToDo: Function;
}

const ToDoList = (props: ToDoListProps) => {

    const { toDos, completeToDo, confirmDeleteToDo } = props;

    const renderItem = ({ item }: { item: ToDo }) => {
        return (
            <ToDoItem toDo={item} completeToDo={completeToDo} confirmDeleteToDo={confirmDeleteToDo}/>
        );
    }
    
    if(toDos.length > 0){
        return (
            <FlatList
                data={toDos}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.container}
                contentContainerStyle={styles.innerContainer}>
            </FlatList>
        );
    }

    return(
        <View style={styles.emptyContainer}>
            <Text style={styles.text}>Start by creating a new To Do</Text>
        </View>
    );
}

export default ToDoList;

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    innerContainer: {
        alignItems: 'center'
    },
    emptyContainer: {
        width: '100%',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 17,
        color: '#FFFFFF'
    }
})
