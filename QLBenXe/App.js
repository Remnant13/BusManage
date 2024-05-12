import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/User/LogIn';
import LoadingScreen from './components/loading/LoadingScreen'
import SignupScreen from './components/User/SignUp';
import HomeScreen from './components/NhaXe/HomeScreen';
import Logout from './components/User/LogOut';
import UserInfo from './components/User/UserInfo';
import SearchTrip from './components/Bus/SearchTrip';
import SearchCompany from './components/Bus/SeacrhCompany';
import TripDetail from './components/Bus/TripDetail';
import CompanyDetail from './components/Bus/CompanyDetail';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name='TripDetail' component={TripDetail} options={{headerShown: false }}/>
      <Stack.Screen name='CompanyDetail' component={CompanyDetail} options={{headerShown: false }}/>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerLeft: null }}/>
      <Stack.Screen name= "SearchCompany" component={SearchCompany}options={{ headerLeft: null, headerShown: false }} />
      <Stack.Screen name="SearchTrip" component={SearchTrip} options={{ headerLeft: null, headerShown: false }} />
      <Stack.Screen name="Loading" component={LoadingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerLeft: null }}/>
      <Stack.Screen name="SignUp" component={SignupScreen} />
      <Stack.Screen name='UserInfo' component={UserInfo}/>
      <Stack.Screen name="Logout" component={Logout} />      
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;