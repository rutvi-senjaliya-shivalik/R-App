import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {
  Container,
  HeaderComponent,
  TextInput,
  DropDowns,
  CustomButton,
  ImagePickerModal,
} from '../../../components/common';
import { addComplaintStyles } from './addComplaintStyles';
import { COLORS } from '../../../constants';

const complaintTypes = [
  { label: 'Parking', value: 'parking' },
  { label: 'Neighbour/Community', value: 'neighbour' },
  { label: 'Electricity', value: 'electricity' },
  { label: 'Maintenance', value: 'maintenance' },
  { label: 'Cleanliness', value: 'cleanliness' },
  { label: 'Misconduct', value: 'misconduct' },
  { label: 'Service', value: 'service' },
];

const AddComplaintScreen = ({ navigation }: any) => {
  const [complaintType, setComplaintType] = useState('');
  const [complaintTitle, setComplaintTitle] = useState('');
  const [complaintDescription, setComplaintDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState({
    type: '',
    title: '',
    description: '',
  });

  const validateForm = useCallback(() => {
    let isValid = true;
    const newErrors = { type: '', title: '', description: '' };

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

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert('Success', 'Complaint submitted successfully', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    }, 1500);
  }, [validateForm, navigation]);

  const handleImageSelect = useCallback((image: any) => {
    setSelectedImage(image.path);
    setShowImagePicker(false);
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
            <Text style={addComplaintStyles.sectionTitle}>Complaint Type</Text>
            <DropDowns
              data={complaintTypes}
              value={complaintType}
              onChange={(item: any) => {
                setComplaintType(item.value);
                setErrors((prev) => ({ ...prev, type: '' }));
              }}
              placeholder="Select complaint type"
            />
            {errors.type ? (
              <Text style={addComplaintStyles.errorText}>{errors.type}</Text>
            ) : null}

            <Text style={addComplaintStyles.sectionTitle}>Complaint Title</Text>
            <TextInput
              placeholder="Enter complaint title"
              value={complaintTitle}
              onChangeText={(text: string) => {
                setComplaintTitle(text);
                setErrors((prev) => ({ ...prev, title: '' }));
              }}
            />
            {errors.title ? (
              <Text style={addComplaintStyles.errorText}>{errors.title}</Text>
            ) : null}

            <Text style={addComplaintStyles.sectionTitle}>
              Complaint Description
            </Text>
            <TextInput
              placeholder="Enter detailed description of your complaint"
              value={complaintDescription}
              onChangeText={(text: string) => {
                setComplaintDescription(text);
                setErrors((prev) => ({ ...prev, description: '' }));
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
                  source={{ uri: selectedImage }}
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
                loading={isSubmitting}
              />
            </View>
          </View>
        </ScrollView>
      </View>

      <ImagePickerModal
        visible={showImagePicker}
        onClose={() => setShowImagePicker(false)}
        onImageSelect={handleImageSelect}
      />
    </Container>
  );
};

export default AddComplaintScreen;

