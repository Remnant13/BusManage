import React, { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import MyContext from '../../MyContext';

const HomeScreen = () => {
  const navigation = useNavigation();
  //const [user] = useContext(MyContext);

  const handleScreen = (screen) => {
    navigation.navigate(screen);
  };

  const handleLogout = async () => {
    try {
        // Xóa token hoặc bất kỳ dữ liệu đăng nhập nào khác từ AsyncStorage
        await AsyncStorage.removeItem('@token');
        // Sau đó điều hướng người dùng đến màn hình đăng nhập
        navigation.replace('Login');
    } catch (error) {
        console.log('Lỗi khi đăng xuất:', error);
    }
};

  return (
    <ImageBackground source={require('./busBG1.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.buttonRow}>
          <TouchableOpacity  style={styles.button} onPress={() => handleScreen('UserInfo')}>
            <Text style={styles.buttonText}>User Information</Text>
          </TouchableOpacity>

          <TouchableOpacity  style={styles.button} onPress={() => handleScreen('SearchTrip')}>
            <Text style={styles.buttonText}>Tìm chuyến xe</Text>
          </TouchableOpacity>
        </View>


        <View style={styles.buttonRow}>
          <TouchableOpacity  style={styles.button} onPress={() => handleScreen('SearchCompany')}>
            <Text style={styles.buttonText}>Tìm hãng xe</Text>
          </TouchableOpacity>

          <TouchableOpacity  style={styles.button} onPress={() => handleScreen('ShipForm')}>
            <Text style={styles.buttonText}>Giao Hàng</Text>
          </TouchableOpacity>
        </View>


        <View style={styles.buttonRow}>
          <TouchableOpacity  style={styles.button} onPress={() => handleScreen('Screen5')}>
            <Text style={styles.buttonText}>Thống Kê</Text>
          </TouchableOpacity>

          <TouchableOpacity  style={styles.button} onPress={handleLogout}>
            <Text style={[styles.buttonText, {color:'#d8ede6'}]}>Log Out</Text>
          </TouchableOpacity>
        </View>

        
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
    marginTop: 75,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 15,
    marginTop: 15,
    marginRight: 15,
  },
  button: {
    borderRadius: 20,
    marginBottom: 80,
    alignItems: 'center',
    width: '45%',
    height: '80%',
    backgroundColor: 'rgba(168, 168, 167, 0.5)'
  },
  buttonText: {
    fontStyle: 'italic',
    color: '#144031',
    fontWeight: '900',
    paddingTop: 50,
    fontSize: 22,
    opacity: 1,
  },
});

export default HomeScreen;