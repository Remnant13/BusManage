// import React, { useState } from 'react';
// import { Modal, Button, ToastAndroid, ActivityIndicator, StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Apis, { authApi, endpoints } from "../../Apis";

// const LoginScreen = ({navigation}) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSignInPress = () => {
//     navigation.navigate('SignUp');
//   };

//   const handleLoginPress = async () => {
//     if (!username.trim() || !password.trim()) {
//       ToastAndroid.show(
//         'Vui lòng nhập mật khẩu hoặc tên đăng nhập',
//         ToastAndroid.LONG,
//         ToastAndroid.BOTTOM
//       );
//       return; 
//     }

//     try {
//       setLoading(true);
//       let res = await Apis.post(endpoints['login'], {
//         'client_id': 'YouG1pC4bQDzcg8qoFNLcsAM2H2mi4YCYePY1CqI',
//         'client_secret': 'pbkdf2_sha256$720000$BXafFbT99IWsJpUjYdKn5z$ZeWNPxr2bGB4XlLudeWlXg/WACozEcq2A3thP72o3S0=',
//         'username': username,
//         'password': password,
//         'grant_type': 'password'
//       });

//       console.info(res.data);
//       await AsyncStorage.setItem('token-access', res.data.access_token);
//       let user = await authApi(res.data.access_token).get(endpoints['current_user']);
//       console.info(user.data);
      
//       if (user.ok) {
//         console.log("Đăng nhập thành công!");
//         setError('');
        
//         //navigation.navigate('Home');
//       } else {
//         console.log("Tên đăng nhập hoặc mật khẩu không đúng!");
//         setError('Tên đăng nhập hoặc mật khẩu không đúng!');
//       }
//     } catch (error) {
//       console.error('Lỗi khi kết nối đến cơ sở dữ liệu:', error);
//       setError('Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.');
//     } finally {
//       setLoading(false);
//     }
//   };
    
//   return (
//     <ImageBackground source={require('./loginBg.png')} style={Mystyles.container}>
//       <Text style={Mystyles.title}>USER LOGIN</Text>

//       <View style={Mystyles.inputContent}>

//         <View style={Mystyles.input}>
//           <Image source={require('./icUser.png')} style={Mystyles.icon} />
//           <TextInput 
//             placeholder="Username" 
//             value={username} 
//             onChangeText={setUsername} 
//           />
//         </View>

//         <View style={Mystyles.input}>
//           <Image source={require('./icLock.png')} style={Mystyles.icon} />
//           <TextInput 
//             placeholder="Password" 
//             secureTextEntry={true} 
//             value={password} 
//             onChangeText={setPassword} 
//           />
//         </View>
//       </View>

//       {loading ? (
//         <ActivityIndicator size="large" color="#ffffff" /> 
//       ) : (
//         <TouchableOpacity style={Mystyles.button} onPress={handleLoginPress}>
//           <Text style={Mystyles.buttonText}>LOGIN</Text>
//         </TouchableOpacity>
//       )}

//       <Text style={[{color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 10},]} >
//             Bạn chưa có tài khoản?</Text>

//       <TouchableOpacity style={Mystyles.button} onPress={handleSignInPress}>
//         <Text style={Mystyles.buttonText}>SIGIN UP</Text>
//       </TouchableOpacity>

//       <Modal
//         visible={!!error}
//         animationType="slide"
//         transparent={true}
//       >
//         <View style={Mystyles.modal}>
//           <View style={Mystyles.modalContent}>
//             <Text style={Mystyles.modalText}>{error}</Text>
//             <Button title="Đóng" onPress={() => setError('')} />
//           </View>
//         </View>
//       </Modal>

//     </ImageBackground>
//   );
// };
  

// const Mystyles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
  
//   title: {
//     fontSize: 39,
//     fontFamily: 'notoserif',
//     fontWeight: 'bold',
//     fontStyle: 'italic',
//     marginBottom: 20,
//     marginTop: 100,
//     color: '#fcfcfc',
//   },
//   inputContent:{
//     flexDirection: 'column',
//     width: '90%',
//   },
//   input: {
//     flexDirection: 'row',
//     height: 70,
//     backgroundColor: '#b8b8bf',
//     fontWeight: 'bold',
//     marginBottom: 15,
//     borderRadius: 35,
//     opacity: 1.1,
//   },
//   icon: {
//     width: 35,
//     height: 35,
//     marginLeft:10,
//     marginTop: 15,
//     marginRight: 20,
//   },
//   button: {
//     backgroundColor: '#1c1c80',
//     paddingVertical: 10,
//     borderRadius: 30,
//     marginBottom: 50,
//     alignItems: 'center',
//     width: '90%',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
//   error: {
//     color: 'red',
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginTop: 50,
//     textAlign: 'center',
//   },
//   modal: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     opacity: 0.7,
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   modalText: {
//     marginBottom: 20,
//     fontSize: 16,
//     textAlign: 'center',
//   },
// });

// export default LoginScreen;
