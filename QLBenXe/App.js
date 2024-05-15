import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/User/LogIn';
import SignupScreen from './components/User/SignUp';
import HomeScreen from './components/NhaXe/HomeScreen';
import Logout from './components/User/LogOut';
import UserInfo from './components/User/UserInfo';
import SearchTrip from './components/Bus/SearchTrip';
import SearchCompany from './components/Bus/SeacrhCompany';
import TripDetail from './components/Bus/TripDetail';
import CompanyDetail from './components/Bus/CompanyDetail';
import ShipForm from './components/Bus/ShipForm';
import LoadingScreen from './components/loading/LoadingScreen'

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Loading" component={LoadingScreen} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerLeft: null }}/>
      <Stack.Screen name= "SearchCompany" component={SearchCompany} />
      <Stack.Screen name="SearchTrip" component={SearchTrip} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerLeft: null }}/>
      <Stack.Screen name="SignUp" component={SignupScreen} options={{ headerLeft: null }}/>
      <Stack.Screen name='UserInfo' component={UserInfo}/>
      <Stack.Screen name="Logout" component={Logout} />      
      <Stack.Screen name='TripDetail' component={TripDetail} />
      <Stack.Screen name='CompanyDetail' component={CompanyDetail} />
      <Stack.Screen name='ShipForm' component={ShipForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;