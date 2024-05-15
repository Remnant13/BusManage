import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { ActivityIndicator, Modal } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const UserInfo = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = await AsyncStorage.getItem('@token');
                if (token) {
                    const response = await fetch('https://linhhv.pythonanywhere.com/user/current-user/', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const userData = await response.json();
                    setUser(userData);
                }
            } catch (error) {
                console.error('Lỗi khi lấy thông tin người dùng:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    const handleChange = () => {
        setIsModalVisible(true);
    };

    const handleSave = async () => {
        if (newPassword === confirmPassword) {
            try {
                const token = await AsyncStorage.getItem('@token');
                const response = await fetch('https://linhhv.pythonanywhere.com/user/change-password/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        old_password: oldPassword,
                        new_password: newPassword,
                        confirm_password: confirmPassword
                    })
                });

                if (response.ok) {
                    Alert.alert('Thông báo', 'Mật khẩu đã được thay đổi thành công!');
                } else {
                    const errorData = await response.json();
                    Alert.alert('Lỗi', errorData.error || 'Đã có lỗi xảy ra. Vui lòng thử lại sau.');
                }
            } catch (error) {
                console.error('Lỗi khi cập nhật mật khẩu:', error);
                Alert.alert('Lỗi', 'Đã có lỗi xảy ra. Vui lòng thử lại sau.');
            } finally {
                setIsModalVisible(false);
            }
        } else {
            Alert.alert('Thông báo', 'Mật khẩu mới không khớp. Vui lòng thử lại.');
        }
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('@token');
            navigation.replace('Login');
        } catch (error) {
            console.log('Lỗi khi đăng xuất:', error);
        }
    };

    return (
        <ImageBackground source={require('./user.png')} style={styles.backgroundImage}>
            <View style={styles.container}>
                {user ? (
                    <View style={styles.in4Container}>
                        <View style={styles.avatarContainer}>
                            <Image style={styles.avatar} source={{ uri: `https://res.cloudinary.com/dx9aknvnz/${user.avatar}` }} />
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.text}>Gmail:</Text>
                            <Text style={styles.value}>{user.email}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.text}>Họ và tên:</Text>
                            <Text style={styles.value}>{user.first_name} {user.last_name}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.text}>Username:</Text>
                            <Text style={styles.value}>{user.username}</Text>
                        </View>

                        <View style={styles.btContainer}>
                            <TouchableOpacity style={{ marginRight: 50 }} onPress={handleChange}>
                                <Text style={styles.changePasswordText}>
                                    Đổi mật khẩu?
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                                <Text style={styles.buttonText}>LOG OUT</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <Text>Không có thông tin người dùng</Text>
                )}

                <Modal
                    visible={isModalVisible}
                    onDismiss={() => setIsModalVisible(false)}
                    contentContainerStyle={styles.modalContainer}
                >
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Đổi mật khẩu</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Nhập mật khẩu cũ"
                            secureTextEntry={true}
                            value={oldPassword}
                            onChangeText={setOldPassword}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Nhập mật khẩu mới"
                            secureTextEntry={true}
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Nhập lại mật khẩu mới"
                            secureTextEntry={true}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />

                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity
                                style={[styles.modalButton, { marginRight: 10 }]}
                                onPress={() => setIsModalVisible(false)}
                            >
                                <Text style={styles.modalButtonText}>Đóng</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={handleSave}
                            >
                                <Text style={styles.modalButtonText}>Lưu</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    avatarContainer: {
        width: 170,
        height: 170,
        marginLeft: 80,
        borderRadius: 30,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 30,
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 30,
    },
    in4Container: {
        marginTop: 90,
        marginLeft: 30,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'italic',
        width: 100,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingTop: 10,
        paddingLeft: 10,
        borderRadius: 3,
    },
    value: {
        fontSize: 20,
        marginLeft: 20,
        width: 230,
        height: 40,
        paddingTop: 10,
        paddingLeft: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 3,
    },
    btContainer: {
        flexDirection: 'row',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
        height: 50,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
    },
    buttonText: {
        fontWeight: 'bold',
    },
    changePasswordText: {
        color: 'blue',
        fontStyle: 'italic',
        fontSize: 17,
        fontWeight: 'bold',
        paddingTop: 10,
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignSelf: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        fontSize: 16,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 3,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 40,
        backgroundColor: 'lightblue',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
    },
    modalButtonText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
});

export default UserInfo;
