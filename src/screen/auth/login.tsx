import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { Loginstyles } from './styles';
import {
  Container,
  CountryInputField,
  CustomButton,
  KeyboardAvoidingView,
} from '../../components/common';
import { COLORS, IMAGES } from '../../constants';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../store/actions/auth/loginAction';
import { getMaxPhoneLength, openLink } from '../../utils/helper';
import PrefManager from '../../utils/prefManager';
import STRING from '../../constants/strings';
import { validateIndianPhoneNumber } from '../../utils/validationHelper';
import { useTranslation } from '../../context/LanguageContext';

const Login = ({ navigation }: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch() as any;
  const [mobileNumber, setMobileNumber] = useState('9988776655');
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneError, setPhoneError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isMountedRef = useRef(true);
  const isProcessingRef = useRef(false);

  const handleCountryCodeChange = (code: string) => {
    setCountryCode(code);
    setPhoneError(''); // Clear error when country code changes
  };

  const handlePhoneNumberChange = (text: string) => {
    setMobileNumber(text);
    setPhoneError(''); // Clear error when phone number changes
  };

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Auto-clear error after 2 seconds
  useEffect(() => {
    if (phoneError) {
      const timer = setTimeout(() => {
        if (isMountedRef.current) {
          setPhoneError('');
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [phoneError]);

  const handleLoginValidation = () => {
    // Prevent validation if already processing
    if (isProcessingRef.current || isLoading) {
      return;
    }

    const maxLength = getMaxPhoneLength(countryCode);

    // Check if mobile number is blank
    if (mobileNumber.trim() === '') {
      if (isMountedRef.current) {
        setPhoneError(t('auth.pleaseEnterMobileNumber'));
      }
      return;
    }

    // Check if mobile number length is less than required
    if (mobileNumber.length < maxLength) {
      if (isMountedRef.current) {
        setPhoneError(
          t('auth.pleaseEnterValidPhoneNumber', { digits: maxLength }),
        );
      }
      return;
    }

    // Special validation for Indian phone numbers (+91)
    if (countryCode === '+91') {
      const validationResult = validateIndianPhoneNumber(
        mobileNumber,
        countryCode,
      );
      if (!validationResult.isValid) {
        if (isMountedRef.current) {
          setPhoneError(
            validationResult.fieldErrors.phoneNumber ||
              t('auth.invalidPhoneNumber'),
          );
        }
        return;
      }
    }

    // If validation passes, clear error and proceed with login
    if (isMountedRef.current) {
      setPhoneError('');
    }
    handleLogin();
  };

  const handleLogin = async () => {
    // Prevent multiple simultaneous calls
    if (isProcessingRef.current) {
      console.log('Login already in progress, ignoring duplicate call');
      return;
    }

    isProcessingRef.current = true;

    if (isMountedRef.current) {
      setIsLoading(true);
    }

    try {
      // Clear any existing token
      await PrefManager.removeValue(STRING.TOKEN);

      // API call for login
      const payload = {
        countryCode: countryCode,
        phoneNumber: mobileNumber,
        userLoginType: 2,
      };

      const response = await dispatch(loginAction(payload));
      console.log('🚀 ~ handleLogin ~ response:', response);

      // Check if component is still mounted before updating state
      if (!isMountedRef.current) {
        return;
      }

      // Safe response handling
      if (response && response.status === 200) {
        console.log('Login Success', response.data);
        // Navigate to OTP screen with phone number
        if (navigation?.navigate) {
          navigation.navigate('OtpScreen', {
            phoneNumber: mobileNumber,
            countryCode: countryCode,
          });
        }
      } else {
        console.log('Login Failed', response);
        Alert.alert(t('auth.loginFailed'), t('auth.pleaseTryAgain'));
      }
    } catch (error: any) {
      console.log('Login error:', error);
      // Only show alert if component is still mounted
      if (isMountedRef.current) {
        Alert.alert(
          t('auth.loginFailed'),
          error?.message || t('auth.pleaseTryAgain'),
        );
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
      isProcessingRef.current = false;
    }
  };

  const handleTermsPress = () => {
    openLink('https://realestateos.io/terms-and-conditions');
  };

  const handlePrivacyPress = () => {
    openLink('https://realestateos.io/privacy-policy');
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <Container>
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={Loginstyles.container}>
            {/* App Logo */}
            <View style={Loginstyles.header}>
              <Image source={IMAGES.APP_LOGO} style={Loginstyles.logo} />
            </View>

            {/* Login Title */}
            <View style={Loginstyles.titleContainer}>
              <Text style={Loginstyles.title}>{t('auth.login')}</Text>
            </View>

            {/* Mobile Number Input Section */}
            <View style={Loginstyles.inputSection}>
              <Text style={Loginstyles.inputLabel}>
                {t('auth.enterMobileNumber')}
              </Text>
            </View>
            <View style={Loginstyles.inputContainer}>
              <CountryInputField
                placeholder={t('auth.mobileNo')}
                value={mobileNumber}
                onChangeText={handlePhoneNumberChange}
                onCountryCodeChange={handleCountryCodeChange}
                maxLength={getMaxPhoneLength(countryCode)}
              />
            </View>

            {/* Error Message */}
            {phoneError ? (
              <View
                style={[Loginstyles.errorContainer, { alignSelf: 'flex-end' }]}
              >
                <Text style={Loginstyles.errorText}>{phoneError}</Text>
              </View>
            ) : null}

            {/* Quick Fill Number Buttons */}
            <View style={Loginstyles.quickFillContainer}>
              <Text style={Loginstyles.quickFillLabel}>
                {t('auth.clickOnNumberToLoginAs')}
              </Text>
              <View style={Loginstyles.quickFillButtons}>
                <TouchableOpacity
                  onPress={() => {
                    setMobileNumber('9876543330');
                    setPhoneError('');
                  }}
                  activeOpacity={0.7}
                >
                  <View style={Loginstyles.quickFillButton}>
                    <Text style={Loginstyles.quickFillButtonText}>
                      Security: 9876543330
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setMobileNumber('9906546153');
                    setPhoneError('');
                  }}
                  activeOpacity={0.7}
                >
                  <View style={Loginstyles.quickFillButton}>
                    <Text style={Loginstyles.quickFillButtonText}>
                      Member: 9906546153
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setMobileNumber('7698213884');
                    setPhoneError('');
                  }}
                  activeOpacity={0.7}
                >
                  <View style={Loginstyles.quickFillButton}>
                    <Text style={Loginstyles.quickFillButtonText}>
                      Admin: 7698213884
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* Continue Button */}
            <View style={Loginstyles.buttonContainer}>
              <CustomButton
                title={t('auth.continue')}
                onPress={handleLoginValidation}
                loading={isLoading}
              />
              <View style={Loginstyles.termsContainer}>
                <Text style={Loginstyles.termsText}>
                  {t('auth.termsAndConditions')}{' '}
                  <Text style={Loginstyles.linkText} onPress={handleTermsPress}>
                    {t('auth.termsOfService')}
                  </Text>{' '}
                  {t('auth.and')}{' '}
                  <Text
                    style={Loginstyles.linkText}
                    onPress={handlePrivacyPress}
                  >
                    {t('auth.privacyPolicy')}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Login;
