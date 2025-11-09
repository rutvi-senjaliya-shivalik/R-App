import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Container, HeaderComponent, CustomButton, CalendarPicker, TimePickerModal } from '../../../components/common';
import BookAmenityStyles from './styles/bookAmenityStyles';
import { COLORS } from '../../../constants';
import { useTranslation } from '../../../context/LanguageContext';

interface Amenity {
  id: string;
  name: string;
  capacity: number;
  hourlyRate?: number;
  advanceBookingDays: number;
  requiresApproval: boolean;
  operatingHours?: {
    open: string;
    close: string;
  };
}

const BookAmenity = (props: any) => {
  const { t } = useTranslation();
  const isMountedRef = useRef(true);
  const amenity = props.route?.params?.amenity as Amenity;
  const selectedRole = props.route?.params?.selectedRole;

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isStartTimePickerVisible, setIsStartTimePickerVisible] = useState(false);
  const [isEndTimePickerVisible, setIsEndTimePickerVisible] = useState(false);
  const [duration, setDuration] = useState('1');

  useEffect(() => {
    isMountedRef.current = true;
    // Set end time to 1 hour after start time
    const newEndTime = new Date(startTime);
    newEndTime.setHours(newEndTime.getHours() + 1);
    setEndTime(newEndTime);
    return () => {
      isMountedRef.current = false;
    };
  }, [startTime]);

  const formatDateForDisplay = (dateString: string): string => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  const formatTimeForDisplay = (timeDate: Date): string => {
    const hours = timeDate.getHours();
    const minutes = timeDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${displayHours}:${displayMinutes} ${ampm}`;
  };

  const handleDateSelect = (dateString: string) => {
    setSelectedDate(dateString);
    setIsDatePickerVisible(false);
  };

  const handleStartTimeSelect = (timeDate: Date) => {
    setStartTime(timeDate);
    // Auto-update end time
    const newEndTime = new Date(timeDate);
    newEndTime.setHours(newEndTime.getHours() + parseInt(duration));
    setEndTime(newEndTime);
    setIsStartTimePickerVisible(false);
  };

  const handleEndTimeSelect = (timeDate: Date) => {
    setEndTime(timeDate);
    setIsEndTimePickerVisible(false);
  };

  const handleDurationChange = (value: string) => {
    setDuration(value);
    const newEndTime = new Date(startTime);
    newEndTime.setHours(newEndTime.getHours() + parseInt(value));
    setEndTime(newEndTime);
  };

  const calculateTotalCost = (): number => {
    if (!amenity.hourlyRate) return 0;
    return amenity.hourlyRate * parseInt(duration);
  };

  const validateBooking = (): boolean => {
    if (!selectedDate) {
      Alert.alert(t('common.error'), t('smartSociety.pleaseSelectDate'));
      return false;
    }

    const selectedDateTime = new Date(`${selectedDate}T${startTime.toTimeString().split(' ')[0]}`);
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + amenity.advanceBookingDays);

    if (selectedDateTime < new Date()) {
      Alert.alert(t('common.error'), t('smartSociety.cannotBookPastDate'));
      return false;
    }

    if (selectedDateTime < minDate) {
      Alert.alert(
        t('common.error'),
        t('smartSociety.advanceBookingRequired', { days: amenity.advanceBookingDays }),
      );
      return false;
    }

    if (endTime <= startTime) {
      Alert.alert(t('common.error'), t('smartSociety.endTimeMustBeAfterStartTime'));
      return false;
    }

    return true;
  };

  const handleBook = (withPayment: boolean = false) => {
    if (!validateBooking()) {
      return;
    }

    const bookingData = {
      amenityId: amenity.id,
      amenityName: amenity.name,
      date: selectedDate,
      startTime: formatTimeForDisplay(startTime),
      endTime: formatTimeForDisplay(endTime),
      duration: parseInt(duration),
      totalCost: calculateTotalCost(),
      requiresApproval: amenity.requiresApproval,
      paymentStatus: withPayment ? 'paid' : 'pending',
      status: amenity.requiresApproval ? 'pending' : 'confirmed',
    };

    if (withPayment) {
      // TODO: Navigate to payment screen or process payment
      // For now, show payment confirmation
      Alert.alert(
        t('smartSociety.paymentRequired') || 'Payment Required',
        t('smartSociety.proceedToPayment', { amount: calculateTotalCost() }) || 
          `Proceed to payment of ₹${calculateTotalCost()}?`,
        [
          { text: t('common.cancel') || 'Cancel', style: 'cancel' },
          {
            text: t('smartSociety.proceedToPay') || 'Proceed to Pay',
            onPress: () => {
              // TODO: Navigate to payment screen
              // props.navigation?.navigate('PaymentScreen', { bookingData });
              // For now, just confirm booking after payment
              handleBookingSubmission(bookingData, true);
            },
          },
        ],
      );
    } else {
      // Book without payment (payment pending)
      handleBookingSubmission(bookingData, false);
    }
  };

  const handleBookingSubmission = (bookingData: any, paymentCompleted: boolean) => {
    // TODO: Submit booking to API
    Alert.alert(
      t('common.success') || 'Success',
      paymentCompleted
        ? t('smartSociety.bookingConfirmedWithPayment') || 'Booking confirmed and payment completed successfully'
        : amenity.requiresApproval
        ? t('smartSociety.bookingSubmittedForApproval') || 'Booking submitted for approval. Payment pending.'
        : t('smartSociety.bookingConfirmed') || 'Booking confirmed successfully. Payment pending.',
      [
        {
          text: t('common.ok') || 'OK',
          onPress: () => props.navigation?.goBack(),
        },
      ],
    );
  };

  return (
    <Container>
      <HeaderComponent
        Title={t('smartSociety.bookAmenity') || 'Book Amenity'}
        onPress={() => props.navigation?.goBack()}
      />
      <ScrollView
        style={BookAmenityStyles.container}
        contentContainerStyle={BookAmenityStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={BookAmenityStyles.amenityInfoCard}>
          <Text style={BookAmenityStyles.amenityName}>{amenity.name}</Text>
          {amenity.hourlyRate && (
            <Text style={BookAmenityStyles.rateText}>
              ₹{amenity.hourlyRate}/{t('smartSociety.perHour') || 'hr'}
            </Text>
          )}
        </View>

        <View style={BookAmenityStyles.section}>
          <Text style={BookAmenityStyles.label}>
            {t('smartSociety.selectDate') || 'Select Date'} <Text style={BookAmenityStyles.required}>*</Text>
          </Text>
          <TouchableOpacity
            style={BookAmenityStyles.input}
            onPress={() => setIsDatePickerVisible(true)}
          >
            <Text
              style={[
                BookAmenityStyles.inputText,
                !selectedDate && BookAmenityStyles.placeholderText,
              ]}
            >
              {selectedDate
                ? formatDateForDisplay(selectedDate)
                : t('smartSociety.selectDate') || 'Select date'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={BookAmenityStyles.row}>
          <View style={[BookAmenityStyles.section, BookAmenityStyles.halfWidth]}>
            <Text style={BookAmenityStyles.label}>
              {t('smartSociety.startTime') || 'Start Time'} <Text style={BookAmenityStyles.required}>*</Text>
            </Text>
            <TouchableOpacity
              style={BookAmenityStyles.input}
              onPress={() => setIsStartTimePickerVisible(true)}
            >
              <Text style={BookAmenityStyles.inputText}>
                {formatTimeForDisplay(startTime)}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[BookAmenityStyles.section, BookAmenityStyles.halfWidth]}>
            <Text style={BookAmenityStyles.label}>
              {t('smartSociety.duration') || 'Duration (Hours)'} <Text style={BookAmenityStyles.required}>*</Text>
            </Text>
            <TouchableOpacity
              style={BookAmenityStyles.input}
              onPress={() => {
                // Simple duration picker
                Alert.alert(
                  t('smartSociety.selectDuration') || 'Select Duration',
                  '',
                  [
                    { text: '1', onPress: () => handleDurationChange('1') },
                    { text: '2', onPress: () => handleDurationChange('2') },
                    { text: '3', onPress: () => handleDurationChange('3') },
                    { text: '4', onPress: () => handleDurationChange('4') },
                    { text: t('common.cancel') || 'Cancel', style: 'cancel' },
                  ],
                );
              }}
            >
              <Text style={BookAmenityStyles.inputText}>
                {duration} {t('smartSociety.hours') || 'hour(s)'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={BookAmenityStyles.section}>
          <Text style={BookAmenityStyles.label}>
            {t('smartSociety.endTime') || 'End Time'}
          </Text>
          <TouchableOpacity
            style={[BookAmenityStyles.input, BookAmenityStyles.disabledInput]}
            onPress={() => setIsEndTimePickerVisible(true)}
          >
            <Text style={BookAmenityStyles.inputText}>
              {formatTimeForDisplay(endTime)}
            </Text>
          </TouchableOpacity>
        </View>

        {amenity.hourlyRate && (
          <View style={BookAmenityStyles.costCard}>
            <View style={BookAmenityStyles.costRow}>
              <Text style={BookAmenityStyles.costLabel}>
                {t('smartSociety.totalCost') || 'Total Cost'}
              </Text>
              <Text style={BookAmenityStyles.costValue}>
                ₹{calculateTotalCost()}
              </Text>
            </View>
          </View>
        )}

        {amenity.requiresApproval && (
          <View style={BookAmenityStyles.infoCard}>
            <Text style={BookAmenityStyles.infoText}>
              {t('smartSociety.bookingRequiresApproval') || 'This booking requires admin approval'}
            </Text>
          </View>
        )}

        <View style={BookAmenityStyles.submitButton}>
          <CustomButton
            title={
              amenity.hourlyRate && calculateTotalCost() > 0
                ? t('smartSociety.payNowAndBook') || 'Pay Now & Book'
                : t('smartSociety.book') || 'Book'
            }
            onPress={() => handleBook(amenity.hourlyRate && calculateTotalCost() > 0)}
          />
        </View>
      </ScrollView>

      <CalendarPicker
        visible={isDatePickerVisible}
        onClose={() => setIsDatePickerVisible(false)}
        onSelect={handleDateSelect}
        minDate={new Date().toISOString().split('T')[0]}
      />

      <TimePickerModal
        visible={isStartTimePickerVisible}
        onClose={() => setIsStartTimePickerVisible(false)}
        onConfirm={handleStartTimeSelect}
        selectedTime={startTime}
        onTimeChange={setStartTime}
      />

      <TimePickerModal
        visible={isEndTimePickerVisible}
        onClose={() => setIsEndTimePickerVisible(false)}
        onConfirm={handleEndTimeSelect}
        selectedTime={endTime}
        onTimeChange={setEndTime}
      />
    </Container>
  );
};

export default BookAmenity;

