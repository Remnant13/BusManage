import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, FlatList, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Này là tìm chuyến xe
const SearchTrip = () => {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  //const sortedBuses = suggestedBuses.sort((a, b) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1)));
  const handleClearText = () => {
    setSearchText('');
  };

  const handleSearch = () => {
    //xử lý data nghen
  };

  
  const fetchMoreData = () => {
    // Fetch dữ liệu và cập nhật state
  };

  //tương tự như đoạn này //lỗi đoạn này do k biết lấy data
  const handleDetail = (busId) => {
    const navigation = useNavigation();
    // Assume busData is an object containing all necessary information of the bus
    navigation.navigate('TripDetail', { busData: yourBusDataObject });
  };
  

  // thử thôi
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleDetail(item.id)}>
      {/* Render mỗi item tại đây */}
    </TouchableOpacity>
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
        //data={suggestedBuses}
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

});

export default SearchTrip;