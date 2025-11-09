/**
 * VisitorEntry Screen Component
 * 
 * Allows users to register visitor entries for their society.
 * Features:
 * - Form with first name, last name, phone, unit, and optional image
 * - Real-time validation with error messages
 * - Animated form fields with stagger effect
 * - Image upload from camera or gallery
 * - FormData API integration with multipart/form-data
 * - Loading states and success handling
 */
import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Container, HeaderComponent } from '../../../components/common';
import InputField from '../../../components/common/inputField';
import CustomButton from '../../../components/common/customButton';
import { ImagePickerBottomSheet } from '../../../components/common';
import { visitorEntryStyles } from './styles';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { MakeApiRequest } from '../../../services/apiService';
import { CREATE_VISITOR } from '../../../services/httpService';
import { POST } from '../../../constants/api';

type ImageData = {
  uri: string;
  fileName: string;
  type?: string;
  mime?: string;
};

interface VisitorEntryProps {
  navigation: any;
}

/**
 * Main VisitorEntry Component
 */
const VisitorEntry: React.FC<VisitorEntryProps> = ({ navigation }) => {
  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [unit, setUnit] = useState('');
  const [image, setImage] = useState<ImageData | null>(null);
  
  // Validation error states
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [unitError, setUnitError] = useState('');
  
  // UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);
  
  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  
  // Redux selectors - get societyId from user profile
  const profileData = useSelector((state: any) => state.profile?.profileData);
  const userProfileData = useSelector((state: any) => state.getUserProfile?.getUserProfileData);
  
  /**
   * Get societyId from Redux store
   * Tries multiple possible locations in Redux state
   */
  const getSocietyId = useCallback(() => {
    // Try different possible locations for societyId
    const societyId = 
      profileData?.societyId || 
      profileData?.society?.id ||
      userProfileData?.societyId ||
      userProfileData?.society?.id ||
      '507f1f77bcf86cd799439011'; // Fallback for testing
    
    console.log('Using societyId:', societyId);
    return societyId;
  }, [profileData, userProfileData]);

  /**
   * Entry animation on component mount
   */
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  /**
   * Validates first name field
   */
  const validateFirstName = useCallback(() => {
    if (!firstName.trim()) {
      setFirstNameError('First name is required');
      return false;
    }
    if (firstName.trim().length < 2) {
      setFirstNameError('First name must be at least 2 characters');
      return false;
    }
    if (!/^[a-zA-Z\s]+$/.test(firstName.trim())) {
      setFirstNameError('First name should contain only letters');
      return false;
    }
    setFirstNameError('');
    return true;
  }, [firstName]);

  /**
   * Validates last name field
   */
  const validateLastName = useCallback(() => {
    if (!lastName.trim()) {
      setLastNameError('Last name is required');
      return false;
    }
    if (lastName.trim().length < 2) {
      setLastNameError('Last name must be at least 2 characters');
      return false;
    }
    if (!/^[a-zA-Z\s]+$/.test(lastName.trim())) {
      setLastNameError('Last name should contain only letters');
      return false;
    }
    setLastNameError('');
    return true;
  }, [lastName]);

  /**
   * Validates phone number field
   */
  const validatePhoneNumber = useCallback(() => {
    if (!phoneNumber.trim()) {
      setPhoneNumberError('Phone number is required');
      return false;
    }
    if (!/^\d{10}$/.test(phoneNumber.trim())) {
      setPhoneNumberError('Phone number must be exactly 10 digits');
      return false;
    }
    setPhoneNumberError('');
    return true;
  }, [phoneNumber]);

  /**
   * Validates unit field
   */
  const validateUnit = useCallback(() => {
    if (!unit.trim()) {
      setUnitError('Unit is required');
      return false;
    }
    if (unit.trim().length < 1) {
      setUnitError('Please enter a valid unit');
      return false;
    }
    setUnitError('');
    return true;
  }, [unit]);

  /**
   * Handles phone number input - allows only numeric input
   */
  const handlePhoneNumberChange = useCallback((text: string) => {
    // Remove all non-numeric characters
    const numericText = text.replace(/[^0-9]/g, '');
    // Limit to 10 digits
    if (numericText.length <= 10) {
      setPhoneNumber(numericText);
      if (phoneNumberError) {
        setPhoneNumberError('');
      }
    }
  }, [phoneNumberError]);

  /**
   * Handles first name input with real-time validation
   */
  const handleFirstNameChange = useCallback((text: string) => {
    setFirstName(text);
    if (firstNameError) {
      setFirstNameError('');
    }
  }, [firstNameError]);

  /**
   * Handles last name input with real-time validation
   */
  const handleLastNameChange = useCallback((text: string) => {
    setLastName(text);
    if (lastNameError) {
      setLastNameError('');
    }
  }, [lastNameError]);

  /**
   * Handles unit input with real-time validation
   */
  const handleUnitChange = useCallback((text: string) => {
    setUnit(text);
    if (unitError) {
      setUnitError('');
    }
  }, [unitError]);

  /**
   * Opens image picker bottom sheet
   */
  const handleImagePickerOpen = useCallback(() => {
    setShowImagePicker(true);
  }, []);

  /**
   * Closes image picker bottom sheet
   */
  const handleImagePickerClose = useCallback(() => {
    setShowImagePicker(false);
  }, []);

  /**
   * Handles taking photo from camera
   */
  const handleTakePhoto = useCallback(async () => {
    setShowImagePicker(false);
    
    try {
      const response = await launchCamera({
        mediaType: 'photo',
        quality: 0.8,
        maxWidth: 1024,
        maxHeight: 1024,
        saveToPhotos: false,
      });

      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Failed to take photo');
      } else if (response.assets && response.assets[0]) {
        const asset = response.assets[0];
        setImage({
          uri: asset.uri || '',
          fileName: asset.fileName || 'photo.jpg',
          type: asset.type,
          mime: asset.type || 'image/jpeg',
        });
      }
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert('Error', 'Failed to open camera');
    }
  }, []);

  /**
   * Handles choosing photo from library
   */
  const handleChoosePhoto = useCallback(async () => {
    setShowImagePicker(false);
    
    try {
      const response = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        maxWidth: 1024,
        maxHeight: 1024,
        selectionLimit: 1,
      });

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Failed to select photo');
      } else if (response.assets && response.assets[0]) {
        const asset = response.assets[0];
        setImage({
          uri: asset.uri || '',
          fileName: asset.fileName || 'image.jpg',
          type: asset.type,
          mime: asset.type || 'image/jpeg',
        });
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Error', 'Failed to open image picker');
    }
  }, []);

  /**
   * Removes selected image
   */
  const handleRemoveImage = useCallback(() => {
    setImage(null);
  }, []);

  /**
   * Handles form submission with API integration
   */
  const handleSubmit = useCallback(async () => {
    // Validate all fields
    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();
    const isPhoneNumberValid = validatePhoneNumber();
    const isUnitValid = validateUnit();

    if (!isFirstNameValid || !isLastNameValid || !isPhoneNumberValid || !isUnitValid) {
      Alert.alert('Validation Error', 'Please fix all errors before submitting');
      return;
    }

    setIsSubmitting(true);

    try {
      // Get societyId from Redux
      const societyId = getSocietyId();

      // Prepare FormData payload
      const formData = new FormData();
      formData.append('firstName', firstName.trim());
      formData.append('lastName', lastName.trim());
      formData.append('mobileNumber', phoneNumber.trim());
      formData.append('unit', unit.trim());
      formData.append('societyId', societyId);
      formData.append('visitPurpose', 'Delivery'); // Default value as specified

      // Add image if selected
      if (image) {
        formData.append('image', {
          uri: image.uri,
          type: image.mime || 'image/jpeg',
          name: image.fileName,
        } as any);
      }

      console.log('Submitting visitor entry...');

      // Make API call with multipart/form-data
      const response = await MakeApiRequest({
        apiUrl: CREATE_VISITOR,
        apiMethod: POST,
        apiData: formData,
        apiHeaders: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Visitor entry response:', response);

      if (response?.status === 200 || response?.status === 201) {
        console.log('Visitor entry created successfully');
        
        // Show success message
        Alert.alert(
          'Success',
          'Visitor entry has been registered successfully!',
          [
            {
              text: 'OK',
              onPress: () => {
                // Navigate back to Society Service
                navigation.goBack();
              },
            },
          ]
        );
      } else {
        Alert.alert(
          'Error',
          response?.data?.message || 'Failed to register visitor. Please try again.'
        );
      }
    } catch (error: any) {
      console.log('Visitor entry submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [
    firstName,
    lastName,
    phoneNumber,
    unit,
    image,
    validateFirstName,
    validateLastName,
    validatePhoneNumber,
    validateUnit,
    getSocietyId,
    navigation,
  ]);

  return (
    <Container>
      <View style={visitorEntryStyles.container}>
        <HeaderComponent
          Title="Visitor Entry"
          onPress={() => navigation.goBack()}
        />
        
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={visitorEntryStyles.keyboardAvoidingView}
        >
          <ScrollView
            style={visitorEntryStyles.scrollView}
            contentContainerStyle={visitorEntryStyles.scrollViewContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Animated.View
              style={[
                visitorEntryStyles.formContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >

              {/* First Name Input */}
              <View style={visitorEntryStyles.inputContainer}>
                <Text style={visitorEntryStyles.label}>
                  First Name <Text style={visitorEntryStyles.requiredStar}>*</Text>
                </Text>
                <InputField
                  placeholder="Enter first name"
                  value={firstName}
                  onChangeText={handleFirstNameChange}
                  error={firstNameError}
                  editable={!isSubmitting}
                  autoCapitalize="words"
                  onBlur={validateFirstName}
                />
              </View>

              {/* Last Name Input */}
              <View style={visitorEntryStyles.inputContainer}>
                <Text style={visitorEntryStyles.label}>
                  Last Name <Text style={visitorEntryStyles.requiredStar}>*</Text>
                </Text>
                <InputField
                  placeholder="Enter last name"
                  value={lastName}
                  onChangeText={handleLastNameChange}
                  error={lastNameError}
                  editable={!isSubmitting}
                  autoCapitalize="words"
                  onBlur={validateLastName}
                />
              </View>

              {/* Phone Number Input */}
              <View style={visitorEntryStyles.inputContainer}>
                <Text style={visitorEntryStyles.label}>
                  Phone Number <Text style={visitorEntryStyles.requiredStar}>*</Text>
                </Text>
                <InputField
                  placeholder="Enter 10-digit phone number"
                  value={phoneNumber}
                  onChangeText={handlePhoneNumberChange}
                  error={phoneNumberError}
                  editable={!isSubmitting}
                  keyboardType="numeric"
                  maxLength={10}
                  onBlur={validatePhoneNumber}
                />
              </View>

              {/* Unit Input */}
              <View style={visitorEntryStyles.inputContainer}>
                <Text style={visitorEntryStyles.label}>
                  Unit <Text style={visitorEntryStyles.requiredStar}>*</Text>
                </Text>
                <InputField
                  placeholder="e.g., A-101, B-205"
                  value={unit}
                  onChangeText={handleUnitChange}
                  error={unitError}
                  editable={!isSubmitting}
                  autoCapitalize="characters"
                  onBlur={validateUnit}
                />
              </View>

              {/* Image Upload Section */}
              <View style={visitorEntryStyles.imageSection}>
                <Text style={visitorEntryStyles.label}>
                  Visitor Photo (Optional)
                </Text>
                <TouchableOpacity
                  style={visitorEntryStyles.imagePickerButton}
                  onPress={handleImagePickerOpen}
                  activeOpacity={0.7}
                  disabled={isSubmitting}
                >
                  <Text style={visitorEntryStyles.imagePickerButtonText}>
                    📷 {image ? 'Change Photo' : 'Add Photo'}
                  </Text>
                </TouchableOpacity>

                {/* Image Preview */}
                {image && (
                  <View style={visitorEntryStyles.imagePreviewContainer}>
                    <Image
                      source={{ uri: image.uri }}
                      style={visitorEntryStyles.imagePreview}
                      resizeMode="cover"
                    />
                    <TouchableOpacity
                      style={visitorEntryStyles.removeImageButton}
                      onPress={handleRemoveImage}
                      activeOpacity={0.85}
                      disabled={isSubmitting}
                    >
                      <Text style={visitorEntryStyles.removeImageButtonText}>
                        ×
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </Animated.View>
          </ScrollView>

          {/* Submit Button - Fixed at bottom center */}
          <View style={visitorEntryStyles.buttonContainer}>
            <CustomButton
              title="Submit"
              onPress={handleSubmit}
              disabled={isSubmitting}
              loading={isSubmitting}
              style={visitorEntryStyles.submitButton}
            />
          </View>
        </KeyboardAvoidingView>

        {/* Image Picker Bottom Sheet */}
        <ImagePickerBottomSheet
          isVisible={showImagePicker}
          onClose={handleImagePickerClose}
          onTakePhoto={handleTakePhoto}
          onChoosePhoto={handleChoosePhoto}
        />
      </View>
    </Container>
  );
};

export default VisitorEntry;

