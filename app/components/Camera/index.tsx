import React, { useRef } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';

interface IProps {
    onSuccess: any;
    isVisible: boolean;
    onCancel: any;
}

function BarcodeScanner(props: IProps) {
    const camera = useRef(null)

    function onBarCodeRead(results: any) {
        props.onSuccess(`${results.data}`)
    }

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={props.isVisible}
            presentationStyle="fullScreen"
        >
            <Text style={styles.instructions}>Place Barcode</Text>
            <RNCamera
                ref={camera}
                captureAudio={false}
                onBarCodeRead={onBarCodeRead}
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.auto}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
            />

            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={props.onCancel} style={styles.capture}>
                    <Text style={{ fontSize: 14 }}> Cancel </Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    instructions: {
        textAlign: 'center',
        fontSize: 20,
        paddingTop: 70,
        margin: 5,
        color: 'black'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    }
});

export default BarcodeScanner;