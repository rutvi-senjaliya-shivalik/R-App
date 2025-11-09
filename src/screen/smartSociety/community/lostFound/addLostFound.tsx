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
import { useSelector } from 'react-redux';
import {
  Container,
  HeaderComponent,
  CustomButton,
} from '../../../../components/common';
import AddLostFoundStyles from './styles/addLostFoundStyles';
import { COLORS } from '../../../../constants';
import ImagePicker from 'react-native-image-crop-picker';
import { useTranslation } from '../../../../context/LanguageContext';
import { SMART_SOCIETY_ROUTES } from '../../../../navigation/routes/smartSocietyRoutes';

const AddLostFound = (props: any) => {
  const { t } = useTranslation();
  const isMountedRef = useRef(true);
  const selectedRole = props.route?.params?.selectedRole;
  const { userData } = useSelector((state: any) => state.otp);
  
  // Get user info from Redux
  const userName = userData?.firstName && userData?.lastName 
    ? `${userData.firstName} ${userData.lastName}`.trim()
    : userData?.firstName || userData?.lastName || 'Resident';
  const userFlatNo = userData?.flatNo || userData?.flatNumber || 'A-101';
  const userContact = userData?.mobileNumber || userData?.phoneNumber || '';
  
  const [type, setType] = useState<'Lost' | 'Found'>('Lost');
  const [itemName, setItemName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [contact, setContact] = useState<string>(userContact);
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleImagePicker = () => {
    Alert.alert(
      t('smartSociety.selectImage') || 'Select Image',
      t('smartSociety.chooseImageSource') || 'Choose image source',
      [
        {
          text: t('smartSociety.camera') || 'Camera',
          onPress: () => {
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
              })
              .catch(error => {
                if (error.code !== 'E_PICKER_CANCELLED') {
                  Alert.alert(t('common.error'), t('smartSociety.failedToOpenCamera'));
                }
              });
          },
        },
        {
          text: t('smartSociety.gallery') || 'Gallery',
          onPress: () => {
            ImagePicker.openPicker({
              width: 300,
              height: 400,
              cropping: true,
              compressImageQuality: 0.7,
              compressImageMaxHeight: 1000,
              compressImageMaxWidth: 1000,
            })
              .then(image => {
                setImageUri(image.path);
              })
              .catch(error => {
                if (error.code !== 'E_PICKER_CANCELLED') {
                  Alert.alert(t('common.error'), t('smartSociety.failedToOpenGallery'));
                }
              });
          },
        },
        {
          text: t('common.cancel') || 'Cancel',
          style: 'cancel',
        },
      ],
    );
  };

  const handleSubmit = () => {
    if (!itemName.trim()) {
      Alert.alert(t('common.error'), t('smartSociety.pleaseEnterItemName') || 'Please enter item name');
      return;
    }
    if (!description.trim()) {
      Alert.alert(t('common.error'), t('smartSociety.pleaseEnterDescription') || 'Please enter description');
      return;
    }

    // TODO: Submit to API/Firebase
    const newItem = {
      id: `lf${Date.now()}`,
      type,
      itemName: itemName.trim(),
      description: description.trim(),
      location: location.trim() || undefined,
      date: new Date().toISOString().split('T')[0],
      status: 'Open' as const,
      imageUrl: imageUri || undefined,
      reportedBy: userName,
      flatNo: userFlatNo,
      contact: contact.trim() || userContact || undefined,
    };

    // Pass the new item back to the list screen via navigation params
    props.navigation?.navigate(SMART_SOCIETY_ROUTES.LOST_FOUND_LIST, { 
      newItem,
      selectedRole 
    });

    // Show success message
    Alert.alert(
      t('common.success') || 'Success',
      t('smartSociety.reportAddedSuccessfully') || 'Report added successfully.',
      [{ text: t('common.ok') || 'OK' }],
    );
  };

  return (
    <Container>
      <HeaderComponent
        Title={t('smartSociety.addLostFoundReport') || 'Add Lost & Found Report'}
        onPress={() => props.navigation?.goBack()}
      />
      <ScrollView
        style={AddLostFoundStyles.container}
        contentContainerStyle={AddLostFoundStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Type Selection */}
        <View style={AddLostFoundStyles.section}>
          <Text style={AddLostFoundStyles.label}>
            {t('smartSociety.type') || 'Type'} <Text style={AddLostFoundStyles.required}>*</Text>
          </Text>
          <View style={AddLostFoundStyles.typeContainer}>
            <TouchableOpacity
              style={[
                AddLostFoundStyles.typeButton,
                type === 'Lost' && AddLostFoundStyles.typeButtonActive,
              ]}
              onPress={() => setType('Lost')}
            >
              <Text
                style={[
                  AddLostFoundStyles.typeButtonText,
                  type === 'Lost' && AddLostFoundStyles.typeButtonTextActive,
                ]}
              >
                {t('smartSociety.lost') || 'Lost'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                AddLostFoundStyles.typeButton,
                type === 'Found' && AddLostFoundStyles.typeButtonActive,
              ]}
              onPress={() => setType('Found')}
            >
              <Text
                style={[
                  AddLostFoundStyles.typeButtonText,
                  type === 'Found' && AddLostFoundStyles.typeButtonTextActive,
                ]}
              >
                {t('smartSociety.found') || 'Found'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Item Name */}
        <View style={AddLostFoundStyles.section}>
          <Text style={AddLostFoundStyles.label}>
            {t('smartSociety.itemName') || 'Item Name'} <Text style={AddLostFoundStyles.required}>*</Text>
          </Text>
          <TextInput
            style={AddLostFoundStyles.input}
            value={itemName}
            onChangeText={setItemName}
            placeholder={t('smartSociety.enterItemName') || 'e.g., Wallet, Keys, Phone'}
            placeholderTextColor={COLORS.GREY_TEXT}
          />
        </View>

        {/* Description */}
        <View style={AddLostFoundStyles.section}>
          <Text style={AddLostFoundStyles.label}>
            {t('smartSociety.description') || 'Description'} <Text style={AddLostFoundStyles.required}>*</Text>
          </Text>
          <TextInput
            style={AddLostFoundStyles.textArea}
            value={description}
            onChangeText={setDescription}
            placeholder={t('smartSociety.enterDescription') || 'Describe the item in detail...'}
            placeholderTextColor={COLORS.GREY_TEXT}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>

        {/* Location */}
        <View style={AddLostFoundStyles.section}>
          <Text style={AddLostFoundStyles.label}>
            {t('smartSociety.location') || 'Location'} ({t('smartSociety.optional') || 'Optional'})
          </Text>
          <TextInput
            style={AddLostFoundStyles.input}
            value={location}
            onChangeText={setLocation}
            placeholder={t('smartSociety.enterLocation') || 'e.g., Parking Zone B, Lift Area'}
            placeholderTextColor={COLORS.GREY_TEXT}
          />
        </View>

        {/* Contact Number */}
        <View style={AddLostFoundStyles.section}>
          <Text style={AddLostFoundStyles.label}>
            {t('smartSociety.contactNumber') || 'Contact Number'} ({t('smartSociety.optional') || 'Optional'})
          </Text>
          <TextInput
            style={AddLostFoundStyles.input}
            value={contact}
            onChangeText={setContact}
            placeholder={t('smartSociety.enterContactNumber') || 'e.g., 9876543210'}
            placeholderTextColor={COLORS.GREY_TEXT}
            keyboardType="phone-pad"
          />
        </View>

        {/* Image Upload */}
        <View style={AddLostFoundStyles.section}>
          <Text style={AddLostFoundStyles.label}>
            {t('smartSociety.uploadImage') || 'Upload Image'} ({t('smartSociety.optional') || 'Optional'})
          </Text>
          <TouchableOpacity
            style={AddLostFoundStyles.imagePickerButton}
            onPress={handleImagePicker}
          >
            <Text style={AddLostFoundStyles.imagePickerText}>
              {imageUri ? t('smartSociety.changeImage') || 'Change Image' : t('smartSociety.addImage') || 'Add Image'}
            </Text>
          </TouchableOpacity>
          {imageUri && (
            <View style={AddLostFoundStyles.imagePreview}>
              <Image source={{ uri: imageUri }} style={AddLostFoundStyles.previewImage} />
              <TouchableOpacity
                style={AddLostFoundStyles.removeImageButton}
                onPress={() => setImageUri(null)}
              >
                <Text style={AddLostFoundStyles.removeImageText}>×</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <CustomButton
          title={t('smartSociety.submitReport') || 'Submit Report'}
          onPress={handleSubmit}
          style={AddLostFoundStyles.submitButton}
        />
      </ScrollView>
    </Container>
  );
};

export default AddLostFound;

