import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useSelector } from 'react-redux';
import Container from '../../components/common/container';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MakeApiRequest } from '../../services/apiService';
import { POST } from '../../constants/api';
import { COLORS, FF, FS, SPACING, BORDER_RADIUS } from '../../constants';

interface SimpleBookingScreenProps {
  navigation: {
    goBack: () => void;
    navigate: (screen: string) => void;
  };
  route: {
    params: {
      amenityId: string;
      amenity: any;
    };
  };
}

const SimpleBookingScreen: React.FC<SimpleBookingScreenProps> = ({ navigation, route }) => {
  const { amenity } = route.params;
  const { userData } = useSelector((state: { otp: { userData: any } }) => state.otp);
  const userId = userData?.user?._id || userData?._id;

  const [bookingDate, setBookingDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [booking, setBooking] = useState<any>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  const timeSlots = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00',
  ];

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setBookingDate(selectedDate);
    }
  };

  const handleBookNow = async () => {
    try {
      setIsBooking(true);
      const response = await MakeApiRequest({
        apiUrl: 'http://10.0.2.2:5000/api/resident/amenities/simple-book',
        apiMethod: POST,
        apiData: {
          amenityId: amenity._id,
          userId,
          bookingDate: bookingDate.toISOString().split('T')[0],
          startTime,
          endTime,
        },
      });

      if (response.data.success) {
        const createdBooking = response.data.data;
        setBooking(createdBooking);

        // If paid amenity, show payment modal
        if (amenity.amenityType === 'paid' && amenity.bookingCharge > 0) {
          setShowPaymentModal(true);
        } else {
          // Free amenity - show success
          Alert.alert(
            'Success!',
            amenity.requiresApproval
              ? 'Your booking has been submitted and is pending admin approval.'
              : 'Your booking has been confirmed!',
            [
              { text: 'View Bookings', onPress: () => navigation.navigate('MyBookings') },
              { text: 'OK', onPress: () => navigation.goBack() },
            ]
          );
        }
      }
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to create booking');
    } finally {
      setIsBooking(false);
    }
  };

  const handlePayment = async () => {
    try {
      setIsProcessingPayment(true);

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Complete payment
      const response = await MakeApiRequest({
        apiUrl: 'http://10.0.2.2:5000/api/resident/amenities/complete-payment',
        apiMethod: POST,
        apiData: {
          bookingId: booking._id,
          userId,
          transactionId: `TXN${Date.now()}`,
        },
      });

      if (response.data.success) {
        setShowPaymentModal(false);
        Alert.alert(
          'Payment Successful!',
          amenity.requiresApproval
            ? 'Your payment is complete. Booking is pending admin approval.'
            : 'Your payment is complete and booking is confirmed!',
          [
            { text: 'View Bookings', onPress: () => navigation.navigate('MyBookings') },
            { text: 'OK', onPress: () => navigation.goBack() },
          ]
        );
      }
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Payment failed');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <Container>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Amenity</Text>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Amenity Info */}
        {amenity.images && amenity.images.length > 0 && (
          <Image source={{ uri: amenity.images[0] }} style={styles.amenityImage} resizeMode="cover" />
        )}

        <View style={styles.card}>
          <Text style={styles.amenityName}>{amenity.name}</Text>
          <Text style={styles.amenityDescription}>{amenity.description}</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Type:</Text>
            <View style={amenity.amenityType === 'paid' ? styles.paidBadge : styles.freeBadge}>
              <Text style={amenity.amenityType === 'paid' ? styles.paidText : styles.freeText}>
                {amenity.amenityType === 'paid' ? `₹${amenity.bookingCharge}` : 'FREE'}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Capacity:</Text>
            <Text style={styles.infoValue}>👥 {amenity.capacity} people</Text>
          </View>

          {amenity.requiresApproval && (
            <View style={styles.warningBox}>
              <Text style={styles.warningText}>⚠️ This booking requires admin approval</Text>
            </View>
          )}
        </View>

        {/* Booking Date */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Select Date</Text>
          <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateButtonText}>
              📅 {bookingDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={bookingDate}
              mode="date"
              display="default"
              onChange={onDateChange}
              minimumDate={new Date()}
              maximumDate={new Date(Date.now() + amenity.advanceBookingDays * 24 * 60 * 60 * 1000)}
            />
          )}
        </View>

        {/* Time Selection */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Select Time</Text>
          <View style={styles.timeRow}>
            <View style={styles.timeSelector}>
              <Text style={styles.timeLabel}>Start Time</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timeScroll}>
                {timeSlots.map((time) => (
                  <TouchableOpacity
                    key={time}
                    style={[styles.timeSlot, startTime === time && styles.timeSlotSelected]}
                    onPress={() => setStartTime(time)}
                  >
                    <Text style={[styles.timeSlotText, startTime === time && styles.timeSlotTextSelected]}>
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.timeSelector}>
              <Text style={styles.timeLabel}>End Time</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timeScroll}>
                {timeSlots.map((time) => (
                  <TouchableOpacity
                    key={time}
                    style={[styles.timeSlot, endTime === time && styles.timeSlotSelected]}
                    onPress={() => setEndTime(time)}
                  >
                    <Text style={[styles.timeSlotText, endTime === time && styles.timeSlotTextSelected]}>
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>

        {/* Booking Summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Booking Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Date:</Text>
            <Text style={styles.summaryValue}>{bookingDate.toLocaleDateString()}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Time:</Text>
            <Text style={styles.summaryValue}>
              {startTime} - {endTime}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Amount:</Text>
            <Text style={styles.summaryValueBold}>
              ₹{amenity.bookingCharge || 0}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.bookButton, isBooking && styles.bookButtonDisabled]}
          onPress={handleBookNow}
          disabled={isBooking}
        >
          {isBooking ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.bookButtonText}>
              {amenity.amenityType === 'paid' ? 'Proceed to Payment' : 'Book Now'}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* Payment Modal */}
      <Modal visible={showPaymentModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.paymentModal}>
            <Text style={styles.modalTitle}>Payment Simulation</Text>
            <Text style={styles.modalSubtitle}>This is a simulated payment gateway</Text>

            <View style={styles.paymentDetails}>
              <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>Amenity:</Text>
                <Text style={styles.paymentValue}>{amenity.name}</Text>
              </View>
              <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>Date:</Text>
                <Text style={styles.paymentValue}>{bookingDate.toLocaleDateString()}</Text>
              </View>
              <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>Time:</Text>
                <Text style={styles.paymentValue}>
                  {startTime} - {endTime}
                </Text>
              </View>
              <View style={[styles.paymentRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total Amount:</Text>
                <Text style={styles.totalValue}>₹{amenity.bookingCharge}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.payButton, isProcessingPayment && styles.payButtonDisabled]}
              onPress={handlePayment}
              disabled={isProcessingPayment}
            >
              {isProcessingPayment ? (
                <>
                  <ActivityIndicator color="#fff" />
                  <Text style={styles.payButtonText}> Processing...</Text>
                </>
              ) : (
                <Text style={styles.payButtonText}>Pay ₹{amenity.bookingCharge}</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowPaymentModal(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.LG,
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_GREY,
  },
  backButton: {
    marginRight: SPACING.LG,
  },
  backButtonText: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.BLACK,
  },
  headerTitle: {
    fontSize: FS.FS20,
    fontFamily: FF[700],
    color: COLORS.BLACK,
  },
  container: {
    flex: 1,
  },
  amenityImage: {
    width: '100%',
    height: 220,
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  card: {
    backgroundColor: COLORS.WHITE,
    margin: SPACING.LG,
    padding: SPACING.LG,
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  amenityName: {
    fontSize: FS.FS22,
    fontFamily: FF[700],
    color: COLORS.BLACK,
    marginBottom: SPACING.SM,
  },
  amenityDescription: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: 20,
    marginBottom: SPACING.LG,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.MD,
  },
  infoLabel: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    width: 80,
  },
  infoValue: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.BLACK,
  },
  paidBadge: {
    backgroundColor: COLORS.LIGHT_GREEN,
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.XS + 2,
    borderRadius: BORDER_RADIUS.SM,
    borderWidth: 1,
    borderColor: COLORS.LIGHT_BORDER_GREEN,
  },
  paidText: {
    fontSize: FS.FS14,
    fontFamily: FF[700],
    color: COLORS.GREEN_TEXT,
  },
  freeBadge: {
    backgroundColor: COLORS.OCEAN_BLUE_BG,
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.XS + 2,
    borderRadius: BORDER_RADIUS.SM,
    borderWidth: 1,
    borderColor: COLORS.OCEAN_BLUE_BORDER,
  },
  freeText: {
    fontSize: FS.FS14,
    fontFamily: FF[700],
    color: COLORS.OCEAN_BLUE_TEXT,
  },
  warningBox: {
    backgroundColor: COLORS.ORANGE_BG,
    padding: SPACING.MD,
    borderRadius: BORDER_RADIUS.SM,
    marginTop: SPACING.SM,
    borderWidth: 1,
    borderColor: COLORS.ORANGE_BORDER,
  },
  warningText: {
    fontSize: FS.FS13,
    fontFamily: FF[600],
    color: COLORS.ORANGE_TEXT,
  },
  cardTitle: {
    fontSize: FS.FS16,
    fontFamily: FF[700],
    color: COLORS.BLACK,
    marginBottom: SPACING.MD,
  },
  dateButton: {
    backgroundColor: COLORS.LIGHT_GRAY,
    padding: SPACING.LG,
    borderRadius: BORDER_RADIUS.MD,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  dateButtonText: {
    fontSize: FS.FS15,
    fontFamily: FF[600],
    color: COLORS.BLACK,
  },
  timeRow: {
    gap: SPACING.LG,
  },
  timeSelector: {
    marginBottom: SPACING.LG,
  },
  timeLabel: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.GREY_TEXT,
    marginBottom: SPACING.SM,
  },
  timeScroll: {
    flexDirection: 'row',
  },
  timeSlot: {
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.SM + 2,
    borderRadius: BORDER_RADIUS.SM,
    backgroundColor: COLORS.LIGHT_GRAY,
    marginRight: SPACING.SM,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  timeSlotSelected: {
    backgroundColor: COLORS.BLACK,
    borderColor: COLORS.BLACK,
  },
  timeSlotText: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.GREY_TEXT,
  },
  timeSlotTextSelected: {
    color: COLORS.WHITE,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.SM,
  },
  summaryLabel: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
  },
  summaryValue: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.BLACK,
  },
  summaryValueBold: {
    fontSize: FS.FS16,
    fontFamily: FF[700],
    color: COLORS.BLACK,
  },
  bookButton: {
    backgroundColor: COLORS.BLACK,
    margin: SPACING.LG,
    paddingVertical: SPACING.LG,
    borderRadius: BORDER_RADIUS.MD,
    alignItems: 'center',
  },
  bookButtonDisabled: {
    backgroundColor: COLORS.GREY_TEXT,
  },
  bookButtonText: {
    color: COLORS.WHITE,
    fontSize: FS.FS16,
    fontFamily: FF[700],
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentModal: {
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.XL,
    padding: SPACING.XXL,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: FS.FS22,
    fontFamily: FF[700],
    color: COLORS.BLACK,
    textAlign: 'center',
    marginBottom: SPACING.SM,
  },
  modalSubtitle: {
    fontSize: FS.FS13,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    textAlign: 'center',
    marginBottom: SPACING.XXL,
  },
  paymentDetails: {
    backgroundColor: COLORS.LIGHT_GRAY,
    padding: SPACING.LG,
    borderRadius: BORDER_RADIUS.MD,
    marginBottom: SPACING.XXL,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.MD,
  },
  paymentLabel: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
  },
  paymentValue: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.BLACK,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER_GREY,
    paddingTop: SPACING.MD,
    marginTop: SPACING.XS,
  },
  totalLabel: {
    fontSize: FS.FS16,
    fontFamily: FF[700],
    color: COLORS.BLACK,
  },
  totalValue: {
    fontSize: FS.FS18,
    fontFamily: FF[700],
    color: COLORS.BLACK,
  },
  payButton: {
    backgroundColor: COLORS.BLACK,
    paddingVertical: SPACING.LG,
    borderRadius: BORDER_RADIUS.MD,
    alignItems: 'center',
    marginBottom: SPACING.MD,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  payButtonDisabled: {
    backgroundColor: COLORS.GREY_TEXT,
  },
  payButtonText: {
    color: COLORS.WHITE,
    fontSize: FS.FS16,
    fontFamily: FF[700],
  },
  cancelButton: {
    paddingVertical: SPACING.MD,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: COLORS.GREY_TEXT,
    fontSize: FS.FS15,
    fontFamily: FF[600],
  },
});

export default SimpleBookingScreen;
