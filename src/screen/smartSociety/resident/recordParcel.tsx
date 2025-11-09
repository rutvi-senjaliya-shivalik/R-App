import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {
  Container,
  HeaderComponent,
  CustomButton,
} from '../../../components/common';
import RecordParcelStyles from './styles/recordParcelStyles';
import { COLORS } from '../../../constants';
import { useTranslation } from '../../../context/LanguageContext';
import moment from 'moment';

const ResidentRecordParcel = (props: any) => {
  const { t } = useTranslation();
  const isMountedRef = useRef(true);
  const [trackingNumber, setTrackingNumber] = useState<string>('');
  const [courierName, setCourierName] = useState<string>('');
  const [flatNo, setFlatNo] = useState<string>('B-204'); // TODO: Get from user profile
  const [description, setDescription] = useState<string>('');
  const [expectedDate, setExpectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const couriers = [
    'Amazon',
    'Flipkart',
    'Swiggy',
    'Zomato',
    'Myntra',
    t('smartSociety.other'),
  ];

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleSubmit = () => {
    if (!trackingNumber.trim()) {
      Alert.alert(
        t('common.error'),
        t('smartSociety.pleaseEnterTrackingNumber'),
      );
      return;
    }
    if (!courierName) {
      Alert.alert(t('common.error'), t('smartSociety.pleaseSelectCourierName'));
      return;
    }
    if (!description.trim()) {
      Alert.alert(
        t('common.error'),
        t('smartSociety.pleaseEnterParcelDescription'),
      );
      return;
    }

    // TODO: Submit parcel record to API
    const newParcel = {
      id: `par${Date.now()}`,
      trackingNumber: trackingNumber.trim(),
      courierName,
      flatNo: flatNo.trim(),
      description: description.trim(),
      expectedDate: expectedDate
        ? moment(expectedDate).format('YYYY-MM-DD')
        : null,
      recordedBy: 'Resident',
      recordedAt: new Date().toISOString(),
      status: 'expected', // Expected delivery
    };

    console.log('New parcel record:', newParcel);

    Alert.alert(t('common.success'), t('smartSociety.parcelDeliveryRecorded'), [
      {
        text: t('common.ok'),
        onPress: () => {
          props.navigation?.goBack();
        },
      },
    ]);
  };

  return (
    <Container>
      <HeaderComponent
        Title={t('smartSociety.recordParcel')}
        onPress={() => props.navigation?.goBack()}
      />
      <ScrollView
        style={RecordParcelStyles.container}
        contentContainerStyle={RecordParcelStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={RecordParcelStyles.section}>
          <Text style={RecordParcelStyles.label}>
            {t('smartSociety.flatNumber')}
          </Text>
          <TextInput
            style={RecordParcelStyles.input}
            value={flatNo}
            onChangeText={setFlatNo}
            placeholder={t('smartSociety.pleaseEnterFlatNumber')}
            placeholderTextColor={COLORS.GREY_TEXT}
            cursorColor={COLORS.OCEAN_BLUE_TEXT}
          />
        </View>

        <View style={RecordParcelStyles.section}>
          <Text style={RecordParcelStyles.label}>
            {t('smartSociety.trackingNumber')} *
          </Text>
          <TextInput
            style={RecordParcelStyles.input}
            value={trackingNumber}
            onChangeText={setTrackingNumber}
            placeholder={t('smartSociety.pleaseEnterTrackingNumber')}
            placeholderTextColor={COLORS.GREY_TEXT}
            cursorColor={COLORS.OCEAN_BLUE_TEXT}
          />
        </View>

        <View style={RecordParcelStyles.section}>
          <Text style={RecordParcelStyles.label}>
            {t('smartSociety.courierName')} *
          </Text>
          <View style={RecordParcelStyles.chipsContainer}>
            {couriers.map(courier => (
              <TouchableOpacity
                key={courier}
                style={[
                  RecordParcelStyles.chip,
                  courierName === courier && RecordParcelStyles.chipActive,
                ]}
                onPress={() => setCourierName(courier)}
              >
                <Text
                  style={[
                    RecordParcelStyles.chipText,
                    courierName === courier &&
                      RecordParcelStyles.chipTextActive,
                  ]}
                >
                  {courier}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={RecordParcelStyles.section}>
          <Text style={RecordParcelStyles.label}>
            {t('smartSociety.parcelDescription')} *
          </Text>
          <TextInput
            style={RecordParcelStyles.textArea}
            value={description}
            onChangeText={setDescription}
            placeholder={t('smartSociety.pleaseEnterParcelDescription')}
            placeholderTextColor={COLORS.GREY_TEXT}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            cursorColor={COLORS.OCEAN_BLUE_TEXT}
          />
        </View>

        <View style={RecordParcelStyles.section}>
          <Text style={RecordParcelStyles.label}>
            {t('smartSociety.expectedDeliveryDateOptional')}
          </Text>
          <TouchableOpacity
            style={RecordParcelStyles.input}
            onPress={handleDatePicker}
          >
            <Text
              style={[
                RecordParcelStyles.inputText,
                !expectedDate && RecordParcelStyles.placeholderText,
              ]}
            >
              {expectedDate
                ? moment(expectedDate).format('DD MMM YYYY')
                : t('smartSociety.selectExpectedDeliveryDate')}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={RecordParcelStyles.infoBox}>
          <Text style={RecordParcelStyles.infoText}>
            {t('smartSociety.securityNotifiedWhenParcelArrives')}
          </Text>
        </View>

        <View style={RecordParcelStyles.submitButton}>
          <CustomButton
            title={t('smartSociety.recordParcel')}
            onPress={handleSubmit}
          />
        </View>
      </ScrollView>

      {/* Date Picker */}
      <DatePicker
        modal
        open={showDatePicker}
        date={expectedDate || new Date()}
        mode="date"
        onConfirm={date => {
          setExpectedDate(date);
          setShowDatePicker(false);
        }}
        onCancel={() => {
          setShowDatePicker(false);
        }}
        minimumDate={new Date()}
        title={t('smartSociety.selectDate')}
        confirmText={t('common.confirm')}
        cancelText={t('common.cancel')}
      />
    </Container>
  );
};

export default ResidentRecordParcel;
