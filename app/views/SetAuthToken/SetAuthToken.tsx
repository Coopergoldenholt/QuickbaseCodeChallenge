import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Button from '../../components/Button'
import Input from '../../components/Input'

interface SetAuthToken {
    storeToken: any;
}

const SetAuthToken: React.FC<SetAuthToken> = ({ storeToken }) => {
    const [authToken, setAuthToken] = useState('')

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Set your Auth Token</Text>
            <Input
                inputStyles={{ marginBottom: 15 }}
                placeholder='Auth Token'
                value={authToken}
                onChangeText={(text: string) => setAuthToken(text)}
            />
            <Button
                text='Save'
                onPress={() => storeToken(authToken)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 100, paddingHorizontal: 20
    },
    headerText: {
        fontSize: 25,
        textAlign: 'center',
        paddingBottom: 8
    }
})

export default SetAuthToken