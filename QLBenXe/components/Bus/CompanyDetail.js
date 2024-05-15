import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import moment from 'moment';
import axios from 'axios';

const CompanyDetail = ({ route }) => {
  const [content, setContent] = useState('');
  const [comments, setComments] = useState([]);
  const { item } = route.params;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`https://linhhv.pythonanywhere.com/bus-company/${item.id}/get_comments`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  const handleComment = async () => {
    try {
      const response = await axios.post(`https://linhhv.pythonanywhere.com/bus-company/${item.id}/comments`, {
        content: content
      });
      setComments(currentComments => [response.data, ...currentComments]);
      setContent(''); // Clear comment input after posting
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <ImageBackground source={require("./ctyBG.png")} style={styles.imageBackground}>
      <View style={styles.container}>
        <View style={{ height: '65%' }}>
          <ScrollView>
            <Text style={styles.itemName}>THÔNG TIN HÃNG XE</Text>
            <View style={styles.imageContainer}>
              <Image style={styles.itemImage} source={{ uri: `https://res.cloudinary.com/dx9aknvnz/${item.avatar}` }} />
            </View>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
          </ScrollView>
        </View>

        {/* Comments section */}
        <Text style={styles.comment}>COMMENTS</Text>
        <ScrollView style={{backgroundColor: "#e3e5e8"}}>
          <View style={{ marginBottom: 20, width: '100%', flexDirection: 'column'}} >
        <View style={styles.commentContainer}>
          
            {/* Render comments */}
            {comments.map(c => (
              <View key={c.id} style={styles.commentContainer}>
                <Text style={styles.textComt} >{c.comment}</Text>
                <Text>{moment(c.created_date).fromNow()}</Text>
              </View>
            ))}
          
        </View>
        {/* Comment input field */}
        <View style={{ flexDirection: 'row'}}>
          <TextInput
            value={content}
            onChangeText={t => setContent(t)}
            placeholder="Nhập bình luận"
            style={styles.input}
          />
          <TouchableOpacity onPress={handleComment}>
            <Text style={styles.button}>Bình luận</Text>
          </TouchableOpacity>
        </View>
        </View>
         </ScrollView>
      </View>

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
    opacity: 0.9,
  },
  imageContainer: {
    alignItems: "center",
  },
  itemImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 20,
    resizeMode: "cover",
    borderColor: 'lightgray',
    borderWidth: 2,
  },
  itemName: {
    fontWeight: "bold",
    color: "#0a1a94",
    fontSize: 30,
    marginTop: 30,
    textAlign: "center",
  },
  itemDescription: {
    fontSize: 18,
    color: "#2b2b2b",
    marginTop: 5,
    paddingHorizontal: 10,
    textAlign: 'justify',
    fontWeight: "bold",
  },
  comment: {
    fontWeight: "bold",
    color: "#0a1a94",
    fontSize: 30,
    marginTop: 60,
    //textAlign: "center",

  },
  textComt:{
    color: '#1b1c1c',
    fontSize: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'darkblue',
    color: 'white',
    padding: 5,
    width: 75,
    height: 40,
    textAlign: 'center'
  },
  input: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    flex: 1,
    width: '80%',
  },
  commentContainer: {
    flexDirection: 'column',
    padding: 5,
    height: 'auto',
    width: '95%',

  },
  avatar: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: 15,
  },
  commentContent: {
    flex: 1,
  },
});

export default CompanyDetail;
