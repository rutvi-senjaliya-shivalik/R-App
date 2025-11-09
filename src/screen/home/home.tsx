import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Platform, PermissionsAndroid, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HomeStyles } from './styles';
import Container from '../../components/common/container';
import { AppHeader, MetricsCard, QuickActions, TierProgressCard, ConversionRatios, ScheduledVisits, RecentActivity } from '../../components/common';
import Images from '../../constants/images';
import { Image } from 'react-native';
import { COLORS, FF, FS } from '../../constants';
import { userDetailAction } from '../../store/actions/auth/userDetailAction';
import { selectUserDetailData } from '../../store/selectors/auth';
import { Camera } from 'react-native-vision-camera';
import Geolocation from 'react-native-geolocation-service';

const Home = (props: any) => {
  const dispatch = useDispatch() as any;
  const { userData } = useSelector((state: any) => state.otp);
  const userName = userData?.firstName;
  const userDetailData = useSelector(selectUserDetailData);
  const user = userDetailData?.data?.result;


  const userDetailsApi = () => {
    dispatch(userDetailAction()).then((res: any) => {
      console.log('User Details API Response', res);
    });
  }

  useEffect(() => {
    if(user == undefined){
      userDetailsApi();
    }
  }, []);

  useEffect(() => {
    console.log('User is Employee', user?.isEmployee);
    console.log('User ID', user?._id);


    if (user?.isEmployee && user?._id) {
      // employeeDetailsApi();
      console.log('Employee Details API Called');

    }

  }, [user?.isEmployee, user?._id]);

  // Function to request camera permission
  const requestCameraPermission = async (): Promise<boolean> => {
    try {
      const permission = await Camera.requestCameraPermission();
      if (permission === 'granted') {
        return true;
      } else if (permission === 'denied') {
        Alert.alert(
          'Camera Permission Required',
          'Camera access is required for attendance. Please grant camera permission.',
          [{ text: 'OK' }]
        );
        return false;
      }
      return false;
    } catch (error) {
      console.error('Camera permission error:', error);
      Alert.alert('Error', 'Unable to request camera permission.');
      return false;
    }
  };

  // Function to request location permission
  const requestLocationPermissionForAttendance = async (): Promise<boolean> => {
    try {
      let granted = false;

      if (Platform.OS === 'android') {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location for attendance verification.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        granted = permission === PermissionsAndroid.RESULTS.GRANTED;
      } else if (Platform.OS === 'ios') {
        const permission = await Geolocation.requestAuthorization('whenInUse');
        granted = permission === 'granted';
      }

      if (!granted) {
        Alert.alert(
          'Location Permission Required',
          'Location access is required for attendance. Please grant location permission.',
          [{ text: 'OK' }]
        );
      }

      return granted;
    } catch (error) {
      console.error('Location permission error:', error);
      Alert.alert('Error', 'Unable to request location permission.');
      return false;
    }
  };

  const homeMenuItems: any[] = [];

  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[HomeStyles.menuItem]}
        onPress={() => {
          if (item.label === 'Project') {
            props.navigation.navigate('Project');
          } else {
            Alert.alert(
              'Coming Soon',
              'We’ll be introducing this feature soon.',
              [{ text: 'OK' }]
            );
          }
        }}
      >
        <Image source={item.image} style={[HomeStyles.menuIcon]} />
        <Text style={HomeStyles.menuLabel}>{item.label}</Text>
      </TouchableOpacity>
    );
  };



  const handleBellPress = () => {
    Alert.alert('Notifications', 'No new notifications');
  };

  const handleProfilePress = () => {
    props.navigation.navigate('Profile');
  };

  const handleAddLead = () => {
    props.navigation.navigate('AddLead');
  };

  const handleCreateInvoice = () => {
    Alert.alert('Create Invoice', 'Navigate to Create Invoice screen');
    // props.navigation.navigate('CreateInvoice');
  };

  const handleViewAllVisits = () => {
    Alert.alert('View All', 'Navigate to all scheduled visits');
    // props.navigation.navigate('ScheduledVisits');
  };

  const handleCallPress = (phone: string) => {
    Alert.alert('Call', `Calling ${phone}`);
    // Linking.openURL(`tel:${phone}`);
  };

  const handleVisitPress = (leadId: string) => {
    props.navigation.navigate('LeadDetails', { leadId });
  };

  const handleViewAllActivity = () => {
    Alert.alert('View All', 'Navigate to all recent activities');
    // props.navigation.navigate('RecentActivity');
  };

  const handleActivityPress = (activity: any) => {
    Alert.alert('Activity', `Viewing: ${activity.title}`);
    // Navigate to activity details
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
      <AppHeader 
        onBellPress={handleBellPress}
        onProfilePress={handleProfilePress}
      />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Metrics Card */}
        <MetricsCard 
          userName={userName || 'Rajesh Kumar'}
          activeLeads={24}
          bookings={8}
        />

        {/* Quick Actions */}
        <QuickActions 
          onAddLead={handleAddLead}
          onCreateInvoice={handleCreateInvoice}
        />

        {/* Tier Progress Card */}
        <TierProgressCard 
          currentTier="Gold"
          commissionRate="2.5%"
          progress={68}
          progressLabel="Monthly Target Progress"
        />

        {/* Conversion Ratios */}
        <ConversionRatios />

        {/* Scheduled Visits */}
        <ScheduledVisits 
          onViewAll={handleViewAllVisits}
          onCallPress={handleCallPress}
          onVisitPress={handleVisitPress}
        />

        {/* Recent Activity */}
        <RecentActivity 
          onViewAll={handleViewAllActivity}
          onActivityPress={handleActivityPress}
        />
        
        {/* Menu Grid */}
        <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
          <FlatList
            data={homeMenuItems}
            renderItem={renderItem}
            numColumns={3}
            contentContainerStyle={HomeStyles.menuGrid}
            columnWrapperStyle={{}}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
{/* paste here */ }
{/*
          <CustomDropdownInput
          placeholder="Select Fruit"
          data={fruitArray}
          value={fruit}
          onChangeText={setFruit}
          isActive={activeIndex === 0}
          onFocus={() => setActiveIndex(0)}
          onClose={() => setActiveIndex(null)}
        />

<CustomDropdownInput
          placeholder="Select Berry"
          data={berryArray}
          value={berry}
          onChangeText={setBerry}
          isActive={activeIndex === 1}
          onFocus={() => setActiveIndex(1)}
          onClose={() => setActiveIndex(null)}
        /> */}

