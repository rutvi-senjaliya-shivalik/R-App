import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {
  Container,
  HeaderComponent,
  CustomButton,
} from '../../../components/common';
import EditProfileStyles from './styles/editProfileStyles';
import { COLORS } from '../../../constants';
import { useTranslation } from '../../../context/LanguageContext';

const EditProfile = (props: any) => {
  const { t } = useTranslation();
  const isMountedRef = useRef(true);
  const selectedRole = props.route?.params?.selectedRole;
  
  // Personal Information
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [alternatePhone, setAlternatePhone] = useState('');
  
  // Flat Information
  const [flatNumber, setFlatNumber] = useState('');
  const [buildingName, setBuildingName] = useState('');
  const [floorNumber, setFloorNumber] = useState('');
  const [flatArea, setFlatArea] = useState('');
  const [ownershipType, setOwnershipType] = useState('');
  
  // Address Information
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  const ownershipTypes = [
    { key: 'Owner', label: t('smartSociety.owner') },
    { key: 'Tenant', label: t('smartSociety.tenant') },
    { key: 'Family Member', label: t('smartSociety.familyMember') },
  ];

  useEffect(() => {
    isMountedRef.current = true;
    // TODO: Fetch profile data from API
    // Mock data for now
    setFirstName('John');
    setLastName('Doe');
    setEmail('john.doe@example.com');
    setPhoneNumber('9876543210');
    setAlternatePhone('9876543211');
    setFlatNumber('A-101');
    setBuildingName('Green Valley Apartments');
    setFloorNumber('1');
    setFlatArea('1200');
    setOwnershipType('Owner');
    setAddressLine1('123 Main Street');
    setAddressLine2('Near Park');
    setCity('Mumbai');
    setState('Maharashtra');
    setPincode('400001');
    
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const validateForm = () => {
    if (!firstName.trim()) {
      Alert.alert(t('common.error'), t('smartSociety.pleaseEnterFirstName'));
      return false;
    }
    if (!lastName.trim()) {
      Alert.alert(t('common.error'), t('smartSociety.pleaseEnterLastName'));
      return false;
    }
    if (!email.trim()) {
      Alert.alert(t('common.error'), t('smartSociety.pleaseEnterEmail'));
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert(t('common.error'), t('smartSociety.pleaseEnterValidEmailAddress'));
      return false;
    }
    if (!phoneNumber.trim()) {
      Alert.alert(t('common.error'), t('smartSociety.pleaseEnterPhoneNumber'));
      return false;
    }
    if (!/^\d{10}$/.test(phoneNumber)) {
      Alert.alert(t('common.error'), t('smartSociety.pleaseEnterValid10DigitPhoneNumber'));
      return false;
    }
    if (!flatNumber.trim()) {
      Alert.alert(t('common.error'), t('smartSociety.pleaseEnterFlatNumber'));
      return false;
    }
    if (!pincode.trim()) {
      Alert.alert(t('common.error'), t('smartSociety.pleaseEnterPincode'));
      return false;
    }
    if (!/^\d{6}$/.test(pincode)) {
      Alert.alert(t('common.error'), t('smartSociety.pleaseEnterValid6DigitPincode'));
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    // TODO: Save to API
    const profileData = {
      personalInfo: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phoneNumber: phoneNumber.trim(),
        alternatePhone: alternatePhone.trim(),
      },
      flatInfo: {
        flatNumber: flatNumber.trim(),
        buildingName: buildingName.trim(),
        floorNumber: floorNumber.trim(),
        flatArea: flatArea.trim(),
        ownershipType,
      },
      address: {
        addressLine1: addressLine1.trim(),
        addressLine2: addressLine2.trim(),
        city: city.trim(),
        state: state.trim(),
        pincode: pincode.trim(),
      },
    };

    Alert.alert(t('common.success'), t('smartSociety.profileUpdatedSuccessfully'), [
      {
        text: t('common.ok'),
        onPress: () => {
          props.navigation?.goBack();
        },
      },
    ]);
  };

  return (
    <Container>
      <HeaderComponent
        Title={t('smartSociety.editProfile')}
        onPress={() => props.navigation?.goBack()}
      />
      <ScrollView
        style={EditProfileStyles.container}
        contentContainerStyle={EditProfileStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Personal Information Section */}
        <View style={EditProfileStyles.section}>
          <Text style={EditProfileStyles.sectionTitle}>
            {t('smartSociety.personalInformation')}
          </Text>
          
          <View style={EditProfileStyles.field}>
            <Text style={EditProfileStyles.label}>{t('smartSociety.firstName')}</Text>
            <TextInput
              style={EditProfileStyles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholder={t('smartSociety.pleaseEnterFirstName')}
              placeholderTextColor={COLORS.GREY_TEXT}
              autoCapitalize="words"
            />
          </View>

          <View style={EditProfileStyles.field}>
            <Text style={EditProfileStyles.label}>{t('smartSociety.lastName')}</Text>
            <TextInput
              style={EditProfileStyles.input}
              value={lastName}
              onChangeText={setLastName}
              placeholder={t('smartSociety.pleaseEnterLastName')}
              placeholderTextColor={COLORS.GREY_TEXT}
              autoCapitalize="words"
            />
          </View>

          <View style={EditProfileStyles.field}>
            <Text style={EditProfileStyles.label}>{t('smartSociety.email')}</Text>
            <TextInput
              style={EditProfileStyles.input}
              value={email}
              onChangeText={setEmail}
              placeholder={t('smartSociety.pleaseEnterEmail')}
              placeholderTextColor={COLORS.GREY_TEXT}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={EditProfileStyles.field}>
            <Text style={EditProfileStyles.label}>{t('smartSociety.phoneNumber')}</Text>
            <TextInput
              style={EditProfileStyles.input}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder={t('smartSociety.pleaseEnterPhoneNumber')}
              placeholderTextColor={COLORS.GREY_TEXT}
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>

          <View style={EditProfileStyles.field}>
            <Text style={EditProfileStyles.label}>{t('smartSociety.alternatePhone')}</Text>
            <TextInput
              style={EditProfileStyles.input}
              value={alternatePhone}
              onChangeText={setAlternatePhone}
              placeholder={t('smartSociety.alternatePhone')}
              placeholderTextColor={COLORS.GREY_TEXT}
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>
        </View>

        {/* Flat Information Section */}
        <View style={EditProfileStyles.section}>
          <Text style={EditProfileStyles.sectionTitle}>{t('smartSociety.flatInformation')}</Text>
          
          <View style={EditProfileStyles.field}>
            <Text style={EditProfileStyles.label}>{t('smartSociety.flatNumber')}</Text>
            <TextInput
              style={EditProfileStyles.input}
              value={flatNumber}
              onChangeText={setFlatNumber}
              placeholder={t('smartSociety.pleaseEnterFlatNumber')}
              placeholderTextColor={COLORS.GREY_TEXT}
              autoCapitalize="characters"
            />
          </View>

          <View style={EditProfileStyles.field}>
            <Text style={EditProfileStyles.label}>{t('smartSociety.buildingName')}</Text>
            <TextInput
              style={EditProfileStyles.input}
              value={buildingName}
              onChangeText={setBuildingName}
              placeholder={t('smartSociety.buildingName')}
              placeholderTextColor={COLORS.GREY_TEXT}
              autoCapitalize="words"
            />
          </View>

          <View style={EditProfileStyles.field}>
            <Text style={EditProfileStyles.label}>{t('smartSociety.floorNumber')}</Text>
            <TextInput
              style={EditProfileStyles.input}
              value={floorNumber}
              onChangeText={setFloorNumber}
              placeholder={t('smartSociety.floorNumber')}
              placeholderTextColor={COLORS.GREY_TEXT}
              keyboardType="number-pad"
            />
          </View>

          <View style={EditProfileStyles.field}>
            <Text style={EditProfileStyles.label}>{t('smartSociety.flatArea')}</Text>
            <TextInput
              style={EditProfileStyles.input}
              value={flatArea}
              onChangeText={setFlatArea}
              placeholder={t('smartSociety.flatArea')}
              placeholderTextColor={COLORS.GREY_TEXT}
              keyboardType="number-pad"
            />
          </View>

          <View style={EditProfileStyles.field}>
            <Text style={EditProfileStyles.label}>{t('smartSociety.ownershipType')}</Text>
            <View style={EditProfileStyles.typesContainer}>
              {ownershipTypes.map(type => (
                <TouchableOpacity
                  key={type.key}
                  style={[
                    EditProfileStyles.typeChip,
                    ownershipType === type.key &&
                      EditProfileStyles.typeChipActive,
                  ]}
                  onPress={() => setOwnershipType(type.key)}
                >
                  <Text
                    style={[
                      EditProfileStyles.typeChipText,
                      ownershipType === type.key &&
                        EditProfileStyles.typeChipTextActive,
                    ]}
                  >
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Address Information Section */}
        <View style={EditProfileStyles.section}>
          <Text style={EditProfileStyles.sectionTitle}>{t('smartSociety.addressInformation')}</Text>
          
          <View style={EditProfileStyles.field}>
            <Text style={EditProfileStyles.label}>{t('smartSociety.addressLine1')}</Text>
            <TextInput
              style={EditProfileStyles.input}
              value={addressLine1}
              onChangeText={setAddressLine1}
              placeholder={t('smartSociety.addressLine1')}
              placeholderTextColor={COLORS.GREY_TEXT}
              autoCapitalize="words"
            />
          </View>

          <View style={EditProfileStyles.field}>
            <Text style={EditProfileStyles.label}>{t('smartSociety.addressLine2')}</Text>
            <TextInput
              style={EditProfileStyles.input}
              value={addressLine2}
              onChangeText={setAddressLine2}
              placeholder={t('smartSociety.addressLine2')}
              placeholderTextColor={COLORS.GREY_TEXT}
              autoCapitalize="words"
            />
          </View>

          <View style={EditProfileStyles.field}>
            <Text style={EditProfileStyles.label}>{t('smartSociety.city')}</Text>
            <TextInput
              style={EditProfileStyles.input}
              value={city}
              onChangeText={setCity}
              placeholder={t('smartSociety.city')}
              placeholderTextColor={COLORS.GREY_TEXT}
              autoCapitalize="words"
            />
          </View>

          <View style={EditProfileStyles.field}>
            <Text style={EditProfileStyles.label}>{t('smartSociety.state')}</Text>
            <TextInput
              style={EditProfileStyles.input}
              value={state}
              onChangeText={setState}
              placeholder={t('smartSociety.state')}
              placeholderTextColor={COLORS.GREY_TEXT}
              autoCapitalize="words"
            />
          </View>

          <View style={EditProfileStyles.field}>
            <Text style={EditProfileStyles.label}>{t('smartSociety.pincode')}</Text>
            <TextInput
              style={EditProfileStyles.input}
              value={pincode}
              onChangeText={setPincode}
              placeholder={t('smartSociety.pleaseEnterPincode')}
              placeholderTextColor={COLORS.GREY_TEXT}
              keyboardType="number-pad"
              maxLength={6}
            />
          </View>
        </View>

        <View style={EditProfileStyles.saveButton}>
          <CustomButton
            title={t('smartSociety.saveChanges')}
            onPress={handleSave}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default EditProfile;

