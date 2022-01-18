import React, { SetStateAction } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import AccountButton from './AccountButton';

interface NavBarProps {
    setShowLogOut: React.Dispatch<SetStateAction<boolean>>;
}

const NavBar = (props: NavBarProps) => {

    const { setShowLogOut } = props;

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/icon.png')} />
            <AccountButton  setShowLogOut={setShowLogOut}/>
        </View>
    )
}

export default NavBar;

const styles = StyleSheet.create({
    container: {
        height: 70,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        height: 50,
        width: 50
    }
})
