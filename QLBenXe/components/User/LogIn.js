import React, { useState } from 'react';
import { Modal, Button, ToastAndroid, ActivityIndicator, StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Apis, { authApi, endpoints } from "../../Apis";

const LoginScreen = ({navigation}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState();
    const [error, setError] = useState("");

    const handleSignUpPress = () => {
      navigation.navigate('SignUp');
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const handleLoginPress = async () => {
      if (!username.trim() || !password.trim()) {
        setError('Vui lòng nhập tên đăng nhập và mật khẩu.');
        return;
      }
    
      try {
        setLoading(true);
    
        const formData = new FormData();
        formData.append('client_id', 'peaYJQgyopNTPyOLH7Sd9tuvXEsxxiEyACpQAisM'); 
        formData.append('client_secret', '1x8mZhdvNWYvH4LEFxwHmkXK7maKmFeiBX7gtbsuFQFxuW78kwbkttXYt4dhZ9JGC3dGCFliQrTcTB0BpkJJoy8gwcerBVfDsUQcvaeqCNeRCbdGLyastU2pDTfo0b7j'); 
        formData.append('username', username);
        formData.append('password', password);
        formData.append('grant_type', 'password');
    
        const response = await fetch(endpoints['login'], {
          method: "POST",
          body: formData
        });
    
        if (!response.ok) {
          throw new Error('Kết nối đến máy chủ không thành công.');
        }
    
        const data = await response.json();
    
        await AsyncStorage.setItem('token-access', data.access_token);
        const userResponse = await authApi(data.access_token).get(endpoints['current_user']);
        const userData = await userResponse.json();
    
        dispatch({
          type: 'login',
          payload: {
            username: userData.username
          }
        });
    
        navigation.navigate('Home');
      } catch (error) {
        console.error('Lỗi khi kết nối đến cơ sở dữ liệu:', error);
        if (error instanceof SyntaxError || error instanceof TypeError) {
          setError("Có lỗi xảy ra khi xử lý dữ liệu.");
        } else if (error.response && error.response.status === 401) {
          setError("Tên đăng nhập hoặc mật khẩu không đúng.");
        } else {
          setError("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.");
        }
      } finally {
        setLoading(false);
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
            value={username} 
            onChangeText={t=>setUsername(t)}
          />
        </View>

        <View style={Mystyles.input}>
          <Image source={require('./icLock.png')} style={Mystyles.icon} />
          <TextInput 
            placeholder="Password" 
            secureTextEntry={!showPassword} 
            value={password} 
            onChangeText={t=>setPassword(t)}
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
