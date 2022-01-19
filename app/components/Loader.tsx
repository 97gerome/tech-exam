import React from 'react'
import { ActivityIndicator, StyleSheet, View, useWindowDimensions } from 'react-native'

const Loader = () => {

    const { width: windowWidth, height: windowHeight } = useWindowDimensions();

    return (
        <View style={{...styles.container, height: windowHeight, width: windowWidth}}>
            <ActivityIndicator color='#FFFFFF'/>
        </View>
    )
}

export default Loader

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000050'
    }
})
