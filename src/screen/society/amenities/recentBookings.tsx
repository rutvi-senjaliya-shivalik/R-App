import React, { useMemo, useCallback } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Container, HeaderComponent } from '../../../components/common';
import { recentBookingsStyles } from './recentBookingsStyles';

type Booking = {
  id: string;
  amenityName: string;
  dates: string[];
  status: 'confirmed' | 'pending' | 'cancelled';
  bookedOn: string;
};

const RecentBookingsScreen = ({ navigation }: any) => {
  const bookings: Booking[] = useMemo(
    () => [
      {
        id: '1',
        amenityName: 'Swimming Pool',
        dates: ['2025-11-10', '2025-11-11'],
        status: 'confirmed',
        bookedOn: '2025-11-08',
      },
      {
        id: '2',
        amenityName: 'Community Hall',
        dates: ['2025-11-15'],
        status: 'pending',
        bookedOn: '2025-11-07',
      },
      {
        id: '3',
        amenityName: 'GYM',
        dates: ['2025-11-09', '2025-11-10', '2025-11-11'],
        status: 'confirmed',
        bookedOn: '2025-11-06',
      },
      {
        id: '4',
        amenityName: 'Club House',
        dates: ['2025-11-12'],
        status: 'cancelled',
        bookedOn: '2025-11-05',
      },
    ],
    [],
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'confirmed':
        return recentBookingsStyles.statusConfirmed;
      case 'pending':
        return recentBookingsStyles.statusPending;
      case 'cancelled':
        return recentBookingsStyles.statusCancelled;
      default:
        return {};
    }
  };

  const renderBooking = useCallback(
    ({ item }: { item: Booking }) => (
      <View style={recentBookingsStyles.bookingCard}>
        <View style={recentBookingsStyles.cardHeader}>
          <Text style={recentBookingsStyles.amenityName}>{item.amenityName}</Text>
          <View style={[recentBookingsStyles.statusBadge, getStatusStyle(item.status)]}>
            <Text style={recentBookingsStyles.statusText}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>
        <Text style={recentBookingsStyles.datesLabel}>Booking Dates:</Text>
        {item.dates.map((date, index) => (
          <Text key={index} style={recentBookingsStyles.dateText}>
            • {date}
          </Text>
        ))}
        <Text style={recentBookingsStyles.bookedOnText}>Booked on: {item.bookedOn}</Text>
      </View>
    ),
    [],
  );

  const keyExtractor = useCallback((item: Booking) => item.id, []);

  return (
    <Container>
      <View style={recentBookingsStyles.container}>
        <HeaderComponent Title="Recent Bookings" onPress={() => navigation.goBack()} />
        <View style={recentBookingsStyles.contentWrapper}>
          <FlatList
            data={bookings}
            keyExtractor={keyExtractor}
            renderItem={renderBooking}
            contentContainerStyle={recentBookingsStyles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={recentBookingsStyles.emptyContainer}>
                <Text style={recentBookingsStyles.emptyText}>No bookings found</Text>
              </View>
            }
          />
        </View>
      </View>
    </Container>
  );
};

export default RecentBookingsScreen;

