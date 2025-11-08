import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { Container, HeaderComponent, CustomSwitch, BottomSheet } from '../../../components/common';
import { unitManagementStyles } from './styles';
import { IMAGES } from '../../../constants';
import { FamilyMemberForm, VehicleForm, TenantForm, DocumentForm } from './forms';

type OptionType = 'family' | 'vehicle' | 'tenant' | 'document';

type Option = {
  id: string;
  type: OptionType | 'toggle';
  title: string;
  description: string;
  icon: string;
  isToggle?: boolean;
  toggleKey?: 'isOnRent' | 'isOnResell';
};

const UnitManagementScreen = ({ navigation }: any) => {
  const [isOnRent, setIsOnRent] = useState(false);
  const [isOnResell, setIsOnResell] = useState(false);
  const [activeSheet, setActiveSheet] = useState<OptionType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Family form states
  const [familyName, setFamilyName] = useState('');
  const [familyRelation, setFamilyRelation] = useState('');
  const [familyPhone, setFamilyPhone] = useState('');

  // Vehicle form states
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');

  // Tenant form states
  const [tenantName, setTenantName] = useState('');
  const [tenantPhone, setTenantPhone] = useState('');
  const [tenantEmail, setTenantEmail] = useState('');
  const [leaseStart, setLeaseStart] = useState('');

  // Document form states
  const [documentName, setDocumentName] = useState('');
  const [documentType, setDocumentType] = useState('');

  const options: Option[] = useMemo(
    () => [
      {
        id: '1',
        type: 'family',
        title: 'Add Family Member',
        description: 'Add family member information',
        icon: '👥',
      },
      {
        id: '2',
        type: 'vehicle',
        title: 'Vehicle Info',
        description: 'Register vehicle details',
        icon: '🚗',
      },
      {
        id: '3',
        type: 'tenant',
        title: 'Tenant Info',
        description: 'Add tenant information',
        icon: '🏠',
      },
      {
        id: '4',
        type: 'document',
        title: 'Document Upload',
        description: 'Upload unit documents',
        icon: '📄',
      },
      {
        id: '5',
        type: 'toggle',
        title: 'On Rent',
        description: 'Mark unit as on rent',
        icon: '🔑',
        isToggle: true,
        toggleKey: 'isOnRent',
      },
      {
        id: '6',
        type: 'toggle',
        title: 'On Resell',
        description: 'Mark unit for resale',
        icon: '💰',
        isToggle: true,
        toggleKey: 'isOnResell',
      },
    ],
    [],
  );

  const handleOptionPress = useCallback(
    (option: Option) => {
      if (option.isToggle) {
        if (option.toggleKey === 'isOnRent') {
          setIsOnRent(!isOnRent);
        } else if (option.toggleKey === 'isOnResell') {
          setIsOnResell(!isOnResell);
        }
      } else {
        setActiveSheet(option.type as OptionType);
      }
    },
    [isOnRent, isOnResell],
  );

  const closeSheet = useCallback(() => {
    setActiveSheet(null);
    setIsSubmitting(false);
    // Reset all form states
    setFamilyName('');
    setFamilyRelation('');
    setFamilyPhone('');
    setVehicleType('');
    setVehicleNumber('');
    setVehicleModel('');
    setTenantName('');
    setTenantPhone('');
    setTenantEmail('');
    setLeaseStart('');
    setDocumentName('');
    setDocumentType('');
  }, []);

  const handleSubmit = useCallback(() => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert('Success', 'Information saved successfully!', [
        { text: 'OK', onPress: closeSheet },
      ]);
    }, 1000);
  }, [closeSheet]);

  const renderFormContent = () => {
    switch (activeSheet) {
      case 'family':
        return (
          <FamilyMemberForm
            name={familyName}
            setName={setFamilyName}
            relation={familyRelation}
            setRelation={setFamilyRelation}
            phone={familyPhone}
            setPhone={setFamilyPhone}
          />
        );
      case 'vehicle':
        return (
          <VehicleForm
            vehicleType={vehicleType}
            setVehicleType={setVehicleType}
            vehicleNumber={vehicleNumber}
            setVehicleNumber={setVehicleNumber}
            vehicleModel={vehicleModel}
            setVehicleModel={setVehicleModel}
          />
        );
      case 'tenant':
        return (
          <TenantForm
            tenantName={tenantName}
            setTenantName={setTenantName}
            tenantPhone={tenantPhone}
            setTenantPhone={setTenantPhone}
            tenantEmail={tenantEmail}
            setTenantEmail={setTenantEmail}
            leaseStart={leaseStart}
            setLeaseStart={setLeaseStart}
          />
        );
      case 'document':
        return (
          <DocumentForm
            documentName={documentName}
            setDocumentName={setDocumentName}
            documentType={documentType}
            setDocumentType={setDocumentType}
          />
        );
      default:
        return null;
    }
  };

  const getSheetTitle = () => {
    switch (activeSheet) {
      case 'family':
        return 'Add Family Member';
      case 'vehicle':
        return 'Add Vehicle Info';
      case 'tenant':
        return 'Add Tenant Info';
      case 'document':
        return 'Upload Document';
      default:
        return '';
    }
  };

  const renderOption = useCallback(
    ({ item }: { item: Option }) => {
      const toggleValue = item.toggleKey === 'isOnRent' ? isOnRent : isOnResell;

      return (
        <TouchableOpacity
          style={unitManagementStyles.optionCard}
          activeOpacity={0.7}
          onPress={() => handleOptionPress(item)}
        >
          <View style={unitManagementStyles.optionLeft}>
            <View style={unitManagementStyles.optionIcon}>
              <Text style={{ fontSize: 24 }}>{item.icon}</Text>
            </View>
            <View style={unitManagementStyles.optionContent}>
              <Text style={unitManagementStyles.optionTitle}>{item.title}</Text>
              <Text style={unitManagementStyles.optionDescription}>{item.description}</Text>
            </View>
          </View>
          {item.isToggle ? (
            <CustomSwitch value={toggleValue} onValueChange={() => handleOptionPress(item)} />
          ) : (
            <Image source={IMAGES.ARROW} style={unitManagementStyles.arrowIcon} />
          )}
        </TouchableOpacity>
      );
    },
    [handleOptionPress, isOnRent, isOnResell],
  );

  const keyExtractor = useCallback((item: Option) => item.id, []);

  return (
    <Container>
      <View style={unitManagementStyles.container}>
        <HeaderComponent Title="Unit Management" onPress={() => navigation.goBack()} />
        <View style={unitManagementStyles.contentWrapper}>
          <FlatList
            data={options}
            keyExtractor={keyExtractor}
            renderItem={renderOption}
            contentContainerStyle={unitManagementStyles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>

      <BottomSheet
        visible={!!activeSheet}
        title={getSheetTitle()}
        onClose={closeSheet}
        positiveButton={{
          text: 'Submit',
          onPress: handleSubmit,
          loading: isSubmitting,
        }}
        negativeButton={{
          text: 'Cancel',
          onPress: closeSheet,
        }}
      >
        {renderFormContent()}
      </BottomSheet>
    </Container>
  );
};

export default UnitManagementScreen;
