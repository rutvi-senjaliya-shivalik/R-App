import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import {
  Container,
  HeaderComponent,
  CustomButton,
} from '../../../../components/common';
import AddComplaintStyles from './styles/addComplaintStyles';
import { COLORS } from '../../../../constants';
import ImagePicker from 'react-native-image-crop-picker';
import { useTranslation } from '../../../../context/LanguageContext';

const AddComplaint = (props: any) => {
  const { t } = useTranslation();
  const isMountedRef = useRef(true);
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [flatNo, setFlatNo] = useState<string>('B-204'); // TODO: Get from user profile
  const [imageUri, setImageUri] = useState<string | null>(null);

  const categories = [
    { key: 'Plumbing', label: t('smartSociety.plumbing') },
    { key: 'Electrical', label: t('smartSociety.electrical') },
    { key: 'Cleaning', label: t('smartSociety.cleaning') },
    { key: 'Security', label: t('smartSociety.security') },
    { key: 'Lift', label: t('smartSociety.lift') },
    { key: 'Parking', label: t('smartSociety.parking') },
    { key: 'Other', label: t('smartSociety.other') },
  ];

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleImagePicker = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      compressImageQuality: 0.7,
      compressImageMaxHeight: 1000,
      compressImageMaxWidth: 1000,
    })
      .then(image => {
        setImageUri(image.path);
        console.log('Camera image selected:', image.path);
      })
      .catch(error => {
        console.log('Camera error:', error);
        if (error.code !== 'E_PICKER_CANCELLED') {
          Alert.alert(t('common.error'), t('smartSociety.failedToOpenCamera'));
        }
      });
  };

  const handleSubmit = () => {
    if (!category) {
      Alert.alert(t('common.error'), t('smartSociety.pleaseSelectCategory'));
      return;
    }
    if (!description.trim()) {
      Alert.alert(t('common.error'), t('smartSociety.pleaseEnterDescription'));
      return;
    }

    Alert.alert(
      t('common.success'),
      t('smartSociety.complaintSubmittedSuccessfully'),
      [
        {
          text: t('common.ok'),
          onPress: () => {
            props.navigation?.goBack();
          },
        },
      ],
    );
  };

  return (
    <Container>
      <HeaderComponent
        Title={t('smartSociety.submitComplaint')}
        onPress={() => props.navigation?.goBack()}
      />
      <ScrollView
        style={AddComplaintStyles.container}
        contentContainerStyle={AddComplaintStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={AddComplaintStyles.section}>
          <Text style={AddComplaintStyles.label}>
            {t('smartSociety.category')}
          </Text>
          <View style={AddComplaintStyles.categoriesContainer}>
            {categories.map(cat => (
              <TouchableOpacity
                key={cat.key}
                style={[
                  AddComplaintStyles.categoryChip,
                  category === cat.key && AddComplaintStyles.categoryChipActive,
                ]}
                onPress={() => setCategory(cat.key)}
              >
                <Text
                  style={[
                    AddComplaintStyles.categoryChipText,
                    category === cat.key &&
                      AddComplaintStyles.categoryChipTextActive,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={AddComplaintStyles.section}>
          <Text style={AddComplaintStyles.label}>
            {t('smartSociety.flatNumber')}
          </Text>
          <TextInput
            style={AddComplaintStyles.input}
            value={flatNo}
            onChangeText={setFlatNo}
            placeholder={t('smartSociety.pleaseEnterFlatNumber')}
            placeholderTextColor={COLORS.GREY_TEXT}
          />
        </View>

        <View style={AddComplaintStyles.section}>
          <Text style={AddComplaintStyles.label}>
            {t('smartSociety.description')}
          </Text>
          <TextInput
            style={AddComplaintStyles.textArea}
            value={description}
            onChangeText={setDescription}
            placeholder={t('smartSociety.pleaseEnterDescription')}
            placeholderTextColor={COLORS.GREY_TEXT}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>

        <View style={AddComplaintStyles.section}>
          <Text style={AddComplaintStyles.label}>
            {t('smartSociety.attachImageOptional')}
          </Text>
          <TouchableOpacity
            style={AddComplaintStyles.imagePickerButton}
            onPress={handleImagePicker}
          >
            <Text style={AddComplaintStyles.imagePickerText}>
              {imageUri
                ? t('smartSociety.changeImage')
                : t('smartSociety.addImage')}
            </Text>
          </TouchableOpacity>
          {imageUri && (
            <View style={AddComplaintStyles.imagePreview}>
              <Image
                source={{ uri: imageUri }}
                style={AddComplaintStyles.previewImage}
              />
              <TouchableOpacity
                style={AddComplaintStyles.removeImageButton}
                onPress={() => setImageUri(null)}
              >
                <Text style={AddComplaintStyles.removeImageText}>×</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={AddComplaintStyles.submitButton}>
          <CustomButton
            title={t('smartSociety.submitComplaint')}
            onPress={handleSubmit}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default AddComplaint;
