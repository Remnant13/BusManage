import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';
//import DateTimePickerModal from '@react-native-modal/datetime-picker'; 


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
  const [showSendDatePicker, setShowSendDatePicker] = useState(false);
  const [sendSelectedDate, setSendSelectedDate] = useState(new Date());
  const [showReceiveDatePicker, setShowReceiveDatePicker] = useState(false);
  const [receiveSelectedDate, setReceiveSelectedDate] = useState(new Date());

  const handleSend = () => {
    // Gửi email hoặc SMS cho người nhận khi hàng đến
    console.log('Gửi email hoặc SMS cho người nhận');
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
  
  //Cái datetimepicker này lỗi rồi có vẻ nó k còn hỗ trợ hoặc cách xử ý DTP lỗi 

  // const handleDateChange = (selectedDate, type) => {
  // const currentDate = selectedDate || new Date();
  //   if (type === 'send') {
  //     const currentDate = selectedDate || sendSelectedDate;
  //     setShowSendDatePicker(false);
  //     setSendSelectedDate(currentDate);
  //     setThoiGianGui(currentDate); // Cập nhật giá trị của TextInput thời gian gửi hàng
  //   } else if (type === 'receive') {
  //     const currentDate = selectedDate || receiveSelectedDate;
  //     setShowReceiveDatePicker(false);
  //     setReceiveSelectedDate(currentDate);
  //     setThoiGianNhan(currentDate); // Cập nhật giá trị của TextInput thời gian nhận hàng
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

          <Picker
            selectedValue={tinhTrangHang}
            onValueChange={(itemValue) => setTinhTrangHang(itemValue)}
          >
            <Picker.Item label="Chưa gửi" value="Chưa gửi" />
            <Picker.Item label="Đang gửi" value="Đang gửi" />
            <Picker.Item label="Đã nhận" value="Đã nhận" />
          </Picker>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={handleSend}>Đăng ký</Text>
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
