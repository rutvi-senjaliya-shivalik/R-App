import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { TerritoryStyles } from './styles';
import {
  Container,
  CustomButton,
  InputField,
  Dropdowns,
} from '../../components/common';
import { IMAGES, COLORS } from '../../constants';
import { territories } from '../../constants/arrays';
import {
  getAreaByPincodeAction,
  clearAreaData,
} from '../../store/actions/auth/areaByPincodeAction';
import { territorySubmissionAction } from '../../store/actions/auth/territorySubmissionAction';
import { setAuthToken } from '../../store/actions/auth/loginAction';
import {
  selectAreaByPincodeLocalities,
  selectAreaByPincodeLoading,
  selectTerritorySubmissionLoading,
} from '../../store/selectors/auth';
import PrefManager from '../../utils/prefManager';
import { useTranslation } from '../../context/LanguageContext';

const Territory = ({ route }: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch() as any;
  const areaLocalities = useSelector(selectAreaByPincodeLocalities);
  const areaLoading = useSelector(selectAreaByPincodeLoading);
  const territorySubmissionLoading = useSelector(
    selectTerritorySubmissionLoading,
  );

  const [selectedTerritory, setSelectedTerritory] = useState('');
  const [pincode, setPincode] = useState('');
  const [selectedArea, setSelectedArea] = useState('');

  // Get userData from route params
  const userData = route?.params?.userData;

  // Format territories from constants
  const formattedTerritories = territories.map(item => ({
    label: item.title,
    value: item._id,
  }));

  const handlePincodeChange = (text: string) => {
    // Only allow numeric characters (0-9)
    const numericText = text.replace(/[^0-9]/g, '');
    setPincode(numericText);

    // Clear previous area data when pincode changes
    if (areaLocalities && areaLocalities.length > 0) {
      dispatch(clearAreaData() as any);
      setSelectedArea('');
    }

    // Call API when pincode is 6 digits
    if (numericText.length === 6) {
      console.log('📍 Calling area API for pincode:', numericText);
      dispatch(getAreaByPincodeAction(numericText) as any);
    }
  };

  const handleTerritorySelect = (territory: string) => {
    setSelectedTerritory(territory);
    if (territory !== 'other') {
      setPincode('');
      setSelectedArea('');
      dispatch(clearAreaData() as any);
    }
  };

  // Form validation function to determine if button should be enabled
  const isFormValid = () => {
    // Basic validation: pincode must be 6 digits
    if (!pincode.trim() || pincode.length !== 6) {
      return false;
    }

    // If areas are loaded but no area is selected, form is invalid
    if (areaLocalities && areaLocalities.length > 0 && !selectedArea) {
      return false;
    }

    // If currently loading area data, disable button
    if (areaLoading) {
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    // Validate territory selection
    // if (!selectedTerritory) {
    //     Alert.alert('Validation Error', 'Please select a territory');
    //     return;
    // }

    if (selectedTerritory === 'other') {
      if (!pincode.trim()) {
        Alert.alert(t('auth.validationError'), t('auth.pleaseEnterPincode'));
        return;
      }
      if (pincode.length !== 6) {
        Alert.alert(t('auth.validationError'), t('auth.pleaseEnterValidPincode'));
        return;
      }
      if (areaLocalities && areaLocalities.length > 0 && !selectedArea) {
        Alert.alert(t('auth.validationError'), t('auth.pleaseSelectAnArea'));
        return;
      }
    }

    try {
      console.log('🌍 Submitting territory...');

      // Prepare territory payload based on selection
      let territoryPayload;

      // For "other" selection, include all location details
      territoryPayload = {
        territoryId: 'Other',
        pincode: pincode,
        country: 'India',
        countryShortCode: 'IN',
        state: 'Gujarat',
        stateShortCode: 'GJ',
        city: 'Ahmedabad',
        cityShortCode: 'Ahmedabad',
        territory: selectedArea,
      };

      console.log('Territory payload:', territoryPayload);

      // Call the territory submission API
      const territoryResponse = await dispatch(
        territorySubmissionAction(territoryPayload),
      );
      console.log('territoryResponse', territoryResponse);

      if (territoryResponse.status === 200) {
        console.log('✅ Territory submission completed successfully');
        const updatedUserData = territoryResponse.data.result;

        // Create complete user data with updated territory information
        const completeUserData = {
          ...userData,
          ...updatedUserData,
        };

        // Store complete user data with updated territory information
        PrefManager.setValue('userData', completeUserData);

        // Set authentication token with updated user data
        dispatch(
          setAuthToken({
            accessToken: userData.accessToken,
            userData: completeUserData,
          }),
        );

        console.log('🎉 Registration flow completed successfully!');
        console.log(
          '🔄 isAuthenticated should now be true, switching to AppStack...',
        );
      } else {
        console.log('Territory submission failed');
        Alert.alert(t('common.error'), t('auth.failedToSubmitTerritory'));
      }
    } catch (error: any) {
      console.log('Territory submission error:', error);
      Alert.alert(
        t('common.error'),
        error.message || t('auth.failedToSubmitTerritory'),
      );
    }
  };

  return (
    <Container>
      <View style={TerritoryStyles.container}>
        <View style={TerritoryStyles.logoContainer}>
          <Image source={IMAGES.APP_LOGO} style={TerritoryStyles.logo} />
        </View>
        <View style={TerritoryStyles.titleContainer}>
          <Text style={TerritoryStyles.title}>{t('auth.defineYourTerritory')}</Text>
          <Text style={TerritoryStyles.subtitle}>
            {t('auth.whichTerritoryYouBelong')}
          </Text>
        </View>

        {/* Territory Dropdown */}
        {/* <View style={styles.dropdownContainer}>
                    {DropDown(
                        [
                            ...formattedTerritories,
                            { label: 'Other', value: 'other' },
                        ],
                        selectedTerritory,
                        'Select Territory *',
                        handleTerritorySelect,
                        undefined,
                        'bottom',
                        styles.dropdownStyle
                    )}
                </View> */}

        {/* Pincode Input - Only show when "Other" is selected */}

        <>
          <View style={styles.inputContainer}>
            <InputField
              placeholder={t('auth.enterPincode')}
              value={pincode}
              onChangeText={handlePincodeChange}
              keyboardType="numeric"
              maxLength={6}
            />
          </View>

          {/* Loading indicator */}
          {areaLoading && (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>{t('auth.loadingAreas')}</Text>
            </View>
          )}

          {/* Area Dropdown - Only show when areas are loaded */}
          {areaLocalities && areaLocalities.length > 0 && (
            <View style={styles.dropdownContainer}>
              <Dropdowns
                data={areaLocalities.map((locality: string) => ({
                  label: locality,
                  value: locality,
                }))}
                value={selectedArea}
                placeholder={`${t('auth.selectArea')} *`}
                onChange={(value: string) => setSelectedArea(value)}
                dropdownStyle={styles.dropdownStyle}
              />
            </View>
          )}
        </>

        <View style={styles.buttonContainer}>
          <CustomButton
            title={territorySubmissionLoading ? t('auth.submitting') : t('auth.complete')}
            onPress={handleSubmit}
            disabled={territorySubmissionLoading || !isFormValid()}
          />
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  dropdownStyle: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_GREY,
    borderWidth: 0,
  },
  inputContainer: {
    marginTop: 16,
    marginHorizontal: 20,
  },
  loadingContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  loadingText: {
    textAlign: 'center',
    color: COLORS.GREY_TEXT,
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default Territory;
