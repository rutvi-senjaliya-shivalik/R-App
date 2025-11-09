import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Container, HeaderComponent } from '../../components/common';
import { EmergencyAlertsStyles } from './styles';
import { IMAGES, COLORS } from '../../constants';
import { useTranslation } from '../../context/LanguageContext';
import { getEmergencyContactsAction, getEmergencyContactsClear } from '../../store/actions/smartSociety/getEmergencyContactsAction';

interface EmergencyContact {
  _id?: string;
  id?: string;
  name: string;
  phoneNumber: string;
  email?: string;
  designation?: string;
  department?: string;
  isActive?: boolean;
  contactType?: string;
  [key: string]: any;
}

const EmergencyAlerts = (props: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isMountedRef = useRef(true);
  const [refreshing, setRefreshing] = useState(false);
  
  const emergencyContactsState = useSelector((state: any) => state.getEmergencyContacts);
  const contacts = emergencyContactsState?.data || [];
  const loading = emergencyContactsState?.loading || false;

  useEffect(() => {
    isMountedRef.current = true;
    loadEmergencyContacts();
    return () => {
      isMountedRef.current = false;
      dispatch(getEmergencyContactsClear());
    };
  }, []);

  const loadEmergencyContacts = async () => {
    try {
      await dispatch(getEmergencyContactsAction() as any);
    } catch (error: any) {
      if (isMountedRef.current) {
        let errorMessage = t('smartSociety.failedToLoadEmergencyContacts') || 'Failed to load emergency contacts';
        
        if (error?.isNetworkError) {
          errorMessage = t('smartSociety.networkError') || 'Network error. Please check your internet connection.';
        } else if (error?.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error?.message) {
          errorMessage = error.message;
        }
        
        Alert.alert(
          t('common.error') || 'Error',
          errorMessage,
          [{ text: t('common.ok') || 'OK' }],
        );
      }
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadEmergencyContacts();
    setRefreshing(false);
  };

  // Default emergency numbers (fallback if API returns no data)
  const defaultEmergencyNumbers = [
    {
      id: '1',
      name: t('smartSociety.police'),
      number: '100',
      description: t('smartSociety.policeEmergencyService'),
      icon: '🚔',
      color: COLORS.OCEAN_BLUE_TEXT,
    },
    {
      id: '2',
      name: t('smartSociety.ambulance'),
      number: '108',
      description: t('smartSociety.medicalEmergencyService'),
      icon: '🚑',
      color: COLORS.OCEAN_BLUE_TEXT,
    },
    {
      id: '3',
      name: t('smartSociety.fire'),
      number: '101',
      description: t('smartSociety.fireEmergencyService'),
      icon: '🚒',
      color: COLORS.OCEAN_BLUE_TEXT,
    },
    {
      id: '4',
      name: t('smartSociety.womenHelpline'),
      number: '1091',
      description: t('smartSociety.womenSafetyHelpline'),
      icon: '🛡️',
      color: COLORS.OCEAN_BLUE_TEXT,
    },
    {
      id: '5',
      name: t('smartSociety.childHelpline'),
      number: '1098',
      description: t('smartSociety.childEmergencyHelpline'),
      icon: '👶',
      color: COLORS.OCEAN_BLUE_TEXT,
    },
    {
      id: '6',
      name: t('smartSociety.disasterManagement'),
      number: '112',
      description: t('smartSociety.singleEmergencyNumber'),
      icon: '⚠️',
      color: COLORS.OCEAN_BLUE_TEXT,
    },
  ];

  // Map API contacts to display format
  const mapContactToDisplay = (contact: EmergencyContact) => {
    const phone = contact.phoneNumber || contact.phone || contact.mobileNumber || '';
    // Use designation/department/contactType as name if name is missing
    const name = contact.name?.trim() || 
                 contact.designation?.trim() || 
                 contact.department?.trim() || 
                 contact.contactType?.trim() || 
                 '';
    
    // Only include contacts with valid name and phone
    if (!name || !phone) {
      return null;
    }
    
    return {
      id: contact._id || contact.id || `contact-${Date.now()}`,
      name: name,
      number: phone,
      description: contact.designation || contact.department || contact.contactType || t('smartSociety.emergencyContact'),
      icon: '📞',
      color: COLORS.OCEAN_BLUE_TEXT,
    };
  };

  // Filter out null contacts, remove duplicates, and combine with default numbers
  const mappedContacts = contacts
    .map(mapContactToDisplay)
    .filter((contact): contact is NonNullable<typeof contact> => contact !== null);
  
  // Remove duplicates based on phone number
  const uniqueContacts = mappedContacts.filter((contact, index, self) =>
    index === self.findIndex(c => c.number === contact.number)
  );
  
  const emergencyNumbers = [
    ...defaultEmergencyNumbers,
    ...uniqueContacts,
  ];

  const handleCall = (number: string, name: string) => {
    Alert.alert(
      t('smartSociety.callEmergencyService'),
      t('smartSociety.confirmCallEmergency', { name, number }),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('common.call'),
          onPress: () => {
            Linking.openURL(`tel:${number}`).catch(err => {
              Alert.alert(
                t('common.error'),
                t('smartSociety.unableToMakeCall'),
              );
              console.error('Call error:', err);
            });
          },
        },
      ],
    );
  };

  const handleAlertAllMembers = () => {
    Alert.alert(
      t('smartSociety.emergencyAlert'),
      t('smartSociety.confirmSendEmergencyAlert'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('smartSociety.sendAlert'),
          style: 'destructive',
          onPress: () => {
            // Here you would make an API call to notify all members
            console.log('Sending emergency alert to all members...');
            Alert.alert(
              t('smartSociety.alertSent'),
              t('smartSociety.emergencyAlertSentToAllMembers'),
              [{ text: t('common.ok') }],
            );
          },
        },
      ],
    );
  };

  return (
    <Container>
      <HeaderComponent
        Title={t('smartSociety.emergencyAlerts')}
        onPress={() => props.navigation?.goBack()}
      />
      <ScrollView
        style={EmergencyAlertsStyles.container}
        contentContainerStyle={EmergencyAlertsStyles.contentContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading && contacts.length === 0 && (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <ActivityIndicator size="large" color={COLORS.DARK_BLUE} />
            <Text style={{ marginTop: 10, color: COLORS.GREY_TEXT }}>
              {t('smartSociety.loadingEmergencyContacts') || 'Loading emergency contacts...'}
            </Text>
          </View>
        )}
        {/* Emergency Alert Button */}
        <View style={EmergencyAlertsStyles.alertButtonSection}>
          <TouchableOpacity
            style={EmergencyAlertsStyles.emergencyAlertButton}
            onPress={handleAlertAllMembers}
            activeOpacity={0.8}
          >
            <View style={EmergencyAlertsStyles.alertButtonContent}>
              <View style={EmergencyAlertsStyles.alertButtonIconContainer}>
                <Image
                  source={IMAGES.ALERT}
                  style={EmergencyAlertsStyles.alertButtonIcon}
                />
              </View>
              <View style={EmergencyAlertsStyles.alertButtonTextContainer}>
                <Text style={EmergencyAlertsStyles.alertButtonTitle}>
                  {t('smartSociety.emergencyAlert')}
                </Text>
                <Text style={EmergencyAlertsStyles.alertButtonSubtitle}>
                  {t('smartSociety.notifyAllSocietyMembers')}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Emergency Numbers Section */}
        <View style={EmergencyAlertsStyles.numbersSection}>
          <Text style={EmergencyAlertsStyles.sectionTitle}>
            {t('smartSociety.emergencyNumbers')}
          </Text>
          <Text style={EmergencyAlertsStyles.sectionSubtitle}>
            {t('smartSociety.tapToCallEmergencyServices')}
          </Text>

          {emergencyNumbers.map(item => (
            <TouchableOpacity
              key={item.id}
              style={EmergencyAlertsStyles.emergencyNumberCard}
              onPress={() => handleCall(item.number, item.name)}
              activeOpacity={0.7}
            >
              <View style={EmergencyAlertsStyles.numberCardContent}>
                <View style={EmergencyAlertsStyles.numberCardLeft}>
                  <View style={EmergencyAlertsStyles.numberIconContainer}>
                    <Text style={EmergencyAlertsStyles.numberIcon}>
                      {item.icon}
                    </Text>
                  </View>
                  <View style={EmergencyAlertsStyles.numberInfo}>
                    <View style={EmergencyAlertsStyles.numberHeader}>
                      <Text style={EmergencyAlertsStyles.numberName}>
                        {item.name}
                      </Text>
                    </View>
                    <Text style={EmergencyAlertsStyles.numberText}>
                      {item.number}
                    </Text>
                    <Text style={EmergencyAlertsStyles.numberDescription}>
                      {item.description}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={EmergencyAlertsStyles.callButton}
                  onPress={e => {
                    e.stopPropagation();
                    handleCall(item.number, item.name);
                  }}
                  activeOpacity={0.8}
                >
                  <Image
                    source={IMAGES.CALL}
                    style={EmergencyAlertsStyles.callIcon}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </Container>
  );
};

export default EmergencyAlerts;
