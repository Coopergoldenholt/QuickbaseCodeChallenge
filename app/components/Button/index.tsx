import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

interface ButtonProps {
    text: string;
    buttonStyles?: any;
    onPress: any;
}

const Button: React.FC<ButtonProps> = ({ text, buttonStyles, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.buttonContainer, buttonStyles]}
        >
            <Text style={[styles.text]}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        backgroundColor: '#75489d',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'rgba(255,255,255, .87)',
        fontSize: 20
    }
})

export default Button