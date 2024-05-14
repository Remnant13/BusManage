import React, { useState } from 'react';
import { Modal, Button, ToastAndroid, ActivityIndicator, StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Apis, { authApi, endpoints } from "../../Apis";

const LoginScreen = ({navigation}) => {

    const [loading, setLoading] = useState();
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSignUpPress = () => {
      navigation.navigate('SignUp');
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const [textInputValues, setTextInputValues] = useState({
      client_id: "vqyiw8bH0m7GNMEU4LmPCdfW9GNPxvGOhBBcM3Io",
      client_secret:
        "VP3kvy8VXwZcUmakkFbzj3ohWfGT3KHVVbmi9jHD81gaLvwDFDsXcE73rnMlNrkhBVxcfGetfdfRarN4XYjPg7BDUuw2Pyq7JjuqV4awa8CjAOjsl7rq3VPdfqsTyisB",
      grant_type: "password",
      username: "",
      password: "",
    });
  
    const handleInputChange = (inputName, text) => {
      setTextInputValues({
        ...textInputValues,
        [inputName]: text,
      });
    };
  
    const saveToken = async (token) => {
      try {
        await AsyncStorage.setItem('@token', token);
        console.log('Token đã được lưu trữ');
      } catch (error) {
        console.log('Lỗi khi lưu trữ token:', error);
      }
    };
  
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem('@token');
        if (token !== null) {
          console.log('Token đã được lấy:', token);
          return token;
        } else {
          console.log('Không tìm thấy token');
          return null;
        }
      } catch (error) {
        console.log('Lỗi khi lấy token:', error);
        return null;
      }
    };
    const handleLoginPress = async () => {
      if (!textInputValues.username || !textInputValues.password) {
        Alert.alert(
          'Vui lòng điền đầy đủ thông tin tài khoản!',
          '',
          [{ text: 'OK' }],
          { cancelable: false }
        );
        return; // Dừng hàm nếu không điền đầy đủ thông tin
      }
  
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("client_id", textInputValues.client_id);
        formData.append("client_secret", textInputValues.client_secret);
        formData.append("username", textInputValues.username);
        formData.append("password", textInputValues.password);
        formData.append("grant_type", textInputValues.grant_type);
  
  
        const response = await fetch(
          "https://linhhv.pythonanywhere.com/o/token/",
          {// co headers la bi loi network request failed
            method: "POST",
            body: formData,
          }
        );
  
        const data = await response.json();
        console.log(data);
        if (data.access_token) {
          saveToken(data.access_token);
          navigation.replace("Home");
          
        } else {
  
          setLoading(false);
          throw new Error("Đăng nhập thất bại!");
        }
      } catch (error) {
        setLoading(false);
        Alert.alert(
          "Đăng nhập tài khoản thất bại!",
          "Mời bạn đăng nhập lại",
          [{ text: "OK" }],
          { cancelable: false }
        );
      }
    };
    
  return (
    <ImageBackground source={require('./loginBg.png')} style={Mystyles.container}>
      <Text style={Mystyles.title}>USER LOGIN</Text>

      <View style={Mystyles.inputContent}>

        <View style={Mystyles.input}>
          <Image source={require('./icUser.png')} style={Mystyles.icon} />
          <TextInput 
            placeholder="Username" 
            value={textInputValues.username} 
            onChangeText={(text) => handleInputChange("username", text)}
          />
        </View>

        <View style={Mystyles.input}>
          <Image source={require('./icLock.png')} style={Mystyles.icon} />
          <TextInput 
            placeholder="Password" 
            secureTextEntry={!showPassword} 
            value={textInputValues.password} 
            onChangeText={(text) => handleInputChange("password", text)}
            style={{ flex: 1 }} 
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={{ padding: 22 }}>
            <MaterialCommunityIcons
              name={showPassword ? 'eye-off' : 'eye'}
              size={25}
              color={showPassword ? '#777' : '#333'}
            />
          </TouchableOpacity>
        </View>
      </View>

      {loading===true?<ActivityIndicator size="large" color="#ffffff"/>:<>
            <TouchableOpacity  style={Mystyles.button} onPress={handleLoginPress}>
                <Text style={Mystyles.buttonText}>LOGIN</Text>
             </TouchableOpacity>
         </>}

      <Text style={[{color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 10},]} >
            Bạn chưa có tài khoản?</Text>

      <TouchableOpacity style={Mystyles.button} onPress={handleSignUpPress}>
        <Text style={Mystyles.buttonText}>SIGIN UP</Text>
      </TouchableOpacity>

      <Modal
        visible={!!error}
        animationType="slide"
        transparent={true}
      >
        <View style={Mystyles.modal}>
          <View style={Mystyles.modalContent}>
            <Text style={Mystyles.modalText}>{error}</Text>
            <Button title="Đóng" onPress={() => setError('')} />
          </View>
        </View>
      </Modal>

    </ImageBackground>
  );
};
  

const Mystyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  
  title: {
    fontSize: 39,
    fontFamily: 'notoserif',
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 20,
    marginTop: 100,
    color: '#fcfcfc',
  },
  inputContent:{
    flexDirection: 'column',
    width: '90%',
  },
  input: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#b8b8bf',
    fontWeight: 'bold',
    marginBottom: 15,
    borderRadius: 35,
    opacity: 1.1,
  },
  icon: {
    width: 35,
    height: 35,
    marginLeft:10,
    marginTop: 15,
    marginRight: 20,
  },
  button: {
    backgroundColor: '#1c1c80',
    paddingVertical: 10,
    borderRadius: 30,
    marginBottom: 50,
    alignItems: 'center',
    width: '90%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  error: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 50,
    textAlign: 'center',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LoginScreen;
