import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Image,
  Platform,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import { Container, HeaderComponent, CustomButton, Dropdowns } from '../../../components/common';
import AddVisitorEntryStyles from './styles/addVisitorEntryStyles';
import { COLORS, IMAGES } from '../../../constants';
import { useTranslation } from '../../../context/LanguageContext';
import { useDispatch, useSelector } from 'react-redux';
import { addVisitorAction, VisitorPayload, addVisitorEntryClear } from '../../../store/actions/smartSociety/addVisitorEntryAction';
import PrefManager from '../../../utils/prefManager';
import { STRING } from '../../../constants';
import { getUserIdFromToken, getBuildingIdFromToken } from '../../../utils/tokenHelper';
import { VISITOR_STATUS } from '../../../constants/visitorStatus';
import ImagePicker from 'react-native-image-crop-picker';

const AddVisitorEntry = (props: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isMountedRef = useRef(true);
  const selectedRole = props.route?.params?.selectedRole;
  
  const [visitorName, setVisitorName] = useState<string>('');
  const [visitorPhone, setVisitorPhone] = useState<string>('');
  const [visitorEmail, setVisitorEmail] = useState<string>('');
  const [flatNo, setFlatNo] = useState<string>('');
  const [purpose, setPurpose] = useState<string>('');
  const [entryGate, setEntryGate] = useState<string>('Main Gate');
  const [entryType, setEntryType] = useState<string>('manual');
  const [company, setCompany] = useState<string>('');
  const [numberOfVisitors, setNumberOfVisitors] = useState<string>('1');
  const [vehicleNumber, setVehicleNumber] = useState<string>('');
  const [vehicleType, setVehicleType] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [visitorImage, setVisitorImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  // Error states for individual fields
  const [visitorNameError, setVisitorNameError] = useState<string>('');
  const [visitorPhoneError, setVisitorPhoneError] = useState<string>('');
  const [flatNoError, setFlatNoError] = useState<string>('');
  const [purposeError, setPurposeError] = useState<string>('');

  const visitorEntryState = useSelector((state: any) => state.addVisitorEntry);

  const purposes = ['Personal Visit', 'Delivery', 'Service', 'Other'];
  const entryGates = ['Main Gate', 'Side Gate', 'Back Gate'];
  const entryTypes = [
    { id: 'manual', label: 'Manual Entry' },
    { id: 'qr', label: 'QR Scan' },
    { id: 'preapproved', label: 'Pre-approved' },
  ];
  const vehicleTypes = ['Car', 'Motorcycle', 'Bicycle', 'Other'];

  // Generate flat numbers (A-101 to A-120, B-101 to B-120, C-101 to C-120, etc.)
  const generateFlatNumbers = () => {
    const flats = [];
    const blocks = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    blocks.forEach(block => {
      for (let i = 101; i <= 120; i++) {
        flats.push({ label: `${block}-${i}`, value: `${block}-${i}` });
      }
    });
    return flats;
  };

  const flatNumbers = generateFlatNumbers();

  const [hasClearedOnMount, setHasClearedOnMount] = useState(false);
  const [isInitialMount, setIsInitialMount] = useState(true);

  useEffect(() => {
    isMountedRef.current = true;
    
    // Clear any previous error/state when component mounts - do this immediately
    dispatch(addVisitorEntryClear());
    
    // Set hasClearedOnMount immediately
    setHasClearedOnMount(true);
    
    // Set a longer delay to ensure state is fully cleared before processing any errors
    const timer = setTimeout(() => {
      setIsInitialMount(false);
    }, 500);
    
    return () => {
      isMountedRef.current = false;
      setHasClearedOnMount(false);
      setIsInitialMount(true);
      clearTimeout(timer);
      // Clear state on unmount as well
      dispatch(addVisitorEntryClear());
    };
  }, []);

  useEffect(() => {
    // Don't process anything on initial mount or if we haven't cleared state yet
    if (isInitialMount || !hasClearedOnMount) {
      // Clear any stale errors silently during initial mount
      if (visitorEntryState?.error) {
        dispatch(addVisitorEntryClear());
      }
      return;
    }

    // Only show alerts if we're actually submitting (not on initial mount)
    // This ensures we don't show errors from previous navigation
    if (isSubmitting && visitorEntryState && !visitorEntryState.loading) {
      if (visitorEntryState.data && !visitorEntryState.error) {
        // Success case
        setIsSubmitting(false);
        Alert.alert(
          t('common.success') || 'Success',
          t('smartSociety.visitorEntryRecordedSuccessfully') || 'Visitor entry recorded successfully',
          [
            {
              text: t('common.ok') || 'OK',
              onPress: () => {
                // Clear state after navigation
                dispatch(addVisitorEntryClear());
                props.navigation?.goBack();
              },
            },
          ],
        );
      } else if (visitorEntryState.error) {
        // Error case - only show if we're actually submitting
        let errorMessage = t('smartSociety.failedToRecordVisitorEntry') || 'Failed to record visitor entry. Please try again.';
        
        if (visitorEntryState.error?.isNetworkError) {
          errorMessage = t('smartSociety.networkError') || 'Network error. Please check your internet connection.';
        } else if (visitorEntryState.error?.response?.data?.message) {
          errorMessage = visitorEntryState.error.response.data.message;
        } else if (visitorEntryState.error?.message) {
          errorMessage = visitorEntryState.error.message;
        }
        
        setIsSubmitting(false);
        Alert.alert(
          t('common.error') || 'Error',
          errorMessage,
          [
            {
              text: t('common.ok') || 'OK',
              onPress: () => {
                // Clear state after user acknowledges error
                dispatch(addVisitorEntryClear());
              },
            },
          ],
        );
      }
    } else if (!isSubmitting && visitorEntryState?.error) {
      // If we're not submitting but there's an error, it's likely a stale error
      // Clear it silently without showing an alert
      console.log('⚠️ Clearing stale error state - no alert shown');
      dispatch(addVisitorEntryClear());
    }
  }, [visitorEntryState, isSubmitting, hasClearedOnMount, isInitialMount]);

  const handleQRScan = () => {
    // TODO: Implement QR scanner
    Alert.alert('QR Scanner', 'QR scanner will be implemented');
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
            title: t('common.cameraPermission') || 'Camera Permission',
            message: t('common.cameraPermissionMessage') || 'This app needs access to your camera to capture visitor photos',
            buttonPositive: t('common.ok') || 'OK',
            buttonNegative: t('common.cancel') || 'Cancel',
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          Alert.alert(
            t('common.permissionRequired') || 'Permission Required',
            t('common.cameraPermissionMessage') || 'Camera permission is required. Please enable it in settings.',
            [
              { text: t('common.cancel') || 'Cancel', style: 'cancel' },
              {
                text: t('common.openSettings') || 'Open Settings',
                onPress: () => {
                  try {
                    Linking.openSettings();
                  } catch (error) {
                    Alert.alert(t('common.error') || 'Error', t('common.unableToOpenSettings') || 'Unable to open settings');
                  }
                },
              },
            ]
          );
          return false;
        } else {
          Alert.alert(
            t('common.permissionDenied') || 'Permission Denied',
            t('common.cameraPermissionDenied') || 'Camera permission was denied',
            [{ text: t('common.ok') || 'OK' }]
          );
          return false;
        }
      } else {
        // iOS - permission will be requested when opening camera
        return true;
      }
    } catch (error) {
      console.error('Error in takeCameraPermission:', error);
      Alert.alert(t('common.error') || 'Error', t('common.somethingWentWrongPermissions') || 'Something went wrong with permissions');
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
              Alert.alert(t('common.cameraUnavailable') || 'Camera Unavailable', t('common.cameraNotAvailable') || 'Camera is not available');
            } else if (error.code === 'permission') {
              Alert.alert(
                t('common.permissionDenied') || 'Permission Denied',
                t('common.cameraPermissionDenied') || 'Camera permission was denied'
              );
            } else {
              Alert.alert(t('common.error') || 'Error', t('common.failedToCaptureImage') || 'Failed to capture image');
            }
          }
        });
    } catch (error) {
      console.error('Error in handleCameraCapture:', error);
      Alert.alert(t('common.error') || 'Error', t('common.somethingWentWrongCamera') || 'Something went wrong with camera');
    }
  };

  // Helper function to get image name from URI
  const getImageNameFromUri = (uri: string): string => {
    const parts = uri.split('/');
    return parts[parts.length - 1] || 'visitor_image.jpg';
  };

  const handleSubmit = async () => {
    // Clear previous errors
    setVisitorNameError('');
    setVisitorPhoneError('');
    setFlatNoError('');
    setPurposeError('');
    
    let hasError = false;
    
    // Validate visitor name
    const trimmedName = visitorName.trim();
    if (!trimmedName || trimmedName.length === 0) {
      setVisitorNameError(t('smartSociety.pleaseEnterVisitorName') || 'Please enter visitor name');
      hasError = true;
    } else if (trimmedName.length < 2) {
      setVisitorNameError(t('smartSociety.visitorNameTooShort') || 'Visitor name must be at least 2 characters');
      hasError = true;
    }
    
    // Validate visitor phone
    const trimmedPhone = visitorPhone.trim();
    if (!trimmedPhone || trimmedPhone.length === 0) {
      setVisitorPhoneError(t('smartSociety.pleaseEnterVisitorPhoneNumber') || 'Please enter visitor phone number');
      hasError = true;
    } else if (trimmedPhone.length < 10) {
      setVisitorPhoneError(t('smartSociety.pleaseEnterValidPhoneNumber') || 'Please enter a valid phone number');
      hasError = true;
    }
    
    // Validate flat number
    const trimmedFlatNo = flatNo.trim();
    if (!trimmedFlatNo || trimmedFlatNo.length === 0) {
      setFlatNoError(t('smartSociety.pleaseEnterFlatNumber') || 'Please enter flat number');
      hasError = true;
    }
    
    // Validate purpose
    if (!purpose || purpose.trim().length === 0) {
      setPurposeError(t('smartSociety.pleaseSelectPurposeOfVisit') || 'Please select purpose of visit');
      hasError = true;
    }
    
    if (hasError) {
      return;
    }

    if (!isMountedRef.current) return;

    try {
      setIsSubmitting(true);

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

      // Create FormData for multipart/form-data submission
      const formData = new FormData();

      // Add all text fields
      formData.append('visitorName', visitorName.trim());
      formData.append('visitorMobile', visitorPhone.trim());
      formData.append('visitorCategory', 'Guest');
      formData.append('purposeOfVisit', purpose);
      formData.append('expectedDuration', JSON.stringify({ value: 2, unit: 'hours' }));
      formData.append('numberOfVisitors', (numberOfVisitors && !isNaN(Number(numberOfVisitors)) && Number(numberOfVisitors) > 0 
        ? Number(numberOfVisitors) 
        : 1).toString());
      
      if (vehicleNumber.trim() || vehicleType.trim()) {
        formData.append('vehicleDetails', JSON.stringify({
          ...(vehicleNumber.trim() && { vehicleNumber: vehicleNumber.trim() }),
          ...(vehicleType.trim() && { vehicleType: vehicleType.trim() }),
        }));
      } else {
        formData.append('vehicleDetails', JSON.stringify({}));
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
        formData.append('idProof[image]', imageData as any);
        formData.append('idProof[type]', 'Aadhar');
        console.log('✅ Image added to FormData as idProof[image]');
      } else {
        formData.append('idProof', JSON.stringify({}));
      }

      formData.append('notes', notes.trim() || '');
      formData.append('visitorStatus', VISITOR_STATUS.PENDING);
      
      if (userId) {
        formData.append('createdBy', userId);
      }
      if (buildingId) {
        formData.append('buildingId', buildingId);
      }
      if (visitorEmail.trim()) {
        formData.append('visitorEmail', visitorEmail.trim());
      }
      if (company.trim()) {
        formData.append('company', company.trim());
      }

      console.log('📤 Submitting visitor entry with FormData (including image in idProof)...');
      console.log('📤 FormData fields:', {
        visitorName: visitorName.trim(),
        visitorMobile: visitorPhone.trim(),
        visitorCategory: 'Guest',
        hasImage: !!visitorImage,
        imageUri: visitorImage ? visitorImage.substring(0, 50) + '...' : 'none',
      });

      try {
        await dispatch(addVisitorAction(formData, true) as any);
      } catch (submitError: any) {
        console.error('❌ FormData submission error:', submitError);
        console.error('Error details:', {
          message: submitError?.message,
          code: submitError?.code,
          isNetworkError: submitError?.isNetworkError,
          response: submitError?.response?.data,
          status: submitError?.response?.status,
        });
        throw submitError;
      }
    } catch (error: any) {
      console.error('Error submitting visitor entry:', error);
      if (isMountedRef.current) {
        let errorMessage = t('smartSociety.failedToRecordVisitorEntry') || 'Failed to record visitor entry. Please try again.';
        
        if (error?.isNetworkError) {
          errorMessage = t('smartSociety.networkError') || 'Network error. Please check your internet connection.';
        } else if (error?.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error?.message) {
          errorMessage = error.message;
        }
        
        Alert.alert(
          t('common.error') || 'Error',
          errorMessage,
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
        Title="Add Visitor Entry"
        onPress={() => props.navigation?.goBack()}
      />
      <ScrollView
        style={AddVisitorEntryStyles.container}
        contentContainerStyle={AddVisitorEntryStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={AddVisitorEntryStyles.section}>
          <Text style={AddVisitorEntryStyles.label}>Entry Type</Text>
          <View style={AddVisitorEntryStyles.chipsContainer}>
            {entryTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  AddVisitorEntryStyles.chip,
                  entryType === type.id && AddVisitorEntryStyles.chipActive,
                ]}
                onPress={() => {
                  setEntryType(type.id);
                  if (type.id === 'qr') {
                    handleQRScan();
                  }
                }}
              >
                <Text
                  style={[
                    AddVisitorEntryStyles.chipText,
                    entryType === type.id && AddVisitorEntryStyles.chipTextActive,
                  ]}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={AddVisitorEntryStyles.section}>
          <Text style={AddVisitorEntryStyles.label}>
            {t('smartSociety.visitorPhoto') || 'Visitor Photo'}
          </Text>
          <View style={AddVisitorEntryStyles.imageSection}>
            {visitorImage ? (
              <View style={AddVisitorEntryStyles.imageContainer}>
                <Image
                  source={{ uri: visitorImage }}
                  style={AddVisitorEntryStyles.visitorImage}
                />
                <TouchableOpacity
                  style={AddVisitorEntryStyles.removeImageButton}
                  onPress={() => setVisitorImage(null)}
                >
                  <Text style={AddVisitorEntryStyles.removeImageText}>✕</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={AddVisitorEntryStyles.captureImageButton}
                onPress={handleCameraCapture}
                activeOpacity={0.7}
              >
                <Image
                  source={IMAGES.CAMERA}
                  style={AddVisitorEntryStyles.cameraIcon}
                />
                <Text style={AddVisitorEntryStyles.captureImageText}>
                  {t('common.capturePhoto') || 'Capture Photo'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={AddVisitorEntryStyles.section}>
          <Text style={AddVisitorEntryStyles.label}>Visitor Name *</Text>
          <TextInput
            style={[
              AddVisitorEntryStyles.input,
              visitorNameError && { borderColor: COLORS.ERROR_COLOR }
            ]}
            value={visitorName}
            onChangeText={(text) => {
              setVisitorName(text);
              // Clear error when user starts typing
              if (visitorNameError) {
                setVisitorNameError('');
              }
            }}
            placeholder="Enter visitor name"
            placeholderTextColor={COLORS.GREY_TEXT}
          />
          {visitorNameError ? (
            <Text style={AddVisitorEntryStyles.errorText}>{visitorNameError}</Text>
          ) : null}
        </View>

        <View style={AddVisitorEntryStyles.section}>
          <Text style={AddVisitorEntryStyles.label}>Visitor Phone *</Text>
          <TextInput
            style={[
              AddVisitorEntryStyles.input,
              visitorPhoneError && { borderColor: COLORS.ERROR_COLOR }
            ]}
            value={visitorPhone}
            onChangeText={(text) => {
              setVisitorPhone(text);
              // Clear error when user starts typing
              if (visitorPhoneError) {
                setVisitorPhoneError('');
              }
            }}
            placeholder="Enter phone number"
            placeholderTextColor={COLORS.GREY_TEXT}
            keyboardType="phone-pad"
          />
          {visitorPhoneError ? (
            <Text style={AddVisitorEntryStyles.errorText}>{visitorPhoneError}</Text>
          ) : null}
        </View>

        <View style={AddVisitorEntryStyles.section}>
          <Text style={AddVisitorEntryStyles.label}>
            {t('smartSociety.flatNumber') || 'Flat Number'} *
          </Text>
          <Dropdowns
            data={flatNumbers}
            value={flatNo}
            onChange={(value) => {
              setFlatNo(value);
              // Clear error when user selects a flat
              if (flatNoError) {
                setFlatNoError('');
              }
            }}
            placeholder={t('smartSociety.selectFlatNumber') || 'Select flat number'}
            search={true}
            searchPlaceholder={t('smartSociety.searchFlatNumber') || 'Search flat/unit number...'}
          />
          {flatNoError ? (
            <Text style={AddVisitorEntryStyles.errorText}>{flatNoError}</Text>
          ) : null}
        </View>

        <View style={AddVisitorEntryStyles.section}>
          <Text style={AddVisitorEntryStyles.label}>Purpose of Visit *</Text>
          <View style={AddVisitorEntryStyles.chipsContainer}>
            {purposes.map((purp) => (
              <TouchableOpacity
                key={purp}
                style={[
                  AddVisitorEntryStyles.chip,
                  purpose === purp && AddVisitorEntryStyles.chipActive,
                ]}
                onPress={() => {
                  setPurpose(purp);
                  // Clear error when user selects a purpose
                  if (purposeError) {
                    setPurposeError('');
                  }
                }}
              >
                <Text
                  style={[
                    AddVisitorEntryStyles.chipText,
                    purpose === purp && AddVisitorEntryStyles.chipTextActive,
                  ]}
                >
                  {purp}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {purposeError ? (
            <Text style={AddVisitorEntryStyles.errorText}>{purposeError}</Text>
          ) : null}
        </View>

        <View style={AddVisitorEntryStyles.section}>
          <Text style={AddVisitorEntryStyles.label}>
            {t('smartSociety.visitorEmail') || 'Visitor Email'} (Optional)
          </Text>
          <TextInput
            style={AddVisitorEntryStyles.input}
            value={visitorEmail}
            onChangeText={setVisitorEmail}
            placeholder={t('smartSociety.enterVisitorEmail') || 'Enter visitor email'}
            placeholderTextColor={COLORS.GREY_TEXT}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={AddVisitorEntryStyles.section}>
          <Text style={AddVisitorEntryStyles.label}>
            {t('smartSociety.company') || 'Company'} (Optional)
          </Text>
          <TextInput
            style={AddVisitorEntryStyles.input}
            value={company}
            onChangeText={setCompany}
            placeholder={t('smartSociety.enterCompanyName') || 'Enter company name'}
            placeholderTextColor={COLORS.GREY_TEXT}
          />
        </View>

        <View style={AddVisitorEntryStyles.section}>
          <Text style={AddVisitorEntryStyles.label}>
            {t('smartSociety.numberOfVisitors') || 'Number of Visitors'} (Optional)
          </Text>
          <TextInput
            style={AddVisitorEntryStyles.input}
            value={numberOfVisitors}
            onChangeText={setNumberOfVisitors}
            placeholder="1"
            placeholderTextColor={COLORS.GREY_TEXT}
            keyboardType="numeric"
          />
        </View>

        <View style={AddVisitorEntryStyles.section}>
          <Text style={AddVisitorEntryStyles.label}>
            {t('smartSociety.vehicleDetails') || 'Vehicle Details'} (Optional)
          </Text>
          <TextInput
            style={[AddVisitorEntryStyles.input, { marginBottom: 12 }]}
            value={vehicleNumber}
            onChangeText={setVehicleNumber}
            placeholder={t('smartSociety.vehicleNumber') || 'Vehicle Number'}
            placeholderTextColor={COLORS.GREY_TEXT}
          />
          <View style={AddVisitorEntryStyles.chipsContainer}>
            {vehicleTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  AddVisitorEntryStyles.chip,
                  vehicleType === type && AddVisitorEntryStyles.chipActive,
                ]}
                onPress={() => setVehicleType(type)}
              >
                <Text
                  style={[
                    AddVisitorEntryStyles.chipText,
                    vehicleType === type && AddVisitorEntryStyles.chipTextActive,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={AddVisitorEntryStyles.section}>
          <Text style={AddVisitorEntryStyles.label}>
            {t('smartSociety.notes') || 'Notes'} (Optional)
          </Text>
          <TextInput
            style={[AddVisitorEntryStyles.input, { minHeight: 80, textAlignVertical: 'top' }]}
            value={notes}
            onChangeText={setNotes}
            placeholder={t('smartSociety.enterNotes') || 'Enter any additional notes'}
            placeholderTextColor={COLORS.GREY_TEXT}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={AddVisitorEntryStyles.section}>
          <Text style={AddVisitorEntryStyles.label}>Entry Gate</Text>
          <View style={AddVisitorEntryStyles.chipsContainer}>
            {entryGates.map((gate) => (
              <TouchableOpacity
                key={gate}
                style={[
                  AddVisitorEntryStyles.chip,
                  entryGate === gate && AddVisitorEntryStyles.chipActive,
                ]}
                onPress={() => setEntryGate(gate)}
              >
                <Text
                  style={[
                    AddVisitorEntryStyles.chipText,
                    entryGate === gate && AddVisitorEntryStyles.chipTextActive,
                  ]}
                >
                  {gate}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={AddVisitorEntryStyles.submitButton}>
          {isSubmitting ? (
            <ActivityIndicator size="large" color={COLORS.DARK_BLUE} />
          ) : (
            <CustomButton
              title={t('smartSociety.recordEntry') || 'Record Entry'}
              onPress={handleSubmit}
            />
          )}
        </View>
      </ScrollView>
    </Container>
  );
};

export default AddVisitorEntry;

