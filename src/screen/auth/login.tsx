import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from 'react-native';
import { Loginstyles } from './styles';
import {
  Container,
  CustomButton,
  KeyboardAvoidingView,
} from '../../components/common';
import { COLORS } from '../../constants';
import Images from '../../constants/images';
import { useDispatch } from 'react-redux';
import PrefManager from '../../utils/prefManager';
import STRING from '../../constants/strings';
import { useAuth } from '../../hooks/useAuth';

const Login = ({ navigation }: any) => {
  const dispatch = useDispatch() as any;
  const { login, loading: authLoading, error: authError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailError(''); // Clear error when email changes
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordError(''); // Clear error when password changes
  };

  // Auto-clear errors after 3 seconds
  useEffect(() => {
    if (emailError || passwordError) {
      const timer = setTimeout(() => {
        setEmailError('');
        setPasswordError('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [emailError, passwordError]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLoginValidation = () => {
    let isValid = true;

    // Email validation
    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }

    // Password validation
    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    if (isValid) {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    try {
      console.log('Attempting login with:', { email: email.trim() });
      
      const response = await login({
        email: email.trim(),
        password: password,
      });

      console.log('Login response:', response);

      // Store token and user data in PrefManager for backward compatibility
      await PrefManager.setValue(STRING.TOKEN, response.token);
      await PrefManager.setValue('userData', JSON.stringify(response.user));

      // Trigger auth state update to navigate to app
      dispatch({ 
        type: 'SET_AUTH_TOKEN', 
        payload: { accessToken: response.token } 
      });

      Alert.alert('Success', `Welcome ${response.user.name}!`);
    } catch (error: any) {
      console.log('Login error details:', {
        message: error.message,
        response: error.response,
        request: error.request,
      });
      Alert.alert('Login Failed', error.message || 'Invalid credentials. Please try again.');
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <Container>
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={Loginstyles.container}>
            {/* Login Title */}
            <View style={Loginstyles.titleContainer}>
              <Text style={Loginstyles.title}>Welcome Channel Partner</Text>
              <Text style={Loginstyles.subtitle}>Sign in to your account to continue</Text>
            </View>

            {/* Email Input */}
            <View style={Loginstyles.inputContainer}>
              <TextInput
                style={Loginstyles.input}
                placeholder="Enter Email"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={handleEmailChange}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {emailError ? (
                <Text style={Loginstyles.errorText}>{emailError}</Text>
              ) : null}
            </View>

            {/* Password Input */}
            <View style={Loginstyles.inputContainer}>
              <TextInput
                style={Loginstyles.input}
                placeholder="Enter Password"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              {passwordError ? (
                <Text style={Loginstyles.errorText}>{passwordError}</Text>
              ) : null}
            </View>

            {/* Login Button */}
            <View style={Loginstyles.buttonContainer}>
              <CustomButton
                title="Login"
                onPress={handleLoginValidation}
                loading={authLoading}
              />
            </View>

            {/* API Error Display */}
            {authError && (
              <View style={Loginstyles.apiErrorContainer}>
                <Text style={Loginstyles.apiErrorText}>{authError}</Text>
              </View>
            )}

            {/* App Logo at Bottom */}
            <View style={Loginstyles.footer}>
              <Image source={Images.SHIVALIK} style={Loginstyles.logoLarge} resizeMode="contain" />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Login;
