import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {
  Container,
  HeaderComponent,
  CustomButton,
  ImagePickerModal,
  Dropdowns,
} from '../../../components/common';
import AddAmenityStyles from './styles/addAmenityStyles';
import { COLORS } from '../../../constants';
import { useTranslation } from '../../../context/LanguageContext';
import ImagePicker from 'react-native-image-crop-picker';

interface Amenity {
  id?: string;
  name: string;
  description: string;
  imageUrl?: string;
  capacity: number;
  hourlyRate?: number;
  advanceBookingDays: number;
  requiresApproval: boolean;
  isActive: boolean;
  rules?: string[];
  operatingHours?: {
    open: string;
    close: string;
  };
}

const AddAmenity = (props: any) => {
  const { t } = useTranslation();
  const isMountedRef = useRef(true);
  const selectedRole = props.route?.params?.selectedRole;
  const editingAmenity = props.route?.params?.amenity as Amenity | undefined;
  const isEdit = props.route?.params?.isEdit || false;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    capacity: '',
    hourlyRate: '',
    advanceBookingDays: '7',
    requiresApproval: false,
    isActive: true,
    openTime: '08:00',
    closeTime: '22:00',
  });

  const [amenityImage, setAmenityImage] = useState<string | null>(null);
  const [rules, setRules] = useState<string[]>(['']);
  const [isImagePickerVisible, setIsImagePickerVisible] = useState(false);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    isMountedRef.current = true;
    if (isEdit && editingAmenity) {
      setFormData({
        name: editingAmenity.name,
        description: editingAmenity.description,
        capacity: editingAmenity.capacity.toString(),
        hourlyRate: editingAmenity.hourlyRate?.toString() || '',
        advanceBookingDays: editingAmenity.advanceBookingDays.toString(),
        requiresApproval: editingAmenity.requiresApproval,
        isActive: editingAmenity.isActive,
        openTime: editingAmenity.operatingHours?.open || '08:00',
        closeTime: editingAmenity.operatingHours?.close || '22:00',
      });
      setAmenityImage(editingAmenity.imageUrl || null);
      setRules(
        editingAmenity.rules && editingAmenity.rules.length > 0
          ? editingAmenity.rules
          : [''],
      );
    }
    return () => {
      isMountedRef.current = false;
    };
  }, [isEdit, editingAmenity]);

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: '' }));
    }
  };

  const addRule = () => {
    setRules(prev => [...prev, '']);
  };

  const updateRule = (index: number, value: string) => {
    setRules(prev => {
      const newRules = [...prev];
      newRules[index] = value;
      return newRules;
    });
  };

  const removeRule = (index: number) => {
    if (rules.length > 1) {
      setRules(prev => prev.filter((_, i) => i !== index));
    }
  };

  const checkStoragePermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to your storage to select images',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const handleImagePicker = () => {
    setIsImagePickerVisible(true);
  };

  const handleCameraPress = async () => {
    try {
      setIsImagePickerVisible(false);
      const image = await ImagePicker.openCamera({
        width: 800,
        height: 600,
        cropping: true,
        compressImageQuality: 0.8,
      });
      setAmenityImage(image.path);
    } catch (error: any) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        Alert.alert(t('common.error'), t('smartSociety.failedToCaptureImage'));
      }
    }
  };

  const handleGalleryPress = async () => {
    try {
      setIsImagePickerVisible(false);
      const hasPermission = await checkStoragePermission();

      if (!hasPermission) {
        Alert.alert(
          t('common.storagePermissionRequired'),
          t('smartSociety.storagePermissionRequiredForEventImages'),
          [{ text: t('common.ok') }],
        );
        return;
      }

      const image = await ImagePicker.openPicker({
        width: 800,
        height: 600,
        cropping: true,
        compressImageQuality: 0.8,
      });
      setAmenityImage(image.path);
    } catch (error: any) {
      if (
        error.code !== 'E_PICKER_CANCELLED' &&
        error.code !== 'picker_canceled'
      ) {
        Alert.alert(t('common.error'), t('smartSociety.failedToSelectImage'));
      }
    }
  };

  const handleRemoveImage = () => {
    setAmenityImage(null);
  };

  const validateForm = (): boolean => {
    const newErrors: any = {};

    if (!formData.name.trim()) {
      newErrors.name =
        t('smartSociety.amenityNameRequired') || 'Amenity name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description =
        t('smartSociety.amenityDescriptionRequired') ||
        'Description is required';
    }

    if (!formData.capacity || parseInt(formData.capacity) <= 0) {
      newErrors.capacity =
        t('smartSociety.validCapacityRequired') || 'Valid capacity is required';
    }

    if (formData.hourlyRate && parseFloat(formData.hourlyRate) < 0) {
      newErrors.hourlyRate =
        t('smartSociety.validRateRequired') || 'Valid rate is required';
    }

    if (
      !formData.advanceBookingDays ||
      parseInt(formData.advanceBookingDays) < 0
    ) {
      newErrors.advanceBookingDays =
        t('smartSociety.validBookingDaysRequired') ||
        'Valid booking days is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const amenityData: Amenity = {
      id: editingAmenity?.id || `amenity${Date.now()}`,
      name: formData.name.trim(),
      description: formData.description.trim(),
      imageUrl: amenityImage || undefined,
      capacity: parseInt(formData.capacity),
      hourlyRate: formData.hourlyRate
        ? parseFloat(formData.hourlyRate)
        : undefined,
      advanceBookingDays: parseInt(formData.advanceBookingDays),
      requiresApproval: formData.requiresApproval,
      isActive: formData.isActive,
      rules: rules.filter(rule => rule.trim() !== ''),
      operatingHours: {
        open: formData.openTime,
        close: formData.closeTime,
      },
    };

    // TODO: Submit to API
    Alert.alert(
      t('common.success') || 'Success',
      isEdit
        ? t('smartSociety.amenityUpdatedSuccessfully') ||
            'Amenity updated successfully'
        : t('smartSociety.amenityCreatedSuccessfully') ||
            'Amenity created successfully',
      [
        {
          text: t('common.ok') || 'OK',
          onPress: () => props.navigation?.goBack(),
        },
      ],
    );
  };

  return (
    <Container>
      <HeaderComponent
        Title={
          isEdit
            ? t('smartSociety.editAmenity') || 'Edit Amenity'
            : t('smartSociety.addNewAmenity') || 'Add New Amenity'
        }
        onPress={() => props.navigation?.goBack()}
      />
      <ScrollView
        style={AddAmenityStyles.container}
        contentContainerStyle={AddAmenityStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={AddAmenityStyles.section}>
          <Text style={AddAmenityStyles.label}>
            {t('smartSociety.amenityName') || 'Amenity Name'}{' '}
            <Text style={AddAmenityStyles.required}>*</Text>
          </Text>
          <TextInput
            style={[
              AddAmenityStyles.input,
              errors.name && AddAmenityStyles.inputError,
            ]}
            value={formData.name}
            onChangeText={value => updateField('name', value)}
            placeholder={
              t('smartSociety.enterAmenityName') || 'Enter amenity name'
            }
            placeholderTextColor={COLORS.GREY_TEXT}
          />
          {errors.name && (
            <Text style={AddAmenityStyles.errorText}>{errors.name}</Text>
          )}
        </View>

        <View style={AddAmenityStyles.section}>
          <Text style={AddAmenityStyles.label}>
            {t('smartSociety.description') || 'Description'}{' '}
            <Text style={AddAmenityStyles.required}>*</Text>
          </Text>
          <TextInput
            style={[
              AddAmenityStyles.textArea,
              errors.description && AddAmenityStyles.inputError,
            ]}
            value={formData.description}
            onChangeText={value => updateField('description', value)}
            placeholder={
              t('smartSociety.enterDescription') || 'Enter description'
            }
            placeholderTextColor={COLORS.GREY_TEXT}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          {errors.description && (
            <Text style={AddAmenityStyles.errorText}>{errors.description}</Text>
          )}
        </View>

        <View style={AddAmenityStyles.section}>
          <Text style={AddAmenityStyles.label}>
            {t('smartSociety.amenityImage') || 'Amenity Image'} (Optional)
          </Text>
          {amenityImage ? (
            <View style={AddAmenityStyles.imageContainer}>
              <Image
                source={{ uri: amenityImage }}
                style={AddAmenityStyles.amenityImage}
              />
              <TouchableOpacity
                style={AddAmenityStyles.removeImageButton}
                onPress={handleRemoveImage}
              >
                <Text style={AddAmenityStyles.removeImageText}>
                  {t('common.remove')}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={AddAmenityStyles.imagePickerButton}
              onPress={handleImagePicker}
            >
              <Text style={AddAmenityStyles.imagePickerText}>
                {t('smartSociety.addImage')}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={AddAmenityStyles.row}>
          <View style={[AddAmenityStyles.section, AddAmenityStyles.halfWidth]}>
            <Text style={AddAmenityStyles.label}>
              {t('smartSociety.capacity') || 'Capacity'}{' '}
              <Text style={AddAmenityStyles.required}>*</Text>
            </Text>
            <TextInput
              style={[
                AddAmenityStyles.input,
                errors.capacity && AddAmenityStyles.inputError,
              ]}
              value={formData.capacity}
              onChangeText={value => updateField('capacity', value)}
              placeholder="0"
              placeholderTextColor={COLORS.GREY_TEXT}
              keyboardType="numeric"
            />
            {errors.capacity && (
              <Text style={AddAmenityStyles.errorText}>{errors.capacity}</Text>
            )}
          </View>

          <View style={[AddAmenityStyles.section, AddAmenityStyles.halfWidth]}>
            <Text style={AddAmenityStyles.label}>
              {t('smartSociety.hourlyRate') || 'Hourly Rate'} (Optional)
            </Text>
            <TextInput
              style={[
                AddAmenityStyles.input,
                errors.hourlyRate && AddAmenityStyles.inputError,
              ]}
              value={formData.hourlyRate}
              onChangeText={value => updateField('hourlyRate', value)}
              placeholder="₹0"
              placeholderTextColor={COLORS.GREY_TEXT}
              keyboardType="numeric"
            />
            {errors.hourlyRate && (
              <Text style={AddAmenityStyles.errorText}>
                {errors.hourlyRate}
              </Text>
            )}
          </View>
        </View>

        <View style={AddAmenityStyles.row}>
          <View style={[AddAmenityStyles.section, AddAmenityStyles.halfWidth]}>
            <Text style={AddAmenityStyles.label}>
              {t('smartSociety.advanceBookingDays') || 'Advance Booking (Days)'}{' '}
              <Text style={AddAmenityStyles.required}>*</Text>
            </Text>
            <TextInput
              style={[
                AddAmenityStyles.input,
                errors.advanceBookingDays && AddAmenityStyles.inputError,
              ]}
              value={formData.advanceBookingDays}
              onChangeText={value => updateField('advanceBookingDays', value)}
              placeholder="7"
              placeholderTextColor={COLORS.GREY_TEXT}
              keyboardType="numeric"
            />
            {errors.advanceBookingDays && (
              <Text style={AddAmenityStyles.errorText}>
                {errors.advanceBookingDays}
              </Text>
            )}
          </View>

          <View style={[AddAmenityStyles.section, AddAmenityStyles.halfWidth]}>
            <Text style={AddAmenityStyles.label}>
              {t('smartSociety.requiresApproval') || 'Requires Approval'}
            </Text>
            <Dropdowns
              data={[
                { label: t('common.yes') || 'Yes', value: 'true' },
                { label: t('common.no') || 'No', value: 'false' },
              ]}
              value={formData.requiresApproval ? 'true' : 'false'}
              onChange={(item: any) =>
                updateField('requiresApproval', item.value === 'true')
              }
              placeholder={t('smartSociety.selectApprovalRequired') || 'Select'}
            />
          </View>
        </View>

        <View style={AddAmenityStyles.row}>
          <View style={[AddAmenityStyles.section, AddAmenityStyles.halfWidth]}>
            <Text style={AddAmenityStyles.label}>
              {t('smartSociety.openTime') || 'Open Time'}
            </Text>
            <TextInput
              style={AddAmenityStyles.input}
              value={formData.openTime}
              onChangeText={value => updateField('openTime', value)}
              placeholder="08:00"
              placeholderTextColor={COLORS.GREY_TEXT}
            />
          </View>

          <View style={[AddAmenityStyles.section, AddAmenityStyles.halfWidth]}>
            <Text style={AddAmenityStyles.label}>
              {t('smartSociety.closeTime') || 'Close Time'}
            </Text>
            <TextInput
              style={AddAmenityStyles.input}
              value={formData.closeTime}
              onChangeText={value => updateField('closeTime', value)}
              placeholder="22:00"
              placeholderTextColor={COLORS.GREY_TEXT}
            />
          </View>
        </View>

        <View style={AddAmenityStyles.section}>
          <View style={AddAmenityStyles.rulesHeader}>
            <Text style={AddAmenityStyles.label}>
              {t('smartSociety.rules') || 'Rules'} (Optional)
            </Text>
            <TouchableOpacity onPress={addRule}>
              <Text style={AddAmenityStyles.addRuleText}>
                + {t('common.add') || 'Add'}
              </Text>
            </TouchableOpacity>
          </View>
          {rules.map((rule, index) => (
            <View key={index} style={AddAmenityStyles.ruleRow}>
              <TextInput
                style={AddAmenityStyles.ruleInput}
                value={rule}
                onChangeText={value => updateRule(index, value)}
                placeholder={t('smartSociety.enterRule') || 'Enter rule'}
                placeholderTextColor={COLORS.GREY_TEXT}
              />
              {rules.length > 1 && (
                <TouchableOpacity
                  style={AddAmenityStyles.removeRuleButton}
                  onPress={() => removeRule(index)}
                >
                  <Text style={AddAmenityStyles.removeRuleText}>×</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        <View style={AddAmenityStyles.submitButton}>
          <CustomButton
            title={
              isEdit
                ? t('common.update') || 'Update'
                : t('common.save') || 'Save'
            }
            onPress={handleSubmit}
          />
        </View>
      </ScrollView>

      <ImagePickerModal
        isVisible={isImagePickerVisible}
        onClose={() => setIsImagePickerVisible(false)}
        onCameraPress={handleCameraPress}
        onGalleryPress={handleGalleryPress}
        title={t('smartSociety.selectAmenityImage') || 'Select Amenity Image'}
      />
    </Container>
  );
};

export default AddAmenity;
