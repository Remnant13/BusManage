import { useContext, useState } from "react";
import { Text, Image, StyleSheet, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import MyContext from "../../MyContext";

const TripDetail = ({route}) => {
    //const [lesson, setLesson] = useState(null);
    //const {lessonId} = route.param;
    const [comments, setComment] = useState(null);
    const [content, setContent] = useState();
    const [user, ] = useContext(MyContext);

    //lỗi đoạn này do k biết lấy data
    useEffect(()=>{
        const loadTrip = async ()=>{
            let res = await Apis.get(endpoints['trips'](lessonId));
            console.info(res.data)
            setLesson(res.data);
        }
    });
    //phần ảnh mốt dùng uri:tên ảnh chứ k dùng require
    return (
    <ScrollView style={styles.container}>
           <Text 
           style={[styles.itemName,
            {fontSize: 30, marginTop: 50, color: '#821f27'}]}>
                THÔNG TIN CHUYẾN XE</Text>

            <View style={styles.itemContainer}>

                <Image style={styles.itemImage}
                source={require('../NhaXe/busBG1.png')}></Image>
                    
                <View style={[{flexDirection: 'column'}]}> 
                    <Text style={styles.itemName}> TP HCM - Thừa Thiên Huế</Text>

                    <View style={{flexDirection: 'column', width: '60%', marginLeft: 45,}}>
                        <View style={{flexDirection: 'row', marginVertical: 10}}>
                            <Text style={[styles.itemDescription, {marginRight: 35}]}>Giờ khởi hành:</Text>
                            <Text style={[styles.itemDescription, {color: '#ff0303', fontSize: 20}]}>9:00 </Text>
                            {/* chỗ này đổi thành giờ mình muốn */}
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={[styles.itemDescription, {marginRight: 19}]}>Giờ dự kiến đến:</Text>
                            <Text style={[styles.itemDescription, {color: '#ff0303', fontSize: 20}]}>15:00 AM</Text>
                            {/* chỗ này đổi thành giờ mình muốn */}
                        </View>
                        <View style={{flexDirection: 'row', marginVertical: 20}}>
                             {/* K có sl ghế thì bỏ giùm dòng text tui sẽ chỉnh lại */}
                             <Text style={{ fontSize: 17, fontWeight: 'bold', paddingRight: 130}}>SL GHẾ: 15</Text>
                            <Text style={[styles.itemPrice,]}>300$</Text>
                        </View>
                    </View>
                </View>
            </View>
    </ScrollView>    
    );
};
const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#f5edd7',
},
itemContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
},
imageBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
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
   textAlign: 'center',
},
itemDescription: {
    fontSize: 18,
    color: "#2b2b2b",
    marginTop: 5,
    textAlign:'justify',
    fontWeight: "bold",
},
itemPrice: {
    fontSize: 30,
    textAlign: 'left',
    fontWeight: "bold",
    color: "#b156db",
    alignSelf: "flex-end",
},
});
export default TripDetail;