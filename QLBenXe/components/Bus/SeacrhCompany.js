import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, FlatList, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Này là tìm hãng xe
const SearchCompany = () => {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const handleClearText = () => {
    setSearchText('');
  };

  const handleSearch = () => {
    //xử lý data nghen
  };

  
  const fetchMoreData = () => {
    // Fetch dữ liệu và cập nhật state
  };

  // thử thôi
  const suggestedBuses = [
    { id: 1, name: 'Bus A', description: 'This is bus A description', price: '$20' },
    { id: 2, name: 'Bus B', description: 'This is bus B description', price: '$25' },
    { id: 3, name: 'Bus C', description: 'This is bus C description', price: '$30' },
    { id: 4, name: 'Bus D', description: 'This is bus D description', price: '$22' },
    { id: 5, name: 'Bus E', description: 'This is bus E description', price: '$28' },
    { id: 6, name: 'Bus E', description: 'This is bus E description', price: '$28' },
    { id: 7, name: 'Bus E', description: 'This is bus E description', price: '$28' },
    { id: 8, name: 'Bus E', description: 'This is bus E description', price: '$28' },
    { id: 9, name: 'Bus E', description: 'This is bus E description', price: '$28' },
    { id: 10, name: 'Bus E', description: 'This is bus E description', price: '$28' },
    { id: 11, name: 'Bus E', description: 'This is bus E description', price: '$28' },
  ];

  //decript là thông tin hãng xe, 
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
    <Image source={require('../../components/loading/logo.png')} style={styles.itemImage} />
      <View style={styles.nameDecript}>
      <Text style={styles.itemName}>{item.name}</Text>
      
      <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <View style={styles.containerBar}>
          <TouchableOpacity style={styles.searchIconContainer} onPress={handleSearch}>
            <MaterialCommunityIcons name="magnify" size={20} color="#8d21bf" />
          </TouchableOpacity>
          <TextInput
            style={styles.searchBar}
            placeholder="Search for buses"
            placeholderTextColor="#888"
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity style={styles.clearIconContainer} onPress={handleClearText}>
              <MaterialCommunityIcons name="close-circle-outline" size={25} color="#8d21bf" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <FlatList
        data={suggestedBuses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomLeftRadius: 20, 
    borderBottomRightRadius: 20, 
  },
  containerHeader: {
    width: '100%',
    height: '16%',
    marginBottom: 40,
    backgroundColor: '#916aa3',
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20, 
  },
  containerBar: {
    marginTop: 40,
    flexDirection: 'row',
    borderColor: '#c852f7',
    borderRadius: 30,
    borderWidth: 2,
    marginHorizontal: 10,
    backgroundColor: 'white',
  },
  searchBar: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  searchIconContainer: {
    padding: 13,
  },
  clearIconContainer: {
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 20,
  },
  itemInfo: {
    flex: 1, // Đảm bảo các thông tin nằm cạnh hình ảnh theo hàng dọc
  },
  nameDecript:{
    flexDirection: 'column',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8d21bf',
    alignSelf: 'flex-end', // Căn phần giá về phía dưới cùng
  },
});

export default SearchCompany;