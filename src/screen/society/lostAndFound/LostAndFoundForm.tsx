/**
 * LostAndFoundForm Component
 * 
 * Form component for creating lost & found entries.
 * Used inside a BottomSheet.
 */
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { ImagePickerBottomSheet } from '../../../components/common';
import { lostAndFoundFormStyles } from './formStyles';
import { COLORS } from '../../../constants';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { commonImageAction } from '../../../store/actions/commonImage/imageAction';
import { MakeApiRequest } from '../../../services/apiService';
import { CREATE_LOS } from '../../../services/httpService';
import { POST } from '../../../constants/api';

type ImageData = {
  uri: string;
  fileName: string;
  type?: string;
  mime?: string;
};

interface LostAndFoundFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
}

export interface LostAndFoundFormRef {
  handleSubmit: () => Promise<boolean>;
}

export const LostAndFoundForm = React.forwardRef<LostAndFoundFormRef, LostAndFoundFormProps>(({
  onSuccess,
  onCancel,
  isSubmitting,
  setIsSubmitting,
}, ref) => {
  const dispatch = useDispatch() as any;
  
  // Form state
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<ImageData | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [descriptionError, setDescriptionError] = useState('');
  const [showImagePicker, setShowImagePicker] = useState(false);

  /**
   * Validates the description field
   */
  const validateDescription = useCallback(() => {
    if (!description.trim()) {
      setDescriptionError('Description is required');
      return false;
    }
    if (description.trim().length < 10) {
      setDescriptionError('Description must be at least 10 characters');
      return false;
    }
    setDescriptionError('');
    return true;
  }, [description]);

  /**
   * Handles description text change
   */
  const handleDescriptionChange = useCallback((text: string) => {
    setDescription(text);
    if (descriptionError) {
      setDescriptionError('');
    }
  }, [descriptionError]);

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
    // Validate form
    const isValid = validateDescription();
    
    if (!isValid) {
      return false;
    }

    setIsSubmitting(true);

    try {
      let uploadedImageUrl = null;

      // Upload image first if selected
      if (image) {
        console.log('Uploading image...');

        const imageData = {
          uri: image.uri,
          type: image.mime || 'image/jpeg',
          name: image.fileName,
        };

        const imageFormData = new FormData();
        imageFormData.append('upload_file', imageData as any);
        imageFormData.append('root', 'los');
        imageFormData.append('type', 'documents');

        try {
          const imageUploadResponse = await dispatch(commonImageAction(imageFormData));
          console.log('Image upload response:', imageUploadResponse);

          if (imageUploadResponse?.status === 200) {
            uploadedImageUrl = imageUploadResponse?.data?.result?.fileName;
            console.log('Image upload successful:', uploadedImageUrl);
          } else {
            setIsSubmitting(false);
            Alert.alert('Error', 'Failed to upload image. Please try again.');
            return false;
          }
        } catch (uploadError: any) {
          console.log('Image upload error:', uploadError);
          setIsSubmitting(false);
          return false;
        }
      }

      // Prepare LOS payload
      const losPayload: any = {
        name: description.trim(),
      };

      // Add image to payload if uploaded
      if (uploadedImageUrl) {
        losPayload.image = uploadedImageUrl;
      }

      console.log('Submitting LOS entry:', losPayload);

      // Make API call to create LOS entry
      const response = await MakeApiRequest({
        apiUrl: CREATE_LOS,
        apiMethod: POST,
        apiData: losPayload,
      });

      console.log('LOS creation response:', response);

      if (response?.status === 200) {
        console.log('LOS entry created successfully:', response.data);
        
        // Notify parent of success
        onSuccess();
        
        // Reset form
        setDescription('');
        setImage(null);
        setDescriptionError('');
        
        return true;
      } else {
        Alert.alert(
          'Error',
          response?.data?.message || 'Failed to submit. Please try again.'
        );
        return false;
      }
    } catch (error: any) {
      console.log('LOS submission error:', error);
      
      // const errorMessage = error?.response?.data?.message || 
      //                     error?.message || 
      //                     'Failed to submit. Please try again.';
      
      // Alert.alert('Error', errorMessage);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [validateDescription, setIsSubmitting, image, description, dispatch, onSuccess]);

  // Expose handleSubmit to parent via ref
  React.useImperativeHandle(
    ref,
    () => ({
      handleSubmit,
    }),
    [handleSubmit]
  );

  return (
    <View style={lostAndFoundFormStyles.container}>
      {/* Description Input */}
      <View style={lostAndFoundFormStyles.inputWrapper}>
        <Text style={lostAndFoundFormStyles.label}>
          Description <Text style={lostAndFoundFormStyles.requiredStar}>*</Text>
        </Text>
        <TextInput
          style={[
            lostAndFoundFormStyles.textInput,
            isFocused && lostAndFoundFormStyles.textInputFocused,
            descriptionError && lostAndFoundFormStyles.textInputError,
          ]}
          placeholder="Describe the lost or found item in detail..."
          placeholderTextColor={COLORS.GREY_TEXT}
          value={description}
          onChangeText={handleDescriptionChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            validateDescription();
          }}
          multiline
          numberOfLines={6}
          maxLength={500}
          editable={!isSubmitting}
        />
        {descriptionError ? (
          <Text style={lostAndFoundFormStyles.errorText}>
            {descriptionError}
          </Text>
        ) : null}
        <Text style={[lostAndFoundFormStyles.errorText, { color: COLORS.GREY_TEXT }]}>
          {description.length}/500 characters
        </Text>
      </View>

      {/* Image Picker */}
      <View style={lostAndFoundFormStyles.imagePickerSection}>
        <Text style={lostAndFoundFormStyles.label}>
          Image (Optional)
        </Text>
        <TouchableOpacity
          style={lostAndFoundFormStyles.imagePickerButton}
          onPress={handleImagePickerOpen}
          activeOpacity={0.7}
          disabled={isSubmitting}
        >
          <Text style={lostAndFoundFormStyles.imagePickerButtonText}>
            📷 {image ? 'Change Image' : 'Add Image'}
          </Text>
        </TouchableOpacity>

        {/* Image Preview */}
        {image && (
          <View style={lostAndFoundFormStyles.imagePreviewContainer}>
            <Image
              source={{ uri: image.uri }}
              style={lostAndFoundFormStyles.imagePreview}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={lostAndFoundFormStyles.removeImageButton}
              onPress={handleRemoveImage}
              activeOpacity={0.85}
              disabled={isSubmitting}
            >
              <Text style={lostAndFoundFormStyles.removeImageButtonText}>
                ×
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Image Picker Bottom Sheet */}
      <ImagePickerBottomSheet
        isVisible={showImagePicker}
        onClose={handleImagePickerClose}
        onTakePhoto={handleTakePhoto}
        onChoosePhoto={handleChoosePhoto}
      />
    </View>
  );
});

