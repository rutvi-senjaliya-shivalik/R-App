import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { COLORS, FF, FS } from '../../constants';
import { SearchBar, AppHeader } from '../../components/common';
import { bookingsService } from '../../services/api';

interface Booking {
  _id: string;
  projectName: string;
  clientName: string;
  status: 'active' | 'completed' | 'cancelled';
  dueDate: string;
}

// Arrow Right Icon
const ArrowRightIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <Path
      d="M7.5 15L12.5 10L7.5 5"
      stroke="#6B7280"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const BookingsScreen = ({ navigation }: any) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = bookings.filter(
        (booking) =>
          booking.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          booking.clientName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBookings(filtered);
    } else {
      setFilteredBookings(bookings);
    }
  }, [searchQuery, bookings]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call when available
      // const response = await bookingsService.getBookings();
      // setBookings(response.bookings);
      
      // Mock data for now
      const mockBookings: Booking[] = [
        {
          _id: '1',
          projectName: 'Shivalik Heights - Tower A',
          clientName: 'Rajesh Kumar',
          status: 'active',
          dueDate: '2025-06-28',
        },
        {
          _id: '2',
          projectName: 'Shivalik Heights - Tower A',
          clientName: 'Rajesh Kumar',
          status: 'completed',
          dueDate: '2025-06-28',
        },
        {
          _id: '3',
          projectName: 'Shivalik Heights - Tower A',
          clientName: 'Rajesh Kumar',
          status: 'completed',
          dueDate: '2025-06-28',
        },
        {
          _id: '4',
          projectName: 'Shivalik Heights - Tower A',
          clientName: 'Rajesh Kumar',
          status: 'active',
          dueDate: '2025-06-28',
        },
        {
          _id: '5',
          projectName: 'Shivalik Heights - Tower A',
          clientName: 'Rajesh Kumar',
          status: 'cancelled',
          dueDate: '2025-06-28',
        },
        {
          _id: '6',
          projectName: 'Shivalik Heights - Tower A',
          clientName: 'Rajesh Kumar',
          status: 'completed',
          dueDate: '2025-06-28',
        },
      ];
      setBookings(mockBookings);
      setFilteredBookings(mockBookings);
    } catch (error: any) {
      console.error('Error fetching bookings:', error);
      Alert.alert('Error', 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleBookingPress = (bookingId: string) => {
    navigation.navigate('BookingDetailsView', { bookingId });
  };

  const handleBellPress = () => {
    Alert.alert('Notifications', 'No new notifications');
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleSearch = () => {
    // Search is handled by useEffect
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return { bg: '#FEF3C7', text: '#D97706' };
      case 'completed':
        return { bg: '#D1FAE5', text: '#059669' };
      case 'cancelled':
        return { bg: '#FEE2E2', text: '#DC2626' };
      default:
        return { bg: '#F3F4F6', text: '#6B7280' };
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <AppHeader
        title="Bookings"
        onBellPress={handleBellPress}
        onProfilePress={handleProfilePress}
      />

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search Bookings"
          onSearchPress={handleSearch}
        />

        {/* Bookings List */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#000000" />
            <Text style={styles.loadingText}>Loading bookings...</Text>
          </View>
        ) : filteredBookings.length > 0 ? (
          <View style={styles.bookingsContainer}>
            {filteredBookings.map((booking) => {
              const statusColors = getStatusColor(booking.status);
              return (
                <TouchableOpacity
                  key={booking._id}
                  style={styles.bookingCard}
                  onPress={() => handleBookingPress(booking._id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.bookingContent}>
                    <View style={styles.bookingInfo}>
                      <Text style={styles.projectName}>{booking.projectName}</Text>
                      <Text style={styles.clientName}>{booking.clientName}</Text>
                      
                      <View style={styles.bookingFooter}>
                        <View
                          style={[
                            styles.statusBadge,
                            { backgroundColor: statusColors.bg },
                          ]}
                        >
                          <Text
                            style={[styles.statusText, { color: statusColors.text }]}
                          >
                            {booking.status.charAt(0).toUpperCase() +
                              booking.status.slice(1)}
                          </Text>
                        </View>
                        
                        <Text style={styles.dueDate}>
                          Due Date : {formatDate(booking.dueDate)}
                        </Text>
                      </View>
                    </View>
                    
                    <ArrowRightIcon />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No bookings found</Text>
            <Text style={styles.emptySubtext}>
              {searchQuery
                ? 'Try adjusting your search'
                : 'Bookings will appear here'}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: '#6B7280',
  },
  bookingsContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 12,
  },
  bookingCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
  },
  bookingContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookingInfo: {
    flex: 1,
    gap: 6,
  },
  projectName: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    fontWeight: '600',
  },
  clientName: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: '#6B7280',
  },
  bookingFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: FS.FS12,
    fontFamily: FF[600],
    fontWeight: '600',
  },
  dueDate: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: '#6B7280',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: FS.FS18,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default BookingsScreen;
