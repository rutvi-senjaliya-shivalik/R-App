import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
  PermissionsAndroid,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { Container, HeaderComponent, InputField, CustomButton, Dropdowns } from '../../components/common';
import ImagePicker from 'react-native-image-crop-picker';
import { AddVisitorStyles } from './styles';
import { COLORS, FF, FS, IMAGES } from '../../constants';
import { useTranslation } from '../../context/LanguageContext';
import { useDispatch, useSelector } from 'react-redux';
import { addVisitorAction, VisitorPayload } from '../../store/actions/smartSociety/addVisitorEntryAction';
import PrefManager from '../../utils/prefManager';
import { STRING } from '../../constants';
import { getUserIdFromToken, getBuildingIdFromToken } from '../../utils/tokenHelper';
import { VISITOR_STATUS } from '../../constants/visitorStatus';

const AddVisitor = (props: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isMountedRef = useRef(true);
  const visitorEntryState = useSelector((state: any) => state.addVisitorEntry);
  
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
    visitorName: '',
    phoneNumber: '',
    flatNumber: '',
    purpose: '',
    vehicleNumber: '',
    numberOfVisitors: '',
  });

  const [errors, setErrors] = useState<any>({});
  const [visitorImage, setVisitorImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (visitorEntryState && !visitorEntryState.loading) {
      if (visitorEntryState.data && !visitorEntryState.error) {
        Alert.alert(
          t('common.success') || 'Success',
          t('smartSociety.visitorEntryRecordedSuccessfully') || 'Visitor entry recorded successfully',
          [
            {
              text: t('common.ok') || 'OK',
              onPress: () => {
                props.navigation?.goBack();
              },
            },
          ],
        );
      } else if (visitorEntryState.error) {
        let errorMessage = t('smartSociety.failedToRecordVisitorEntry') || 'Failed to record visitor entry. Please try again.';
        
        if (visitorEntryState.error?.isNetworkError) {
          errorMessage = t('smartSociety.networkError') || 'Network error. Please check your internet connection.';
        } else if (visitorEntryState.error?.response?.data?.message) {
          errorMessage = visitorEntryState.error.response.data.message;
        } else if (visitorEntryState.error?.message) {
          errorMessage = visitorEntryState.error.message;
        }
        
        Alert.alert(
          t('common.error') || 'Error',
          errorMessage,
        );
      }
    }
  }, [visitorEntryState]);

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
            message: t('common.cameraPermissionMessage'),
            buttonPositive: t('common.ok'),
            buttonNegative: t('common.cancel'),
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          Alert.alert(
            t('common.permissionRequired'),
            t('common.cameraPermissionMessage'),
            [
              { text: t('common.cancel'), style: 'cancel' },
              {
                text: t('common.openSettings'),
                onPress: () => {
                  try {
                    Linking.openSettings();
                  } catch (error) {
                    Alert.alert(t('common.error'), t('common.unableToOpenSettings'));
                  }
                },
              },
            ]
          );
          return false;
        } else {
          Alert.alert(
            t('common.permissionDenied'),
            t('common.cameraPermissionDenied'),
            [{ text: t('common.ok') }]
          );
          return false;
        }
      } else {
        // iOS - permission will be requested when opening camera
        return true;
      }
    } catch (error) {
      console.error('Error in takeCameraPermission:', error);
      Alert.alert(t('common.error'), t('common.somethingWentWrongPermissions'));
      return false;
    }
  };

  // Handle camera capture
  const handleCameraCapture = async () => {
    try {
      const hasPermission = await takeCameraPermission();
      if (!hasPermission) {
        return;
      }

      const cameraOptions = {
        width: 300,
        height: 400,
        cropping: true,
        compressImageQuality: 0.8,
      };

      ImagePicker.openCamera(cameraOptions)
        .then(image => {
          setVisitorImage(image.path);
          console.log('Visitor image captured:', image.path);
        })
        .catch(error => {
          if (error.message !== 'User cancelled image picker') {
            if (error.code === 'camera_unavailable') {
              Alert.alert(t('common.cameraUnavailable'), t('common.cameraNotAvailable'));
            } else if (error.code === 'permission') {
              Alert.alert(
                t('common.permissionDenied'),
                t('common.cameraPermissionDenied')
              );
            } else {
              Alert.alert(t('common.error'), t('common.failedToCaptureImage'));
            }
          }
        });
    } catch (error) {
      console.error('Error in handleCameraCapture:', error);
      Alert.alert(t('common.error'), t('common.somethingWentWrongCamera'));
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!visitorImage) {
      newErrors.visitorImage = t('smartSociety.visitorPhotoRequired');
    }

    if (!formData.visitorName.trim()) {
      newErrors.visitorName = t('smartSociety.visitorNameRequired');
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = t('smartSociety.phoneNumberRequired');
    } else if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = t('smartSociety.pleaseEnterValidPhoneNumber');
    }

    if (!formData.flatNumber.trim()) {
      newErrors.flatNumber = t('smartSociety.flatNumberRequired');
    }

    if (!formData.purpose.trim()) {
      newErrors.purpose = t('smartSociety.purposeRequired');
    }

    if (formData.numberOfVisitors && isNaN(Number(formData.numberOfVisitors))) {
      newErrors.numberOfVisitors = t('smartSociety.pleaseEnterValidNumber');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getImageNameFromUri = (uri: string): string => {
    const parts = uri.split('/');
    return parts[parts.length - 1] || 'visitor_image.jpg';
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    if (!isMountedRef.current) return;

    try {
      setIsSubmitting(true);

      // Prepare visitor entry payload with FormData (including image)
      console.log('📤 Preparing visitor entry payload with FormData...');
      
      // Get token and extract userId and buildingId
      const token = await PrefManager.getValue(STRING.TOKEN);
      let cleanToken = token;
      if (token && typeof token === 'string' && token.startsWith('"') && token.endsWith('"')) {
        try {
          cleanToken = JSON.parse(token);
        } catch (e) {
          cleanToken = token;
        }
      }

      const userId = cleanToken ? getUserIdFromToken(cleanToken) : null;
      const buildingId = cleanToken ? getBuildingIdFromToken(cleanToken) : null;

      console.log('🔑 Extracted from token - userId:', userId, 'buildingId:', buildingId);
      
      // Create FormData for multipart/form-data submission (including image)
      const formDataPayload = new FormData();

      // Add all text fields
      formDataPayload.append('visitorName', formData.visitorName.trim());
      formDataPayload.append('visitorMobile', formData.phoneNumber.trim());
      formDataPayload.append('visitorCategory', 'Guest');
      formDataPayload.append('purposeOfVisit', formData.purpose.trim());
      formDataPayload.append('expectedDuration', JSON.stringify({ value: 2, unit: 'hours' }));
      formDataPayload.append('numberOfVisitors', (formData.numberOfVisitors && !isNaN(Number(formData.numberOfVisitors)) && Number(formData.numberOfVisitors) > 0
        ? Number(formData.numberOfVisitors)
        : 1).toString());
      
      if (formData.vehicleNumber && formData.vehicleNumber.trim()) {
        formDataPayload.append('vehicleDetails', JSON.stringify({
          vehicleNumber: formData.vehicleNumber.trim(),
          vehicleType: 'Car',
        }));
      } else {
        formDataPayload.append('vehicleDetails', JSON.stringify({}));
      }

      // Add idProof with image file if available
      if (visitorImage) {
        // For React Native FormData, keep the file:// prefix or use the path directly
        // React Native FormData handles file:// URIs correctly
        let imageUri = visitorImage;
        
        // Ensure we have the correct URI format
        if (!imageUri.startsWith('file://') && !imageUri.startsWith('content://')) {
          imageUri = `file://${imageUri}`;
        }

        const imageData = {
          uri: imageUri,
          type: 'image/jpeg',
          name: getImageNameFromUri(visitorImage),
        };

        console.log('📷 Image data prepared:', {
          uri: imageUri.substring(0, 50) + '...',
          type: imageData.type,
          name: imageData.name,
        });

        // Append image file to idProof.image
        formDataPayload.append('idProof[image]', imageData as any);
        formDataPayload.append('idProof[type]', 'Aadhar');
        console.log('✅ Image added to FormData as idProof[image]');
      } else {
        formDataPayload.append('idProof', JSON.stringify({}));
      }

      formDataPayload.append('notes', '');
      formDataPayload.append('visitorStatus', VISITOR_STATUS.PENDING);
      
      if (userId) {
        formDataPayload.append('createdBy', userId);
      }
      if (buildingId) {
        formDataPayload.append('buildingId', buildingId);
      }

      console.log('📤 STEP 2: Submitting visitor entry with FormData (including image in idProof)...');
      console.log('📤 FormData fields:', {
        visitorName: formData.visitorName.trim(),
        visitorMobile: formData.phoneNumber.trim(),
        visitorCategory: 'Guest',
        hasImage: !!visitorImage,
      });

      // Submit visitor entry with FormData
      await dispatch(addVisitorAction(formDataPayload, true) as any);
      
      console.log('✅ STEP 2 COMPLETE: Visitor entry submitted successfully');
    } catch (error: any) {
      console.error('❌ Error in visitor entry submission:', error);
      console.error('Error details:', {
        message: error?.message,
        code: error?.code,
        response: error?.response?.data,
        status: error?.response?.status,
        isNetworkError: error?.isNetworkError,
      });
      
      if (isMountedRef.current) {
        let errorMessage = t('smartSociety.failedToRecordVisitorEntry') || 'Failed to record visitor entry. Please try again.';
        
        // Better network error detection
        if (error?.isNetworkError || error?.code === 'ERR_NETWORK' || error?.message === 'Network Error') {
          errorMessage = t('smartSociety.networkError') || 'Network error. Please check your internet connection and try again.';
        } else if (error?.response?.status === 401) {
          errorMessage = t('smartSociety.unauthorizedError') || 'Unauthorized. Please login again.';
        } else if (error?.response?.status === 400) {
          errorMessage = error?.response?.data?.message || t('smartSociety.invalidData') || 'Invalid data. Please check your input.';
        } else if (error?.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error?.message) {
          errorMessage = error.message;
        }
        
        Alert.alert(
          t('common.error') || 'Error',
          errorMessage,
          [{ text: t('common.ok') || 'OK' }],
        );
      }
    } finally {
      if (isMountedRef.current) {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Container>
      <HeaderComponent
        Title={t('smartSociety.addVisitorEntry')}
        onPress={() => props.navigation?.goBack()}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={AddVisitorStyles.container}
          contentContainerStyle={AddVisitorStyles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
        

          {/* Basic Information Card */}
          <View style={AddVisitorStyles.card}>
            <View style={AddVisitorStyles.cardHeader}>
              <Text style={AddVisitorStyles.cardTitle}>{t('smartSociety.basicInformation')}</Text>
            </View>
            <View style={AddVisitorStyles.cardContent}>
              {/* Visitor Image Section */}
              <View style={AddVisitorStyles.inputWrapper}>
                <Text style={AddVisitorStyles.label}>
                  {t('smartSociety.visitorPhoto')} <Text style={AddVisitorStyles.required}>*</Text>
                </Text>
                <View style={AddVisitorStyles.imageSection}>
                  {visitorImage ? (
                    <View style={AddVisitorStyles.imageContainer}>
                      <Image
                        source={{ uri: visitorImage }}
                        style={AddVisitorStyles.visitorImage}
                      />
                      <TouchableOpacity
                        style={AddVisitorStyles.removeImageButton}
                        onPress={() => setVisitorImage(null)}
                      >
                        <Text style={AddVisitorStyles.removeImageText}>✕</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={AddVisitorStyles.captureImageButton}
                      onPress={handleCameraCapture}
                      activeOpacity={0.7}
                    >
                      <Image
                        source={IMAGES.CAMERA}
                        style={AddVisitorStyles.cameraIcon}
                      />
                      <Text style={AddVisitorStyles.captureImageText}>
                        {t('common.capturePhoto')}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
                {errors.visitorImage && (
                  <Text style={AddVisitorStyles.errorText}>
                    {errors.visitorImage}
                  </Text>
                )}
              </View>

              <View style={AddVisitorStyles.inputWrapper}>
                <Text style={AddVisitorStyles.label}>
                  {t('smartSociety.visitorName')} <Text style={AddVisitorStyles.required}>*</Text>
                </Text>
                <View style={AddVisitorStyles.inputContainer}>
                  <InputField
                    placeholder={t('smartSociety.enterVisitorName')}
                    value={formData.visitorName}
                    onChangeText={(text) => updateField('visitorName', text)}
                    error={errors.visitorName}
                  />
                </View>
              </View>

              <View style={AddVisitorStyles.inputWrapper}>
                <Text style={AddVisitorStyles.label}>
                  {t('smartSociety.phoneNumber')} <Text style={AddVisitorStyles.required}>*</Text>
                </Text>
                <View style={AddVisitorStyles.inputContainer}>
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

              <View style={AddVisitorStyles.inputWrapper}>
                <Text style={AddVisitorStyles.label}>{t('smartSociety.numberOfVisitors')}</Text>
                <View style={AddVisitorStyles.inputContainer}>
                  <InputField
                    placeholder={t('smartSociety.enterNumberOfVisitors')}
                    value={formData.numberOfVisitors}
                    onChangeText={(text) => updateField('numberOfVisitors', text)}
                    keyboardType="numeric"
                    error={errors.numberOfVisitors}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Visit Details Card */}
          <View style={AddVisitorStyles.card}>
            <View style={AddVisitorStyles.cardHeader}>
              <Text style={AddVisitorStyles.cardTitle}>{t('smartSociety.visitDetails')}</Text>
            </View>
            <View style={AddVisitorStyles.cardContent}>
              <View style={AddVisitorStyles.inputWrapper}>
                <Text style={AddVisitorStyles.label}>
                  {t('smartSociety.flatUnitNumber')} <Text style={AddVisitorStyles.required}>*</Text>
                </Text>
                <View style={AddVisitorStyles.inputContainer}>
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
                  <Text style={AddVisitorStyles.errorText}>
                    {errors.flatNumber}
                  </Text>
                )}
              </View>

              <View style={[AddVisitorStyles.inputWrapper, AddVisitorStyles.inputWrapperLast]}>
                <Text style={AddVisitorStyles.label}>
                  {t('smartSociety.purposeOfVisit')} <Text style={AddVisitorStyles.required}>*</Text>
                </Text>
                <View style={AddVisitorStyles.inputContainer}>
                  <InputField
                    placeholder={t('smartSociety.enterPurposeOfVisit')}
                    value={formData.purpose}
                    onChangeText={(text) => updateField('purpose', text)}
                    multiline
                    numberOfLines={1}
                    error={errors.purpose}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Additional Information Card */}
          <View style={AddVisitorStyles.card}>
            <View style={AddVisitorStyles.cardHeader}>
              <Text style={AddVisitorStyles.cardTitle}>{t('smartSociety.additionalInformation')}</Text>
            </View>
            <View style={AddVisitorStyles.cardContent}>
              <View style={AddVisitorStyles.inputWrapper}>
                <Text style={AddVisitorStyles.label}>{t('smartSociety.vehicleNumber')}</Text>
                <View style={AddVisitorStyles.inputContainer}>
                  <InputField
                    placeholder={t('smartSociety.enterVehicleNumberIfApplicable')}
                    value={formData.vehicleNumber}
                    onChangeText={(text) => updateField('vehicleNumber', text)}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={AddVisitorStyles.buttonContainer}>
            {isSubmitting ? (
              <View style={{ padding: 16, alignItems: 'center' }}>
                <ActivityIndicator size="large" color={COLORS.DARK_BLUE} />
              </View>
            ) : (
              <CustomButton
                title={t('smartSociety.submitVisitorEntry')}
                onPress={handleSubmit}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default AddVisitor;

