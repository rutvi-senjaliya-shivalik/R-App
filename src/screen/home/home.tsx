import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { useSelector } from 'react-redux';
import { HomeStyles } from './styles';
import { Container } from '../../components/common';
import Images from '../../constants/images';
import { Image } from 'react-native';
import { COLORS, FF, FS } from '../../constants';
// import { userDetailAction } from '../../store/actions/auth/userDetailAction';
import { selectUserDetailData } from '../../store/selectors/auth';
import { Camera } from 'react-native-vision-camera';
import Geolocation from 'react-native-geolocation-service';
import { useTranslation } from '../../context/LanguageContext';
import PrefManager from '../../utils/prefManager';
import { STRING } from '../../constants';

const Home = (props: any) => {
  const { t } = useTranslation();
  // const dispatch = useDispatch() as any;
  const { userData } = useSelector((state: any) => state.otp);
  const userName = userData?.firstName || 'User';
  const userDetailData = useSelector(selectUserDetailData);
  const user = userDetailData?.data?.result;
  const isMountedRef = useRef(true);
  // const isApiCallingRef = useRef(false);

  // const userDetailsApi = useCallback(async () => {
  //   // Prevent multiple simultaneous API calls
  //   if (isApiCallingRef.current) {
  //     console.log('User details API already in progress');
  //     return;
  //   }

  //   isApiCallingRef.current = true;
  //   try {
  //     const res = await dispatch(userDetailAction());
  //     if (isMountedRef.current) {
  //       console.log('User Details API Response', res);
  //     }
  //   } catch (error: any) {
  //     if (isMountedRef.current) {
  //       console.error('User Details API Error:', error);

  //       // Handle network errors with user-friendly messages
  //       if (
  //         error?.message === 'Network Error' ||
  //         error?.code === 'NETWORK_ERROR' ||
  //         !error?.response
  //       ) {
  //         console.error('Network Error Details:', {
  //           message: error?.message,
  //           code: error?.code,
  //           config: error?.config,
  //         });

  //         // Only show alert if component is still mounted and user is likely to see it
  //         // You can uncomment this if you want to show an alert to the user
  //         // Alert.alert(
  //         //   'Connection Error',
  //         //   'Unable to connect to the server. Please check your internet connection and try again.',
  //         //   [{ text: 'OK' }]
  //         // );
  //       } else if (error?.response) {
  //         // Server responded with error status
  //         console.error('API Error Response:', {
  //           status: error.response.status,
  //           data: error.response.data,
  //         });
  //       }
  //     }
  //   } finally {
  //     isApiCallingRef.current = false;
  //   }
  // }, [dispatch]);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // useEffect(() => {
  //   if (!isMountedRef.current) return;

  //   if (user === undefined) {
  //     userDetailsApi();
  //   }
  // }, [user, userDetailsApi]);

  useEffect(() => {
    if (!isMountedRef.current) return;

    console.log('📊 Home Screen - User Data Check:');
    console.log('Redux userData:', userData);
    console.log('Redux userData keys:', userData ? Object.keys(userData) : 'null/undefined');
    console.log('Redux userData _id:', userData?._id || userData?.id);
    console.log('userDetailData:', userDetailData);
    console.log('user (from userDetailData):', user);
    console.log('User is Employee', user?.isEmployee);
    console.log('User ID', user?._id);

    // Save role to AsyncStorage if available
    const saveRoleToStorage = async () => {
      try {
        const role = userData?.role;
        if (role) {
          await PrefManager.setValue(STRING.ROLE, role);
          console.log('✅ Role saved to AsyncStorage:', role);
          console.log('in api role:', role);
        } else {
          console.log('⚠️ No role found in userData');
        }
      } catch (error) {
        console.error('❌ Error saving role to AsyncStorage:', error);
      }
    };

    saveRoleToStorage();

    if (user?.isEmployee && user?._id) {
      // employeeDetailsApi();
      console.log('Employee Details API Called');
    }
  }, [user?.isEmployee, user?._id, userData, userDetailData]);

  // Function to request camera permission (for future use)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const requestCameraPermission = async (): Promise<boolean> => {
    if (!isMountedRef.current) return false;

    try {
      const permission = await Camera.requestCameraPermission();
      if (!isMountedRef.current) return false;

      if (permission === 'granted') {
        return true;
      } else if (permission === 'denied') {
        if (isMountedRef.current) {
          Alert.alert(
            t('common.cameraPermissionRequired'),
            t('common.cameraAccessRequired'),
            [{ text: t('common.ok') }],
          );
        }
        return false;
      }
      return false;
    } catch (error) {
      console.error('Camera permission error:', error);
      if (isMountedRef.current) {
        Alert.alert(
          t('common.error'),
          t('common.unableToRequestCameraPermission'),
        );
      }
      return false;
    }
  };

  // Function to request location permission (for future use)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const requestLocationPermissionForAttendance = async (): Promise<boolean> => {
    if (!isMountedRef.current) return false;

    try {
      let granted = false;

      if (Platform.OS === 'android') {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message:
              'This app needs access to your location for attendance verification.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        granted = permission === PermissionsAndroid.RESULTS.GRANTED;
      } else if (Platform.OS === 'ios') {
        const permission = await Geolocation.requestAuthorization('whenInUse');
        granted = permission === 'granted';
      }

      if (!granted && isMountedRef.current) {
        Alert.alert(
          'Location Permission Required',
          'Location access is required for attendance. Please grant location permission.',
          [{ text: 'OK' }],
        );
      }

      return granted;
    } catch (error) {
      console.error('Location permission error:', error);
      if (isMountedRef.current) {
        Alert.alert(
          t('common.error'),
          t('common.unableToRequestLocationPermission'),
        );
      }
      return false;
    }
  };

  const homeMenuItems = [
    {
      label: t('desk.desk'),
      image: Images.FOLLOW_UP,
      key: 'Desk',
    },
    {
      label: t('project.projects'),
      image: Images.PROJECT,
      key: 'Project',
    },
    {
      label: t('pluses.pluses'),
      image: Images.PLUSES,
      key: 'Pulses',
    },
    {
      label: t('feedback.feedback'),
      image: Images.FEEDBACK,
      key: 'Feedback',
    },
    {
      label: t('contact.contacts'),
      image: Images.CONTACT,
      key: 'Network',
    },
    {
      label: t('territory.territory'),
      image: Images.TERRITORY,
      key: 'Territory',
    },
    {
      label: t('smartSociety.smartSociety'),
      image: Images.SMART_SOCIETY,
      key: 'Smart Society',
    },
  ];

  const handleNavigation = (screenName: string) => {
    if (!isMountedRef.current) return;
    if (props.navigation?.navigate) {
      try {
        props.navigation.navigate(screenName);
      } catch (error) {
        console.error(`Navigation error to ${screenName}:`, error);
        Alert.alert(
          t('common.error'),
          t('errors.failedToNavigate', { feature: screenName }),
        );
      }
    }
  };

  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[HomeStyles.menuItem]}
        onPress={() => {
          if (!isMountedRef.current) return;

          if (item.key === 'Setting') {
            handleNavigation('Setting');
          } else if (item.key === 'Network') {
            handleNavigation('Contact');
          } else if (item.key === 'Pulses') {
            handleNavigation('Pluses');
          } else if (item.key === 'Feedback') {
            handleNavigation('Feedback');
          } else if (item.key === 'Project') {
            handleNavigation('Project');
          } else if (item.key === 'R - ID') {
            handleNavigation('Profile');
          } else if (item.key === 'Punch System') {
            handleNavigation('PunchSystem');
          } else if (item.key === 'Desk') {
            handleNavigation('Desk');
          } else if (item.key === 'Territory') {
            handleNavigation('Territory');
          } else if (item.key === 'Smart Society') {
            handleNavigation('SocietySelection');
          } else {
            if (isMountedRef.current) {
              Alert.alert(
                t('common.comingSoon'),
                t('errors.featureAvailableSoon'),
                [{ text: t('common.ok') }],
              );
            }
          }
        }}
      >
        <Image source={item.image} style={[HomeStyles.menuIcon]} />
        <Text style={HomeStyles.menuLabel}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <View>
        <Text
          style={{
            fontSize: FS.FS22,
            color: COLORS.BLACK,
            fontFamily: FF[500],
            marginTop: 40,
          }}
        >
          {t('home.hello')}, {userName || t('common.user')}
        </Text>
        <Text
          style={{
            fontSize: FS.FS16,
            color: COLORS.GREY_TEXT,
            fontFamily: FF[400],
            marginTop: 16,
            letterSpacing: 0.1,
          }}
        >
          {t('home.welcomeToR')}
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          marginTop: 40,
        }}
      >
        <FlatList
          data={homeMenuItems}
          renderItem={renderItem}
          keyExtractor={(item, index) => `menu-item-${item.key}-${index}`}
          numColumns={3}
          contentContainerStyle={HomeStyles.menuGrid}
          columnWrapperStyle={{}}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Container>
  );
};

export default Home;
{
  /* paste here */
}
{
  /*
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
        /> */
}
