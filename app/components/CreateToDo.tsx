import React, { SetStateAction } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CustomButton from './CustomButton';
import CustomTextInput from './CustomTextInput'

interface CreateToDo {
    newToDoName: string;
    setNewToDoName: React.Dispatch<SetStateAction<string>>;
    putToDo: Function;
}

const CreateToDo = (props: CreateToDo) => {

    const { newToDoName, setNewToDoName, putToDo } = props;

    return (
        <View style={styles.background}>
            <Text style={styles.title} numberOfLines={1}>{newToDoName.length > 0 ? newToDoName : 'New To Do'}</Text>
            <View style={styles.form}>
                <CustomTextInput placeholder='Name' setState={setNewToDoName} keyboardType='default'/>
                <CustomButton title='Create' onPress={() => putToDo()} />
            </View>
        </View>
    )
}

export default CreateToDo

const styles = StyleSheet.create({
    background: {
        width: '95%',
        borderRadius: 20,
        backgroundColor: '#FFEEAD',
        marginVertical: 5,
        overflow: 'hidden',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        margin: 30
    },
    form: {
        backgroundColor: '#FFEEAD',
        alignItems: 'center'
    }

})
