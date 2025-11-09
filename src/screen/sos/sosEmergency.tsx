import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Linking, Alert, ScrollView } from 'react-native';
import { Container, HeaderComponent } from '../../components/common';
import { COLORS } from '../../constants';
import sosStyles from './sosStyles';

interface Props {
  navigation: any;
}

interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  icon: string;
  description: string;
}

const emergencyContacts: EmergencyContact[] = [
  {
    id: '1',
    name: 'Police',
    number: '100',
    icon: '🚔',
    description: 'Emergency Police Helpline'
  },
  {
    id: '2',
    name: 'Ambulance',
    number: '102',
    icon: '🚑',
    description: 'Medical Emergency & Ambulance'
  },
  {
    id: '3',
    name: 'Fire Safety',
    number: '101',
    icon: '🚒',
    description: 'Fire Brigade Emergency'
  },
  {
    id: '4',
    name: 'Women Helpline',
    number: '1091',
    icon: '👮‍♀️',
    description: 'Women Safety & Helpline'
  },
  {
    id: '5',
    name: 'Child Helpline',
    number: '1098',
    icon: '👶',
    description: 'Child Protection Helpline'
  },
  {
    id: '6',
    name: 'Disaster Management',
    number: '108',
    icon: '⚠️',
    description: 'National Disaster Response'
  },
  {
    id: '7',
    name: 'National Emergency',
    number: '112',
    icon: '🆘',
    description: 'Unified Emergency Number'
  },
  {
    id: '8',
    name: 'Senior Citizen',
    number: '14567',
    icon: '👴',
    description: 'Senior Citizen Helpline'
  }
];

const SosEmergency: React.FC<Props> = ({ navigation }) => {
  const [calling, setCalling] = useState<string | null>(null);

  const handleEmergencyCall = (contact: EmergencyContact) => {
    Alert.alert(
      `Call ${contact.name}?`,
      `This will immediately call ${contact.number} - ${contact.description}`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Call Now',
          onPress: () => {
            setCalling(contact.id);
            Linking.openURL(`tel:${contact.number}`);
            setTimeout(() => setCalling(null), 2000);
          },
          style: 'default'
        }
      ]
    );
  };

  const handleSOSCall = () => {
    // Direct call to 112 (National Emergency Number)
    Linking.openURL('tel:112');
  };

  return (
    <Container>
      <View style={sosStyles.container}>
        <HeaderComponent
          Title="Emergency SOS"
          onPress={() => navigation.goBack()}
        />

        <ScrollView
          style={sosStyles.contentWrapper}
          showsVerticalScrollIndicator={false}
        >
          {/* Big SOS Button */}
          <View style={sosStyles.sosButtonContainer}>
            <Text style={sosStyles.sosTitle}>Emergency Help</Text>
            <Text style={sosStyles.sosSubtitle}>
              Press the SOS button to immediately call emergency services
            </Text>

            <TouchableOpacity
              style={sosStyles.sosButton}
              onPress={handleSOSCall}
              activeOpacity={0.8}
            >
              <Text style={sosStyles.sosButtonIcon}>🆘</Text>
              <Text style={sosStyles.sosButtonText}>SOS</Text>
              <Text style={sosStyles.sosButtonSubtext}>Call 112</Text>
            </TouchableOpacity>

            <Text style={sosStyles.sosNote}>
              Instantly connects to National Emergency Number
            </Text>
          </View>

          {/* Emergency Contacts */}
          <View style={sosStyles.contactsSection}>
            <Text style={sosStyles.sectionTitle}>Emergency Contacts</Text>

            {emergencyContacts.map((contact) => (
              <TouchableOpacity
                key={contact.id}
                style={[
                  sosStyles.contactCard,
                  calling === contact.id && sosStyles.contactCardCalling
                ]}
                onPress={() => handleEmergencyCall(contact)}
                activeOpacity={0.7}
              >
                <View style={sosStyles.contactLeft}>
                  <Text style={sosStyles.contactIcon}>{contact.icon}</Text>
                  <View style={sosStyles.contactInfo}>
                    <Text style={sosStyles.contactName}>{contact.name}</Text>
                    <Text style={sosStyles.contactDescription}>{contact.description}</Text>
                  </View>
                </View>
                <View style={sosStyles.contactRight}>
                  <Text style={sosStyles.contactNumber}>{contact.number}</Text>
                  <View style={sosStyles.callButton}>
                    <Text style={sosStyles.callButtonText}>
                      {calling === contact.id ? 'Calling...' : 'Call'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Safety Tips */}
          <View style={sosStyles.tipsSection}>
            <Text style={sosStyles.sectionTitle}>Safety Tips</Text>
            <View style={sosStyles.tipCard}>
              <Text style={sosStyles.tipIcon}>💡</Text>
              <Text style={sosStyles.tipText}>
                Keep your phone charged and accessible at all times
              </Text>
            </View>
            <View style={sosStyles.tipCard}>
              <Text style={sosStyles.tipIcon}>📍</Text>
              <Text style={sosStyles.tipText}>
                Share your location when calling emergency services
              </Text>
            </View>
            <View style={sosStyles.tipCard}>
              <Text style={sosStyles.tipIcon}>🗣️</Text>
              <Text style={sosStyles.tipText}>
                Stay calm and speak clearly when reporting an emergency
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </Container>
  );
};

export default SosEmergency;
