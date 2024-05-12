import { Text, Image, StyleSheet, View, ImageBackground } from "react-native";
import React, { useContext, useState } from 'react';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import moment from 'moment';
import MyContext from "../../MyContext";


const CompanyDetail = () => {
    const [content, setContent] = useState('');
    const [comments, setComments] = useState(null);
    const [user, ] = useContext(MyContext);

    //lỗi đoạn này do k biết lấy data
    useEffect(() => {
        const loadComments = async () => {
            const res = await Apis.get(endpoints.comments(lessonId));
            console.info(res.data);
            setComments(res.data);
        }
        loadComments();
    }, []);

    const comment = async () => {
        const access_token = await AsyncStorage.getItem('token-access');
        const res = await authApi(access_token).post(endpoints.comments(lessonId), {
            'content': content
        });
        console.info(res.data);
        setComments(current => [res.data, ...current]);
    }
    return (
      <ImageBackground source={require("./ctyBG.png")} style={styles.imageBackground}>
        <View style={styles.container}>
            <View style={[{height: '65%'}]}>
          <ScrollView >
            <Text style={[styles.itemName, { fontSize: 30, marginTop: 50, color: "#821f27" }]}>
              THÔNG TIN HÃNG XE
            </Text>
  
            <View style={styles.imageContainer}>
              <Image style={styles.itemImage}  />
            </View>
              <Text style={styles.itemName}>PHƯƠNG TRANG</Text>
              <Text style={styles.itemDescription}>
              Trong ánh hoàng hôn rực rỡ của mùa thu, những hàng cây xanh mướt bên bờ sông bắt đầu nhấp nhô trong làn gió nhẹ nhàng. Tiếng ve râm ran hòa cùng tiếng sóng nước, tạo nên bức tranh huyền diệu của tự nhiên. Bên cạnh dòng sông, một cô gái trẻ đang ngồi, nhìn những ánh nắng cuối ngày chiếu rọi lên bề mặt nước trong veo. Nụ cười nhẹ nhàng nở trên môi cô, mang theo một chút hoài niệm về quãng thời gian đã qua và hy vọng cho những ngày sắp tới
            Trong ánh hoàng hôn rực rỡ của mùa thu, những hàng cây xanh mướt bên bờ sông bắt đầu nhấp nhô trong làn gió nhẹ nhàng. Tiếng ve râm ran hòa cùng tiếng sóng nước, tạo nên bức tranh huyền diệu của tự nhiên. Bên cạnh dòng sông, một cô gái trẻ đang ngồi, nhìn những ánh nắng cuối ngày chiếu rọi lên bề mặt nước trong veo. Nụ cười nhẹ nhàng nở trên môi cô, mang theo một chút hoài niệm về quãng thời gian đã qua và hy vọng cho những ngày sắp tới
            Trong ánh hoàng hôn rực rỡ của mùa thu, những hàng cây xanh mướt bên bờ sông bắt đầu nhấp nhô trong làn gió nhẹ nhàng. Tiếng ve râm ran hòa cùng tiếng sóng nước, tạo nên bức tranh huyền diệu của tự nhiên. Bên cạnh dòng sông, một cô gái trẻ đang ngồi, nhìn những ánh nắng cuối ngày chiếu rọi lên bề mặt nước trong veo. Nụ cười nhẹ nhàng nở trên môi cô, mang theo một chút hoài niệm về quãng thời gian đã qua và hy vọng cho những ngày sắp tới

              </Text>
          </ScrollView >
            </View>

            <View style={[{height: '35%'}]}>
                <Text style={styles.comment}>COMMENTS</Text>
                <ScrollView>
                {user !== null ? (
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TextInput value={content} onChangeText={t => setContent(t)} placeholder="Nội dung bình luận...." style={styles.input}></TextInput>
                        <TouchableOpacity onPress={comment}>
                            <Text style={styles.button}>Bình luận</Text>
                        </TouchableOpacity>
                    </View>
                ) : null}
                {comments !== null ? (
                    <>
                        {comments.map(c => (
                            <View key={c.id} style={{ flexDirection: 'row', padding: 5 }}>
                                <Image source={{ uri: c.user.avatar }} style={{ width: 30, height: 30 }}></Image>
                                <View>
                                    <Text>{c.content}</Text>
                                    <Text>{moment(c.created_date).fromNow()}</Text>
                                </View>
                            </View>
                        ))}
                    </>
                ) : null}
            </ScrollView>
        </View>
        </View>
      </ImageBackground>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
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
      fontWeight: "bold",
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
    comment:{
      fontWeight: "bold",
      color: "#0a1a94",
      fontSize: 30,
      fontWeight: "bold",
      marginTop: 60,
      textAlign: "center",
    },
    button:{
        backgroundColor: 'darkblue',
        color: 'white',
        padding: 5,
        width: 75,
        textAlign: 'center'
    },
  });

export default CompanyDetail;  