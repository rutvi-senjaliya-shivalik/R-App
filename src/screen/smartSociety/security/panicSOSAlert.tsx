import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Animated,
  Linking,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Container, HeaderComponent } from '../../../components/common';
import PanicSOSAlertStyles from './styles/panicSOSAlertStyles';
import { useTranslation } from '../../../context/LanguageContext';
import { getEmergencyContactsAction, getEmergencyContactsClear } from '../../../store/actions/smartSociety/getEmergencyContactsAction';

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

const PanicSOSAlert = (props: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isMountedRef = useRef(true);
  const [alertHistory, setAlertHistory] = useState<any[]>([]);
  const [phonePermission, setPhonePermission] = useState<boolean>(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const countdownIntervalRef = useRef<any>(null);

  const emergencyContactsState = useSelector((state: any) => state.getEmergencyContacts);
  const apiContacts = emergencyContactsState?.data || [];
  const loadingContacts = emergencyContactsState?.loading || false;

  // Default emergency numbers (always available)
  const defaultEmergencyContacts = {
    police: {
      name: t('smartSociety.policeEmergency'),
      phone: '100',
      available: true,
    },
    ambulance: {
      name: t('smartSociety.ambulance'),
      phone: '102',
      available: true,
    },
    fire: {
      name: t('smartSociety.fireDepartment'),
      phone: '101',
      available: true,
    },
  };

  // Map API contacts to display format
  const mapApiContactToDisplay = (contact: EmergencyContact) => {
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
      name: name,
      phone: phone,
      available: contact.isActive !== false,
      designation: contact.designation || contact.department || contact.contactType,
    };
  };

  // Filter out null contacts, remove duplicates, and combine with default contacts
  const mappedContacts = apiContacts
    .map(mapApiContactToDisplay)
    .filter((contact): contact is NonNullable<typeof contact> => contact !== null);
  
  // Remove duplicates based on phone number
  const uniqueContacts = mappedContacts.filter((contact, index, self) =>
    index === self.findIndex(c => c.phone === contact.phone)
  );
  
  const allEmergencyContacts = [
    ...Object.values(defaultEmergencyContacts),
    ...uniqueContacts,
  ];

  useEffect(() => {
    isMountedRef.current = true;
    
    // Load emergency contacts from API
    loadEmergencyContacts();
    
    // TODO: Fetch alert history from API
    const mockHistory = [
      {
        id: 'alert1',
        timestamp: '2024-11-08 14:30:00',
        type: 'Emergency',
        status: 'Resolved',
        respondedBy: 'Security Guard',
      },
    ];
    setAlertHistory(mockHistory);

    // Request permissions on mount
    requestPermissions();

    // Start pulse animation
    startPulseAnimation();

    return () => {
      isMountedRef.current = false;
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
      dispatch(getEmergencyContactsClear());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadEmergencyContacts = async () => {
    try {
      await dispatch(getEmergencyContactsAction() as any);
    } catch (error: any) {
      console.error('❌ Failed to load emergency contacts:', error);
      // Don't show alert for emergency contacts failure - use defaults
    }
  };

  const requestPermissions = async () => {
    if (!isMountedRef.current) return;

    // Request phone permission (Android only)
    if (Platform.OS === 'android') {
      await requestPhonePermission();
    } else {
      // iOS doesn't require explicit permission for tel: links
      setPhonePermission(true);
    }
  };

  const requestPhonePermission = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') {
      setPhonePermission(true);
      return true;
    }

    try {
      // Check if permission is already granted
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CALL_PHONE,
      );

      if (hasPermission) {
        setPhonePermission(true);
        return true;
      }

      // Request permission
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CALL_PHONE,
        {
          title: t('smartSociety.phonePermissionRequired'),
          message: t('smartSociety.phonePermissionRequiredForCalls'),
          buttonNeutral: t('common.askMeLater'),
          buttonNegative: t('common.cancel'),
          buttonPositive: t('smartSociety.grant'),
        },
      );

      const isGranted = granted === PermissionsAndroid.RESULTS.GRANTED;
      setPhonePermission(isGranted);

      if (!isGranted && isMountedRef.current) {
        Alert.alert(
          t('smartSociety.phonePermissionDenied'),
          t('smartSociety.phonePermissionRequiredForCalls'),
          [{ text: t('common.ok') }],
        );
      }

      return isGranted;
    } catch (error) {
      console.error('Phone permission error:', error);
      setPhonePermission(false);
      return false;
    }
  };


  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const handleCallContact = async (phoneNumber: string) => {
    // Request phone permission if not granted (Android)
    if (Platform.OS === 'android' && !phonePermission) {
      const granted = await requestPhonePermission();
      if (!granted) {
        Alert.alert(
          t('smartSociety.permissionRequired'),
          t('smartSociety.phonePermissionRequiredForCallsSettings'),
          [
            { text: t('common.cancel'), style: 'cancel' },
            {
              text: t('smartSociety.openSettings'),
              onPress: () => Linking.openSettings(),
            },
          ],
        );
        return;
      }
    }

    // Make the call
    Linking.openURL(`tel:${phoneNumber}`).catch(err => {
      Alert.alert(
        t('common.error'),
        t('smartSociety.unableToMakePhoneCall'),
      );
      console.error('Call error:', err);
    });
  };

  const handleQuickAction = (contact: any) => {
    Alert.alert(
      t('smartSociety.call', { name: contact.name }),
      t('smartSociety.doYouWantToCall', { name: contact.name, number: contact.phone }),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('common.call'),
          onPress: () => handleCallContact(contact.phone),
        },
      ],
    );
  };

  return (
    <Container>
      <HeaderComponent
        Title={t('smartSociety.panicSOSAlert')}
        onPress={() => props.navigation?.goBack()}
      />
      <ScrollView
        style={PanicSOSAlertStyles.container}
        contentContainerStyle={PanicSOSAlertStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Actions */}
        <View style={PanicSOSAlertStyles.section}>
          <Text style={PanicSOSAlertStyles.sectionTitle}>{t('smartSociety.quickActions')}</Text>
          <View style={PanicSOSAlertStyles.quickActionsContainer}>
            <TouchableOpacity
              style={PanicSOSAlertStyles.quickActionButton}
              onPress={() => handleQuickAction(defaultEmergencyContacts.police)}
            >
              <Text style={PanicSOSAlertStyles.quickActionIcon}>🚔</Text>
              <Text style={PanicSOSAlertStyles.quickActionText}>{t('smartSociety.police')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={PanicSOSAlertStyles.quickActionButton}
              onPress={() => handleQuickAction(defaultEmergencyContacts.ambulance)}
            >
              <Text style={PanicSOSAlertStyles.quickActionIcon}>🚑</Text>
              <Text style={PanicSOSAlertStyles.quickActionText}>{t('smartSociety.ambulance')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={PanicSOSAlertStyles.quickActionButton}
              onPress={() => handleQuickAction(defaultEmergencyContacts.fire)}
            >
              <Text style={PanicSOSAlertStyles.quickActionIcon}>🚒</Text>
              <Text style={PanicSOSAlertStyles.quickActionText}>{t('smartSociety.fire')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Emergency Contacts */}
        <View style={PanicSOSAlertStyles.section}>
          <Text style={PanicSOSAlertStyles.sectionTitle}>
            {t('smartSociety.emergencyContacts')}
          </Text>
          {loadingContacts && apiContacts.length === 0 && (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <ActivityIndicator size="small" color="#007AFF" />
              <Text style={{ marginTop: 10, fontSize: 12, color: '#666' }}>
                {t('smartSociety.loadingEmergencyContacts') || 'Loading emergency contacts...'}
              </Text>
            </View>
          )}
          {allEmergencyContacts.length > 0 ? (
            allEmergencyContacts.map((contact, index) => (
              <TouchableOpacity
                key={`contact-${index}`}
                style={PanicSOSAlertStyles.contactCard}
                onPress={() => handleQuickAction(contact)}
              >
                <View style={PanicSOSAlertStyles.contactInfo}>
                  <Text style={PanicSOSAlertStyles.contactName}>
                    {contact.name}
                  </Text>
                  <Text style={PanicSOSAlertStyles.contactPhone}>
                    {contact.phone}
                  </Text>
                  {contact.designation && (
                    <Text style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
                      {contact.designation}
                    </Text>
                  )}
                </View>
                <View style={PanicSOSAlertStyles.callButton}>
                  <Text style={PanicSOSAlertStyles.callButtonText}>📞</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            !loadingContacts && (
              <Text style={{ padding: 20, textAlign: 'center', color: '#666' }}>
                {t('smartSociety.noEmergencyContacts') || 'No emergency contacts available'}
              </Text>
            )
          )}
        </View>

        {/* Alert History */}
        {alertHistory.length > 0 && (
          <View style={PanicSOSAlertStyles.section}>
            <Text style={PanicSOSAlertStyles.sectionTitle}>{t('smartSociety.recentAlerts')}</Text>
            {alertHistory.map(alert => (
              <View key={alert.id} style={PanicSOSAlertStyles.historyCard}>
                <View style={PanicSOSAlertStyles.historyHeader}>
                  <Text style={PanicSOSAlertStyles.historyType}>
                    {alert.type}
                  </Text>
                  <View
                    style={[
                      PanicSOSAlertStyles.statusBadge,
                      alert.status === 'Resolved' &&
                        PanicSOSAlertStyles.statusBadgeResolved,
                    ]}
                  >
                    <Text style={PanicSOSAlertStyles.statusText}>
                      {alert.status === 'Resolved' ? t('smartSociety.resolved') : alert.status}
                    </Text>
                  </View>
                </View>
                <Text style={PanicSOSAlertStyles.historyTimestamp}>
                  {alert.timestamp}
                </Text>
                {alert.respondedBy && (
                  <Text style={PanicSOSAlertStyles.historyResponded}>
                    {t('smartSociety.respondedBy')}: {alert.respondedBy}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Permission Status */}
        {Platform.OS === 'android' && (
          <View style={PanicSOSAlertStyles.permissionSection}>
            <Text style={PanicSOSAlertStyles.permissionTitle}>
              {t('smartSociety.permissionStatus')}
            </Text>
            <View style={PanicSOSAlertStyles.permissionRow}>
              <Text style={PanicSOSAlertStyles.permissionLabel}>
                {t('smartSociety.phone')}
              </Text>
              <View
                style={[
                  PanicSOSAlertStyles.permissionBadge,
                  phonePermission
                    ? PanicSOSAlertStyles.permissionBadgeGranted
                    : PanicSOSAlertStyles.permissionBadgeDenied,
                ]}
              >
                <Text style={PanicSOSAlertStyles.permissionText}>
                  {phonePermission ? t('smartSociety.granted') : t('smartSociety.notGranted')}
                </Text>
              </View>
              {!phonePermission && (
                <TouchableOpacity
                  style={PanicSOSAlertStyles.permissionButton}
                  onPress={requestPhonePermission}
                >
                  <Text style={PanicSOSAlertStyles.permissionButtonText}>
                    {t('smartSociety.grant')}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}

        {/* Important Notice */}
        <View style={PanicSOSAlertStyles.noticeSection}>
          <Text style={PanicSOSAlertStyles.noticeTitle}>{t('smartSociety.important')}</Text>
          <Text style={PanicSOSAlertStyles.noticeText}>
            {t('smartSociety.useOnlyInGenuineEmergencies')}{'\n'}{t('smartSociety.falseAlarmsMayResultInPenalties')}{'\n'}{t('smartSociety.emergencyServicesWillBeNotified')}
          </Text>
        </View>
      </ScrollView>
    </Container>
  );
};

export default PanicSOSAlert;
