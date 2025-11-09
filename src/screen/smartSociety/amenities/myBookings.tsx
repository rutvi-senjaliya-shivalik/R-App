import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { Container, HeaderComponent } from '../../../components/common';
import MyBookingsStyles from './styles/myBookingsStyles';
import { COLORS } from '../../../constants';
import { useTranslation } from '../../../context/LanguageContext';

interface Booking {
  id: string;
  amenityName: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  totalCost?: number;
  status: 'confirmed' | 'pending' | 'rejected' | 'cancelled';
}

const MyBookings = (props: any) => {
  const { t } = useTranslation();
  const isMountedRef = useRef(true);
  const selectedRole = props.route?.params?.selectedRole;
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'pending' | 'rejected' | 'cancelled'>('all');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    isMountedRef.current = true;
    loadBookings();
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const loadBookings = () => {
    // TODO: Fetch bookings from API
    const mockBookings: Booking[] = [
      {
        id: 'booking001',
        amenityName: 'Swimming Pool',
        date: '2024-01-15',
        startTime: '10:00 AM',
        endTime: '11:00 AM',
        duration: 1,
        totalCost: 500,
        status: 'confirmed',
      },
      {
        id: 'booking002',
        amenityName: 'Community Hall',
        date: '2024-01-20',
        startTime: '02:00 PM',
        endTime: '05:00 PM',
        duration: 3,
        totalCost: 6000,
        status: 'pending',
      },
    ];
    setBookings(mockBookings);
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadBookings();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const filteredBookings = bookings.filter(booking =>
    filter === 'all' || booking.status === filter,
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '#2E7D32';
      case 'pending':
        return '#F57C00';
      case 'rejected':
        return '#C62828';
      case 'cancelled':
        return '#757575';
      default:
        return COLORS.GREY_TEXT;
    }
  };

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  const renderBookingItem = ({ item }: { item: Booking }) => (
    <View style={MyBookingsStyles.bookingCard}>
      <View style={MyBookingsStyles.bookingHeader}>
        <Text style={MyBookingsStyles.amenityName}>{item.amenityName}</Text>
        <View
          style={[
            MyBookingsStyles.statusBadge,
            { backgroundColor: getStatusColor(item.status) + '20' },
          ]}
        >
          <Text
            style={[
              MyBookingsStyles.statusText,
              { color: getStatusColor(item.status) },
            ]}
          >
            {t(`smartSociety.${item.status}`) || item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>
      <View style={MyBookingsStyles.bookingDetails}>
        <Text style={MyBookingsStyles.detailText}>
          📅 {formatDate(item.date)}
        </Text>
        <Text style={MyBookingsStyles.detailText}>
          🕐 {item.startTime} - {item.endTime}
        </Text>
        <Text style={MyBookingsStyles.detailText}>
          ⏱️ {item.duration} {t('smartSociety.hours') || 'hour(s)'}
        </Text>
        {item.totalCost && (
          <Text style={MyBookingsStyles.detailText}>
            💰 ₹{item.totalCost}
          </Text>
        )}
      </View>
      {item.status === 'pending' && (
        <TouchableOpacity
          style={MyBookingsStyles.cancelButton}
          onPress={() => {
            // TODO: Cancel booking
            Alert.alert(t('smartSociety.bookingCancelled') || 'Booking cancelled');
          }}
        >
          <Text style={MyBookingsStyles.cancelButtonText}>
            {t('common.cancel') || 'Cancel'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <Container>
      <HeaderComponent
        Title={t('smartSociety.myBookings') || 'My Bookings'}
        onPress={() => props.navigation?.goBack()}
      />
      <View style={MyBookingsStyles.container}>
        <View style={MyBookingsStyles.filterContainer}>
          {(['all', 'confirmed', 'pending', 'rejected', 'cancelled'] as const).map(
            filterType => (
              <TouchableOpacity
                key={filterType}
                style={[
                  MyBookingsStyles.filterTab,
                  filter === filterType && MyBookingsStyles.filterTabActive,
                ]}
                onPress={() => setFilter(filterType)}
              >
                <Text
                  style={[
                    MyBookingsStyles.filterTabText,
                    filter === filterType && MyBookingsStyles.filterTabTextActive,
                  ]}
                >
                  {filterType === 'all'
                    ? t('common.all') || 'All'
                    : t(`smartSociety.${filterType}`) || filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                </Text>
              </TouchableOpacity>
            ),
          )}
        </View>

        <FlatList
          data={filteredBookings}
          renderItem={renderBookingItem}
          keyExtractor={item => item.id}
          contentContainerStyle={MyBookingsStyles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={MyBookingsStyles.emptyContainer}>
              <Text style={MyBookingsStyles.emptyText}>
                {t('smartSociety.noBookingsFound') || 'No bookings found'}
              </Text>
            </View>
          }
        />
      </View>
    </Container>
  );
};

export default MyBookings;

