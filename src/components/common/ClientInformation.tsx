import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { COLORS, FF, FS } from '../../constants';

interface ClientInformationProps {
  contactNumber: string;
  email: string;
  budgetRange: string;
  sourceOfLead: string;
  followUpDate: string;
  remarks: string;
}

// Phone Icon
const PhoneIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M22 16.92V19.92C22 20.4696 21.5523 20.9167 21.0028 20.9201C18.6596 20.9491 16.3516 20.3589 14.2916 19.2C12.3304 18.1037 10.6237 16.5396 9.29156 14.6208C8.13117 12.5604 7.54102 10.2519 7.57 7.90718C7.57348 7.35769 8.02092 6.91 8.57 6.91H11.57C11.8387 6.90985 12.0959 7.01842 12.2805 7.21C12.465 7.40158 12.5605 7.65874 12.545 7.92C12.5118 8.44 12.4285 8.95 12.295 9.45C12.2063 9.76 12.0195 10.0349 11.7595 10.2349L10.6195 11.0849C11.6695 13.1149 13.3795 14.8249 15.4095 15.8749L16.2595 14.7349C16.4595 14.4749 16.7345 14.2881 17.0445 14.1994C17.5445 14.0659 18.0545 13.9826 18.5745 13.9494C18.8358 13.9339 19.0929 14.0294 19.2845 14.214C19.4761 14.3986 19.5847 14.6558 19.5845 14.9244V17.9244C19.5845 18.1896 19.4791 18.4439 19.2916 18.6314C19.1041 18.8189 18.8498 18.9244 18.5845 18.9244C18.3945 18.9244 18.2045 18.9244 18.0145 18.9244C17.6745 18.9244 17.3345 18.9244 16.9945 18.9244C16.6545 18.9244 16.3145 18.9244 15.9745 18.9244C15.6345 18.9244 15.2945 18.9244 14.9545 18.9244C14.6145 18.9244 14.2745 18.9244 13.9345 18.9244C13.5945 18.9244 13.2545 18.9244 12.9145 18.9244C12.5745 18.9244 12.2345 18.9244 11.8945 18.9244C11.5545 18.9244 11.2145 18.9244 10.8745 18.9244C10.5345 18.9244 10.1945 18.9244 9.85453 18.9244C9.51453 18.9244 9.17453 18.9244 8.83453 18.9244C8.49453 18.9244 8.15453 18.9244 7.81453 18.9244C7.47453 18.9244 7.13453 18.9244 6.79453 18.9244C6.45453 18.9244 6.11453 18.9244 5.77453 18.9244C5.43453 18.9244 5.09453 18.9244 4.75453 18.9244C4.41453 18.9244 4.07453 18.9244 3.73453 18.9244C3.39453 18.9244 3.05453 18.9244 2.71453 18.9244C2.37453 18.9244 2.03453 18.9244 1.69453 18.9244C1.35453 18.9244 1.01453 18.9244 0.674531 18.9244C0.334531 18.9244 -0.00546875 18.9244 -0.345469 18.9244"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Email Icon
const EmailIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Rect
      x="3"
      y="5"
      width="18"
      height="14"
      rx="2"
      stroke="#000000"
      strokeWidth="2"
    />
    <Path
      d="M3 7L12 13L21 7"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Wallet Icon
const WalletIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 8H3M21 8V16C21 17.1046 20.1046 18 19 18H5C3.89543 18 3 17.1046 3 16V8M21 8V6C21 4.89543 20.1046 4 19 4H5C3.89543 4 3 4.89543 3 6V8M17 12H17.01"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Source Icon
const SourceIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 11L12 14L22 4"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Calendar Icon
const CalendarIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Rect
      x="3"
      y="4"
      width="18"
      height="18"
      rx="2"
      stroke="#000000"
      strokeWidth="2"
    />
    <Path d="M3 10H21" stroke="#000000" strokeWidth="2" />
    <Path
      d="M8 2V6M16 2V6"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

// Notes Icon
const NotesIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14 2V8H20M16 13H8M16 17H8M10 9H8"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ClientInformation: React.FC<ClientInformationProps> = ({
  contactNumber,
  email,
  budgetRange,
  sourceOfLead,
  followUpDate,
  remarks,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Client Information</Text>

      {/* Contact Number */}
      <View style={styles.infoRow}>
        <PhoneIcon />
        <View style={styles.infoContent}>
          <Text style={styles.label}>Contact Number</Text>
          <Text style={styles.value}>{contactNumber}</Text>
        </View>
      </View>

      {/* Email */}
      <View style={styles.infoRow}>
        <EmailIcon />
        <View style={styles.infoContent}>
          <Text style={styles.label}>Email Address</Text>
          <Text style={styles.value}>{email}</Text>
        </View>
      </View>

      {/* Budget Range */}
      <View style={styles.infoRow}>
        <WalletIcon />
        <View style={styles.infoContent}>
          <Text style={styles.label}>Budget Range</Text>
          <Text style={styles.value}>{budgetRange}</Text>
        </View>
      </View>

      {/* Source of Lead */}
      <View style={styles.infoRow}>
        <SourceIcon />
        <View style={styles.infoContent}>
          <Text style={styles.label}>Source of Lead</Text>
          <Text style={styles.value}>{sourceOfLead}</Text>
        </View>
      </View>

      {/* Follow-Up Date */}
      <View style={styles.infoRow}>
        <CalendarIcon />
        <View style={styles.infoContent}>
          <Text style={styles.label}>Follow-Up Date</Text>
          <Text style={styles.value}>{followUpDate}</Text>
        </View>
      </View>

      {/* Notes/Remarks */}
      <View style={styles.infoRow}>
        <NotesIcon />
        <View style={styles.infoContent}>
          <Text style={styles.label}>Notes / Remarks</Text>
          <Text style={styles.remarksValue}>{remarks}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    gap: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  title: {
    fontSize: FS.FS18,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    fontWeight: '600',
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  infoContent: {
    flex: 1,
    gap: 4,
  },
  label: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: '#9CA3AF',
  },
  value: {
    fontSize: FS.FS14,
    fontFamily: FF[500],
    color: COLORS.BLACK,
    fontWeight: '500',
  },
  remarksValue: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK,
    lineHeight: 20,
  },
});

export default ClientInformation;
