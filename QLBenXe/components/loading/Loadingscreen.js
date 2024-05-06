import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, TouchableOpacity, Text } from 'react-native';
import LoadSpinner from './LoadSpinner'; 
import { useNavigation } from '@react-navigation/native';

const LoadingScreen = ({ navigation }) => {

    const [showSpinner, setShowSpinner] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSpinner(false);
        }, 2000);

        return () => clearTimeout(timer); // Clear timeout khi component unmount
    }, []);
    const handleLoginPress = () => {
         navigation.navigate('Login'); 
    }
    const handleSignUpPress = () => {
         navigation.navigate('SignUp');
    };

    return (
        <ImageBackground source={require('./loadBg.png')} style={styles.container}>
        <ImageBackground source={require('./logo.png')} style={styles.imageLogo} ></ImageBackground>
            <View >
                {showSpinner ? (
                    <LoadSpinner size="large" color="#197d48" />
                ) : (
                    <View >
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
                                <Text style={styles.buttonText}>Log In</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={handleSignUpPress}>
                                <Text style={styles.buttonText}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Chào mừng đến với chúng tôi</Text>
                            <Text style={styles.text1}>Mời bạn đăng nhập để tận hưởng những chuyến đi</Text>
                        </View>

                    </View>
                )}
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageLogo: {
        width: 300,
        height: 300,
        marginBottom: 55,
        overflow: 'hidden',
        borderRadius: 150,
        borderWidth: 3,
        borderColor: '#fff',
    },
    buttonsContainer: {
        flexDirection: 'row',
        width: 220,
        height: 50,
        marginBottom: 40,
        marginLeft: 30,
    },
    button: {
        backgroundColor: '#1c1c80',
        paddingVertical: 7,
        paddingHorizontal: 20,
        borderRadius: 2,
        marginHorizontal: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 23,
    },
    textContainer: {
        flexDirection: 'column',
        marginLeft: 30,
        marginRight: 20,

    },
    text: {
        fontSize: 16,
        fontFamily: 'monospace',
        fontStyle: 'italic',
        color: '#d5d5db',
        marginBottom: 10,
    },
    text1: {
        fontSize: 25,
        fontFamily: 'monospace',
        fontWeight: 'bold' ,
        color: '#d5d5db',
        marginBottom: 100,
        textAlign: 'justify',
    },
});

export default LoadingScreen;
