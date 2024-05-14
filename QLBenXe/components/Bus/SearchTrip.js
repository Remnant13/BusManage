import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, FlatList, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

// Này là tìm chuyến xe
const SearchTrip = () => {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  //const sortedBuses = suggestedBuses.sort((a, b) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1)));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data when component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("https://linhhv.pythonanywhere.com/bus-company/");
      setData(response.data.results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClearText = () => {
    setSearchText('');
    setData([]);
  };

  const handleSearch = async () => {
    if (!searchText.trim()) {
      setError('Please enter a search term.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://linhhv.pythonanywhere.com/bus-company/search?keyword=${searchText}`);
      setData(response.data.results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreData = async () => {
    // Nếu cần hỗ trợ paginating, bạn có thể thêm logic tại đây
  };
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: `https://res.cloudinary.com/dx9aknvnz/${item.avatar}` }} style={styles.itemImage} />
      <View style={styles.nameDecript}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription} numberOfLines={2} ellipsizeMode="tail">{item.description}</Text>
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
    resizeMode: 'cover'
  },
  itemInfo: {
    flex: 1, // Đảm bảo các thông tin nằm cạnh hình ảnh theo hàng dọc
  },
  nameDecript:{
    flexDirection: 'column',
    maxWidth: 300,
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

export default SearchTrip;