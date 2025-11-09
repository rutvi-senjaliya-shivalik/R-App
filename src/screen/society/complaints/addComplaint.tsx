import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {
  Container,
  HeaderComponent,
  DropDowns,
  CustomButton,
  ImagePickerModal,
  InputField,
} from '../../../components/common';
import { addComplaintStyles } from './styles/addComplaintStyles';
import { createComplaintAction } from '../../../store/actions/society/createComplaintAction';
import { selectUserData } from '../../../store/selectors/auth';

const complaintTypes = [
  { label: 'Parking', value: 'Parking' },
  { label: 'Neighbour/Community', value: 'Neighbour/Community' },
  { label: 'Electricity', value: 'Electricity' },
  { label: 'Maintenance', value: 'Maintenance' },
  { label: 'Cleanliness', value: 'Cleanliness' },
  { label: 'Misconduct', value: 'Misconduct' },
  { label: 'Service', value: 'Service' },
];

const AddComplaintScreen = ({ navigation, route }: any) => {
  const dispatch = useDispatch() as any;
  const { createLoading } = useSelector((state: any) => state.complaints);
  const userData = useSelector(selectUserData);
  console.log('AddComplaintScreen-userData:::', userData);
  const { onCallback } = route.params || {};

  const [complaintType, setComplaintType] = useState('');
  const [complaintTitle, setComplaintTitle] = useState('');
  const [complaintDescription, setComplaintDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [showImagePicker, setShowImagePicker] = useState(false);

  const [errors, setErrors] = useState({
    type: '',
    title: '',
    description: '',
  });

  const validateForm = useCallback(() => {
    let isValid = true;
    const newErrors = { type: '', title: '', description: '' };
    console.log('complaintType:::', complaintType);
    if (!complaintType) {
      newErrors.type = 'Please select a complaint type';
      isValid = false;
    }

    if (!complaintTitle.trim()) {
      newErrors.title = 'Please enter a complaint title';
      isValid = false;
    }

    if (!complaintDescription.trim()) {
      newErrors.description = 'Please enter a complaint description';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [complaintType, complaintTitle, complaintDescription]);

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const payload = {
        society: userData?.societyId,
        type: complaintType,
        title: complaintTitle,
        description: complaintDescription,
        priority: 'High',
        image: selectedImage,
      };
      const results = await dispatch(createComplaintAction(payload));
      if (results?.data?.result) {
        Alert.alert(
          'Success',
          results?.data?.message || 'Complaint submitted successfully!',
          [
            {
              text: 'OK',
              onPress: () => {
                onCallback?.();
                navigation.goBack();
              },
            },
          ],
        );
      }
    } catch (error: any) {
      console.log('Error submitting complaint:', error);
    }
  }, [
    validateForm,
    userData?.societyId,
    complaintType,
    complaintTitle,
    complaintDescription,
    selectedImage,
    dispatch,
    onCallback,
    navigation,
  ]);

  const handleCameraPress = useCallback(() => {
    setShowImagePicker(false);
    setTimeout(() => {
      ImagePicker.openCamera({
        width: 1000,
        height: 1000,
        cropping: true,
        includeBase64: false,
        compressImageQuality: 0.8,
      })
        .then((image: any) => {
          setSelectedImage(image);
        })
        .catch((error: any) => {
          console.log('Camera error:', error);
        });
    }, 500);
  }, []);

  const handleGalleryPress = useCallback(() => {
    setShowImagePicker(false);
    setTimeout(() => {
      ImagePicker.openPicker({
        width: 1000,
        height: 1000,
        cropping: true,
        includeBase64: false,
        compressImageQuality: 0.8,
      })
        .then((image: any) => {
          setSelectedImage(image);
        })
        .catch((error: any) => {
          console.log('Gallery error:', error);
        });
    }, 500);
  }, []);

  const handleRemoveImage = useCallback(() => {
    setSelectedImage(null);
  }, []);

  return (
    <Container>
      <View style={addComplaintStyles.container}>
        <HeaderComponent
          Title="Add Complaint"
          onPress={() => navigation.goBack()}
        />
        <ScrollView
          style={addComplaintStyles.scrollView}
          contentContainerStyle={addComplaintStyles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={addComplaintStyles.formContainer}>
            <Text style={addComplaintStyles.sectionTitle}>Complaint Type*</Text>
            <DropDowns
              data={complaintTypes}
              value={complaintType}
              onChange={(value: string) => {
                console.log('Selected complaint type:', value);
                setComplaintType(value);
                setErrors(prev => ({ ...prev, type: '' }));
              }}
              placeholder="Select complaint type"
            />
            {errors.type ? (
              <Text style={addComplaintStyles.errorText}>{errors.type}</Text>
            ) : null}

            <Text style={addComplaintStyles.sectionTitle}>
              Complaint Title*
            </Text>
            <InputField
              placeholder="Enter complaint title"
              value={complaintTitle}
              onChangeText={(text: string) => {
                setComplaintTitle(text);
                setErrors(prev => ({ ...prev, title: '' }));
              }}
            />
            {errors.title ? (
              <Text style={addComplaintStyles.errorText}>{errors.title}</Text>
            ) : null}

            <Text style={addComplaintStyles.sectionTitle}>
              Complaint Description*
            </Text>
            <InputField
              placeholder="Enter detailed description of your complaint"
              value={complaintDescription}
              onChangeText={(text: string) => {
                setComplaintDescription(text);
                setErrors(prev => ({ ...prev, description: '' }));
              }}
              multiline
              numberOfLines={6}
              style={addComplaintStyles.textArea}
            />
            {errors.description ? (
              <Text style={addComplaintStyles.errorText}>
                {errors.description}
              </Text>
            ) : null}

            <Text style={addComplaintStyles.sectionTitle}>
              Upload Image (Optional)
            </Text>
            {selectedImage ? (
              <View style={addComplaintStyles.imageContainer}>
                <Image
                  source={{ uri: selectedImage.path }}
                  style={addComplaintStyles.image}
                  resizeMode="cover"
                />
                <TouchableOpacity
                  style={addComplaintStyles.removeButton}
                  onPress={handleRemoveImage}
                >
                  <Text style={addComplaintStyles.removeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={addComplaintStyles.uploadButton}
                onPress={() => setShowImagePicker(true)}
              >
                <Text style={addComplaintStyles.uploadButtonText}>
                  + Add Image
                </Text>
              </TouchableOpacity>
            )}

            <View style={addComplaintStyles.buttonContainer}>
              <CustomButton
                title="Submit Complaint"
                onPress={handleSubmit}
                loading={createLoading}
              />
            </View>
          </View>
        </ScrollView>
      </View>

      <ImagePickerModal
        isVisible={showImagePicker}
        onClose={() => setShowImagePicker(false)}
        onCameraPress={handleCameraPress}
        onGalleryPress={handleGalleryPress}
      />
    </Container>
  );
};

export default AddComplaintScreen;
