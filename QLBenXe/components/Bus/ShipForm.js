import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePicker from '@react-native-community/datetimepicker'; // Uncomment if DateTimePicker is fixed

const ShipForm = () => {
  const [tenNguoiGui, setTenNguoiGui] = useState('');
  const [soDienThoaiNguoiGui, setSoDienThoaiNguoiGui] = useState('');
  const [emailNguoiGui, setEmailNguoiGui] = useState('');
  const [tenNguoiNhan, setTenNguoiNhan] = useState('');
  const [soDienThoaiNguoiNhan, setSoDienThoaiNguoiNhan] = useState('');
  const [emailNguoiNhan, setEmailNguoiNhan] = useState('');
  const [thoiGianGui, setThoiGianGui] = useState('');
  const [thoiGianNhan, setThoiGianNhan] = useState('');
  const [tinhTrangHang, setTinhTrangHang] = useState('');
  // const [showSendDatePicker, setShowSendDatePicker] = useState(false);
  // const [sendSelectedDate, setSendSelectedDate] = useState(new Date());
  // const [showReceiveDatePicker, setShowReceiveDatePicker] = useState(false);
  // const [receiveSelectedDate, setReceiveSelectedDate] = useState(new Date());

// Sau khi nhận được token từ API sau khi đăng nhập
  const saveTokenToStorage = async (token) => {
    try {
      await AsyncStorage.setItem('@token', token);
      console.log('Token saved successfully.');
    } catch (error) {
      console.log('Error saving token:', error);
    }
  };

  const handleSend = async () => {
    try {
      const token = await AsyncStorage.getItem('@token');
      if (token) {
        // Gửi yêu cầu API với token đã lấy được
        const data = {
          sender_name: tenNguoiGui,
          sender_phone: soDienThoaiNguoiGui,
          sender_email: emailNguoiGui,
          receiver_name: tenNguoiNhan,
          receiver_phone: soDienThoaiNguoiNhan,
          receiver_email: emailNguoiNhan,
          delivery_time: thoiGianGui,
          pickup_time: thoiGianNhan,
          delivery_status: tinhTrangHang,
          bus_company: 2, // Change this value if necessary
        };
    
        const token = await AsyncStorage.getItem('@token');
        axios.post('https://linhhv.pythonanywhere.com/delivery/', data, {
          
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Add authentication token if required
          }
        })
        .then(response => {
          Alert.alert('Thành công', 'Đơn hàng đã được tạo thành công');
          console.log(response.data);
        })
        .catch(error => {
          console.info(data);
          Alert.alert('Lỗi', 'Đã xảy ra lỗi khi tạo đơn hàng');
          console.log(error);
        });
      } else {
        console.log('Authentication credentials were not provided.', error);
      }
    } catch (error) {
      console.log('Error getting token:', error);
    }
  };
  
  // const showDatepicker = (type) => {
  //   if (type === 'send') {
  //     setShowSendDatePicker(true);
  //     setShowReceiveDatePicker(false); 
  //   } else if (type === 'receive') {
  //     setShowReceiveDatePicker(true);
  //     setShowSendDatePicker(false); 
  //   }
  // };

  // const handleDateChange = (selectedDate, type) => {
  //   const currentDate = selectedDate || new Date();
  //   if (type === 'send') {
  //     setShowSendDatePicker(false);
  //     setSendSelectedDate(currentDate);
  //     setThoiGianGui(currentDate.toISOString());
  //   } else if (type === 'receive') {
  //     setShowReceiveDatePicker(false);
  //     setReceiveSelectedDate(currentDate);
  //     setThoiGianNhan(currentDate.toISOString());
  //   }
  // };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.form}>
          <Text style={styles.label}>Thông tin người gửi</Text>
          <TextInput
            style={styles.input}
            placeholder="Họ tên"
            value={tenNguoiGui}
            onChangeText={(text) => setTenNguoiGui(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            value={soDienThoaiNguoiGui}
            onChangeText={(text) => setSoDienThoaiNguoiGui(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={emailNguoiGui}
            onChangeText={(text) => setEmailNguoiGui(text)}
          />

          <Text style={styles.label}>Thông tin người nhận</Text>
          <TextInput
            style={styles.input}
            placeholder="Họ tên"
            value={tenNguoiNhan}
            onChangeText={(text) => setTenNguoiNhan(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            value={soDienThoaiNguoiNhan}
            onChangeText={(text) => setSoDienThoaiNguoiNhan(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={emailNguoiNhan}
            onChangeText={(text) => setEmailNguoiNhan(text)}
          />

          {/* Uncomment if DateTimePicker is fixed
          <Text style={styles.label}>Thời gian gửi hàng</Text>
          <TouchableOpacity onPress={() => showDatepicker('send')}>
            <Text style={[styles.input, { height: 35 }]}>Chọn ngày</Text>
          </TouchableOpacity>
          {showSendDatePicker && (
            <DateTimePicker
              testID="sendDateTimePicker"
              value={sendSelectedDate}
              mode="datetime"
              display="default"
              onChange={(event, selectedDate) => handleDateChange(selectedDate, 'send')}
            />
          )}

          <Text style={styles.label}>Thời gian nhận hàng</Text>
          <TouchableOpacity onPress={() => showDatepicker('receive')}>
            <Text style={[styles.input, { height: 35 }]}>Chọn ngày</Text>
          </TouchableOpacity>
          {showReceiveDatePicker && (
            <DateTimePicker
              testID="receiveDateTimePicker"
              value={receiveSelectedDate}
              mode="datetime"
              display="default"
              onChange={(event, selectedDate) => handleDateChange(selectedDate, 'receive')}
            />
          )}
          */}

          <Picker
            selectedValue={tinhTrangHang}
            onValueChange={(itemValue) => setTinhTrangHang(itemValue)}
          >
            <Picker.Item label="Chưa gửi" value="Chưa gửi" />
            <Picker.Item label="Đang gửi" value="Đang gửi" />
            <Picker.Item label="Đã nhận" value="Đã nhận" />
          </Picker>
          <TouchableOpacity style={styles.button} onPress={handleSend}>
            <Text style={styles.buttonText}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    alignItems: 'stretch',
    marginTop: 30,
  },
  form: {
    width: '90%',
    height: 'auto',
    alignSelf: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  label: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#0a1a94',
    textAlign: 'justify',
  },
  input: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#1c1c80',
    paddingVertical: 10,
    borderRadius: 30,
    marginTop: 30,
    marginBottom: 40,
    alignItems: 'center',
    width: '50%',
    alignSelf: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ShipForm;
