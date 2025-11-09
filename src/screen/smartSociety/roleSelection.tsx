import React, { useRef, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Container } from '../../components/common';
import { useTranslation } from '../../context/LanguageContext';
import PrefManager from '../../utils/prefManager';
import { STRING } from '../../constants';

const RoleSelection = (props: any) => {
  const { t } = useTranslation();
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    
    // Automatically determine role and navigate
    const determineRoleAndNavigate = async () => {
      try {
        // Get selected society from route params or preferences
        const selectedSociety = props.route?.params?.selectedSociety || 
                               await PrefManager.getValue(STRING.SELECTED_SOCIETY);
        
        // If no society is selected, redirect to SocietySelection
        if (!selectedSociety) {
          console.log('⚠️ No society selected, redirecting to SocietySelection');
          if (isMountedRef.current && props.navigation) {
            props.navigation.replace('SocietySelection');
          }
          return;
        }

        console.log('🏢 Selected Society:', selectedSociety);

        // Get role from AsyncStorage
        const role = await PrefManager.getValue(STRING.ROLE);
        console.log('🔍 Role from AsyncStorage:', role);

        if (!isMountedRef.current) return;

        let selectedRole;

        // Map role to menu selection
        if (role === 'Security') {
          // Navigate to watchman menu
          selectedRole = {
            id: 'watchman',
            title: t('smartSociety.watchman'),
            subtitle: t('smartSociety.securityGuard'),
          };
          console.log('✅ Role is Security - Navigating to Watchman menu');
        } else if (role === 'Member') {
          // Navigate to Society Member menu
          selectedRole = {
            id: 'resident',
            title: t('smartSociety.societyMember'),
            subtitle: t('smartSociety.resident'),
          };
          console.log('✅ Role is Member - Navigating to Society Member menu');
        } else {
          // Default to Admin menu (for any other role or no role)
          selectedRole = {
            id: 'admin',
            title: t('smartSociety.admin'),
            subtitle: t('smartSociety.societyAdministrator'),
          };
          console.log('✅ Role is not Security/Member - Navigating to Admin menu');
        }

        // Navigate to SmartSociety with selected role and society
        if (isMountedRef.current && props.navigation) {
          props.navigation.replace('SmartSociety', { 
            selectedRole,
            selectedSociety 
          });
        }
      } catch (error) {
        console.error('❌ Error determining role:', error);
        // On error, redirect to SocietySelection
        if (isMountedRef.current && props.navigation) {
          props.navigation.replace('SocietySelection');
        }
      }
    };

    determineRoleAndNavigate();

    return () => {
      isMountedRef.current = false;
    };
  }, [props.navigation, t]);

  // Show loading indicator while determining role
  return (
    <Container>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 16, fontSize: 16, color: '#666' }}>
          {t('smartSociety.loading') || 'Loading...'}
        </Text>
      </View>
    </Container>
  );
};

export default RoleSelection;
