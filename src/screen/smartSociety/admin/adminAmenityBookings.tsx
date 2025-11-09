import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
  TextInput,
  Modal,
  ScrollView,
} from 'react-native';
import {
  Container,
  HeaderComponent,
  SearchInput,
} from '../../../components/common';
import AdminAmenityBookingsStyles from './styles/adminAmenityBookingsStyles';
import { COLORS, FS } from '../../../constants';
import { useTranslation } from '../../../context/LanguageContext';

interface Booking {
  id: string;
  amenityName: string;
  memberName: string;
  flatNo: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  totalCost?: number;
  status: 'confirmed' | 'pending' | 'rejected' | 'cancelled';
  rejectionReason?: string;
  phoneNumber?: string;
  email?: string;
}

const AdminAmenityBookings = (props: any) => {
  const { t } = useTranslation();
  const isMountedRef = useRef(true);
  const selectedRole = props.route?.params?.selectedRole;
  const amenity = props.route?.params?.amenity;
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<
    'all' | 'confirmed' | 'pending' | 'rejected'
  >('all');
  const [refreshing, setRefreshing] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    isMountedRef.current = true;
    if (selectedRole?.id !== 'admin') {
      Alert.alert(
        t('common.accessDenied') || 'Access Denied',
        t('errors.adminOnlyFeature') ||
          'This feature is only available for administrators.',
        [
          {
            text: t('common.ok') || 'OK',
            onPress: () => props.navigation?.goBack(),
          },
        ],
      );
      return;
    }
    loadBookings();
    return () => {
      isMountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadBookings = () => {
    // TODO: Fetch bookings from API
    const mockBookings: Booking[] = [
      {
        id: 'booking001',
        amenityName: amenity?.name || 'Swimming Pool',
        memberName: 'John Doe',
        flatNo: 'A-101',
        date: '2024-01-15',
        startTime: '10:00 AM',
        endTime: '11:00 AM',
        duration: 1,
        totalCost: 500,
        status: 'pending',
        phoneNumber: '9876543210',
        email: 'john@example.com',
      },
      {
        id: 'booking002',
        amenityName: amenity?.name || 'Community Hall',
        memberName: 'Jane Smith',
        flatNo: 'B-204',
        date: '2024-01-20',
        startTime: '02:00 PM',
        endTime: '05:00 PM',
        duration: 3,
        totalCost: 6000,
        status: 'confirmed',
        phoneNumber: '9876543211',
        email: 'jane@example.com',
      },
      {
        id: 'booking003',
        amenityName: amenity?.name || 'Tennis Court',
        memberName: 'Rajesh Kumar',
        flatNo: 'C-305',
        date: '2024-01-18',
        startTime: '04:00 PM',
        endTime: '05:00 PM',
        duration: 1,
        totalCost: 800,
        status: 'rejected',
        rejectionReason: 'Time slot already booked by another member',
        phoneNumber: '9876543212',
        email: 'rajesh@example.com',
      },
    ];
    setBookings(mockBookings);
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadBookings();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch =
      booking.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.flatNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || booking.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleApprove = (booking: Booking) => {
    const confirmMessage =
      t('smartSociety.confirmApproveBooking', { name: booking.memberName }) ||
      `Approve booking for ${booking.memberName}?`;
    const fullMessage = `${confirmMessage}\n\n${
      t('smartSociety.flatNo') || 'Flat No'
    }: ${booking.flatNo}\n${t('smartSociety.date') || 'Date'}: ${formatDate(
      booking.date,
    )}\n${t('smartSociety.time') || 'Time'}: ${booking.startTime} - ${
      booking.endTime
    }`;

    Alert.alert(
      t('smartSociety.approveBooking') || 'Approve Booking',
      fullMessage,
      [
        { text: t('common.cancel') || 'Cancel', style: 'cancel' },
        {
          text: t('common.approve') || 'Approve',
          onPress: async () => {
            try {
              // TODO: Approve booking via API
              // await MakeApiRequest({
              //   endpoint: `amenities/bookings/${booking.id}/approve`,
              //   apiMethod: 'PUT',
              // });

              setBookings(prev =>
                prev.map(b =>
                  b.id === booking.id ? { ...b, status: 'confirmed' } : b,
                ),
              );
              Alert.alert(
                t('common.success') || 'Success',
                t('smartSociety.bookingApproved') ||
                  'Booking approved successfully',
              );
            } catch (error) {
              Alert.alert(
                t('common.error') || 'Error',
                t('smartSociety.failedToApproveBooking') ||
                  'Failed to approve booking. Please try again.',
              );
            }
          },
        },
      ],
    );
  };

  const handleRejectClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setRejectionReason('');
    setShowRejectModal(true);
  };

  const handleRejectConfirm = async () => {
    if (!selectedBooking) return;

    if (!rejectionReason.trim()) {
      Alert.alert(
        t('common.error') || 'Error',
        t('smartSociety.rejectionReasonRequired') ||
          'Please provide a reason for rejection',
      );
      return;
    }

    try {
      setBookings(prev =>
        prev.map(b =>
          b.id === selectedBooking.id
            ? {
                ...b,
                status: 'rejected',
                rejectionReason: rejectionReason.trim(),
              }
            : b,
        ),
      );
      setShowRejectModal(false);
      setSelectedBooking(null);
      setRejectionReason('');
      Alert.alert(
        t('common.success') || 'Success',
        t('smartSociety.bookingRejected') || 'Booking rejected successfully',
      );
    } catch (error) {
      Alert.alert(
        t('common.error') || 'Error',
        t('smartSociety.failedToRejectBooking') ||
          'Failed to reject booking. Please try again.',
      );
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return {
          bg: COLORS.LIGHT_GREEN,
          text: COLORS.GREEN_TEXT,
          border: COLORS.LIGHT_BORDER_GREEN,
        };
      case 'pending':
        return {
          bg: COLORS.YELLOW_BG,
          text: COLORS.ORANGE_TEXT,
          border: COLORS.YELLOW_BORDER,
        };
      case 'rejected':
        return {
          bg: COLORS.ORANGE_BG,
          text: COLORS.ORANGE_TEXT,
          border: COLORS.ORANGE_BORDER,
        };
      default:
        return {
          bg: COLORS.LIGHT_GRAY,
          text: COLORS.GREY_TEXT,
          border: COLORS.BORDER_GREY,
        };
    }
  };

  const translateStatus = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'pending') {
      return t('smartSociety.pending') || 'Pending';
    } else if (statusLower === 'confirmed') {
      return t('smartSociety.confirmed') || 'Confirmed';
    } else if (statusLower === 'rejected') {
      return t('smartSociety.rejected') || 'Rejected';
    }
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  const renderBookingItem = ({ item }: { item: Booking }) => {
    const statusColor = getStatusColor(item.status);
    return (
      <View style={AdminAmenityBookingsStyles.bookingCard}>
        <View style={AdminAmenityBookingsStyles.bookingHeader}>
          <View>
            <Text style={AdminAmenityBookingsStyles.memberName}>
              {item.memberName}
            </Text>
            <Text style={AdminAmenityBookingsStyles.flatNo}>{item.flatNo}</Text>
          </View>
          <View
            style={[
              AdminAmenityBookingsStyles.statusBadge,
              {
                backgroundColor: statusColor.bg,
                borderColor: statusColor.border,
              },
            ]}
          >
            <Text
              style={[
                AdminAmenityBookingsStyles.statusText,
                { color: statusColor.text },
              ]}
            >
              {translateStatus(item.status)}
            </Text>
          </View>
        </View>
        <View style={AdminAmenityBookingsStyles.bookingDetails}>
          <Text style={AdminAmenityBookingsStyles.detailText}>
            📅 {formatDate(item.date)}
          </Text>
          <Text style={AdminAmenityBookingsStyles.detailText}>
            🕐 {item.startTime} - {item.endTime}
          </Text>
          <Text style={AdminAmenityBookingsStyles.detailText}>
            ⏱️ {item.duration} {t('smartSociety.hours') || 'hour(s)'}
          </Text>
          {item.totalCost && (
            <Text style={AdminAmenityBookingsStyles.detailText}>
              💰 ₹{item.totalCost}
            </Text>
          )}
          {item.phoneNumber && (
            <Text style={AdminAmenityBookingsStyles.detailText}>
              📞 {item.phoneNumber}
            </Text>
          )}
        </View>
        {item.status === 'rejected' && item.rejectionReason && (
          <View style={AdminAmenityBookingsStyles.rejectionReasonContainer}>
            <Text style={AdminAmenityBookingsStyles.rejectionReasonLabel}>
              {t('smartSociety.rejectionReason') || 'Rejection Reason'}:
            </Text>
            <Text style={AdminAmenityBookingsStyles.rejectionReasonText}>
              {item.rejectionReason}
            </Text>
          </View>
        )}
        {item.status === 'pending' && (
          <View style={AdminAmenityBookingsStyles.actionButtons}>
            <TouchableOpacity
              style={AdminAmenityBookingsStyles.approveButton}
              onPress={() => handleApprove(item)}
              activeOpacity={0.7}
            >
              <Text style={AdminAmenityBookingsStyles.approveButtonText}>
                {t('common.approve') || 'Approve'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={AdminAmenityBookingsStyles.rejectButton}
              onPress={() => handleRejectClick(item)}
              activeOpacity={0.7}
            >
              <Text style={AdminAmenityBookingsStyles.rejectButtonText}>
                {t('common.reject') || 'Reject'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  if (selectedRole?.id !== 'admin') {
    return null;
  }

  return (
    <Container>
      <HeaderComponent
        Title={t('smartSociety.amenityBookings') || 'Amenity Bookings'}
        onPress={() => props.navigation?.goBack()}
        titleStyle={{ fontSize: FS.FS18 }}
      />
      <View style={AdminAmenityBookingsStyles.container}>
        <View style={AdminAmenityBookingsStyles.searchContainer}>
          <SearchInput
            placeholder={
              t('smartSociety.searchBookings') || 'Search bookings...'
            }
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={AdminAmenityBookingsStyles.filterContainer}>
          {(['all', 'pending', 'confirmed', 'rejected'] as const).map(
            filterType => (
              <TouchableOpacity
                key={filterType}
                style={[
                  AdminAmenityBookingsStyles.filterTab,
                  filter === filterType &&
                    AdminAmenityBookingsStyles.filterTabActive,
                ]}
                onPress={() => setFilter(filterType)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    AdminAmenityBookingsStyles.filterTabText,
                    filter === filterType &&
                      AdminAmenityBookingsStyles.filterTabTextActive,
                  ]}
                  numberOfLines={1}
                  adjustsFontSizeToFit={true}
                  minimumFontScale={0.8}
                >
                  {filterType === 'all'
                    ? t('common.all') || 'All'
                    : filterType === 'pending'
                    ? t('smartSociety.pending') || 'Pending'
                    : filterType === 'confirmed'
                    ? t('smartSociety.confirmed') || 'Confirmed'
                    : t('smartSociety.rejected') || 'Rejected'}
                </Text>
              </TouchableOpacity>
            ),
          )}
        </View>

        <FlatList
          data={filteredBookings}
          renderItem={renderBookingItem}
          keyExtractor={item => item.id}
          contentContainerStyle={AdminAmenityBookingsStyles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={AdminAmenityBookingsStyles.emptyContainer}>
              <Text style={AdminAmenityBookingsStyles.emptyText}>
                {t('smartSociety.noBookingsFound') || 'No bookings found'}
              </Text>
            </View>
          }
        />
      </View>

      {/* Rejection Reason Modal */}
      <Modal
        visible={showRejectModal}
        transparent
        animationType="slide"
        onRequestClose={() => {
          setShowRejectModal(false);
          setSelectedBooking(null);
          setRejectionReason('');
        }}
      >
        <View style={AdminAmenityBookingsStyles.modalOverlay}>
          <View style={AdminAmenityBookingsStyles.modalContent}>
            <View style={AdminAmenityBookingsStyles.modalHeader}>
              <Text style={AdminAmenityBookingsStyles.modalTitle}>
                {t('smartSociety.rejectBooking') || 'Reject Booking'}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowRejectModal(false);
                  setSelectedBooking(null);
                  setRejectionReason('');
                }}
                activeOpacity={0.7}
              >
                <Text style={AdminAmenityBookingsStyles.modalCloseText}>×</Text>
              </TouchableOpacity>
            </View>

            {selectedBooking && (
              <ScrollView style={AdminAmenityBookingsStyles.modalBody}>
                <View style={AdminAmenityBookingsStyles.bookingInfoCard}>
                  <Text style={AdminAmenityBookingsStyles.bookingInfoLabel}>
                    {t('smartSociety.member') || 'Member'}:{' '}
                    {selectedBooking.memberName}
                  </Text>
                  <Text style={AdminAmenityBookingsStyles.bookingInfoLabel}>
                    {t('smartSociety.flatNo') || 'Flat No'}:{' '}
                    {selectedBooking.flatNo}
                  </Text>
                  <Text style={AdminAmenityBookingsStyles.bookingInfoLabel}>
                    {t('smartSociety.date') || 'Date'}:{' '}
                    {formatDate(selectedBooking.date)}
                  </Text>
                  <Text style={AdminAmenityBookingsStyles.bookingInfoLabel}>
                    {t('smartSociety.time') || 'Time'}:{' '}
                    {selectedBooking.startTime} - {selectedBooking.endTime}
                  </Text>
                </View>

                <View style={AdminAmenityBookingsStyles.reasonInputContainer}>
                  <Text style={AdminAmenityBookingsStyles.reasonInputLabel}>
                    {t('smartSociety.rejectionReason') || 'Rejection Reason'}{' '}
                    <Text style={AdminAmenityBookingsStyles.required}>*</Text>
                  </Text>
                  <TextInput
                    style={AdminAmenityBookingsStyles.reasonInput}
                    value={rejectionReason}
                    onChangeText={setRejectionReason}
                    placeholder={
                      t('smartSociety.enterRejectionReason') ||
                      'Enter reason for rejection...'
                    }
                    placeholderTextColor={COLORS.GREY_TEXT}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                </View>
              </ScrollView>
            )}

            <View style={AdminAmenityBookingsStyles.modalFooter}>
              <TouchableOpacity
                style={AdminAmenityBookingsStyles.modalCancelButton}
                onPress={() => {
                  setShowRejectModal(false);
                  setSelectedBooking(null);
                  setRejectionReason('');
                }}
                activeOpacity={0.7}
              >
                <Text style={AdminAmenityBookingsStyles.modalCancelButtonText}>
                  {t('common.cancel') || 'Cancel'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={AdminAmenityBookingsStyles.modalRejectButton}
                onPress={handleRejectConfirm}
                activeOpacity={0.7}
              >
                <Text style={AdminAmenityBookingsStyles.modalRejectButtonText}>
                  {t('common.reject') || 'Reject'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Container>
  );
};

export default AdminAmenityBookings;
