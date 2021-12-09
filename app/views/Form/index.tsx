import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { useForm } from '../../hooks/useForm'
import BarcodeScanner from '../../components/Camera';
import Button from '../../components/Button';
import Input from '../../components/Input';

interface FormProps {
    authToken: string;
}

const Form: React.FC<FormProps> = ({ authToken }) => {
    const { values, setValues } = useForm({ name: '', barcode: '' })
    const [showBarcodeScanner, setShowBarcodeScanner] = useState(false)

    const submitCheck = () => {
        if (!values.name || !values.barcode) return false;

        return true
    }

    const handleSubmit = () => {
        if (!submitCheck()) return Alert.alert('Both name and barcode need to filled out.');
        const body = {
            to: "brykizn4e",
            data: [
                {
                    '7': {
                        value: values.name
                    },
                    '8': {
                        value: values.barcode
                    }
                }
            ]
        }

        const headers = {
            'QB-Realm-Hostname': 'cooperholt.quickbase.com',
            'User-Agent': '{User-Agent}',
            'Authorization': `QB-USER-TOKEN ${authToken}`,
            'Content-Type': 'application/json'
        }

        fetch('https://api.quickbase.com/v1/records',
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            })
            .then(res => {
                if (res.ok) {
                    return Alert.alert('Part has been added.')
                }
                return res.json().then(resBody => Promise.reject({ status: res.status, ...resBody }));
            })
            .catch(err => Alert.alert(err))

    }

    const handleBarcodeRead = (barcodeString: string) => {
        if (!barcodeString) return Alert.alert("Could not indentify barcode try again.")
        setValues({ ...values, barcode: `${barcodeString}` })
    }

    return (
        <View style={{ paddingTop: 100, paddingHorizontal: 20 }}>
            <BarcodeScanner
                onSuccess={handleBarcodeRead}
                isVisible={showBarcodeScanner}
                onCancel={() => setShowBarcodeScanner(false)}
            />
            <Input
                value={values.name}
                placeholder='Name'
                onChangeText={(text: string) => setValues({ ...values, name: text })}
            />

            <View style={styles.barcodeContainer}>
                <Input
                    keyboardType='number-pad'
                    inputStyles={{ minWidth: '50%' }}
                    value={values.barcode}
                    placeholder='Barcode'
                    onChangeText={(text: string) => setValues({ ...values, barcode: text })}
                />
                <Button
                    onPress={() => {
                        setValues({ ...values, barcode: '' })
                        setShowBarcodeScanner(true)
                    }}
                    text='Scan Barcode'
                />
            </View>
            <Button
                onPress={() => handleSubmit()}
                text='Add New Part'
            />
        </View>

    )
}

const styles = StyleSheet.create({
    barcodeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
        marginTop: 15
    }
})

export default Form

// api token dgjef8pcyzg9qadiueaamcuuq9an
