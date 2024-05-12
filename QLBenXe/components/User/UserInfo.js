import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Modal } from 'react-native-paper';

const UserInfo = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation();
    const picker = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "Thành công") {
            alert("Truy cập bị chặn!");
        } else {
            const result = await ImagePicker.launchImageLibraryAsync();
            if (!result.cancelled) {
                // Cập nhật avatar khi người dùng chọn hình ảnh từ thư viện
                change('avatar', result);
            }
        }
    };

    const handleChange =() => {
        setIsModalVisible(true);
    }

    const handleSave = () => {
        // Kiểm tra xem mật khẩu mới và nhập lại mật khẩu mới có khớp nhau không
        if (newPassword === confirmPassword) {
            // Thực hiện lưu thông tin người dùng, ví dụ:
            const updatedUser = { ...user, password: newPassword };
            // Gọi hàm hoặc API để cập nhật thông tin người dùng
            saveUserData(updatedUser);
            // Đóng modal sau khi lưu thành công
            setIsModalVisible(false);
        } else {
            // Hiển thị thông báo hoặc thực hiện hành động phù hợp nếu mật khẩu không khớp nhau
            alert("Mật khẩu mới không khớp. Vui lòng thử lại.");
        }
    };    
    const handleScreen = (screen) => {
        navigation.navigate(screen);
    };
  return (
    //sửa chỗ ... thành user.<tên của API>
    <View style={styles.container}>
        <View style={styles.in4Container}>
            <View style={styles.avatarContainer}>
                <Image style={styles.avatar} 
                //source={{ uri: user.avatar }} 
                />
            </View>

        <View style={styles.row}>
          <Text style={styles.text}>Gmail:</Text>
          <Text style={styles.value}>....</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.text} >Họ và tên:</Text>
          <Text style={styles.value}>....</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.text}>Username:</Text>
          <Text style={styles.value}>....</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.text}>Password:</Text>
          <Text style={styles.value} onPress={() => setShowPassword(!showPassword)}>
        {showPassword ? 'RealPass' : '....'}
            </Text>
        </View>
        

        <View style={styles.btContainer}>
            <TouchableOpacity 
            style={[{marginRight: 50}]} onPress={() => handleChange('ChangePass')}>
                <Text 
                style={[{color: 'blue', 
                fontStyle: 'italic', 
                fontSize: 17,
                fontWeight: 'bold',
                paddingTop: 10}]}>
                    Đổi mật khẩu?
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => handleScreen('Logout')}>
                <Text style={[{
                    fontSize: 15, 
                    fontWeight: 'bold'}]}>LOG OUT</Text>
            </TouchableOpacity>
        </View>
      </View>
      <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Đổi mật khẩu</Text>
                    
                    {/* Ô nhập mật khẩu cũ */}
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập mật khẩu cũ"
                        secureTextEntry={true}
                    />

                    {/* Ô nhập mật khẩu mới */}
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập mật khẩu mới"
                        secureTextEntry={true}
                        value={newPassword}
                        onChangeText={setNewPassword}
                    />

                    {/* Ô nhập lại mật khẩu mới */}
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
                            style={styles.modalButton }
                            onPress={handleSave}
                        >
                            <Text style={styles.modalButtonText}>Lưu</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#c7d9d3',
      flexDirection: 'row',
      //justifyContent: 'center',
    },
    avatarContainer: {
      width: 170,
      height: 170,
      marginLeft: 60,
      borderRadius: 30,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 30,
      //alignItems: 'center',
      //justifyContent: 'center',
    },
    avatar: {
      width: 150,
      height: 150,
      borderRadius: 30,
    },
    in4Container:{
        marginTop: 90,
        marginLeft: 50,
    },

    row: {
      flexDirection: 'row',
      //alignItems: 'center',
      //marginLeft: 50,
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
      //fontFamily: 'Arial',
      fontSize: 16,
      marginLeft: 10,
      width: 200,
      height: 40,
      paddingTop: 10,
      paddingLeft: 10,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 3,
    },
    btContainer:{
        flexDirection: 'row',
        //marginTop: 20,
    },
    button:{
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
        height: 50,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,

    },
    modalContainer: {
        //flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
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
        //marginLeft: 10,
    },
    modalButtonText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
  });

export default UserInfo;