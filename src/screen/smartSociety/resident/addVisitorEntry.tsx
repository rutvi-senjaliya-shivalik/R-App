import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Share,
  Modal,
  ActivityIndicator,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import QRCode from 'react-native-qrcode-svg';
import {
  Container,
  HeaderComponent,
  CustomButton,
} from '../../../components/common';
import AddVisitorEntryStyles from './styles/addVisitorEntryStyles';
import { COLORS } from '../../../constants';
import { useTranslation } from '../../../context/LanguageContext';
import { useDispatch, useSelector } from 'react-redux';
import * as actionTypes from '../../../store/actionType';
import moment from 'moment';

const ResidentAddVisitorEntry = (props: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch() as any;
  const isMountedRef = useRef(true);
  const [visitorName, setVisitorName] = useState<string>('');
  const [visitorPhone, setVisitorPhone] = useState<string>('');
  const [flatNo, setFlatNo] = useState<string>('B-204'); // TODO: Get from user profile
  const [purpose, setPurpose] = useState<string>('');
  const [expectedDate, setExpectedDate] = useState<Date | null>(null);
  const [expectedTime, setExpectedTime] = useState<Date | null>(null);
  const [isPreApproved, setIsPreApproved] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showQRModal, setShowQRModal] = useState<boolean>(false);
  const [qrData, setQrData] = useState<string>('');

  const visitorEntryState = useSelector((state: any) => state.addVisitorEntry);

  const purposes = [
    { key: 'Personal Visit', label: t('smartSociety.personalVisit') },
    { key: 'Delivery', label: t('smartSociety.delivery') },
    { key: 'Service', label: t('smartSociety.service') },
    { key: 'Other', label: t('smartSociety.other') },
  ];

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    // Check if API call was successful (not loading, has data, no error)
    if (
      !visitorEntryState?.loading &&
      visitorEntryState?.data &&
      !visitorEntryState?.error
    ) {
      console.log('Visitor Entry State (Success):', visitorEntryState);

      // Extract entry data from API response
      // Axios response structure: response.data contains the API response
      // API response structure could be: { data: {...} } or direct {...}
      const axiosResponse = visitorEntryState.data;
      const apiResponseData = axiosResponse?.data || axiosResponse;

      console.log('API Response Data:', apiResponseData);

      // Update QR code with API response ID if available
      if (apiResponseData?.id || apiResponseData?.visitorEntryId) {
        const entryId =
          apiResponseData?.id ||
          apiResponseData?.visitorEntryId ||
          apiResponseData?.data?.id;

        // Update QR code data with API response ID
        const updatedQrCodeData = JSON.stringify({
          id: entryId,
          visitorName: visitorName.trim(),
          visitorPhone: visitorPhone.trim(),
          flatNo: flatNo.trim(),
          purpose,
          isPreApproved,
          expectedDate:
            isPreApproved && expectedDate
              ? moment(expectedDate).format('YYYY-MM-DD')
              : null,
          expectedTime:
            isPreApproved && expectedTime
              ? moment(expectedTime).format('HH:mm')
              : null,
          entryTime: !isPreApproved ? moment().toISOString() : null,
          status: isPreApproved ? 'expected' : 'active',
        });

        console.log('QR Code Data Updated with API ID:', updatedQrCodeData);
        setQrData(updatedQrCodeData);
      }

      // QR modal should already be shown, just update the data if needed
      setIsSubmitting(false);
    } else if (!visitorEntryState?.loading && visitorEntryState?.error) {
      setIsSubmitting(false);
      const errorMessage =
        visitorEntryState.error?.response?.data?.message ||
        visitorEntryState.error?.message ||
        t('smartSociety.failedToAddVisitorEntry');

      // QR code should already be shown, just show warning
      if (qrData) {
        Alert.alert(
          t('common.warning'),
          errorMessage +
            '\n\n' +
            (t('smartSociety.qrCodeGeneratedOffline') ||
              'QR code has been generated.'),
          [{ text: t('common.ok') }],
        );
      } else {
        Alert.alert(t('common.error'), errorMessage, [
          { text: t('common.ok') },
        ]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visitorEntryState]);

  const handleDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleTimePicker = () => {
    setShowTimePicker(true);
  };

  const handleSubmit = async () => {
    if (!visitorName.trim()) {
      Alert.alert(t('common.error'), t('smartSociety.pleaseEnterVisitorName'));
      return;
    }
    if (!visitorPhone.trim()) {
      Alert.alert(
        t('common.error'),
        t('smartSociety.pleaseEnterVisitorPhoneNumber'),
      );
      return;
    }
    if (!purpose) {
      Alert.alert(
        t('common.error'),
        t('smartSociety.pleaseSelectPurposeOfVisit'),
      );
      return;
    }
    if (isPreApproved && !expectedDate) {
      Alert.alert(
        t('common.error'),
        t('smartSociety.pleaseSelectExpectedDate'),
      );
      return;
    }
    if (isPreApproved && !expectedTime) {
      Alert.alert(
        t('common.error'),
        t('smartSociety.pleaseSelectExpectedTime'),
      );
      return;
    }

    setIsSubmitting(true);

    const payload = {
      visitorName: visitorName.trim(),
      visitorPhone: visitorPhone.trim(),
      flatNo: flatNo.trim(),
      purpose,
      isPreApproved,
      expectedDate:
        isPreApproved && expectedDate
          ? moment(expectedDate).format('YYYY-MM-DD')
          : null,
      expectedTime:
        isPreApproved && expectedTime
          ? moment(expectedTime).format('HH:mm')
          : null,
    };

    // Generate QR code data immediately (fallback if API fails or for offline use)
    const entryId = `vis${Date.now()}`;
    const qrCodeData = JSON.stringify({
      id: entryId,
      visitorName: visitorName.trim(),
      visitorPhone: visitorPhone.trim(),
      flatNo: flatNo.trim(),
      purpose,
      isPreApproved,
      expectedDate:
        isPreApproved && expectedDate
          ? moment(expectedDate).format('YYYY-MM-DD')
          : null,
      expectedTime:
        isPreApproved && expectedTime
          ? moment(expectedTime).format('HH:mm')
          : null,
      entryTime: !isPreApproved ? moment().toISOString() : null,
      status: isPreApproved ? 'expected' : 'active',
    });

    console.log('QR Code Data Generated (pre-submit):', qrCodeData);
    setQrData(qrCodeData);
    // Show QR modal immediately after generating QR code
    setShowQRModal(true);
    setIsSubmitting(false);

    try {
      console.log('Dispatching visitor entry request with payload:', payload);
      dispatch({ type: actionTypes.ADD_VISITOR_ENTRY_REQUEST, payload });
    } catch (error: any) {
      console.error('Error dispatching visitor entry:', error);
      Alert.alert(
        t('common.warning'),
        error?.message ||
          t('smartSociety.failedToAddVisitorEntry') +
            '\n\n' +
            t('smartSociety.qrCodeGeneratedOffline'),
        [{ text: t('common.ok') }],
      );
    }
  };

  const handleShareQR = async () => {
    try {
      const shareMessage = `Visitor Entry QR Code\n\nVisitor: ${visitorName}\nPhone: ${visitorPhone}\nFlat: ${flatNo}\nPurpose: ${purpose}\n\nScan this QR code for entry verification.`;

      await Share.share({
        message: shareMessage + `\n\nQR Data: ${qrData}`,
        title: 'Visitor Entry QR Code',
      });
    } catch (error) {
      console.error('Error sharing QR code:', error);
    }
  };

  const handleCloseQRModal = () => {
    setShowQRModal(false);
    setQrData('');
    // Reset form and navigate back
    props.navigation?.goBack();
  };

  return (
    <Container>
      <HeaderComponent
        Title={t('smartSociety.addVisitorEntry')}
        onPress={() => props.navigation?.goBack()}
      />
      <ScrollView
        style={AddVisitorEntryStyles.container}
        contentContainerStyle={AddVisitorEntryStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={AddVisitorEntryStyles.section}>
          <Text style={AddVisitorEntryStyles.label}>
            {t('smartSociety.flatNumber')}
          </Text>
          <TextInput
            style={AddVisitorEntryStyles.input}
            value={flatNo}
            onChangeText={setFlatNo}
            placeholder={t('smartSociety.pleaseEnterFlatNumber')}
            placeholderTextColor={COLORS.GREY_TEXT}
          />
        </View>

        <View style={AddVisitorEntryStyles.section}>
          <Text style={AddVisitorEntryStyles.label}>
            {t('smartSociety.visitorName')} *
          </Text>
          <TextInput
            style={AddVisitorEntryStyles.input}
            value={visitorName}
            onChangeText={setVisitorName}
            placeholder={t('smartSociety.pleaseEnterVisitorName')}
            placeholderTextColor={COLORS.GREY_TEXT}
          />
        </View>

        <View style={AddVisitorEntryStyles.section}>
          <Text style={AddVisitorEntryStyles.label}>
            {t('smartSociety.visitorPhone')} *
          </Text>
          <TextInput
            style={AddVisitorEntryStyles.input}
            value={visitorPhone}
            onChangeText={setVisitorPhone}
            placeholder={t('smartSociety.pleaseEnterVisitorPhoneNumber')}
            placeholderTextColor={COLORS.GREY_TEXT}
            keyboardType="phone-pad"
          />
        </View>

        <View style={AddVisitorEntryStyles.section}>
          <Text style={AddVisitorEntryStyles.label}>
            {t('smartSociety.purposeOfVisit')} *
          </Text>
          <View style={AddVisitorEntryStyles.chipsContainer}>
            {purposes.map(purp => (
              <TouchableOpacity
                key={purp.key}
                style={[
                  AddVisitorEntryStyles.chip,
                  purpose === purp.key && AddVisitorEntryStyles.chipActive,
                ]}
                onPress={() => setPurpose(purp.key)}
              >
                <Text
                  style={[
                    AddVisitorEntryStyles.chipText,
                    purpose === purp.key &&
                      AddVisitorEntryStyles.chipTextActive,
                  ]}
                >
                  {purp.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={AddVisitorEntryStyles.section}>
          <TouchableOpacity
            style={AddVisitorEntryStyles.checkboxContainer}
            onPress={() => setIsPreApproved(!isPreApproved)}
          >
            <View
              style={[
                AddVisitorEntryStyles.checkbox,
                isPreApproved && AddVisitorEntryStyles.checkboxChecked,
              ]}
            >
              {isPreApproved && (
                <Text style={AddVisitorEntryStyles.checkmark}>✓</Text>
              )}
            </View>
            <Text style={AddVisitorEntryStyles.checkboxLabel}>
              {t('smartSociety.preApproveVisitor')}
            </Text>
          </TouchableOpacity>
        </View>

        {isPreApproved && (
          <>
            <View style={AddVisitorEntryStyles.section}>
              <Text style={AddVisitorEntryStyles.label}>
                {t('smartSociety.expectedDate')}
              </Text>
              <TouchableOpacity
                style={AddVisitorEntryStyles.input}
                onPress={handleDatePicker}
              >
                <Text
                  style={[
                    AddVisitorEntryStyles.inputText,
                    !expectedDate && AddVisitorEntryStyles.placeholderText,
                  ]}
                >
                  {expectedDate
                    ? moment(expectedDate).format('DD/MM/YYYY')
                    : t('smartSociety.selectExpectedDate')}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={AddVisitorEntryStyles.section}>
              <Text style={AddVisitorEntryStyles.label}>
                {t('smartSociety.expectedTime')}
              </Text>
              <TouchableOpacity
                style={AddVisitorEntryStyles.input}
                onPress={handleTimePicker}
              >
                <Text
                  style={[
                    AddVisitorEntryStyles.inputText,
                    !expectedTime && AddVisitorEntryStyles.placeholderText,
                  ]}
                >
                  {expectedTime
                    ? moment(expectedTime).format('HH:mm')
                    : t('smartSociety.selectExpectedTime')}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        <View style={AddVisitorEntryStyles.submitButton}>
          <CustomButton
            title={
              isSubmitting
                ? t('common.submitting')
                : isPreApproved
                ? t('smartSociety.preApproveVisitorButton')
                : t('smartSociety.addVisitorEntry')
            }
            onPress={handleSubmit}
            disabled={isSubmitting}
            loading={isSubmitting}
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

      {/* Time Picker */}
      <DatePicker
        modal
        open={showTimePicker}
        date={expectedTime || new Date()}
        mode="time"
        onConfirm={time => {
          setExpectedTime(time);
          setShowTimePicker(false);
        }}
        onCancel={() => {
          setShowTimePicker(false);
        }}
        title={t('smartSociety.selectTime')}
        confirmText={t('common.confirm')}
        cancelText={t('common.cancel')}
      />

      {/* QR Code Modal */}
      <Modal
        visible={showQRModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseQRModal}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.WHITE,
              borderRadius: 20,
              padding: 24,
              width: '85%',
              maxWidth: 400,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                color: COLORS.BLACK_TEXT,
                marginBottom: 16,
                textAlign: 'center',
              }}
            >
              {t('smartSociety.visitorEntryQRCode')}
            </Text>

            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              {qrData ? (
                <QRCode
                  value={qrData}
                  size={250}
                  color={COLORS.BLACK_TEXT}
                  backgroundColor={COLORS.WHITE}
                  logo={undefined}
                />
              ) : (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 250,
                    width: 250,
                  }}
                >
                  <ActivityIndicator
                    size="large"
                    color={COLORS.OCEAN_BLUE_TEXT}
                  />
                  <Text style={{ marginTop: 10, color: COLORS.GREY_TEXT }}>
                    {t('common.loading')}
                  </Text>
                </View>
              )}
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.GREY_TEXT,
                  textAlign: 'center',
                  marginBottom: 8,
                }}
              >
                {t('smartSociety.visitorName')}: {visitorName}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.GREY_TEXT,
                  textAlign: 'center',
                  marginBottom: 8,
                }}
              >
                {t('smartSociety.flatNumber')}: {flatNo}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.GREY_TEXT,
                  textAlign: 'center',
                }}
              >
                {t('smartSociety.purposeOfVisit')}: {purpose}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', gap: 12 }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: COLORS.LIGHT_GRAY,
                  padding: 15,
                  borderRadius: 8,
                }}
                onPress={handleShareQR}
              >
                <Text
                  style={{
                    color: COLORS.BLACK_TEXT,
                    textAlign: 'center',
                    fontSize: 16,
                    fontWeight: '600',
                  }}
                >
                  {t('common.share')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: COLORS.OCEAN_BLUE_TEXT,
                  padding: 15,
                  borderRadius: 8,
                }}
                onPress={handleCloseQRModal}
              >
                <Text
                  style={{
                    color: COLORS.WHITE,
                    textAlign: 'center',
                    fontSize: 16,
                    fontWeight: '600',
                  }}
                >
                  {t('common.done')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Container>
  );
};

export default ResidentAddVisitorEntry;
