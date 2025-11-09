import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../screen/home/home';
import Setting from '../../screen/setting/settings';
import Help from '../../screen/setting/help';
import Contact from '../../screen/contact';
import ProfileScreen from '../../screen/rID';
import PersonalDetailsScreen from '../../screen/rID/personalDetailsScreen';
import ProfessionalDetailsScreen from '../../screen/rID/professionalDetailsScreen';
import PropertyDetailsScreen from '../../screen/rID/propertyDetailsScreen';
import Pluses from '../../screen/pluses';
import ProjectDetails from '../../screen/pluses/projectDetails';
import Project from '../../screen/project';
import Feedback from '../../screen/feedback';
import Desk from '../../screen/desk';
import MainTabNavigator from '../bottomNavigator/mainTabNavigator';
import ProfileSetting from '../../screen/setting/profileSetting';
import SocietyService from '../../screen/society/SocietyService';
import AmenitiesScreen from '../../screen/society/amenities';
import AmenitiesBookingScreen from '../../screen/society/amenities/bookingScreen';
import RecentBookingsScreen from '../../screen/society/amenities/recentBookings';
import HelpdeskScreen from '../../screen/society/helpdesk';
import SecurityScreen from '../../screen/society/security';
import SOSScreen from '../../screen/society/sos';
import ReportScreen from '../../screen/society/report';
import DashboardScreen from '../../screen/society/dashboard';
import UnitManagementScreen from '../../screen/society/unitManagement';
import LostAndFoundScreen from '../../screen/society/lostAndFound';
import NoticeDashboardScreen from '../../screen/society/noticeDashboard';
import MyParkingScreen from '../../screen/society/myParking';
import VisitorEntryScreen from '../../screen/society/visitorEntry';
import ComplaintsScreen from '../../screen/society/complaints';
import AddComplaintScreen from '../../screen/society/complaints/addComplaint';


const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'MainTabs'}
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="Contact" component={Contact} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="PersonalDetails" component={PersonalDetailsScreen} />
      <Stack.Screen
        name="ProfessionalDetails"
        component={ProfessionalDetailsScreen}
      />
      <Stack.Screen name="PropertyDetails" component={PropertyDetailsScreen} />
      <Stack.Screen name="Pluses" component={Pluses} />
      <Stack.Screen name="ProjectDetails" component={ProjectDetails} />
      <Stack.Screen name="Project" component={Project} />
      <Stack.Screen name="Feedback" component={Feedback} />
      <Stack.Screen name="Desk" component={Desk} />
      <Stack.Screen name="ProfileSetting" component={ProfileSetting} />
      <Stack.Screen name="SocietyService" component={SocietyService} />
      <Stack.Screen name="SocietyAmenities" component={AmenitiesScreen} />
      <Stack.Screen name="AmenitiesBooking" component={AmenitiesBookingScreen} />
      <Stack.Screen name="RecentBookings" component={RecentBookingsScreen} />
      <Stack.Screen name="SocietyHelpdesk" component={HelpdeskScreen} />
      <Stack.Screen name="SocietySecurity" component={SecurityScreen} />
      <Stack.Screen name="SocietySOS" component={SOSScreen} />
      <Stack.Screen name="SocietyReport" component={ReportScreen} />
      <Stack.Screen name="SocietyDashboard" component={DashboardScreen} />
      <Stack.Screen name="UnitManagement" component={UnitManagementScreen} />
      <Stack.Screen name="Complaints" component={ComplaintsScreen} />
      <Stack.Screen name="AddComplaint" component={AddComplaintScreen} />
      <Stack.Screen name="LostAndFound" component={LostAndFoundScreen} />
      <Stack.Screen name="NoticeDashboard" component={NoticeDashboardScreen} />
      <Stack.Screen name="MyParking" component={MyParkingScreen} />
      <Stack.Screen name="VisitorEntry" component={VisitorEntryScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
