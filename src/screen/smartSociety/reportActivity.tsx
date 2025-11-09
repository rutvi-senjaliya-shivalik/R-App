import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import { Container, HeaderComponent, InputField, CustomButton, ImagePickerModal } from '../../components/common';
import ImagePicker from 'react-native-image-crop-picker';
import { ReportActivityStyles } from './styles';
import { COLORS, FF, FS, IMAGES } from '../../constants';
import { useTranslation } from '../../context/LanguageContext';

const ReportActivity = (props: any) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    activityType: '',
    location: '',
    description: '',
    time: '',
    peopleInvolved: '',
    additionalNotes: '',
  });

  const [errors, setErrors] = useState<any>({});
  const [activityImages, setActivityImages] = useState<string[]>([]);
  const [isImagePickerVisible, setIsImagePickerVisible] = useState(false);

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
            message: t('smartSociety.cameraPermissionForActivityReports'),
            buttonPositive: t('common.ok'),
            buttonNegative: t('common.cancel'),
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          Alert.alert(
            'Permission Required',
            'This app requires access to your Camera to capture photos.\n\nPlease grant camera permission in Settings to continue.',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Open Settings',
                onPress: () => {
                  try {
                    Linking.openSettings();
                  } catch (error) {
                    Alert.alert('Error', 'Unable to open settings. Please manually enable camera permission.');
                  }
                },
              },
            ]
          );
          return false;
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
    if (Platform.OS === 'android') {
      try {
        // For Android 13+ (API 33+), we don't need storage permissions for media access
        if (Platform.Version >= 33) {
          return true;
        }

        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: t('common.storagePermission'),
            message: t('smartSociety.storagePermissionForActivityReports'),
            buttonPositive: t('common.ok'),
            buttonNegative: t('common.cancel'),
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Storage permission error:', err);
        return false;
      }
    }
    return true; // iOS handles permissions automatically
  };

  // Handle camera capture
  const handleCameraPress = async () => {
    try {
      setIsImagePickerVisible(false);
      const hasPermission = await takeCameraPermission();
      if (!hasPermission) {
        return;
      }

      const cameraOptions = {
        width: 800,
        height: 600,
        cropping: false,
        compressImageQuality: 0.8,
      };

      ImagePicker.openCamera(cameraOptions)
        .then(image => {
          setActivityImages(prev => [...prev, image.path]);
          console.log('Activity image captured:', image.path);
        })
        .catch(error => {
          if (error.message !== 'User cancelled image picker') {
            if (error.code === 'camera_unavailable') {
              Alert.alert('Camera Unavailable', 'Camera is not available on this device.');
            } else if (error.code === 'permission') {
              Alert.alert(
                'Permission Denied',
                'Camera permission was denied. Please enable it in settings.'
              );
            } else {
              Alert.alert('Error', 'Failed to capture image. Please try again.');
            }
          }
        });
    } catch (error) {
      console.error('Error in handleCameraPress:', error);
      Alert.alert('Error', 'Something went wrong while opening the camera.');
    }
  };

  // Handle gallery selection
  const handleGalleryPress = async () => {
    try {
      setIsImagePickerVisible(false);
      const hasPermission = await checkStoragePermission();

      if (!hasPermission) {
        Alert.alert(
          t('common.storagePermissionRequired'),
          t('smartSociety.storagePermissionRequiredForActivityReports'),
          [{ text: t('common.ok') }]
        );
        return;
      }

      ImagePicker.openPicker({
        width: 800,
        height: 600,
        cropping: false,
        compressImageQuality: 0.8,
        multiple: true,
        maxFiles: 5,
      })
        .then(images => {
          const imagePaths = images.map((img: any) => img.path);
          setActivityImages(prev => [...prev, ...imagePaths]);
          console.log('Activity images selected:', imagePaths);
        })
        .catch(error => {
          if (error.message !== 'User cancelled image picker') {
            Alert.alert(t('common.error'), t('smartSociety.failedToSelectImages'));
          }
        });
    } catch (error) {
      console.error('Error in handleGalleryPress:', error);
      Alert.alert(t('common.error'), t('smartSociety.somethingWentWrongGallery'));
    }
  };

  // Remove image
  const handleRemoveImage = (index: number) => {
    setActivityImages(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.activityType.trim()) {
      newErrors.activityType = t('smartSociety.activityTypeRequired');
    }

    if (!formData.location.trim()) {
      newErrors.location = t('smartSociety.locationRequired');
    }

    if (!formData.description.trim()) {
      newErrors.description = t('smartSociety.descriptionRequired');
    }

    if (!formData.time.trim()) {
      newErrors.time = t('smartSociety.timeRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Here you would typically make an API call to report the activity
      const reportData = {
        ...formData,
        images: activityImages,
      };
      console.log('Report Activity Data:', reportData);
      Alert.alert(
        t('smartSociety.reportSubmitted'),
        t('smartSociety.activityReportSubmittedSuccessfully'),
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
        Title={t('smartSociety.reportActivity')}
        onPress={() => props.navigation?.goBack()}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={ReportActivityStyles.container}
          contentContainerStyle={ReportActivityStyles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
         

          {/* Images Card */}
          <View style={ReportActivityStyles.card}>
            <View style={ReportActivityStyles.cardHeader}>
              <Text style={ReportActivityStyles.cardTitle}>{t('smartSociety.activityImages')}</Text>
            </View>
            <View style={ReportActivityStyles.cardContent}>
              <View style={ReportActivityStyles.inputWrapper}>
                <Text style={ReportActivityStyles.label}>
                  {t('smartSociety.uploadImages')}
                </Text>
                <TouchableOpacity
                  style={ReportActivityStyles.addImageButton}
                  onPress={() => setIsImagePickerVisible(true)}
                  activeOpacity={0.7}
                >
                  <Image
                    source={IMAGES.CAMERA}
                    style={ReportActivityStyles.addImageIcon}
                  />
                  <Text style={ReportActivityStyles.addImageText}>
                    {t('common.addPhoto')}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Display Images */}
              {activityImages.length > 0 && (
                <View style={ReportActivityStyles.imagesContainer}>
                  {activityImages.map((imageUri, index) => (
                    <View key={index} style={ReportActivityStyles.imageItem}>
                      <Image
                        source={{ uri: imageUri }}
                        style={ReportActivityStyles.activityImage}
                      />
                      <TouchableOpacity
                        style={ReportActivityStyles.removeImageButton}
                        onPress={() => handleRemoveImage(index)}
                      >
                        <Text style={ReportActivityStyles.removeImageText}>✕</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>

          {/* Activity Details Card */}
          <View style={ReportActivityStyles.card}>
            <View style={ReportActivityStyles.cardHeader}>
              <Text style={ReportActivityStyles.cardTitle}>{t('smartSociety.activityDetails')}</Text>
            </View>
            <View style={ReportActivityStyles.cardContent}>
              <View style={ReportActivityStyles.inputWrapper}>
                <Text style={ReportActivityStyles.label}>
                  {t('smartSociety.activityType')} <Text style={ReportActivityStyles.required}>*</Text>
                </Text>
                <View style={ReportActivityStyles.inputContainer}>
                  <InputField
                    placeholder={t('smartSociety.activityTypePlaceholder')}
                    value={formData.activityType}
                    onChangeText={(text) => updateField('activityType', text)}
                    error={errors.activityType}
                  />
                </View>
              </View>

              <View style={ReportActivityStyles.inputWrapper}>
                <Text style={ReportActivityStyles.label}>
                  {t('smartSociety.location')} <Text style={ReportActivityStyles.required}>*</Text>
                </Text>
                <View style={ReportActivityStyles.inputContainer}>
                  <InputField
                    placeholder={t('smartSociety.locationPlaceholder')}
                    value={formData.location}
                    onChangeText={(text) => updateField('location', text)}
                    error={errors.location}
                  />
                </View>
              </View>

              <View style={ReportActivityStyles.inputWrapper}>
                <Text style={ReportActivityStyles.label}>
                  {t('smartSociety.time')} <Text style={ReportActivityStyles.required}>*</Text>
                </Text>
                <View style={ReportActivityStyles.inputContainer}>
                  <InputField
                    placeholder={t('smartSociety.timePlaceholder')}
                    value={formData.time}
                    onChangeText={(text) => updateField('time', text)}
                    error={errors.time}
                  />
                </View>
              </View>

              <View style={[ReportActivityStyles.inputWrapper, ReportActivityStyles.inputWrapperLast]}>
                <Text style={ReportActivityStyles.label}>{t('smartSociety.peopleInvolved')}</Text>
                <View style={ReportActivityStyles.inputContainer}>
                  <InputField
                    placeholder={t('smartSociety.peopleInvolvedPlaceholder')}
                    value={formData.peopleInvolved}
                    onChangeText={(text) => updateField('peopleInvolved', text)}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Description Card */}
          <View style={ReportActivityStyles.card}>
            <View style={ReportActivityStyles.cardHeader}>
              <Text style={ReportActivityStyles.cardTitle}>{t('smartSociety.description')}</Text>
            </View>
            <View style={ReportActivityStyles.cardContent}>
              <View style={[ReportActivityStyles.inputWrapper, ReportActivityStyles.inputWrapperLast]}>
                <Text style={ReportActivityStyles.label}>
                  {t('smartSociety.detailedDescription')} <Text style={ReportActivityStyles.required}>*</Text>
                </Text>
                <View style={ReportActivityStyles.inputContainer}>
                  <InputField
                    placeholder={t('smartSociety.detailedDescriptionPlaceholder')}
                    value={formData.description}
                    onChangeText={(text) => updateField('description', text)}
                    multiline
                    numberOfLines={4}
                    error={errors.description}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Additional Information Card */}
          <View style={ReportActivityStyles.card}>
            <View style={ReportActivityStyles.cardHeader}>
              <Text style={ReportActivityStyles.cardTitle}>{t('smartSociety.additionalInformation')}</Text>
            </View>
            <View style={ReportActivityStyles.cardContent}>
              <View style={[ReportActivityStyles.inputWrapper, ReportActivityStyles.inputWrapperLast]}>
                <Text style={ReportActivityStyles.label}>{t('smartSociety.additionalNotes')}</Text>
                <View style={ReportActivityStyles.inputContainer}>
                  <InputField
                    placeholder={t('smartSociety.additionalNotesPlaceholder')}
                    value={formData.additionalNotes}
                    onChangeText={(text) => updateField('additionalNotes', text)}
                    multiline
                    numberOfLines={3}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={ReportActivityStyles.buttonContainer}>
            <CustomButton
              title={t('smartSociety.submitReport')}
              onPress={handleSubmit}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Image Picker Modal */}
      <ImagePickerModal
        isVisible={isImagePickerVisible}
        onClose={() => setIsImagePickerVisible(false)}
        onCameraPress={handleCameraPress}
        onGalleryPress={handleGalleryPress}
        title={t('smartSociety.addActivityImage')}
      />
    </Container>
  );
};

export default ReportActivity;

