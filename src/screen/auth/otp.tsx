import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Keyboard,
  Platform,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  AppState,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OtpScreenStyles } from './styles';
import { CustomButton, KeyboardAvoidingView } from '../../components/common';
import { IMAGES } from '../../constants';
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useDispatch } from 'react-redux';
import { otpVarifyAction } from '../../store/actions/auth/otpVarifyAction';
import {
  loginAction,
  setAuthToken,
} from '../../store/actions/auth/loginAction';
import PrefManager from '../../utils/prefManager';
import STRING from '../../constants/strings';
import { useTranslation } from '../../context/LanguageContext';

const OtpScreen = ({ route, navigation }: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch() as any;
  const CELL_COUNT = 6;
  const [cursorVisible, setCursorVisible] = useState(true);
  const codeFieldRef = useRef<any>(null);
  const [value, setValue] = useState('');
  const [otp, setOtp] = useState<string>('');
  const [timer, setTimer] = useState(120);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const isMountedRef = useRef(true);
  const isProcessingRef = useRef(false);

  // Get phone number and country code from route params
  const { phoneNumber, countryCode } = route.params || {
    phoneNumber: '',
    countryCode: '+91',
  };

  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Get remaining time from storage
  const getRemainingTime = async () => {
    try {
      const endTime = await AsyncStorage.getItem('otp_timer_end_time');
      if (endTime) {
        return Math.max(0, Math.floor((parseInt(endTime) - Date.now()) / 1000));
      }
    } catch (error) {
      console.log('Timer error:', error);
    }
    return 0;
  };

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  // Update timer display and handle expiry
  const updateTimer = async () => {
    if (!isMountedRef.current) {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
      return;
    }
    const remaining = await getRemainingTime();
    if (isMountedRef.current) {
      setTimer(remaining);
      setIsResendDisabled(remaining > 0);
    }

    if (remaining <= 0) {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
      await AsyncStorage.removeItem('otp_timer_end_time');
    }
  };

  // Start or restart timer
  const startTimer = async () => {
    if (!isMountedRef.current) return;
    const endTime = Date.now() + 120 * 1000;
    await AsyncStorage.setItem('otp_timer_end_time', endTime.toString());

    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    if (isMountedRef.current) {
      setTimer(120);
      setIsResendDisabled(true);
      timerIntervalRef.current = setInterval(updateTimer, 1000);
    }
  };

  // Handle app foreground
  useEffect(() => {
    const subscription = AppState.addEventListener('change', state => {
      if (state === 'active') updateTimer();
    });
    return () => subscription.remove();
  }, []);

  // Initialize timer on mount
  useEffect(() => {
    const init = async () => {
      const remaining = await getRemainingTime();
      if (!isMountedRef.current) return;
      if (remaining > 0) {
        if (isMountedRef.current) {
          setTimer(remaining);
          setIsResendDisabled(true);
          timerIntervalRef.current = setInterval(updateTimer, 1000);
        }
      } else {
        startTimer();
      }
    };
    init();
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  const handleOtpChange = (value: any) => {
    // Only allow numeric characters (0-9)
    const sanitizedVal = value.replace(/[^0-9]/g, '');
    setOtp(sanitizedVal);
    if (sanitizedVal.length === CELL_COUNT) {
      Keyboard.dismiss();
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleOtpVerification = async () => {
    // Prevent multiple simultaneous calls
    if (isProcessingRef.current) {
      console.log(
        'OTP verification already in progress, ignoring duplicate call',
      );
      return;
    }

    // Dismiss keyboard when verifying OTP
    Keyboard.dismiss();

    if (otp.length !== CELL_COUNT) {
      if (isMountedRef.current) {
        Alert.alert(t('auth.validationError'), t('auth.pleaseEnterValidOtp'));
      }
      return;
    }

    isProcessingRef.current = true;
    if (isMountedRef.current) {
      setIsLoading(true);
    }

    try {
      // API call for OTP verification
      const payload = {
        mobileNumber: phoneNumber,
        otp: otp,
        countryCode: countryCode,
      };

      const response = await dispatch(otpVarifyAction(payload));

      // Check if component is still mounted before updating state
      if (!isMountedRef.current) {
        isProcessingRef.current = false;
        return;
      }

      // Safe response handling
      if (response && response.status === 200) {
        console.log('OTP Success', response.data?.result);
        
        // Handle different response structures
        // API can return: response.data.result = { token, user, society, loginType, role }
        // Or: response.data = { token, user, society, loginType, role }
        const result = response.data?.result || response.data;
        
        // Extract token - check multiple possible locations
        const token = result?.token || result?.accessToken || response.data?.token;
        const userData = result?.user || result;
        const societyData = result?.society || response.data?.society;
        
        console.log('🔍 Token extraction:', {
          hasResult: !!result,
          hasTokenInResult: !!result?.token,
          hasAccessTokenInResult: !!result?.accessToken,
          hasTokenInData: !!response.data?.token,
          finalToken: !!token,
        });

        if (!token) {
          console.log('OTP Failed - No token in response');
          Alert.alert(
            t('auth.otpVerificationFailed'),
            t('auth.pleaseTryAgain'),
          );
          if (isMountedRef.current) {
            setIsLoading(false);
          }
          isProcessingRef.current = false;
          return;
        }

        // Store token for subsequent API calls
        console.log('💾 Storing token:', token.substring(0, 20) + '...');
        await PrefManager.setValue(STRING.TOKEN, token);
        
        // Prepare userData object with token for Redux
        const completeUserData = {
          ...userData,
          accessToken: token, // Add accessToken for compatibility
          token: token, // Also include as token
          society: societyData,
          loginType: result?.loginType,
          role: result?.role,
        };

        // Three-step flow check
        const isProfileSubmit = completeUserData.isProfileSubmit;
        const identitySelection = completeUserData.identitySelection;
        const isTerritorySubmit = completeUserData.isTerritorySubmit;

        console.log(
          'Profile Status:',
          isProfileSubmit,
          'Identity Selection:',
          identitySelection,
          'Territory Status:',
          isTerritorySubmit,
        );
        console.log('✅ All steps completed - logging in to main app');
        await PrefManager.setValue('userData', completeUserData);
        
        // Save role to AsyncStorage separately
        if (result?.role) {
          await PrefManager.setValue(STRING.ROLE, result.role);
          console.log('✅ Role saved to AsyncStorage:', result.role);
        }
        
        dispatch(
          setAuthToken({
            accessToken: token,
            userData: completeUserData,
          }),
        );
        // // Step 1: Check if profile is submitted
        // if (!isProfileSubmit) {
        //   console.log('📝 Profile not submitted - moving to profile setup');
        //   if (navigation?.navigate) {
        //     navigation.navigate('Profile', { userData });
        //   }
        // }
        // // Step 2: If profile is submitted, check identity selection
        // else if (!identitySelection || identitySelection === '') {
        //   console.log(
        //     '🆔 Profile submitted but identity not selected - moving to WhoAmI screen',
        //   );
        //   if (navigation?.navigate) {
        //     navigation.navigate('WhoAmI', { userData });
        //   }
        // }
        // // Step 3: If identity is selected, check territory submission
        // else if (!isTerritorySubmit) {
        //   console.log(
        //     '📍 Profile and identity submitted but territory not submitted - moving to territory setup',
        //   );
        //   if (navigation?.navigate) {
        //     navigation.navigate('Territory', { userData });
        //   }
        // }
        // // All three conditions are met - proceed to main app
        // else {

        // }
      } else {
        console.log('OTP Failed', response);
        if (isMountedRef.current) {
          Alert.alert(
            t('auth.otpVerificationFailed'),
            t('auth.pleaseTryAgain'),
          );
        }
      }
    } catch (error: any) {
      console.log('OTP error:', error.response?.data?.message || error.message);
      // Only show alert if component is still mounted
      if (isMountedRef.current) {
        Alert.alert(
          t('auth.otpVerificationFailed'),
          error.response?.data?.message || t('auth.pleaseTryAgain'),
        );
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
      isProcessingRef.current = false;
    }
  };

  const handleResendOtp = async () => {
    if (isResendDisabled) return;

    // Dismiss keyboard when resending OTP
    Keyboard.dismiss();

    try {
      const payload = {
        countryCode: countryCode,
        phoneNumber: phoneNumber,
      };

      const response = await dispatch(loginAction(payload));

      if (response.status === 200) {
        console.log('Resend OTP Success', response.data?.result);
        console.log('✅ OTP resent successfully');
        // Start new timer countdown
        startTimer();
        Alert.alert(t('auth.success'), t('auth.otpResentSuccess'));
      } else {
        console.log('Resend OTP Failed', response);
        Alert.alert(t('auth.resendFailed'), t('auth.pleaseTryAgain'));
      }
    } catch (error: any) {
      console.log(
        'Resend OTP Failed',
        error.response?.data?.message || error.message,
      );
      Alert.alert(
        t('auth.resendFailed'),
        error.response?.data?.message || t('auth.pleaseTryAgain'),
      );
    }
  };

  const handleEditPhone = () => {
    // Dismiss keyboard when editing phone
    Keyboard.dismiss();
    navigation.goBack();
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')} : ${secs
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#fff' }}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={OtpScreenStyles.container}>
          <View style={OtpScreenStyles.header}>
            <Image source={IMAGES.APP_LOGO} style={OtpScreenStyles.logo} />
          </View>
          <View style={OtpScreenStyles.titleContainer}>
            <Text style={OtpScreenStyles.title}>{t('auth.verifyOtp')}</Text>
            <Text style={OtpScreenStyles.subtitle}>
              {t('auth.enterOtpCode')}
            </Text>
          </View>
          <View style={OtpScreenStyles.mobileContainer}>
            <Text style={OtpScreenStyles.mobileText}>
              {countryCode} {phoneNumber}
            </Text>
            <TouchableOpacity onPress={handleEditPhone}>
              <Image source={IMAGES.EDIT} style={OtpScreenStyles.editIcon} />
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: '15%' }}>
            <CodeField
              ref={codeFieldRef}
              {...prop}
              value={otp}
              onChangeText={handleOtpChange}
              cellCount={CELL_COUNT}
              rootStyle={{
                alignSelf: 'center',
              }}
              textContentType="oneTimeCode"
              keyboardType="number-pad"
              returnKeyType="done"
              autoFocus={true}
              onSubmitEditing={dismissKeyboard}
              blurOnSubmit={true}
              {...(Platform.OS === 'android'
                ? { autoComplete: 'sms-otp' }
                : {})}
              renderCell={({ index, symbol, isFocused }) => (
                <View
                  key={index}
                  style={[OtpScreenStyles.otpCell]}
                  onLayout={getCellOnLayoutHandler(index)}
                >
                  <Text style={OtpScreenStyles.otpCellText}>
                    {symbol || (isFocused ? (cursorVisible ? '|' : ' ') : '*')}
                  </Text>
                </View>
              )}
            />
            <Text style={OtpScreenStyles.timer}>{formatTimer(timer)}</Text>
          </View>
          <View style={{ alignSelf: 'center', marginTop: '10%' }}>
            <CustomButton
              title={t('auth.verifyOtpButton')}
              onPress={handleOtpVerification}
              disabled={otp.length !== CELL_COUNT || isLoading}
            />
          </View>
          <View style={OtpScreenStyles.resendContainer}>
            <Text style={OtpScreenStyles.resendText}>
              {t('auth.didntReceiveCode')}
            </Text>
            <TouchableOpacity
              onPress={handleResendOtp}
              disabled={isResendDisabled}
              activeOpacity={isResendDisabled ? 0.5 : 1}
            >
              <Text
                style={[
                  OtpScreenStyles.resendButtonText,
                  isResendDisabled && { opacity: 0.5 },
                ]}
              >
                {t('auth.resendOtp')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default OtpScreen;
