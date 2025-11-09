import { createStackNavigator } from '@react-navigation/stack';
import MainTabNavigator from '../bottomNavigator/mainTabNavigator';
import { SMART_SOCIETY_ROUTES } from '../routes/smartSocietyRoutes';

// General App Screens
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
import ProfileSetting from '../../screen/setting/profileSetting';

// Society Management
import SocietySelection from '../../screen/society/societySelection';
import AddNewSociety from '../../screen/society/addNewSociety';

// Smart Society - Main
import SmartSociety from '../../screen/smartSociety';
import RoleSelection from '../../screen/smartSociety/roleSelection';
import AddVisitor from '../../screen/smartSociety/addVisitor';
import QRScanner from '../../screen/smartSociety/qrScanner';
import MarkVisitorExit from '../../screen/smartSociety/markVisitorExit';
import ExpectedVisitors from '../../screen/smartSociety/expectedVisitors';
import MemberDirectory from '../../screen/smartSociety/memberDirectory';
import EmergencyAlerts from '../../screen/smartSociety/emergencyAlerts';
import ReportActivity from '../../screen/smartSociety/reportActivity';
import UpdateLogStatus from '../../screen/smartSociety/updateLogStatus';
import RecordParcel from '../../screen/smartSociety/recordParcel';

// Smart Society - Bills & Finance
import MyBills from '../../screen/smartSociety/bills/myBills';
import BillGeneration from '../../screen/smartSociety/bills/billGeneration';
import PaymentScreen from '../../screen/smartSociety/bills/paymentScreen';
import ReceiptScreen from '../../screen/smartSociety/bills/receiptScreen';
import ExpenseTracking from '../../screen/smartSociety/expenses/expenseTracking';

// Smart Society - Complaints
import ComplaintsList from '../../screen/smartSociety/community/complaints/complaintsList';
import AddComplaint from '../../screen/smartSociety/community/complaints/addComplaint';
import ComplaintDetail from '../../screen/smartSociety/community/complaints/complaintDetail';
import AdminComplaintManagement from '../../screen/smartSociety/community/complaints/adminComplaintManagement';

// Smart Society - Notices
import NoticesList from '../../screen/smartSociety/community/notices/noticesList';
import AddNotice from '../../screen/smartSociety/community/notices/addNotice';
import NoticeDetail from '../../screen/smartSociety/community/notices/noticeDetail';

// Smart Society - Events
import EventsList from '../../screen/smartSociety/community/events/eventsList';
import AddEvent from '../../screen/smartSociety/community/events/addEvent';
import EventDetail from '../../screen/smartSociety/community/events/eventDetail';

// Smart Society - Society Rules
import SocietyRules from '../../screen/smartSociety/community/societyRules';

// Smart Society - Logs (Resident View)
import VisitorLogs from '../../screen/smartSociety/logs/visitorLogs';
import ParcelLogs from '../../screen/smartSociety/logs/parcelLogs';

// Smart Society - Watchman
import AddVisitorEntry from '../../screen/smartSociety/watchman/addVisitorEntry';
import ResidentAddVisitorEntry from '../../screen/smartSociety/resident/addVisitorEntry';
import ResidentRecordParcel from '../../screen/smartSociety/resident/recordParcel';

// Smart Society - Profile & Settings
import VehicleRegistration from '../../screen/smartSociety/profile/vehicleRegistration';
import EditProfile from '../../screen/smartSociety/profile/editProfile';

// Smart Society - Security & Emergency
import PanicSOSAlert from '../../screen/smartSociety/security/panicSOSAlert';

// Smart Society - Admin Management
import AdminMemberManagement from '../../screen/smartSociety/admin/adminMemberManagement';
import AdminParkingManagement from '../../screen/smartSociety/admin/adminParkingManagement';
import AdminAmenitiesManagement from '../../screen/smartSociety/admin/adminAmenitiesManagement';
import AddAmenity from '../../screen/smartSociety/admin/addAmenity';
import AdminAmenityBookings from '../../screen/smartSociety/admin/adminAmenityBookings';

