import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Container, HeaderComponent, CustomButton } from '../../../components/common';
import RecordParcelStyles from './styles/recordParcelStyles';
import { COLORS } from '../../../constants';

const RecordParcel = (props: any) => {
  const isMountedRef = useRef(true);
  const selectedRole = props.route?.params?.selectedRole;
  const [trackingNumber, setTrackingNumber] = useState<string>('');
  const [courierName, setCourierName] = useState<string>('');
  const [flatNo, setFlatNo] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [receivedBy, setReceivedBy] = useState<string>('Security Guard');

  const couriers = ['Amazon', 'Flipkart', 'Swiggy', 'Zomato', 'Myntra', 'Other'];

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleSubmit = () => {
    if (!trackingNumber.trim()) {
      Alert.alert('Error', 'Please enter tracking number');
      return;
    }
    if (!courierName) {
      Alert.alert('Error', 'Please select courier name');
      return;
    }
    if (!flatNo.trim()) {
      Alert.alert('Error', 'Please enter flat number');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Error', 'Please enter parcel description');
      return;
    }

    // TODO: Submit parcel record to API
    const newParcel = {
      id: `par${Date.now()}`,
      trackingNumber: trackingNumber.trim(),
      courierName,
      flatNo: flatNo.trim(),
      description: description.trim(),
      receivedBy,
      receivedAt: new Date().toISOString(),
      status: 'pending',
    };

    Alert.alert(
      'Success',
      'Parcel recorded successfully',
      [
        {
          text: 'OK',
          onPress: () => {
            // Reset form
            setTrackingNumber('');
            setCourierName('');
            setFlatNo('');
            setDescription('');
            // Optionally navigate back or stay to add more
            // props.navigation?.goBack();
          },
        },
      ],
    );
  };

  return (
    <Container>
      <HeaderComponent
        Title="Record Parcel"
        onPress={() => props.navigation?.goBack()}
      />
      <ScrollView
        style={RecordParcelStyles.container}
        contentContainerStyle={RecordParcelStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={RecordParcelStyles.section}>
          <Text style={RecordParcelStyles.label}>Tracking Number *</Text>
          <TextInput
            style={RecordParcelStyles.input}
            value={trackingNumber}
            onChangeText={setTrackingNumber}
            placeholder="Enter tracking number"
            placeholderTextColor={COLORS.GREY_TEXT}
          />
        </View>

        <View style={RecordParcelStyles.section}>
          <Text style={RecordParcelStyles.label}>Courier Name *</Text>
          <View style={RecordParcelStyles.chipsContainer}>
            {couriers.map((courier) => (
              <TouchableOpacity
                key={courier}
                style={[
                  RecordParcelStyles.chip,
                  courierName === courier && RecordParcelStyles.chipActive,
                ]}
                onPress={() => setCourierName(courier)}
              >
                <Text
                  style={[
                    RecordParcelStyles.chipText,
                    courierName === courier && RecordParcelStyles.chipTextActive,
                  ]}
                >
                  {courier}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={RecordParcelStyles.section}>
          <Text style={RecordParcelStyles.label}>Flat Number *</Text>
          <TextInput
            style={RecordParcelStyles.input}
            value={flatNo}
            onChangeText={setFlatNo}
            placeholder="Enter flat number (e.g., B-204)"
            placeholderTextColor={COLORS.GREY_TEXT}
          />
        </View>

        <View style={RecordParcelStyles.section}>
          <Text style={RecordParcelStyles.label}>Parcel Description *</Text>
          <TextInput
            style={RecordParcelStyles.textArea}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter parcel description (e.g., Electronics - Mobile Phone)"
            placeholderTextColor={COLORS.GREY_TEXT}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        <View style={RecordParcelStyles.section}>
          <Text style={RecordParcelStyles.label}>Received By</Text>
          <TextInput
            style={RecordParcelStyles.input}
            value={receivedBy}
            onChangeText={setReceivedBy}
            placeholder="Enter name of person receiving"
            placeholderTextColor={COLORS.GREY_TEXT}
          />
        </View>

        <CustomButton
          title="Record Parcel"
          onPress={handleSubmit}
          style={RecordParcelStyles.submitButton}
        />
      </ScrollView>
    </Container>
  );
};

export default RecordParcel;

