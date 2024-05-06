import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Apis, { authApi, endpoints } from "../../Apis";
import MyContext from "../../MyContext";

const Login = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const contextValue = useContext(MyContext);
    console.log(contextValue);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const login = async () => {
        setLoading(true);
        try {
            let res = await Apis.post(endpoints['login'], {
                'client_id': 'YouG1pC4bQDzcg8qoFNLcsAM2H2mi4YCYePY1CqI',
                'client_secret': 'pbkdf2_sha256$720000$BXafFbT99IWsJpUjYdKn5z$ZeWNPxr2bGB4XlLudeWlXg/WACozEcq2A3thP72o3S0=',
                'username': username,
                'password': password,
                'grant_type': 'password'
            });
            console.info(res.data);
            await AsyncStorage.setItem('token-access', res.data.access_token);
            let userData = await authApi(res.data.access_token).get(endpoints['current_user']);
            console.info(userData.data);
            dispatch({
                'type': 'login',
                'payload': {
                    'username': userData.data.username
                }
            });
            navigation.navigate('Home');
        } catch (error) {
            console.error(error);
            setError("Invalid username or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={MyStyles.container}>
            <Text style={MyStyles.subject}>ĐĂNG NHẬP</Text>
            <TextInput
                value={username}
                onChangeText={t=>setUsername(t)}
                placeholder="Nhập tên đăng nhập..."
                style={MyStyles.input}
            />
            <TextInput
                secureTextEntry={true}
                value={password}
                onChangeText={t=>setPassword(t)}
                placeholder="Nhập mật khẩu..."
                style={MyStyles.input}
            />
            {loading===true?<ActivityIndicator/>:<>
            <TouchableOpacity onPress={login}>
                <Text style={MyStyles.button}>Login</Text>
            </TouchableOpacity>
        </>}
        </View>
    );
};

const MyStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    subject: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#1c1c80',
        color: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    },
});

export default Login;
