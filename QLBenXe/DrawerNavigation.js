// import React from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import HomeScreen from './components/NhaXe/Homescreen';
// import { NavigationContainer, useNavigation } from '@react-navigation/native';

// // import BusCompanyScreen from './components/NhaXe/BusCompanyScreen';
// // import UserScreen from './components/NhaXe/UserScreen';
// // import TicketScreen from './components/NhaXe/TicketScreen';
// // import DeliveryScreen from './components/NhaXe/DeliveryScreen';
// // import RevenueStatisticsScreen from './components/NhaXe/RevenueStatisticsScreen';
// // import BusRouteScreen from './components/NhaXe/BusRouteScreen';
// // import TripScreen from './components/NhaXe/TripScreen';

// const Drawer = createDrawerNavigator();

// const CustomHeader = () => {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.header}>
//       <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
//         <Icon name="bars" size={30} color="black" />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const DrawerNavigator = () => {
//   return (
//     <Drawer.Navigator initialRouteName="Home" screenOptions={{ header: CustomHeader }}>
//       <Drawer.Screen name='Home' component={HomeScreen} />
//       {/* <Drawer.Screen name="Bus Companies" component={BusCompanyScreen} />
//       <Drawer.Screen name="User Profile" component={UserScreen} />
//       <Drawer.Screen name="Tickets" component={TicketScreen} />
//       <Drawer.Screen name="Deliveries" component={DeliveryScreen} />
//       <Drawer.Screen name="Revenue Statistics" component={RevenueStatisticsScreen} />
//       <Drawer.Screen name="Bus Routes" component={BusRouteScreen} />
//       <Drawer.Screen name="Trips" component={TripScreen} /> */}
//     </Drawer.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//   },
//   menuIcon: {
//     marginLeft: 3,
//   },
// });

// export default DrawerNavigator;