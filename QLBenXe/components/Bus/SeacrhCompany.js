import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, FlatList, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const SearchCompany = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("https://linhhv.pythonanywhere.com/bus-company/");
      let firstPageData = response.data.results;
      if (response.data.next) {
        const nextPageResponse = await axios.get(response.data.next);
        const nextPageData = nextPageResponse.data.results;
        firstPageData = [...firstPageData, ...nextPageData];
      }
      setData(firstPageData);
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

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemPress(item)}>
      <Image source={{ uri: `https://res.cloudinary.com/dx9aknvnz/${item.avatar}` }} style={styles.itemImage} />
      <View style={styles.nameDescription}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription} numberOfLines={2} ellipsizeMode="tail">{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleItemPress = (item) => {
    navigation.navigate('CompanyDetail', { item });
  };

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
      {loading && <ActivityIndicator size="large" color="#8d21bf" />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        data={data}
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
    marginBottom: 20,
    backgroundColor: '#916aa3',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  containerBar: {
    marginTop: 20,
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
  nameDescription: {
    flex: 1,
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
  errorText: {
    color: 'red',
    alignSelf: 'center',
    marginTop: 10,
  },
});

export default SearchCompany;
