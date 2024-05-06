import { Radio } from '@mui/material';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';

const SignupScreen = ({ navigation }) => {
    const [ho, setHo] = useState('');
    const [ten, setTen] = useState('');
    const [username, setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [selectedOption, setSelectedOption] = useState('user');

    const handleSignUpPress = () => {
      

      if (password!== confirmPassword) {
        setError('Mật khẩu không trùng khớp');
      } else {
        // Call API to register user
        console.log('Register user');
      }
    };
    const handleLoginPress = () => {
        navigation.navigate('Login');
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Đăng ký tài khoản</Text>
        <View style={styles.form}>

            <View style={styles.nameContainer}>
            <TextInput
               style={[styles.input,{marginEnd: 20}, { width: '35%' }]}
                placeholder="Họ"
                value={ho}
                onChangeText={(text) => setHo(text)}
            />
            <TextInput
                style={[styles.input, { width: '58%' }]}
                placeholder="Tên"
                value={ten}
                onChangeText={(text) => setTen(text)}
            />
            </View>

          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
           <TextInput
            style={styles.input}
            placeholder="Email@gmail.com"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.input}
            placeholder="Nhập lại mật khẩu"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry={true}
          />
          {error && <Text style={styles.error}>{error}</Text>}

          <View style={styles.radioButtonContainer}>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="user"
                            status={selectedOption === 'user' ? 'checked' : 'unchecked'}
                            onPress={() => setSelectedOption('user')}
                        />
                        <Text style={[{color: '#4a4948',
                              fontWeight: 'bold', marginRight: 20, fontSize: 16,
                        }]}>User</Text>
                    </View>
                    
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="company"
                            status={selectedOption === 'company' ? 'checked' : 'unchecked'}
                            onPress={() => setSelectedOption('company')}
                        />
                        <Text style={[{color: '#4a4948',
                              fontWeight: 'bold', fontSize: 16,
                        }]}>Company</Text>
                    </View>
                </View>
        
          <Text style={[{color: '#4a4948',marginBottom: 15, fontSize: 15, 
                    fontWeight: 'bold', fontStyle: 'italic'}]} >
            Bạn đã có tải khoản?{"\n"}Vui lòng nhấn</Text>

          <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, {marginEnd: 45}]}
                     onPress={handleLoginPress}>
            <Text style={styles.buttonText}>
                LOGIN</Text>
          </TouchableOpacity>
        
          <TouchableOpacity style={styles.button} onPress={handleSignUpPress}>
            <Text style={styles.buttonText}>
                SIGN UP</Text>
          </TouchableOpacity>
          </View>

        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'lightgray',
      paddingTop: 20,
      alignItems: 'center',
    },
    title: {
        fontSize: 39,
        fontFamily: 'notoserif',
        fontWeight: 'bold',
        fontStyle: 'italic',
        marginBottom: 20,
        marginTop: 30,
        color: '#4a4948',
      },
    nameContainer:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    form: {
      width: '80%',
      height: '80%',
      paddingHorizontal: 20,
      paddingVertical: 30,
      borderRadius: 10,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 5,
    },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      paddingHorizontal: 10,
      paddingVertical: 10,
      marginBottom: 20,
    },
    error: {
      color: 'red',
      fontSize: 16,
      marginBottom: 10,
    },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  radioButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 20,
  },
    buttonContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    },
    button: {
      backgroundColor: '#4CAF50',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
      alignItems: 'center',
      width: '40%'
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
});
  
  export default SignupScreen;