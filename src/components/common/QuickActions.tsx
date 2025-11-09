import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Rect, Line } from 'react-native-svg';
import { COLORS, FF, FS } from '../../constants';

interface QuickActionsProps {
  onAddLead?: () => void;
  onCreateInvoice?: () => void;
}

// Add Lead Icon
const AddLeadIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path 
      d="M8 6C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6C16 8.20914 14.2091 10 12 10C9.79086 10 8 8.20914 8 6Z" 
      fill="black"
    />
    <Path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M16.5 22C14.85 22 14.025 22 13.513 21.487C13 20.975 13 20.15 13 18.5C13 16.85 13 16.025 13.513 15.513C14.025 15 14.85 15 16.5 15C18.15 15 18.975 15 19.487 15.513C20 16.025 20 16.85 20 18.5C20 20.15 20 20.975 19.487 21.487C18.975 22 18.15 22 16.5 22ZM17.083 16.944C17.083 16.622 16.822 16.361 16.5 16.361C16.178 16.361 15.917 16.622 15.917 16.944V17.917H14.944C14.622 17.917 14.361 18.178 14.361 18.5C14.361 18.822 14.622 19.083 14.944 19.083H15.917V20.056C15.917 20.378 16.178 20.639 16.5 20.639C16.822 20.639 17.083 20.378 17.083 20.056V19.083H18.056C18.378 19.083 18.639 18.822 18.639 18.5C18.639 18.178 18.378 17.917 18.056 17.917H17.083V16.944Z" 
      fill="black"
    />
    <Path 
      d="M15.678 13.503C15.205 13.508 14.764 13.526 14.38 13.577C13.737 13.664 13.033 13.87 12.452 14.452C11.87 15.033 11.664 15.737 11.578 16.38C11.5 16.958 11.5 17.664 11.5 18.414V18.586C11.5 19.336 11.5 20.042 11.578 20.62C11.638 21.071 11.758 21.552 12.025 22H12C4 22 4 19.985 4 17.5C4 15.015 7.582 13 12 13C13.326 13 14.577 13.181 15.678 13.503Z" 
      fill="black"
    />
  </Svg>
);

// Create Invoice Icon
const CreateInvoiceIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path 
      d="M13 16H8M14 8.00001H8M16 12H8M4 3.00001C4 2.73479 4.10536 2.48044 4.29289 2.2929C4.48043 2.10536 4.73478 2.00001 5 2.00001C5.24762 1.99865 5.49048 2.06803 5.7 2.20001L6.633 2.80001C6.84204 2.93358 7.08493 3.00456 7.333 3.00456C7.58107 3.00456 7.82396 2.93358 8.033 2.80001L8.967 2.20001C9.17604 2.06643 9.41893 1.99545 9.667 1.99545C9.91507 1.99545 10.158 2.06643 10.367 2.20001L11.3 2.80001C11.509 2.93358 11.7519 3.00456 12 3.00456C12.2481 3.00456 12.491 2.93358 12.7 2.80001L13.633 2.20001C13.842 2.06643 14.0849 1.99545 14.333 1.99545C14.5811 1.99545 14.824 2.06643 15.033 2.20001L15.967 2.80001C16.176 2.93358 16.4189 3.00456 16.667 3.00456C16.9151 3.00456 17.158 2.93358 17.367 2.80001L18.3 2.20001C18.5095 2.06803 18.7524 1.99865 19 2.00001C19.2652 2.00001 19.5196 2.10536 19.7071 2.2929C19.8946 2.48044 20 2.73479 20 3.00001V21C20 21.2652 19.8946 21.5196 19.7071 21.7071C19.5196 21.8947 19.2652 22 19 22C18.7524 22.0014 18.5095 21.932 18.3 21.8L17.367 21.2C17.158 21.0664 16.9151 20.9955 16.667 20.9955C16.4189 20.9955 16.176 21.0664 15.967 21.2L15.033 21.8C14.824 21.9336 14.5811 22.0046 14.333 22.0046C14.0849 22.0046 13.842 21.9336 13.633 21.8L12.7 21.2C12.491 21.0664 12.2481 20.9955 12 20.9955C11.7519 20.9955 11.509 21.0664 11.3 21.2L10.367 21.8C10.158 21.9336 9.91507 22.0046 9.667 22.0046C9.41893 22.0046 9.17604 21.9336 8.967 21.8L8.033 21.2C7.82396 21.0664 7.58107 20.9955 7.333 20.9955C7.08493 20.9955 6.84204 21.0664 6.633 21.2L5.7 21.8C5.49048 21.932 5.24762 22.0014 5 22C4.73478 22 4.48043 21.8947 4.29289 21.7071C4.10536 21.5196 4 21.2652 4 21V3.00001Z" 
      stroke="black" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </Svg>
);

const QuickActions: React.FC<QuickActionsProps> = ({ 
  onAddLead, 
  onCreateInvoice 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      
      <View style={styles.buttonsRow}>
        {/* Add Lead Button */}
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={onAddLead}
          activeOpacity={0.7}
        >
          <View style={styles.labelContainer}>
            <View style={styles.iconFrame}>
              <AddLeadIcon />
            </View>
            <Text style={styles.buttonText}>Add Lead</Text>
          </View>
        </TouchableOpacity>

        {/* Create Invoice Button */}
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={onCreateInvoice}
          activeOpacity={0.7}
        >
          <View style={styles.labelContainer}>
            <View style={styles.iconFrame}>
              <CreateInvoiceIcon />
            </View>
            <Text style={styles.buttonText}>Create Invoice</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: FS.FS18,
    fontFamily: FF[600],
    color: '#6B7280',
    marginBottom: 16,
    letterSpacing: 0.2,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    padding: 16,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    minHeight: 120,
  },
  labelContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'stretch',
  },
  iconFrame: {
    width: 48,
    height: 48,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D1D5DB',
    borderRadius: 24,
  },
  buttonText: {
    color: '#000000',
    textAlign: 'center',
    fontFamily: FF[500],
    fontSize: FS.FS14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 20,
    flexWrap: 'nowrap',
  },
});

export default QuickActions;
