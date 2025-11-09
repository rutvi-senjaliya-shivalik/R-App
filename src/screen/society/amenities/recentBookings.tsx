import React, { useCallback, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Container, HeaderComponent } from '../../../components/common';
import { recentBookingsStyles } from './styles/recentBookingsStyles';
import { getRecentBookings } from '../../../store/actions/society/recentBookingsAction';
import { selectRecentBookingsData } from '../../../store/selectors/amenities';
import { COLORS } from '../../../constants';
import { RecentBookingDataModel } from '../../../types/models';


const RecentBookingsScreen = ({ navigation }: any) => {
  const dispatch = useDispatch() as any;
  const { loading, bookingsData } = useSelector(selectRecentBookingsData);

  console.log('bookingsData:::', bookingsData);
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = useCallback(() => {
    dispatch(getRecentBookings());
  }, [dispatch]);


  const getStatusStyle = (status: string) => {
    const lowerStatus = status?.toLowerCase();
    switch (lowerStatus) {
      case 'confirmed':
      case 'completed':
      case 'success':
        return recentBookingsStyles.statusConfirmed;
      case 'pending':
        return recentBookingsStyles.statusPending;
      case 'cancelled':
      case 'failed':
        return recentBookingsStyles.statusCancelled;
      default:
        return recentBookingsStyles.statusPending;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderBooking = useCallback(
    ({ item }: { item: RecentBookingDataModel }) => (
      <View style={recentBookingsStyles.bookingCard}>
        <View style={recentBookingsStyles.cardHeader}>
          <Text style={recentBookingsStyles.amenityName}>{item?.amenity?.name || 'N/A'}</Text>
          <View style={[recentBookingsStyles.statusBadge, getStatusStyle(item?.paymentStatus)]}>
            <Text style={recentBookingsStyles.statusText}>
              {item?.paymentStatus?.charAt(0).toUpperCase() + item?.paymentStatus?.slice(1)}
            </Text>
          </View>
        </View>
        <Text style={recentBookingsStyles.datesLabel}>Booking Date:</Text>
        <Text style={recentBookingsStyles.dateText}>• {formatDate(item?.bookingDate)}</Text>
        <Text style={recentBookingsStyles.timeText}>
          Time: {item?.bookingStartTime} - {item?.bookingEndTime}
        </Text>
        <Text style={recentBookingsStyles.amountText}>Amount: ₹{item?.amount}</Text>
        <Text style={recentBookingsStyles.bookedOnText}>
          Booked on: {formatDate(item?.createdAt)}
        </Text>
      </View>
    ),
    [],
  );

  const keyExtractor = useCallback((_, index) => index.toString(), []);

  return (
    <Container>
      <View style={recentBookingsStyles.container}>
        <HeaderComponent Title="Recent Bookings" onPress={() => navigation.goBack()} />
        {loading ? (
          <View style={recentBookingsStyles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.DARK_BLUE} />
            <Text style={recentBookingsStyles.loadingText}>Loading bookings...</Text>
          </View>
        ) : (
          <View style={recentBookingsStyles.contentWrapper}>
            <FlatList
              data={bookingsData}
              keyExtractor={keyExtractor}
              renderItem={renderBooking}
              contentContainerStyle={recentBookingsStyles.listContent}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View style={recentBookingsStyles.emptyContainer}>
                  <Text style={recentBookingsStyles.emptyText}>
                    {'No bookings found'}
                  </Text>
                </View>
              }
            />
          </View>
        )}
      </View>
    </Container>
  );
};

export default RecentBookingsScreen;

