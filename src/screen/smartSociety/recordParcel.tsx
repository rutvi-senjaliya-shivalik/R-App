import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { Container, HeaderComponent, InputField, CustomButton, Dropdowns } from '../../components/common';
import ImagePicker from 'react-native-image-crop-picker';
import { RecordParcelStyles } from './styles';
import { COLORS, FF, FS, IMAGES, LH } from '../../constants';
import { useTranslation } from '../../context/LanguageContext';

const RecordParcel = (props: any) => {
  const { t } = useTranslation();
  // Generate flat numbers (A-101 to A-120, B-101 to B-120, C-101 to C-120, etc.)
  const generateFlatNumbers = () => {
    const flats = [];
    const blocks = ['A', 'B', 'C', 'D', 'E'];
    blocks.forEach(block => {
      for (let i = 101; i <= 120; i++) {
        flats.push({ label: `${block}-${i}`, value: `${block}-${i}` });
      }
    });
    return flats;
  };

  const flatNumbers = generateFlatNumbers();

  const [formData, setFormData] = useState({
    recipientName: '',
    phoneNumber: '',
    flatNumber: '',
    courierName: '',
    trackingNumber: '',
    deliveryTime: '',
    notes: '',
  });

  const [errors, setErrors] = useState<any>({});
  const [parcelImage, setParcelImage] = useState<string | null>(null);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: '' }));
    }
  };

  // Camera permission handling
  const takeCameraPermission = async (): Promise<boolean> => {
    try {
      if (Platform.OS === 'android') {
        const { PermissionsAndroid } = require('react-native');
        const hasPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );

        if (hasPermission) {
          return true;
        }

        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: t('common.cameraPermission'),
            message: t('smartSociety.cameraPermissionForParcelPhotos'),
            buttonPositive: t('common.ok'),
            buttonNegative: t('common.cancel'),
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else {
          Alert.alert(
            'Permission Denied',
            'Camera permission is required to capture photos. Please grant permission to continue.',
            [{ text: 'OK' }]
          );
          return false;
        }
      } else {
        // iOS - permission will be requested when opening camera
        return true;
      }
    } catch (error) {
      console.error('Error in takeCameraPermission:', error);
      Alert.alert('Error', 'Something went wrong while checking camera permissions.');
      return false;
    }
  };

  // Check storage permission for gallery access
  const checkStoragePermission = async (): Promise<boolean> => {
    try {
      if (Platform.OS === 'android') {
        const { PermissionsAndroid } = require('react-native');
        const hasPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );

        if (hasPermission) {
          return true;
        }

        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: t('common.storagePermission'),
            message: t('smartSociety.storagePermissionForParcelPhotos'),
            buttonPositive: t('common.ok'),
            buttonNegative: t('common.cancel'),
          }
        );

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        return true;
      }
    } catch (error) {
      console.error('Error in checkStoragePermission:', error);
      return false;
    }
  };

  // Handle camera capture
  const handleCameraPress = async () => {
    try {
      const hasPermission = await takeCameraPermission();
      if (!hasPermission) {
        return;
      }

      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        compressImageQuality: 0.8,
      });

      setParcelImage(image.path);
    } catch (error: any) {
      if (error.message !== 'User cancelled image picker') {
        Alert.alert('Error', 'Failed to capture image. Please try again.');
      }
    }
  };

  // Handle gallery selection
  const handleGalleryPress = async () => {
    try {
      const hasPermission = await checkStoragePermission();
      if (!hasPermission) {
        Alert.alert(
          t('common.permissionDenied'),
          t('smartSociety.storagePermissionRequiredForParcelPhotos'),
          [{ text: t('common.ok') }]
        );
        return;
      }

      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        compressImageQuality: 0.8,
      });

      setParcelImage(image.path);
    } catch (error: any) {
      if (error.message !== 'User cancelled image picker') {
        Alert.alert('Error', 'Failed to select image. Please try again.');
      }
    }
  };

  // Remove image
  const handleRemoveImage = () => {
    setParcelImage(null);
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.recipientName.trim()) {
      newErrors.recipientName = t('smartSociety.recipientNameRequired');
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = t('smartSociety.phoneNumberRequired');
    } else if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = t('smartSociety.pleaseEnterValidPhoneNumber');
    }

    if (!formData.flatNumber.trim()) {
      newErrors.flatNumber = t('smartSociety.flatUnitNumberRequired');
    }

    if (!formData.courierName.trim()) {
      newErrors.courierName = t('smartSociety.courierNameRequired');
    }

    if (!formData.trackingNumber.trim()) {
      newErrors.trackingNumber = t('smartSociety.trackingNumberRequired');
    }

    if (!formData.deliveryTime.trim()) {
      newErrors.deliveryTime = t('smartSociety.deliveryTimeRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Here you would typically make an API call to save the parcel record
      const parcelData = {
        ...formData,
        image: parcelImage,
      };
      console.log('Parcel Record Data:', parcelData);
      Alert.alert(
        t('common.success'),
        t('smartSociety.parcelRecordSavedSuccessfully'),
        [
          {
            text: t('common.ok'),
            onPress: () => props.navigation?.goBack(),
          },
        ],
      );
    }
  };

  return (
    <Container>
      <HeaderComponent
        Title={t('smartSociety.recordParcel')}
        onPress={() => props.navigation?.goBack()}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={RecordParcelStyles.container}
          contentContainerStyle={RecordParcelStyles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Parcel Image Section */}
          <View style={RecordParcelStyles.card}>
            <View style={RecordParcelStyles.cardHeader}>
              <Text style={RecordParcelStyles.cardTitle}>{t('smartSociety.parcelImage')}</Text>
            </View>
            <View style={RecordParcelStyles.cardContent}>
              <View style={RecordParcelStyles.inputWrapper}>
                <Text style={RecordParcelStyles.label}>{t('smartSociety.uploadParcelImage')}</Text>
                {parcelImage ? (
                  <View style={RecordParcelStyles.imageContainer}>
                    <Image
                      source={{ uri: parcelImage }}
                      style={RecordParcelStyles.parcelImage}
                    />
                    <TouchableOpacity
                      style={RecordParcelStyles.removeImageButton}
                      onPress={handleRemoveImage}
                    >
                      <Text style={RecordParcelStyles.removeImageText}>✕</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={RecordParcelStyles.imageButtonsContainer}>
                    <TouchableOpacity
                      style={[RecordParcelStyles.addImageButton, { marginRight: 6 }]}
                      onPress={handleCameraPress}
                      activeOpacity={0.7}
                    >
                      <Image
                        source={IMAGES.CAMERA}
                        style={RecordParcelStyles.addImageIcon}
                      />
                      <Text style={RecordParcelStyles.addImageText}>{t('common.camera')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[RecordParcelStyles.addImageButton, { marginLeft: 6 }]}
                      onPress={handleGalleryPress}
                      activeOpacity={0.7}
                    >
                      <Image
                        source={IMAGES.CAMERA}
                        style={RecordParcelStyles.addImageIcon}
                      />
                      <Text style={RecordParcelStyles.addImageText}>{t('common.gallery')}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* Recipient Information Card */}
          <View style={RecordParcelStyles.card}>
            <View style={RecordParcelStyles.cardHeader}>
              <Text style={RecordParcelStyles.cardTitle}>{t('smartSociety.recipientInformation')}</Text>
            </View>
            <View style={RecordParcelStyles.cardContent}>
              <View style={RecordParcelStyles.inputWrapper}>
                <Text style={RecordParcelStyles.label}>
                  {t('smartSociety.recipientName')} <Text style={RecordParcelStyles.required}>*</Text>
                </Text>
                <View style={RecordParcelStyles.inputContainer}>
                  <InputField
                    placeholder={t('smartSociety.enterRecipientName')}
                    value={formData.recipientName}
                    onChangeText={(text) => updateField('recipientName', text)}
                    error={errors.recipientName}
                  />
                </View>
              </View>

              <View style={RecordParcelStyles.inputWrapper}>
                <Text style={RecordParcelStyles.label}>
                  {t('smartSociety.phoneNumber')} <Text style={RecordParcelStyles.required}>*</Text>
                </Text>
                <View style={RecordParcelStyles.inputContainer}>
                  <InputField
                    placeholder={t('smartSociety.enterPhoneNumber')}
                    value={formData.phoneNumber}
                    onChangeText={(text) => updateField('phoneNumber', text)}
                    keyboardType="phone-pad"
                    maxLength={10}
                    error={errors.phoneNumber}
                  />
                </View>
              </View>

              <View style={RecordParcelStyles.inputWrapper}>
                <Text style={RecordParcelStyles.label}>
                  {t('smartSociety.flatUnitNumber')} <Text style={RecordParcelStyles.required}>*</Text>
                </Text>
                <View style={RecordParcelStyles.inputContainer}>
                  <Dropdowns
                    data={flatNumbers}
                    value={formData.flatNumber}
                    placeholder={t('smartSociety.selectFlatUnitNumber')}
                    onChange={(value) => updateField('flatNumber', value)}
                    error={errors.flatNumber}
                    search={true}
                    searchPlaceholder={t('smartSociety.searchFlatUnitNumber')}
                  />
                </View>
                {errors.flatNumber && (
                  <Text style={RecordParcelStyles.errorText}>
                    {errors.flatNumber}
                  </Text>
                )}
              </View>
            </View>
          </View>

          {/* Delivery Details Card */}
          <View style={RecordParcelStyles.card}>
            <View style={RecordParcelStyles.cardHeader}>
              <Text style={RecordParcelStyles.cardTitle}>{t('smartSociety.deliveryDetails')}</Text>
            </View>
            <View style={RecordParcelStyles.cardContent}>
              <View style={RecordParcelStyles.inputWrapper}>
                <Text style={RecordParcelStyles.label}>
                  {t('smartSociety.courierName')} <Text style={RecordParcelStyles.required}>*</Text>
                </Text>
                <View style={RecordParcelStyles.inputContainer}>
                  <InputField
                    placeholder={t('smartSociety.enterCourierName')}
                    value={formData.courierName}
                    onChangeText={(text) => updateField('courierName', text)}
                    error={errors.courierName}
                  />
                </View>
              </View>

              <View style={RecordParcelStyles.inputWrapper}>
                <Text style={RecordParcelStyles.label}>
                  {t('smartSociety.trackingNumber')} <Text style={RecordParcelStyles.required}>*</Text>
                </Text>
                <View style={RecordParcelStyles.inputContainer}>
                  <InputField
                    placeholder={t('smartSociety.enterTrackingNumber')}
                    value={formData.trackingNumber}
                    onChangeText={(text) => updateField('trackingNumber', text)}
                    error={errors.trackingNumber}
                  />
                </View>
              </View>

              <View style={RecordParcelStyles.inputWrapper}>
                <Text style={RecordParcelStyles.label}>
                  {t('smartSociety.deliveryTime')} <Text style={RecordParcelStyles.required}>*</Text>
                </Text>
                <View style={RecordParcelStyles.inputContainer}>
                  <InputField
                    placeholder={t('smartSociety.enterDeliveryTime')}
                    value={formData.deliveryTime}
                    onChangeText={(text) => updateField('deliveryTime', text)}
                    error={errors.deliveryTime}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Additional Information Card */}
          <View style={RecordParcelStyles.card}>
            <View style={RecordParcelStyles.cardHeader}>
              <Text style={RecordParcelStyles.cardTitle}>{t('smartSociety.additionalInformation')}</Text>
            </View>
            <View style={RecordParcelStyles.cardContent}>
              <View style={[RecordParcelStyles.inputWrapper, RecordParcelStyles.inputWrapperLast]}>
                <Text style={RecordParcelStyles.label}>{t('smartSociety.notes')}</Text>
                <View style={RecordParcelStyles.inputContainer}>
                  <InputField
                    placeholder={t('smartSociety.enterAdditionalNotesOptional')}
                    value={formData.notes}
                    onChangeText={(text) => updateField('notes', text)}
                    multiline
                    numberOfLines={4}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={RecordParcelStyles.buttonContainer}>
            <CustomButton
              title={t('smartSociety.recordParcel')}
              onPress={handleSubmit}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default RecordParcel;
