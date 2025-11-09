import { createStackNavigator } from '@react-navigation/stack';

import Landing from '../../screen/auth/landing';
import Login from '../../screen/auth/login';
import OtpScreen from '../../screen/auth/otp';
import Profile from '../../screen/auth/profile';
import WhoAmI from '../../screen/auth/whoAmI';
import Territory from '../../screen/auth/territory';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../store/selectors/auth';

const Stack = createStackNavigator();

const AuthStack = () => {
  const userData = useSelector(selectUserData);
  // console.log('userData:::-->', userData);
  
  // // Determine initial route based on user data
  // const initialRoute = !userData
  //   ? 'Landing'
  //   : userData?.isProfileComplete
  //   ? 'Landing' // If profile is complete, they should be in AppStack, but if we're here, show Landing
  //   : 'Profile';

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="WhoAmI" component={WhoAmI} />
      <Stack.Screen name="Territory" component={Territory} />
    </Stack.Navigator>
  );
};

export default AuthStack;
