import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';

const SearchTrip = () => {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("https://linhhv.pythonanywhere.com/trip/");
      setData(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClearText = () => {
    setSearchText('');
    fetchData();
  };

  const handleSearch = async () => {
    if (!searchText.trim()) {
      setError('Please enter a search term.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://linhhv.pythonanywhere.com/trip/?search=${searchText}`);
      setData(response.data.results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDetail = (busData) => {
    navigation.navigate('TripDetail', { busData });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleDetail(item)}>
      <View style={styles.itemContainer}>
        <Image source={{ uri: `https://res.cloudinary.com/dx9aknvnz/${item.bus_company.avatar}` }} style={styles.itemImage} />
        <View style={styles.nameDecript}>
          <Text style={styles.itemName}>{item.bus_company.name}</Text>
          <Text style={styles.itemDescription}>{item.bus_route.route_name}</Text>
          <Text style={styles.itemPrice}>Price: {item.ticket_price}</Text>
          <Text style={styles.itemDeparture}>Departure: { format(new Date(item.departure_time), 'HH:mm dd/MM/yyyy') }</Text>
          <Text style={styles.itemArrival}>Arrival: { format(new Date(item.arrival_time), 'HH:mm dd/MM/yyyy') }</Text>
        </View>
      </View>
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
            placeholder="Search for trips"
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
        onEndReachedThreshold={0.5}
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
    justifyContent: 'center',
  },
  containerBar: {
    flexDirection: 'row',
    borderColor: '#c852f7',
    borderRadius: 30,
    borderWidth: 2,
    marginHorizontal: 20,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  searchIconContainer: {
    padding: 10,
  },
  clearIconContainer: {
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  nameDecript: {
    flexDirection: 'column',
    justifyContent: 'center',
    flexShrink: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  itemPrice: {
    fontSize: 16,
    color: '#8d21bf',
    marginTop: 5,
  },
  itemDeparture: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  itemArrival: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default SearchTrip;