// Smart Society - Amenities
import AmenitiesList from '../../screen/smartSociety/amenities/amenitiesList';
import AmenityDetail from '../../screen/smartSociety/amenities/amenityDetail';
import BookAmenity from '../../screen/smartSociety/amenities/bookAmenity';
import MyBookings from '../../screen/smartSociety/amenities/myBookings';

// Smart Society - Lost & Found
import LostFoundList from '../../screen/smartSociety/community/lostFound/lostFoundList';
import AddLostFound from '../../screen/smartSociety/community/lostFound/addLostFound';
import LostFoundDetail from '../../screen/smartSociety/community/lostFound/lostFoundDetail';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      id={undefined}
      initialRouteName="MainTabs"
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
      {/* Society Management */}
      <Stack.Screen name="SocietySelection" component={SocietySelection} />
      <Stack.Screen name="AddNewSociety" component={AddNewSociety} />
      {/* Smart Society - Main */}
      <Stack.Screen name={SMART_SOCIETY_ROUTES.ROLE_SELECTION} component={RoleSelection} />
      <Stack.Screen name={SMART_SOCIETY_ROUTES.SMART_SOCIETY} component={SmartSociety} />
      
      {/* Smart Society - Bills & Finance */}
      <Stack.Screen name={SMART_SOCIETY_ROUTES.MY_BILLS} component={MyBills} />
      <Stack.Screen name={SMART_SOCIETY_ROUTES.BILL_GENERATION} component={BillGeneration} />
      <Stack.Screen name={SMART_SOCIETY_ROUTES.PAYMENT_SCREEN} component={PaymentScreen} />
      <Stack.Screen name={SMART_SOCIETY_ROUTES.RECEIPT_SCREEN} component={ReceiptScreen} />
      <Stack.Screen name={SMART_SOCIETY_ROUTES.EXPENSE_TRACKING} component={ExpenseTracking} />
      
      {/* Smart Society - Complaints */}
      <Stack.Screen name={SMART_SOCIETY_ROUTES.COMPLAINTS_LIST} component={ComplaintsList} />
      <Stack.Screen name={SMART_SOCIETY_ROUTES.ADD_COMPLAINT} component={AddComplaint} />
      <Stack.Screen name={SMART_SOCIETY_ROUTES.COMPLAINT_DETAIL} component={ComplaintDetail} />
      <Stack.Screen name={SMART_SOCIETY_ROUTES.ADMIN_COMPLAINT_MANAGEMENT} component={AdminComplaintManagement} />
      
      {/* Smart Society - Notices */}
      <Stack.Screen name={SMART_SOCIETY_ROUTES.NOTICES_LIST} component={NoticesList} />
      <Stack.Screen name={SMART_SOCIETY_ROUTES.ADD_NOTICE} component={AddNotice} />
      <Stack.Screen name={SMART_SOCIETY_ROUTES.NOTICE_DETAIL} component={NoticeDetail} />
      
      {/* Smart Society - Events */}
      <Stack.Screen name={SMART_SOCIETY_ROUTES.EVENTS_LIST} component={EventsList} />
      <Stack.Screen name={SMART_SOCIETY_ROUTES.ADD_EVENT} component={AddEvent} />
      <Stack.Screen name={SMART_SOCIETY_ROUTES.EVENT_DETAIL} component={EventDetail} />
      
      {/* Smart Society - Society Rules */}
      <Stack.Screen name={SMART_SOCIETY_ROUTES.SOCIETY_RULES} component={SocietyRules} />
      
      {/* Smart Society - Logs (Resident View) */}
      <Stack.Screen name={SMART_SOCIETY_ROUTES.VISITOR_LOGS} component={VisitorLogs} />
      <Stack.Screen name={SMART_SOCIETY_ROUTES.PARCEL_LOGS} component={ParcelLogs} />
      
      {/* Smart Society - Watchman */}
      <Stack.Screen name={SMART_SOCIETY_ROUTES.ADD_VISITOR_ENTRY} component={AddVisitorEntry} />
      <Stack.Screen name={SMART_SOCIETY_ROUTES.MARK_VISITOR_EXIT} component={MarkVisitorExit} />
      <Stack.Screen name={SMART_SOCIETY_ROUTES.RECORD_PARCEL} component={RecordParcel} />
      
      {/* Smart Society - Resident Actions */}
      <Stack.Screen name={SMART_SOCIETY_ROUTES.RESIDENT_ADD_VISITOR_ENTRY} component={ResidentAddVisitorEntry} />
      <Stack.Screen name={SMART_SOCIETY_ROUTES.RESIDENT_RECORD_PARCEL} component={ResidentRecordParcel} />
      
      {/* Smart Society - Profile & Settings */}
      <Stack.Screen name={SMART_SOCIETY_ROUTES.VEHICLE_REGISTRATION} component={VehicleRegistration} />
      <Stack.Screen name={SMART_SOCIETY_ROUTES.EDIT_PROFILE} component={EditProfile} />
      
      {/* Smart Society - Security & Emergency */}
      <Stack.Screen name={SMART_SOCIETY_ROUTES.PANIC_SOS_ALERT} component={PanicSOSAlert} />
      
      {/* Smart Society - Admin Management */}
      <Stack.Screen name={SMART_SOCIETY_ROUTES.ADMIN_MEMBER_MANAGEMENT} component={AdminMemberManagement} />
      <Stack.Screen name={SMART_SOCIETY_ROUTES.ADMIN_PARKING_MANAGEMENT} component={AdminParkingManagement} />
      <Stack.Screen name={SMART_SOCIETY_ROUTES.ADMIN_AMENITIES_MANAGEMENT} component={AdminAmenitiesManagement} />
      <Stack.Screen name={SMART_SOCIETY_ROUTES.ADD_AMENITY} component={AddAmenity} />
      <Stack.Screen name={SMART_SOCIETY_ROUTES.ADMIN_AMENITY_BOOKINGS} component={AdminAmenityBookings} />
      
      {/* Smart Society - Amenities */}
      <Stack.Screen name={SMART_SOCIETY_ROUTES.AMENITIES_LIST} component={AmenitiesList} />
      <Stack.Screen name={SMART_SOCIETY_ROUTES.AMENITY_DETAIL} component={AmenityDetail} />
      <Stack.Screen name={SMART_SOCIETY_ROUTES.BOOK_AMENITY} component={BookAmenity} />
      <Stack.Screen name={SMART_SOCIETY_ROUTES.MY_BOOKINGS} component={MyBookings} />
      
      {/* Smart Society - Lost & Found */}
      <Stack.Screen name={SMART_SOCIETY_ROUTES.LOST_FOUND_LIST} component={LostFoundList} />
      <Stack.Screen name={SMART_SOCIETY_ROUTES.ADD_LOST_FOUND} component={AddLostFound} />
      <Stack.Screen name={SMART_SOCIETY_ROUTES.LOST_FOUND_DETAIL} component={LostFoundDetail} />
      
      {/* Legacy screens - Keep for backward compatibility with existing navigation */}
      <Stack.Screen name={SMART_SOCIETY_ROUTES.ADD_VISITOR} component={AddVisitor} />
      <Stack.Screen name={SMART_SOCIETY_ROUTES.QR_SCANNER} component={QRScanner} />
      <Stack.Screen name={SMART_SOCIETY_ROUTES.EXPECTED_VISITORS} component={ExpectedVisitors} />
      <Stack.Screen name={SMART_SOCIETY_ROUTES.MEMBER_DIRECTORY} component={MemberDirectory} />
      <Stack.Screen name={SMART_SOCIETY_ROUTES.EMERGENCY_ALERTS} component={EmergencyAlerts} />
      <Stack.Screen name={SMART_SOCIETY_ROUTES.REPORT_ACTIVITY} component={ReportActivity} />
      <Stack.Screen name={SMART_SOCIETY_ROUTES.UPDATE_LOG_STATUS} component={UpdateLogStatus} />
    </Stack.Navigator>
  );
};

export default AppStack;
