import React from 'react';
import { StyleSheet, TextInput, KeyboardTypeOptions } from 'react-native';

interface CustomTextInputProps {
    placeholder: string;
    setState: React.Dispatch<React.SetStateAction<string>>;
    secureTextEntry?: boolean;
    keyboardType: KeyboardTypeOptions;
}

const CustomTextInput = (props: CustomTextInputProps) => {

    const { placeholder, setState, secureTextEntry, keyboardType } = props;

    return (
        <TextInput 
            style={styles.input} 
            placeholder={placeholder} 
            onChangeText={text => setState(text)}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
        />
    )
}

export default CustomTextInput;


const styles = StyleSheet.create({
    input: {
        backgroundColor: '#fff',
        height: 40,
        width: '80%',
        marginVertical: 10,
        borderRadius: 20,
        paddingHorizontal: 30,
        fontSize: 17
    }
});