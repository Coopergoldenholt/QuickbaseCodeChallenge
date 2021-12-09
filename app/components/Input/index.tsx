import React from 'react'
import { StyleSheet, TextInput } from 'react-native'

interface InputProps {
    onChangeText: any;
    value: string;
    placeholder: string;
    inputStyles?: any;
    keyboardType?: any;
}

const Input: React.FC<InputProps> = ({ onChangeText, placeholder, value, inputStyles, keyboardType }) => {
    return (
        <TextInput
            style={[styles.input, inputStyles]}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
        height: 60,
        paddingLeft: 10,
        fontSize: 19
    }
})

export default Input