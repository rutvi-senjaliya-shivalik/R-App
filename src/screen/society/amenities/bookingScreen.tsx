import React, { useCallback, useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Container,
  HeaderComponent,
  CustomButton,
  InputField,
} from '../../../components/common';
import BottomSheet from '../../../components/common/BottomSheet/BottomSheet';
import { Calendar, DateData } from 'react-native-calendars';
import { amenitiesBookingStyles } from './bookingStyles';
import { COLORS } from '../../../constants';
import { createAmenityBooking } from '../../../store/actions/society/amenityBookingAction';
import { selectUserData } from '../../../store/selectors/auth';
import { selectAmenityBookingData } from '../../../store/selectors/amenities';

type MarkedDates = {
  [key: string]: {
    selected: boolean;
    selectedColor: string;
  };
};

const AmenitiesBookingScreen = ({ route, navigation }: any) => {
  const dispatch = useDispatch() as any;
  const { amenity } = route.params || {};
  console.log('amenity:::', amenity);
  const userData = useSelector(selectUserData);
  const { loading, bookingSuccess } = useSelector(selectAmenityBookingData);

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [currentPickerType, setCurrentPickerType] = useState<'start' | 'end'>('start');
  const [tempTime, setTempTime] = useState(new Date());
  const [remarks, setRemarks] = useState('');
  const [showPaymentSheet, setShowPaymentSheet] = useState(false);
  const [qrCodeBase64, setQrCodeBase64] = useState<string>('');
  const [bookingPayload, setBookingPayload] = useState<any>(null);

  // Get amount directly from amenity (per day charge)
  const amount = selectedDate && amenity?.amount ? Number(amenity.amount) : 0;

  useEffect(() => {
    if (bookingSuccess) {
      Alert.alert(
        'Booking Successful',
        `${amenity?.name} booked successfully!\nAmount: ₹${amount}`,
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ],
      );
    }
  }, [bookingSuccess, amenity, amount, navigation]);

  const handleDayPress = useCallback((day: DateData) => {
    const dateString = day.dateString;
    setSelectedDate(dateString);
    setMarkedDates({
      [dateString]: {
        selected: true,
        selectedColor: COLORS.DARK_BLUE || '#1E40AF',
      },
    });
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const openTimePicker = (type: 'start' | 'end') => {
    setCurrentPickerType(type);
    setTempTime(type === 'start' ? startTime : endTime);
    setShowTimePicker(true);
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
      if (event.type === 'set' && selectedTime) {
        if (currentPickerType === 'start') {
          setStartTime(selectedTime);
          // Automatically set end time to 1 hour later
          const newEndTime = new Date(selectedTime.getTime() + 60 * 60 * 1000);
          setEndTime(newEndTime);
        } else {
          if (selectedTime <= startTime) {
            Alert.alert('Invalid Time', 'End time must be after start time');
            return;
          }
          setEndTime(selectedTime);
        }
      }
    } else {
      // iOS - just update temp time
      if (selectedTime) {
        setTempTime(selectedTime);
      }
    }
  };

  const handleIOSTimeConfirm = () => {
    if (currentPickerType === 'start') {
      setStartTime(tempTime);
      // Automatically set end time to 1 hour later
      const newEndTime = new Date(tempTime.getTime() + 60 * 60 * 1000);
      setEndTime(newEndTime);
    } else {
      if (tempTime <= startTime) {
        Alert.alert('Invalid Time', 'End time must be after start time');
        return;
      }
      setEndTime(tempTime);
    }
    setShowTimePicker(false);
  };

  const handleIOSTimeCancel = () => {
    setShowTimePicker(false);
  };

  const handleBooking = useCallback(async () => {
    if (!selectedDate) {
      Alert.alert('Validation Error', 'Please select a booking date');
      return;
    }

    if (endTime <= startTime) {
      Alert.alert('Validation Error', 'End time must be after start time');
      return;
    }

    if (amount <= 0) {
      Alert.alert('Validation Error', 'Invalid booking duration');
      return;
    }

    try {
      const payload = {
        society: userData?.societyId,
        amenity: amenity?._id,
        bookingDate: selectedDate,
        bookingStartTime: formatTime(startTime),
        bookingEndTime: formatTime(endTime),
        amount: amount,
        paymentMethod: 'UPI',
        remarks: remarks || undefined,
      };

      console.log('payload:::', payload);
      
      // Store payload for later use after payment
      setBookingPayload(payload);
      
      // TODO: Replace with actual QR code from API
      // For now using a placeholder base64 QR code
      const dummyQRCode = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
      setQrCodeBase64(dummyQRCode);
      
      // Open payment bottom sheet
      setShowPaymentSheet(true);
    } catch (error: any) {
      console.log('Booking error:', error);
    }
  }, [
    selectedDate,
    startTime,
    endTime,
    amount,
    amenity,
    userData,
    remarks,
  ]);

  const handlePayment = useCallback(async () => {
    if (!bookingPayload) return;

    try {
      // Close payment sheet
      setShowPaymentSheet(false);
      
      // Dispatch booking action
      await dispatch(createAmenityBooking(bookingPayload));
    } catch (error: any) {
      console.log('Payment error:', error);
      Alert.alert('Error', 'Payment failed. Please try again.');
    }
  }, [bookingPayload, dispatch]);

  const handleClosePaymentSheet = () => {
    setShowPaymentSheet(false);
  };

  console.log('amenity?.qaCode::', amenity?.qrCode);

  return (
    <Container>
      <View style={amenitiesBookingStyles.container}>
        <HeaderComponent
          Title="Book Amenity"
          onPress={() => navigation.goBack()}
        />
        <ScrollView
          style={amenitiesBookingStyles.contentWrapper}
          contentContainerStyle={amenitiesBookingStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={amenitiesBookingStyles.amenityInfoCard}>
            <Text style={amenitiesBookingStyles.amenityName}>
              {amenity?.name}
            </Text>
            <Text style={amenitiesBookingStyles.amenityDescription}>
              {amenity?.description}
            </Text>
          </View>

          <Text style={amenitiesBookingStyles.sectionTitle}>
            Select Booking Date
          </Text>

          <Calendar
            current={new Date().toISOString().split('T')[0]}
            minDate={new Date().toISOString().split('T')[0]}
            markedDates={markedDates}
            onDayPress={handleDayPress}
            theme={{
              selectedDayBackgroundColor: COLORS.DARK_BLUE || '#1E40AF',
              todayTextColor: COLORS.DARK_BLUE || '#1E40AF',
              arrowColor: COLORS.DARK_BLUE || '#1E40AF',
              textDayFontFamily: 'BricolageGrotesque-Medium',
              textMonthFontFamily: 'BricolageGrotesque-SemiBold',
              textDayHeaderFontFamily: 'BricolageGrotesque-Medium',
            }}
          />

          {selectedDate && (
            <View style={amenitiesBookingStyles.timeSection}>
              <Text style={amenitiesBookingStyles.sectionTitle}>
                Booking Time
              </Text>

              <TouchableOpacity
                style={amenitiesBookingStyles.timeInput}
                onPress={() => openTimePicker('start')}
              >
                <Text style={amenitiesBookingStyles.timeLabel}>Start Time</Text>
                <Text style={amenitiesBookingStyles.timeValue}>
                  {formatTime(startTime)}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={amenitiesBookingStyles.timeInput}
                onPress={() => openTimePicker('end')}
              >
                <Text style={amenitiesBookingStyles.timeLabel}>End Time</Text>
                <Text style={amenitiesBookingStyles.timeValue}>
                  {formatTime(endTime)}
                </Text>
              </TouchableOpacity>

              <View style={amenitiesBookingStyles.amountCard}>
                <Text style={amenitiesBookingStyles.amountLabel}>
                  Payable Amount
                </Text>
                <Text style={amenitiesBookingStyles.amountValue}>
                  ₹ {amount}
                </Text>
                <Text style={amenitiesBookingStyles.amountSubtext}>
                  Per day charge
                </Text>
              </View>

              <View style={amenitiesBookingStyles.remarksSection}>
                <Text style={amenitiesBookingStyles.sectionTitle}>
                  Remarks (Optional)
                </Text>
                <InputField
                  placeholder="Enter any special requirements or notes"
                  value={remarks}
                  onChangeText={setRemarks}
                  multiline
                  numberOfLines={3}
                />
              </View>
            </View>
          )}
        </ScrollView>

        <View style={amenitiesBookingStyles.submitButtonWrapper}>
          <CustomButton
            title={loading ? 'Booking...' : `Confirm Booking - ₹${amount}`}
            onPress={handleBooking}
            loading={loading}
            disabled={!selectedDate || amount <= 0}
          />
        </View>

        {/* Android Time Picker */}
        {showTimePicker && Platform.OS === 'android' && (
          <DateTimePicker
            value={tempTime}
            mode="time"
            is24Hour={false}
            display="default"
            onChange={handleTimeChange}
          />
        )}

        {/* iOS Time Picker in Bottom Sheet */}
        {Platform.OS === 'ios' && (
          <BottomSheet
            visible={showTimePicker}
            title={`Select ${currentPickerType === 'start' ? 'Start' : 'End'} Time`}
            onClose={handleIOSTimeCancel}
            positiveButton={{
              text: 'Confirm',
              onPress: handleIOSTimeConfirm,
            }}
            negativeButton={{
              text: 'Cancel',
              onPress: handleIOSTimeCancel,
            }}
          >
            <View style={amenitiesBookingStyles.pickerContainer}>
              <DateTimePicker
                value={tempTime}
                mode="time"
                is24Hour={false}
                display="spinner"
                onChange={handleTimeChange}
                style={amenitiesBookingStyles.iosTimePicker}
              />
            </View>
          </BottomSheet>
        )}

        {/* Payment Bottom Sheet */}
        <BottomSheet
          visible={showPaymentSheet}
          title="Complete Payment"
          onClose={handleClosePaymentSheet}
          positiveButton={{
            text: `Pay - ₹${amount}`,
            onPress: handlePayment,
            loading: loading,
          }}
          negativeButton={{
            text: 'Cancel',
            onPress: handleClosePaymentSheet,
          }}
        >
          <View style={amenitiesBookingStyles.paymentContainer}>
            <Text style={amenitiesBookingStyles.paymentInstruction}>
              Scan the QR code below to complete your payment
            </Text>
            
            {amenity?.qrCode ? (
              <View style={amenitiesBookingStyles.qrCodeWrapper}>
                <Image
                  source={{ uri: amenity?.qrCode }}
                  style={amenitiesBookingStyles.qrCodeImage}
                  resizeMode="contain"
                />
              </View>
            ) : (
              <View style={amenitiesBookingStyles.qrCodePlaceholder}>
                <Text style={amenitiesBookingStyles.qrCodePlaceholderText}>
                  Loading QR Code...
                </Text>
              </View>
            )}

            <View style={amenitiesBookingStyles.paymentDetails}>
              <View style={amenitiesBookingStyles.paymentRow}>
                <Text style={amenitiesBookingStyles.paymentLabel}>Amenity:</Text>
                <Text style={amenitiesBookingStyles.paymentValue}>{amenity?.name}</Text>
              </View>
              <View style={amenitiesBookingStyles.paymentRow}>
                <Text style={amenitiesBookingStyles.paymentLabel}>Date:</Text>
                <Text style={amenitiesBookingStyles.paymentValue}>{selectedDate}</Text>
              </View>
              <View style={amenitiesBookingStyles.paymentRow}>
                <Text style={amenitiesBookingStyles.paymentLabel}>Time:</Text>
                <Text style={amenitiesBookingStyles.paymentValue}>
                  {formatTime(startTime)} - {formatTime(endTime)}
                </Text>
              </View>
              <View style={[amenitiesBookingStyles.paymentRow, amenitiesBookingStyles.totalRow]}>
                <Text style={amenitiesBookingStyles.totalLabel}>Total Amount:</Text>
                <Text style={amenitiesBookingStyles.totalValue}>₹{amount}</Text>
              </View>
            </View>
          </View>
        </BottomSheet>
      </View>
    </Container>
  );
};

export default AmenitiesBookingScreen;
