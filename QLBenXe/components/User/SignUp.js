import { Radio } from '@mui/material';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { RadioButton } from 'react-native-paper';
import axios from 'axios'; // Ensure you import axios if you're using it
import Apis, {HOST, endpoints, authApi} from '../../Apis';

const SignupScreen = ({ navigation }) => {
  const [ho, setHo] = useState('');
  const [ten, setTen] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState('user');
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  const Main = () => {
    navigation.navigate('Home');
  };

  const handleSignUpPress = async () => {
    if (password !== confirmPassword) {
      setError('Mật khẩu không trùng khớp');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let form = new FormData();
      form.append('username', username);
      form.append('first_name', ten);
      form.append('last_name', ho);
      form.append('email', email);
      form.append('password', password);

      if (avatar) {
        const localUri = avatar.uri;
        const filename = localUri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;

        form.append('avatar', {
          uri: localUri,
          name: filename,
          type: type,
        });
      }

      const response = await axios.post(`https://linhhv.pythonanywhere.com/user/`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.info(form);
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      setError('Đăng ký thất bại, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const changeAvatar = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission denied!');
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setAvatar(result.assets[0]);
      }
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng ký tài khoản</Text>
      <View style={styles.form}>
        <View style={styles.nameContainer}>
          <TextInput
            style={[styles.input, { marginEnd: 20 }, { width: '35%' }]}
            placeholder="Họ"
            value={ho}
            onChangeText={setHo}
          />
          <TextInput
            style={[styles.input, { width: '58%' }]}
            placeholder="Tên"
            value={ten}
            onChangeText={setTen}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email@gmail.com"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Nhập lại mật khẩu"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
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
            <Text style={[{ color: '#4a4948', fontWeight: 'bold', marginRight: 20, fontSize: 16 }]}>User</Text>
          </View>

          <View style={styles.radioButton}>
            <RadioButton
              value="company"
              status={selectedOption === 'company' ? 'checked' : 'unchecked'}
              onPress={() => setSelectedOption('company')}
            />
            <Text style={[{ color: '#4a4948', fontWeight: 'bold', fontSize: 16 }]}>Company</Text>
          </View>
        </View>

        <TouchableOpacity onPress={changeAvatar} style={styles.avatarContainer}>
          {avatar ? (
            <Image
              source={{ uri: avatar.uri }}
              resizeMode="cover"
              style={styles.avatar}
            />
          ) : (
            <Text style={{ color: 'black', fontSize: 14, textAlign: 'center', alignItems: 'center' }}>
              Chọn avatar...
            </Text>
          )}
        </TouchableOpacity>

        <Text style={[{ color: '#4a4948', marginBottom: 15, fontSize: 15, fontWeight: 'bold', fontStyle: 'italic' }]}>
          Bạn đã có tài khoản?{"\n"}Vui lòng nhấn
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, { marginEnd: 45 }]} onPress={handleLoginPress}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>

          {loading ? <ActivityIndicator /> : (
            <TouchableOpacity style={styles.button} onPress={handleSignUpPress}>
              <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={Main}>
        <Text style={styles.buttonText}>Main</Text>
      </TouchableOpacity>
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
    fontSize: 35,
    fontFamily: 'notoserif',
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 20,
    marginTop: 15,
    color: '#4a4948',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  form: {
    width: '80%',
    height: '85%',
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
    marginBottom: 15,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  buttonContainer: {
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
    width: '40%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  avatarContainer: {
    width: 120,
    height: 120,
    marginLeft: 80,
    borderRadius: 20,
    borderColor: 'gray',
    borderWidth: 1,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 20,
  },
});

export default SignupScreen;
