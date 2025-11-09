import React, { useEffect, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { View, ActivityIndicator } from 'react-native';
import AuthStack from './stackNavigator/authStack';
import AppStack from './stackNavigator/appStack';
import PrefManager from '../utils/prefManager';
import { setAuthToken, logout } from '../store/actions/auth/loginAction';
import { COLORS, STRING } from '../constants';
import { store } from '../store';


const RootNavigation = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, userData: reduxUserData } = useSelector((state: any) => state.otp);
  const [isLoading, setIsLoading] = useState(true);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    checkAuthStatus();
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await PrefManager.getValue(STRING.TOKEN);
      const userData = await PrefManager.getValue('userData');
      
      // Get current Redux state directly
      const currentState = store.getState();
      const currentAuthState = currentState.otp;
      
      console.log('🔍 Checking auth status...');
      console.log('Token exists:', !!token);
      console.log('UserData exists:', !!userData);
      console.log('Redux isAuthenticated:', currentAuthState?.isAuthenticated);
      console.log('Redux userData exists:', !!currentAuthState?.userData);
      
      if (token && userData) {
        console.log('✅ Token and userData found, dispatching setAuthToken...');
        console.log('Token:', token.substring(0, 20) + '...');
        console.log('UserData keys:', Object.keys(userData));
        console.log('UserData _id:', userData._id || userData.id);
        dispatch(setAuthToken({ accessToken: token, userData }));
      } else {
        console.log('❌ No token or userData found in storage');
        // Clear authentication state if token/userData don't exist but state says authenticated
        if (currentAuthState?.isAuthenticated || currentAuthState?.userData) {
          console.log('⚠️ Redux shows authenticated but no token/userData in storage - clearing auth state');
          dispatch(logout());
        }
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      // On error, clear auth state to be safe
      const currentState = store.getState();
      const currentAuthState = currentState.otp;
      if (currentAuthState?.isAuthenticated || currentAuthState?.userData) {
        dispatch(logout());
      }
    } finally {
      // Only update state if component is still mounted
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  };

  // Log when isAuthenticated changes
  useEffect(() => {
    console.log('🔄 isAuthenticated changed to:', isAuthenticated);
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.WHITE }}>
        <ActivityIndicator size="large" color={COLORS.BLACK} />
      </View>
    );
  }

  return (
    <NavigationContainer key={isAuthenticated ? 'authenticated' : 'unauthenticated'}>
      {isAuthenticated ? (
        <>
          <AppStack />
        </>
      ) : (
        <>
          <AuthStack />
        </>
      )}
    </NavigationContainer>
  );
}

export default RootNavigation;