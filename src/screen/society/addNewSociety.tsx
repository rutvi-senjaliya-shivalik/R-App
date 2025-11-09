import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Container,
  HeaderComponent,
} from '../../components/common';
import { AddNewSocietyStyles } from './styles';
import { COLORS } from '../../constants';
import { useTranslation } from '../../context/LanguageContext';

const AddNewSociety = (props: any) => {
  const { t } = useTranslation();
  const isMountedRef = useRef(true);

  const [formData, setFormData] = useState({
    societyName: '',
    address: '',
    contactPersonName: '',
    contactNumber: '',
    approxMembers: '',
    notes: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.societyName.trim()) {
      newErrors.societyName = t('society.societyNameRequired');
    }

    if (!formData.address.trim()) {
      newErrors.address = t('society.addressRequired');
    }

    if (!formData.contactPersonName.trim()) {
      newErrors.contactPersonName = t('society.contactPersonNameRequired');
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = t('society.contactNumberRequired');
    } else if (!/^\d{10}$/.test(formData.contactNumber.replace(/\D/g, ''))) {
      newErrors.contactNumber = t('society.invalidMobileNumber');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    // TODO: Submit enquiry to API
    const enquiryData = {
      societyName: formData.societyName.trim(),
      address: formData.address.trim(),
      contactPersonName: formData.contactPersonName.trim(),
      contactNumber: formData.contactNumber.trim(),
      approxMembers: formData.approxMembers.trim() || null,
      notes: formData.notes.trim() || null,
    };

    console.log('Submitting enquiry:', enquiryData);

    Alert.alert(
      t('society.success'),
      t('society.enquirySubmittedSuccessfully'),
      [
        {
          text: t('common.ok'),
          onPress: () => {
            props.navigation?.goBack();
          },
        },
      ]
    );
  };

  const handleCancel = () => {
    Alert.alert(
      t('society.cancel'),
      t('society.cancelConfirmation'),
      [
        {
          text: t('common.no'),
          style: 'cancel',
        },
        {
          text: t('common.yes'),
          onPress: () => {
            props.navigation?.goBack();
          },
        },
      ]
    );
  };

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <Container>
      <HeaderComponent
        Title={t('society.addNewSociety')}
        onPress={() => props.navigation?.goBack()}
        showLanguageSelector={false}
      />
      <ScrollView
        style={AddNewSocietyStyles.container}
        contentContainerStyle={AddNewSocietyStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={AddNewSocietyStyles.card}>
          <Text style={AddNewSocietyStyles.title}>
            {t('society.addNewSociety')}
          </Text>
          <Text style={AddNewSocietyStyles.subtitle}>
            {t('society.submitEnquirySubtitle')}
          </Text>

          {/* Society Name */}
          <View style={AddNewSocietyStyles.fieldContainer}>
            <Text style={AddNewSocietyStyles.label}>
              {t('society.societyName')}{' '}
              <Text style={AddNewSocietyStyles.required}>*</Text>
            </Text>
            <TextInput
              style={[
                AddNewSocietyStyles.input,
                errors.societyName && AddNewSocietyStyles.inputError,
              ]}
              placeholder={t('society.enterSocietyName')}
              placeholderTextColor={COLORS.GREY_TEXT}
              value={formData.societyName}
              onChangeText={(text) => updateFormData('societyName', text)}
            />
            {errors.societyName && (
              <Text style={AddNewSocietyStyles.errorText}>
                {errors.societyName}
              </Text>
            )}
          </View>

          {/* Address / Location */}
          <View style={AddNewSocietyStyles.fieldContainer}>
            <Text style={AddNewSocietyStyles.label}>
              {t('society.addressLocation')}{' '}
              <Text style={AddNewSocietyStyles.required}>*</Text>
            </Text>
            <TextInput
              style={[
                AddNewSocietyStyles.textArea,
                errors.address && AddNewSocietyStyles.inputError,
              ]}
              placeholder={t('society.enterCompleteAddress')}
              placeholderTextColor={COLORS.GREY_TEXT}
              value={formData.address}
              onChangeText={(text) => updateFormData('address', text)}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            {errors.address && (
              <Text style={AddNewSocietyStyles.errorText}>
                {errors.address}
              </Text>
            )}
          </View>

          {/* Contact Person Name and Contact Number Row */}
          <View style={AddNewSocietyStyles.row}>
            <View style={[AddNewSocietyStyles.fieldContainer, AddNewSocietyStyles.halfWidth]}>
              <Text style={AddNewSocietyStyles.label}>
                {t('society.contactPersonName')}{' '}
                <Text style={AddNewSocietyStyles.required}>*</Text>
              </Text>
              <TextInput
                style={[
                  AddNewSocietyStyles.input,
                  errors.contactPersonName && AddNewSocietyStyles.inputError,
                ]}
                placeholder={t('society.enterName')}
                placeholderTextColor={COLORS.GREY_TEXT}
                value={formData.contactPersonName}
                onChangeText={(text) => updateFormData('contactPersonName', text)}
              />
              {errors.contactPersonName && (
                <Text style={AddNewSocietyStyles.errorText}>
                  {errors.contactPersonName}
                </Text>
              )}
            </View>

            <View style={[AddNewSocietyStyles.fieldContainer, AddNewSocietyStyles.halfWidth]}>
              <Text style={AddNewSocietyStyles.label}>
                {t('society.contactNumber')}{' '}
                <Text style={AddNewSocietyStyles.required}>*</Text>
              </Text>
              <TextInput
                style={[
                  AddNewSocietyStyles.input,
                  errors.contactNumber && AddNewSocietyStyles.inputError,
                ]}
                placeholder={t('society.enterMobileNumber')}
                placeholderTextColor={COLORS.GREY_TEXT}
                value={formData.contactNumber}
                onChangeText={(text) => updateFormData('contactNumber', text)}
                keyboardType="phone-pad"
                maxLength={10}
              />
              {errors.contactNumber && (
                <Text style={AddNewSocietyStyles.errorText}>
                  {errors.contactNumber}
                </Text>
              )}
            </View>
          </View>

          {/* Approx. No. of Members / Units */}
          <View style={AddNewSocietyStyles.fieldContainer}>
            <Text style={AddNewSocietyStyles.label}>
              {t('society.approxMembersUnits')}
            </Text>
            <TextInput
              style={AddNewSocietyStyles.input}
              placeholder={t('society.enterApproximateNumber')}
              placeholderTextColor={COLORS.GREY_TEXT}
              value={formData.approxMembers}
              onChangeText={(text) => updateFormData('approxMembers', text)}
              keyboardType="numeric"
            />
          </View>

          {/* Notes / Message */}
          <View style={AddNewSocietyStyles.fieldContainer}>
            <Text style={AddNewSocietyStyles.label}>
              {t('society.notesMessage')}
            </Text>
            <TextInput
              style={AddNewSocietyStyles.textArea}
              placeholder={t('society.additionalInformation')}
              placeholderTextColor={COLORS.GREY_TEXT}
              value={formData.notes}
              onChangeText={(text) => updateFormData('notes', text)}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Action Buttons */}
          <View style={AddNewSocietyStyles.buttonContainer}>
            <TouchableOpacity
              style={AddNewSocietyStyles.cancelButton}
              onPress={handleCancel}
              activeOpacity={0.7}
            >
              <Text style={AddNewSocietyStyles.cancelButtonText}>
                {t('common.cancel')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={AddNewSocietyStyles.submitButton}
              onPress={handleSubmit}
              activeOpacity={0.7}
            >
              <Text style={AddNewSocietyStyles.submitButtonText}>
                {t('society.submitEnquiry')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default AddNewSociety;

