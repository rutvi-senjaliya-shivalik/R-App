import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../screen/home/home';
import Setting from '../../screen/setting/settings';
import Help from '../../screen/setting/help';
import Contact from '../../screen/contact';
import ProfileScreen from '../../screen/profile';
import PersonalDetailsScreen from '../../screen/rID/personalDetailsScreen';
import ProfessionalDetailsScreen from '../../screen/rID/professionalDetailsScreen';
import PropertyDetailsScreen from '../../screen/rID/propertyDetailsScreen';
import Pluses from '../../screen/pluses';
import PlusesProjectDetails from '../../screen/pluses/projectDetails';
import Feedback from '../../screen/feedback';
import Desk from '../../screen/desk';
import MainTabNavigator from '../bottomNavigator/mainTabNavigator';
import ProfileSetting from '../../screen/setting/profileSetting';
import AddLead from '../../screen/leads/addLead';
import LeadDetails from '../../screen/leads/leadDetails';
import UnitAvailability from '../../screen/unitAvailability';
import ProjectDetails from '../../screen/projectDetails';
import BookingDetails from '../../screen/bookingDetails';
import BookingsScreen from '../../screen/bookings';
import BookingDetailsView from '../../screen/bookingDetailsView';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName='MainTabs' screenOptions={{headerShown:false,animation:'slide_from_right'}}>
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="Contact" component={Contact} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="PersonalDetails" component={PersonalDetailsScreen} />
      <Stack.Screen name="ProfessionalDetails" component={ProfessionalDetailsScreen} />
      <Stack.Screen name="PropertyDetails" component={PropertyDetailsScreen} />
      <Stack.Screen name="Pluses" component={Pluses} />
      <Stack.Screen name="PlusesProjectDetails" component={PlusesProjectDetails} />
      <Stack.Screen name="Feedback" component={Feedback} />
      <Stack.Screen name="ProjectDetails" component={ProjectDetails} />
      <Stack.Screen name="Desk" component={Desk} />
      <Stack.Screen name="ProfileSetting" component={ProfileSetting} />
      <Stack.Screen name="AddLead" component={AddLead} />
      <Stack.Screen name="LeadDetails" component={LeadDetails} />
      <Stack.Screen name="UnitAvailability" component={UnitAvailability} />
      <Stack.Screen name="BookingDetails" component={BookingDetails} />
      <Stack.Screen name="Bookings" component={BookingsScreen} />
      <Stack.Screen name="BookingDetailsView" component={BookingDetailsView} />
    </Stack.Navigator>
  );
}

export default AppStack;