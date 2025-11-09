import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { ProfileSettingStyles } from './styles';
import { openLink } from '../../utils/helper';
import PrefManager from '../../utils/prefManager';
import { useDispatch, useSelector } from 'react-redux';
import { logout, resetStore } from '../../store/actions/auth/loginAction';
import {
  deleteUserAction,
  deleteUserClear,
} from '../../store/actions/auth/deleteUserAction';
import {
  selectDeleteUserData,
  selectDeleteUserLoading,
  selectDeleteUserError,
} from '../../store/selectors/auth';
import { getInitials } from '../../utils/method';
import { COLORS, IMAGES } from '../../constants';
import { Container, HeaderComponent } from '../../components/common';
import { logoutAction } from '../LeaveandHolidays/Actions/LogoutAction';

const ProfileSetting = (props: any) => {
  const dispatch = useDispatch() as any;
  const { userData } = useSelector((state: any) => state.otp);

  useEffect(() => {}, []);

  const ApicallLogout = async (): Promise<void> => {
    try {
      // Get user data from PrefManager
      const user = await PrefManager.getValue('userData');
      console.log('User is Employee', JSON.parse(user).token);

      // Prepare payload for API call
      const payload = {
        token: JSON.parse(user).token, // replace with dynamic ID if needed
      };

      // Dispatch action and wait for response
      const response = await dispatch(logoutAction(payload));
      console.log('Logout Response:', response.data?.message?.message);

      if (response.data?.message?.message === 'Logged out successfully.') {
        PrefManager.removeValue('accessToken');
        PrefManager.removeValue('userData');
        PrefManager.clearAll();

        // Dispatch logout and reset store actions
        dispatch(logout());
        dispatch(resetStore());
      } else {
        console.log('🚨 API Error:', response?.message || 'Unknown error');
      }
    } catch (error) {
      console.log('🚨 Exception occurred:', error);
    } finally {
    }
  };

  // Delete user selectors
  const deleteUserData = useSelector(selectDeleteUserData);
  const deleteUserLoading = useSelector(selectDeleteUserLoading);
  const deleteUserError = useSelector(selectDeleteUserError);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          ApicallLogout();
          // Clear stored data
        },
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch(deleteUserAction()).then(() => {
              PrefManager.removeValue('accessToken');
              PrefManager.removeValue('userData');
              dispatch(logout());
              dispatch(resetStore());
              dispatch(deleteUserClear());
            });
          },
        },
      ],
    );
  };

  return (
    <Container>
      <View style={ProfileSettingStyles.container}>
        <HeaderComponent
          Title="Settings"
          onPress={() => props.navigation.goBack()}
        />

        <View style={ProfileSettingStyles.contentWrapper}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, width: '100%' }}
          >
            {/* Menu Items */}
            <View style={[ProfileSettingStyles.section, { marginTop: 16 }]}>
              <TouchableOpacity
                style={ProfileSettingStyles.menuItem}
                onPress={() =>
                  openLink('https://realestateos.io/privacy-policy')
                }
              >
                <Text style={ProfileSettingStyles.menuText}>
                  Privacy & security
                </Text>
                <Image
                  source={IMAGES.BACK}
                  style={ProfileSettingStyles.chevron}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={ProfileSettingStyles.menuItem}
                onPress={() =>
                  openLink('https://realestateos.io/terms-and-conditions')
                }
              >
                <Text style={ProfileSettingStyles.menuText}>
                  Term & Security
                </Text>
                <Image
                  source={IMAGES.BACK}
                  style={ProfileSettingStyles.chevron}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={ProfileSettingStyles.menuItem}
                onPress={() => {
                  props.navigation.navigate('Help');
                }}
              >
                <Text style={ProfileSettingStyles.menuText}>
                  Help & Support
                </Text>
                <Image
                  source={IMAGES.BACK}
                  style={ProfileSettingStyles.chevron}
                />
              </TouchableOpacity>
            </View>

            {/* Action Buttons */}
            <View style={ProfileSettingStyles.actionSection}>
              <TouchableOpacity
                style={ProfileSettingStyles.menuItem}
                onPress={handleLogout}
              >
                <Text style={ProfileSettingStyles.menuText}>Logout</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={ProfileSettingStyles.menuItem}
                onPress={handleDeleteAccount}
              >
                <Text style={ProfileSettingStyles.menuText}>
                  {' '}
                  {deleteUserLoading ? 'Deleting Account...' : 'Delete Account'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Container>
  );
};

export default ProfileSetting;
