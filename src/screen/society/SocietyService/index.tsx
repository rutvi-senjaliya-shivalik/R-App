import React, { useCallback, useMemo } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Container, HeaderComponent } from '../../../components/common';
import { societyServiceStyles } from './styles';
import { Icon } from '../../../components/common/Icon';
import { COLORS, IMAGES } from '../../../constants';
import LinearGradient from 'react-native-linear-gradient';

type ServiceItem = {
  key: string;
  label: string;
  icon: any;
  onPress?: () => void;
};

const SocietyService = ({ navigation }: any) => {
  // Get user data from Redux to check role
  const userData = useSelector((state: any) => state.otp?.userData);
  const userRole = userData?.role?.toLowerCase();

  /**
   * Filter services based on user role
   * Visitor Entry is only visible for gatekeepers
   */
  const services: ServiceItem[] = useMemo(() => {
    const allServices = [
      // { key: 'dashboard', label: 'Dashboard', icon: 'dashboard-ic' },
      { key: 'amenities', label: 'Amenities', icon: 'amenities-ic' },
      // { key: 'report', label: 'Report', icon: 'report-ic' },
      {
        key: 'myUnit',
        label: 'My Unit',
        icon: 'unit-management-ic',
      },
      { key: 'complaints', label: 'Complaints', icon: 'complaints-ic' },
      { key: 'lostAndFound', label: 'L&F', icon: 'lost-found-ic' },
      { key: 'noticeDashboard', label: 'Notice', icon: 'notice-ic' },
      { key: 'myParking', label: 'My Parking', icon: 'parking-ic' },
    ];

    // Only show Visitor Entry for gatekeeper role
    if (userRole === 'gatekeeper') {
      allServices.push({
        key: 'visitorEntry',
        label: 'Visitor Entry',
        icon: 'visitor-entry-ic',
      });
    }

    return allServices;
  }, [userRole]);

  const handlePress = useCallback(
    (item: ServiceItem) => {
      switch (item.key) {
        case 'dashboard':
          navigation.navigate('SocietyDashboard');
          break;
        case 'amenities':
          navigation.navigate('SocietyAmenities');
          break;
        case 'helpdesk':
          navigation.navigate('SocietyHelpdesk');
          break;
        case 'security':
          navigation.navigate('SocietySecurity');
          break;
        case 'sos':
          navigation.navigate('SocietySOS');
          break;
        case 'report':
          navigation.navigate('SocietyReport');
          break;
        case 'myUnit':
          navigation.navigate('UnitManagement');
          break;
        case 'lostAndFound':
          navigation.navigate('LostAndFound');
          break;
        case 'noticeDashboard':
          navigation.navigate('NoticeDashboard');
          break;
        case 'myParking':
          navigation.navigate('MyParking');
          break;
        case 'visitorEntry':
          navigation.navigate('VisitorEntry');
          break;
        case 'complaints':
          navigation.navigate('Complaints');
          break;
        default:
          break;
      }
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: ServiceItem }) => {
      return (
        <TouchableOpacity
          style={societyServiceStyles.card}
          activeOpacity={0.85}
          onPress={() => handlePress(item)}
        >
          <Icon name={item.icon} sizes={{ width: 60, height: 60 }} />

          <Text style={societyServiceStyles.label}>{item.label}</Text>
        </TouchableOpacity>
      );
    },
    [handlePress],
  );

  return (
    <Container>
      <View style={societyServiceStyles.container}>
        <HeaderComponent
          Title="Society Services"
          onPress={() => navigation.goBack()}
        />
        <View style={societyServiceStyles.contentWrapper}>
          <FlatList
            data={services}
            keyExtractor={item => item.key}
            numColumns={2}
            renderItem={renderItem}
            contentContainerStyle={societyServiceStyles.gridContent}
          />
        </View>
        <TouchableOpacity
          style={societyServiceStyles.floatingButtonContainer}
          onPress={() => {
            Linking.openURL('https://callback.devpress.net/');
          }}
          activeOpacity={0.8}
        >
          <Image
            source={IMAGES.AI_VOICE_ASSISTANT}
            style={societyServiceStyles.aiVoiceStyle}
          />
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default SocietyService;
