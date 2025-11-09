  import React, { useEffect, useState } from 'react';
  import { View, Text, FlatList, TouchableOpacity, ScrollView, ActivityIndicator, Modal, Linking, Alert } from 'react-native';
  import { useDispatch, useSelector } from 'react-redux';
  import { HomeStyles } from './styles';
  import Container from '../../components/common/container';
  import { userDetailAction } from '../../store/actions/auth/userDetailAction';
  import { selectUserDetailData } from '../../store/selectors/auth';
  import { fetchDashboardData, fetchQuickStats } from '../../store/actions/dashboard/dashboardAction';
  import { RootState } from '../../store/reducers';
  import { COLORS } from '../../constants';

  interface QuickActionItem {
    id: string;
    label: string;
    icon: string;
    color: string;
    screen?: string;
  }

  interface HomeProps {
    navigation: {
      navigate: (screen: string) => void;
    };
  }

  const Home: React.FC<HomeProps> = ({ navigation }) => {
    const dispatch = useDispatch();
    const { userData } = useSelector((state: { otp: { userData: any } }) => state.otp);
    const userName = userData?.firstName || 'Resident';
    const committeeType = userData?.committeeMember?.committeeType || null;
    const isCommitteeMember = userData?.isCommitteeMember || false;
    const userDetailData = useSelector(selectUserDetailData);
    const user = userDetailData?.data?.result;

    // Redux Dashboard State
    const dashboardState = useSelector((state: RootState) => state.dashboard);
    const { loading, data, quickStats, error } = dashboardState;

    const userDetailsApi = React.useCallback(() => {
      dispatch(userDetailAction() as never);
    }, [dispatch]);

    useEffect(() => {
      if (user === undefined) {
        userDetailsApi();
      }
    }, [user, userDetailsApi]);

    // Get unitId from authenticated user data
    const unitId = userData?.member?.unitId ||
      userDetailData?.data?.result?.unitId ||
      userDetailData?.data?.result?.unit?._id ||
      user?.unitId ||
      user?.unit?._id;

    // Fetch dashboard data when unitId is available
    useEffect(() => {
      if (unitId) {
        dispatch(fetchDashboardData(unitId) as never);
        dispatch(fetchQuickStats(unitId) as never);
      }
    }, [dispatch, unitId]);

    // Extract data from dashboard response
    const unitInfo = data?.unitInfo
      ? `${data.unitInfo.blockName}-${data.unitInfo.unitNumber}`
      : 'Loading...';

    const maintenanceDue = data?.pendingBill?.amount || 0;
    const pendingComplaints = quickStats?.activeComplaints || 0;
    const upcomingBookings = quickStats?.activeBookings || 0;

    // Latest notice from dashboard data
    const latestNotice = data?.recentNotices?.[0];

    // SOS Modal State
    const [sosModalVisible, setSosModalVisible] = useState(false);

    // Emergency Contacts (India)
    const emergencyContacts = [
      { id: '1', name: 'Emergency (All)', number: '112', icon: '🚨', color: '#EF4444' },
      { id: '2', name: 'Police', number: '100', icon: '👮', color: '#3B82F6' },
      { id: '3', name: 'Fire Brigade', number: '101', icon: '🚒', color: '#F59E0B' },
      { id: '4', name: 'Ambulance', number: '102', icon: '🚑', color: '#EF4444' },
      { id: '5', name: 'Disaster Management', number: '108', icon: '⚠️', color: '#F97316' },
      { id: '6', name: 'Women Helpline', number: '1091', icon: '👩', color: '#EC4899' },
      { id: '7', name: 'Child Helpline', number: '1098', icon: '👶', color: '#8B5CF6' },
      { id: '8', name: 'Senior Citizen', number: '14567', icon: '👴', color: '#6366F1' },
      { id: '9', name: 'Railway Helpline', number: '139', icon: '🚂', color: '#06B6D4' },
      { id: '10', name: 'Road Accident', number: '1073', icon: '🚗', color: '#EF4444' },
      { id: '11', name: 'Mental Health', number: '9152987821', icon: '🧠', color: '#10B981' },
      { id: '12', name: 'Poison Helpline', number: '1066', icon: '☠️', color: '#DC2626' },
    ];

    // Handle Emergency Call
    const handleEmergencyCall = (number: string, name: string) => {
      Alert.alert(
        'Emergency Call',
        `Do you want to call ${name} (${number})?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Call',
            onPress: () => {
              Linking.openURL(`tel:${number}`).catch(() => {
                Alert.alert('Error', 'Unable to make phone call');
              });
            },
          },
        ]
      );
    };

    // Premium Quick Actions with colorful icons
    const quickActions: QuickActionItem[] = [
      { id: '1', label: 'Visitors', icon: '👥', color: '#3B82F6', screen: 'VisitorManagement' },
      { id: '2', label: 'Parking', icon: '🚗', color: '#8B5CF6', screen: 'ParkingManagement' },
      { id: '3', label: 'Issues', icon: '🔧', color: '#EF4444', screen: 'ComplaintManagement' },
      { id: '4', label: 'Amenities', icon: '🏊', color: '#10B981', screen: 'AmenitiesList' },
      { id: '5', label: 'Bills', icon: '💰', color: '#F59E0B', screen: 'MaintenanceManagement' },
      { id: '6', label: 'Notice', icon: '📢', color: '#06B6D4', screen: 'Notices' },
      { id: '7', label: 'Warranty', icon: '📋', color: '#EC4899', screen: 'WarrantyManagement' },
      { id: '8', label: 'Services', icon: '🛠️', color: '#6366F1', screen: 'ServiceDirectory' },
    ];

    const renderQuickAction = ({ item }: { item: QuickActionItem }) => {
      const handlePress = () => {
        if (item.screen) {
          navigation.navigate(item.screen);
        }
      };

      return (
        <TouchableOpacity
          activeOpacity={0.7}
          style={HomeStyles.actionWrapper}
          onPress={handlePress}
        >
          <View style={HomeStyles.actionCard}>
            <View style={[HomeStyles.actionIconContainer, { backgroundColor: item.color + '15' }]}>
              <Text style={HomeStyles.actionIconEmoji}>{item.icon}</Text>
            </View>
          </View>
          <Text style={HomeStyles.actionLabel} numberOfLines={1}>{item.label}</Text>
        </TouchableOpacity>
      );
    };

    // Loading State
    if (loading && !data) {
      return (
        <Container>
          <View style={HomeStyles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.BLACK} />
            <Text style={HomeStyles.loadingText}>Loading your dashboard...</Text>
          </View>
        </Container>
      );
    }

    // Error State
    if (error && !data) {
      return (
        <Container>
          <View style={HomeStyles.errorContainer}>
            <Text style={HomeStyles.errorText}>{error}</Text>
            <TouchableOpacity
              style={HomeStyles.retryButton}
              onPress={() => {
                if (unitId) {
                  dispatch(fetchDashboardData(unitId) as never);
                  dispatch(fetchQuickStats(unitId) as never);
                }
              }}
            >
              <Text style={HomeStyles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        </Container>
      );
    }

    return (
      <Container>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={HomeStyles.scrollContent}
        >
          {/* Premium Header */}
          <View style={HomeStyles.header}>
            <View>
              <Text style={HomeStyles.greeting}>Welcome back,</Text>
              <View style={HomeStyles.nameRow}>
                <Text style={HomeStyles.userName}>{userName}</Text>
              </View>
            </View>
          </View>

          {/* Quick Actions - Premium Grid (MOVED UP) */}
          <View style={HomeStyles.actionsSection}>
            <Text style={HomeStyles.sectionTitle}>Quick Access</Text>
            <FlatList
              data={quickActions}
              renderItem={renderQuickAction}
              keyExtractor={(item) => item.id}
              numColumns={4}
              scrollEnabled={false}
              columnWrapperStyle={HomeStyles.actionsRow}
            />
          </View>

          {/* Stats Overview - Premium Cards */}
          <View style={HomeStyles.statsSection}>
            <Text style={HomeStyles.sectionTitle}>Overview</Text>

            <View style={HomeStyles.statsGrid}>
              {/* Maintenance Card */}
              <View style={[HomeStyles.statCard, maintenanceDue > 0 && HomeStyles.statCardAlert]}>
                <Text style={HomeStyles.statLabel}>Maintenance Due</Text>
                <Text style={[HomeStyles.statValue, maintenanceDue > 0 && HomeStyles.statValueAlert]}>
                  ₹{maintenanceDue.toLocaleString()}
                </Text>
                {maintenanceDue > 0 && (
                  <View style={HomeStyles.alertIndicator}>
                    <Text style={HomeStyles.alertIndicatorText}>PENDING</Text>
                  </View>
                )}
              </View>

              {/* Complaints Card */}
              <View style={HomeStyles.statCard}>
                <Text style={HomeStyles.statLabel}>Active Issues</Text>
                <Text style={HomeStyles.statValue}>{pendingComplaints}</Text>
                <Text style={HomeStyles.statSubtext}>Open Complaints</Text>
              </View>

              {/* Bookings Card */}
              <View style={HomeStyles.statCard}>
                <Text style={HomeStyles.statLabel}>Upcoming</Text>
                <Text style={HomeStyles.statValue}>{upcomingBookings}</Text>
                <Text style={HomeStyles.statSubtext}>Amenity Bookings</Text>
              </View>
            </View>
          </View>

          {/* Latest Notice - Premium Design */}
          {latestNotice && (
            <View style={HomeStyles.noticeSection}>
              <View style={HomeStyles.noticeSectionHeader}>
                <Text style={HomeStyles.sectionTitle}>Latest Announcement</Text>
                <TouchableOpacity onPress={() => navigation.navigate('NoticesList')}>
                  <Text style={HomeStyles.seeAllLink}>View All</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={HomeStyles.noticeCard}
                activeOpacity={0.8}
              >
                <View style={HomeStyles.noticeHeader}>
                  <View style={HomeStyles.noticeIconContainer}>
                    <Text style={HomeStyles.noticeIcon}>📢</Text>
                  </View>
                  <View style={HomeStyles.noticeMeta}>
                    <Text style={HomeStyles.noticeDate}>
                      {new Date(latestNotice.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </Text>
                  </View>
                </View>
                <Text style={HomeStyles.noticeTitle} numberOfLines={2}>
                  {latestNotice.title}
                </Text>
                {latestNotice.description && (
                  <Text style={HomeStyles.noticeDescription} numberOfLines={2}>
                    {latestNotice.description}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>

        {/* Floating SOS Button */}
        <TouchableOpacity
          style={HomeStyles.sosButton}
          activeOpacity={0.8}
          onPress={() => setSosModalVisible(true)}
        >
          <Text style={HomeStyles.sosButtonText}>🚨</Text>
          <Text style={HomeStyles.sosButtonLabel}>SOS</Text>
        </TouchableOpacity>

        {/* SOS Modal */}
        <Modal
          visible={sosModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setSosModalVisible(false)}
        >
          <View style={HomeStyles.modalOverlay}>
            <View style={HomeStyles.modalContent}>
              <View style={HomeStyles.modalHeader}>
                <Text style={HomeStyles.modalTitle}>Emergency Contacts</Text>
                <TouchableOpacity onPress={() => setSosModalVisible(false)}>
                  <Text style={HomeStyles.modalClose}>✕</Text>
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                {emergencyContacts.map((contact) => (
                  <TouchableOpacity
                    key={contact.id}
                    style={HomeStyles.emergencyCard}
                    onPress={() => handleEmergencyCall(contact.number, contact.name)}
                    activeOpacity={0.7}
                  >
                    <View style={[HomeStyles.emergencyIcon, { backgroundColor: contact.color + '15' }]}>
                      <Text style={HomeStyles.emergencyEmoji}>{contact.icon}</Text>
                    </View>
                    <View style={HomeStyles.emergencyInfo}>
                      <Text style={HomeStyles.emergencyName}>{contact.name}</Text>
                      <Text style={HomeStyles.emergencyNumber}>{contact.number}</Text>
                    </View>
                    <View style={[HomeStyles.callButton, { backgroundColor: contact.color }]}>
                      <Text style={HomeStyles.callButtonText}>📞</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </Container>
    );
  };

  export default Home;
