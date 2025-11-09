import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, RefreshControl, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/common/container';
import { RootState } from '../../store/reducers';
import { fetchMyBookings, cancelBooking } from '../../store/actions/amenities/amenitiesAction';
import { selectUserDetailData } from '../../store/selectors/auth';
import { COLORS, FF, FS, SPACING, BORDER_RADIUS } from '../../constants';

interface MyBookingsProps {
  navigation: {
    goBack: () => void;
  };
}

const MyBookings: React.FC<MyBookingsProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  const { userData } = useSelector((state: { otp: { userData: any } }) => state.otp);
  const userId = userData?.user?._id || userData?._id;

  const { loading, myBookings, cancelling, error } = useSelector((state: RootState) => state.amenities);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    if (userId) {
      dispatch(fetchMyBookings(userId) as never);
    }
  }, [dispatch, userId]);

  const onRefresh = () => {
    setRefreshing(true);
    if (userId) {
      dispatch(fetchMyBookings(userId) as never);
    }
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleCancelBooking = (bookingId: string, amenityName: string) => {
    Alert.alert(
      'Cancel Booking',
      `Are you sure you want to cancel your booking for ${amenityName}?`,
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => {
            dispatch(cancelBooking(bookingId) as never);
            setTimeout(() => {
              if (userId) {
                dispatch(fetchMyBookings(userId) as never);
              }
            }, 500);
          },
        },
      ]
    );
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'confirmed':
        return '#4CAF50';
      case 'pending':
        return '#FF9800';
      case 'cancelled':
        return '#F44336';
      case 'completed':
        return '#2196F3';
      default:
        return '#999';
    }
  };

  const isUpcoming = (bookingDate: string): boolean => {
    return new Date(bookingDate) >= new Date();
  };

  const renderBookingItem = ({ item }: { item: any }) => {
    const upcoming = isUpcoming(item.bookingDate);

    return (
      <View style={styles.bookingCard}>
        <View style={styles.bookingHeader}>
          <Text style={styles.amenityName}>{item.amenityId?.name || 'Amenity'}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.bookingStatus) + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(item.bookingStatus) }]}>
              {item.bookingStatus?.toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.bookingDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>📅</Text>
            <Text style={styles.detailText}>
              {new Date(item.bookingDate).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
          </View>

          {(item.startTime || item.endTime) && (
            <View style={styles.detailRow}>
              <Text style={styles.detailIcon}>⏰</Text>
              <Text style={styles.detailText}>
                {item.startTime || '09:00'} - {item.endTime || '10:00'}
              </Text>
            </View>
          )}

          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>💰</Text>
            <Text style={styles.detailText}>
              Amount: ₹{item.bookingAmount || 0} ({item.paymentStatus})
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>🎫</Text>
            <Text style={styles.detailText}>ID: {item._id.slice(-8)}</Text>
          </View>
        </View>

        {upcoming && item.bookingStatus === 'confirmed' && (
          <TouchableOpacity
            style={[styles.cancelButton, cancelling && styles.cancelButtonDisabled]}
            onPress={() => handleCancelBooking(item._id, item.amenityId?.name || 'this amenity')}
            disabled={cancelling}
          >
            <Text style={styles.cancelButtonText}>
              {cancelling ? 'Cancelling...' : 'Cancel Booking'}
            </Text>
          </TouchableOpacity>
        )}

        {!upcoming && (
          <View style={styles.pastBookingNote}>
            <Text style={styles.pastBookingText}>Past booking</Text>
          </View>
        )}
      </View>
    );
  };

  if (loading && myBookings.length === 0) {
    return (
      <Container>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Bookings</Text>
        </View>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={COLORS.BLACK} />
          <Text style={styles.loadingText}>Loading bookings...</Text>
        </View>
      </Container>
    );
  }

  if (error && myBookings.length === 0) {
    return (
      <Container>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Bookings</Text>
        </View>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              if (unitId) {
                dispatch(fetchMyBookings(unitId) as never);
              }
            }}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Bookings</Text>
        <Text style={styles.headerSubtitle}>
          {myBookings.length} {myBookings.length === 1 ? 'booking' : 'bookings'}
        </Text>
      </View>

      {myBookings.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyIcon}>📅</Text>
          <Text style={styles.emptyText}>No bookings yet</Text>
          <Text style={styles.emptySubtext}>Your amenity bookings will appear here</Text>
        </View>
      ) : (
        <FlatList
          data={myBookings}
          renderItem={renderBookingItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.BLACK]} />
          }
        />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: SPACING.XL,
    paddingVertical: SPACING.XL,
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_GREY,
  },
  backButton: {
    paddingVertical: SPACING.SM,
    marginBottom: SPACING.SM,
  },
  backButtonText: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.BLACK,
  },
  headerTitle: {
    fontSize: FS.FS24,
    fontFamily: FF[700],
    color: COLORS.BLACK,
    marginBottom: SPACING.XS,
  },
  headerSubtitle: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
  },
  listContainer: {
    padding: SPACING.LG,
  },
  bookingCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.LG,
    padding: SPACING.LG,
    marginBottom: SPACING.LG,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.LG,
  },
  amenityName: {
    fontSize: FS.FS18,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.XS,
    borderRadius: BORDER_RADIUS.MD,
  },
  statusText: {
    fontSize: FS.FS11,
    fontFamily: FF[700],
  },
  bookingDetails: {
    marginBottom: SPACING.LG,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.SM,
  },
  detailIcon: {
    fontSize: FS.FS16,
    marginRight: SPACING.SM,
    width: 24,
  },
  detailText: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    flex: 1,
  },
  cancelButton: {
    backgroundColor: COLORS.ORANGE_BG,
    paddingVertical: SPACING.MD,
    borderRadius: BORDER_RADIUS.SM,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.ORANGE_BORDER,
  },
  cancelButtonDisabled: {
    backgroundColor: COLORS.LIGHT_GRAY,
    borderColor: COLORS.BORDER_GREY,
  },
  cancelButtonText: {
    color: COLORS.ORANGE_TEXT,
    fontSize: FS.FS15,
    fontFamily: FF[600],
  },
  pastBookingNote: {
    backgroundColor: COLORS.LIGHT_GRAY,
    paddingVertical: SPACING.SM,
    borderRadius: BORDER_RADIUS.SM,
    alignItems: 'center',
  },
  pastBookingText: {
    fontSize: FS.FS13,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    fontStyle: 'italic',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.XL,
  },
  loadingText: {
    marginTop: SPACING.LG,
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
  },
  errorText: {
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: COLORS.ERROR_COLOR,
    textAlign: 'center',
    marginBottom: SPACING.XL,
  },
  retryButton: {
    backgroundColor: COLORS.BLACK,
    paddingHorizontal: SPACING.XXL,
    paddingVertical: SPACING.MD,
    borderRadius: BORDER_RADIUS.SM,
  },
  retryButtonText: {
    color: COLORS.WHITE,
    fontSize: FS.FS16,
    fontFamily: FF[600],
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: SPACING.LG,
  },
  emptyText: {
    fontSize: FS.FS18,
    fontFamily: FF[600],
    color: COLORS.GREY_TEXT,
    marginBottom: SPACING.SM,
  },
  emptySubtext: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
  },
});

export default MyBookings;
