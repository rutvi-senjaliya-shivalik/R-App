import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';
import {
  Container,
  HeaderComponent,
  CustomButton,
} from '../../../components/common';
import VehicleRegistrationStyles from './styles/vehicleRegistrationStyles';
import { COLORS } from '../../../constants';
import { useTranslation } from '../../../context/LanguageContext';

const VehicleRegistration = (props: any) => {
  const { t } = useTranslation();
  const isMountedRef = useRef(true);
  const selectedRole = props.route?.params?.selectedRole;
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  
  // Form fields
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleBrand, setVehicleBrand] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [color, setColor] = useState('');
  const [parkingSlot, setParkingSlot] = useState('');

  const vehicleTypes = [
    { key: 'Two Wheeler', label: t('smartSociety.twoWheeler') },
    { key: 'Four Wheeler', label: t('smartSociety.fourWheeler') },
    { key: 'Other', label: t('smartSociety.other') },
  ];
  const parkingSlots = ['A-101', 'A-102', 'B-201', 'B-202', 'C-301', 'C-302'];

  useEffect(() => {
    isMountedRef.current = true;
    // TODO: Fetch vehicles from API
    // Mock data for now
    const mockVehicles = [
      {
        id: 'v1',
        vehicleNumber: 'MH-12-AB-1234',
        vehicleType: 'Four Wheeler',
        vehicleBrand: 'Honda',
        vehicleModel: 'City',
        color: 'White',
        parkingSlot: 'A-101',
        registeredDate: '2024-01-15',
      },
    ];
    setVehicles(mockVehicles);
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleAddVehicle = () => {
    if (!vehicleNumber.trim()) {
      Alert.alert(t('common.error'), t('smartSociety.pleaseEnterVehicleNumber'));
      return;
    }
    if (!vehicleType) {
      Alert.alert(t('common.error'), t('smartSociety.pleaseSelectVehicleType'));
      return;
    }
    if (!vehicleBrand.trim()) {
      Alert.alert(t('common.error'), t('smartSociety.pleaseEnterVehicleBrand'));
      return;
    }
    if (!vehicleModel.trim()) {
      Alert.alert(t('common.error'), t('smartSociety.pleaseEnterVehicleModel'));
      return;
    }

    // TODO: Submit to API
    const newVehicle = {
      id: `v${Date.now()}`,
      vehicleNumber: vehicleNumber.trim().toUpperCase(),
      vehicleType,
      vehicleBrand: vehicleBrand.trim(),
      vehicleModel: vehicleModel.trim(),
      color: color.trim() || 'N/A',
      parkingSlot: parkingSlot || 'N/A',
      registeredDate: new Date().toISOString().split('T')[0],
    };

    setVehicles([...vehicles, newVehicle]);
    Alert.alert(t('common.success'), t('smartSociety.vehicleRegisteredSuccessfully'));
    resetForm();
    setIsAdding(false);
  };

  const handleDeleteVehicle = (id: string) => {
    Alert.alert(
      t('smartSociety.deleteVehicle'),
      t('smartSociety.areYouSureDeleteVehicle'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('common.delete'),
          style: 'destructive',
          onPress: () => {
            // TODO: Delete from API
            setVehicles(vehicles.filter(v => v.id !== id));
            Alert.alert(t('common.success'), t('smartSociety.vehicleDeletedSuccessfully'));
          },
        },
      ],
    );
  };

  const resetForm = () => {
    setVehicleNumber('');
    setVehicleType('');
    setVehicleBrand('');
    setVehicleModel('');
    setColor('');
    setParkingSlot('');
  };

  const renderVehicleItem = ({ item }: any) => (
    <View style={VehicleRegistrationStyles.vehicleCard}>
      <View style={VehicleRegistrationStyles.vehicleHeader}>
        <View style={VehicleRegistrationStyles.vehicleInfo}>
          <Text style={VehicleRegistrationStyles.vehicleNumber}>
            {item.vehicleNumber}
          </Text>
          <Text style={VehicleRegistrationStyles.vehicleType}>
            {item.vehicleType === 'Two Wheeler' 
              ? t('smartSociety.twoWheeler')
              : item.vehicleType === 'Four Wheeler'
              ? t('smartSociety.fourWheeler')
              : t('smartSociety.other')}
          </Text>
        </View>
        <TouchableOpacity
          style={VehicleRegistrationStyles.deleteButton}
          onPress={() => handleDeleteVehicle(item.id)}
        >
          <Text style={VehicleRegistrationStyles.deleteButtonText}>×</Text>
        </TouchableOpacity>
      </View>
      <View style={VehicleRegistrationStyles.vehicleDetails}>
        <View style={VehicleRegistrationStyles.detailRow}>
          <Text style={VehicleRegistrationStyles.detailLabel}>{t('smartSociety.brand')}:</Text>
          <Text style={VehicleRegistrationStyles.detailValue}>
            {item.vehicleBrand}
          </Text>
        </View>
        <View style={VehicleRegistrationStyles.detailRow}>
          <Text style={VehicleRegistrationStyles.detailLabel}>{t('smartSociety.model')}:</Text>
          <Text style={VehicleRegistrationStyles.detailValue}>
            {item.vehicleModel}
          </Text>
        </View>
        <View style={VehicleRegistrationStyles.detailRow}>
          <Text style={VehicleRegistrationStyles.detailLabel}>{t('smartSociety.color')}:</Text>
          <Text style={VehicleRegistrationStyles.detailValue}>
            {item.color}
          </Text>
        </View>
        <View style={VehicleRegistrationStyles.detailRow}>
          <Text style={VehicleRegistrationStyles.detailLabel}>{t('smartSociety.parkingSlot')}:</Text>
          <Text style={VehicleRegistrationStyles.detailValue}>
            {item.parkingSlot}
          </Text>
        </View>
        <View style={VehicleRegistrationStyles.detailRow}>
          <Text style={VehicleRegistrationStyles.detailLabel}>{t('smartSociety.registered')}:</Text>
          <Text style={VehicleRegistrationStyles.detailValue}>
            {item.registeredDate}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <Container>
      <HeaderComponent
        Title={t('smartSociety.vehicleRegistration')}
        onPress={() => props.navigation?.goBack()}
      />
      <ScrollView
        style={VehicleRegistrationStyles.container}
        contentContainerStyle={VehicleRegistrationStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {!isAdding ? (
          <>
            <View style={VehicleRegistrationStyles.headerSection}>
              <Text style={VehicleRegistrationStyles.headerTitle}>
                {t('smartSociety.registeredVehicles')}
              </Text>
              <Text style={VehicleRegistrationStyles.headerSubtitle}>
                {t('smartSociety.manageYourRegisteredVehicles')}
              </Text>
            </View>

            {vehicles.length > 0 ? (
              <FlatList
                data={vehicles}
                renderItem={renderVehicleItem}
                keyExtractor={item => item.id}
                scrollEnabled={false}
                contentContainerStyle={VehicleRegistrationStyles.vehiclesList}
              />
            ) : (
              <View style={VehicleRegistrationStyles.emptyState}>
                <Text style={VehicleRegistrationStyles.emptyStateText}>
                  {t('smartSociety.noVehiclesRegisteredYet')}
                </Text>
              </View>
            )}

            <View style={VehicleRegistrationStyles.addButton}>
              <CustomButton
                title={t('smartSociety.addVehicle')}
                onPress={() => setIsAdding(true)}
              />
            </View>
          </>
        ) : (
          <>
            <View style={VehicleRegistrationStyles.headerSection}>
              <Text style={VehicleRegistrationStyles.headerTitle}>
                {t('smartSociety.registerNewVehicle')}
              </Text>
              <Text style={VehicleRegistrationStyles.headerSubtitle}>
                {t('smartSociety.fillInVehicleDetails')}
              </Text>
            </View>

            <View style={VehicleRegistrationStyles.section}>
              <Text style={VehicleRegistrationStyles.label}>
                {t('smartSociety.vehicleNumber')}
              </Text>
              <TextInput
                style={VehicleRegistrationStyles.input}
                value={vehicleNumber}
                onChangeText={setVehicleNumber}
                placeholder={t('smartSociety.pleaseEnterVehicleNumber')}
                placeholderTextColor={COLORS.GREY_TEXT}
                autoCapitalize="characters"
                maxLength={15}
              />
            </View>

            <View style={VehicleRegistrationStyles.section}>
              <Text style={VehicleRegistrationStyles.label}>
                {t('smartSociety.vehicleType')}
              </Text>
              <View style={VehicleRegistrationStyles.typesContainer}>
                {vehicleTypes.map(type => (
                  <TouchableOpacity
                    key={type.key}
                    style={[
                      VehicleRegistrationStyles.typeChip,
                      vehicleType === type.key &&
                        VehicleRegistrationStyles.typeChipActive,
                    ]}
                    onPress={() => setVehicleType(type.key)}
                  >
                    <Text
                      style={[
                        VehicleRegistrationStyles.typeChipText,
                        vehicleType === type.key &&
                          VehicleRegistrationStyles.typeChipTextActive,
                      ]}
                    >
                      {type.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={VehicleRegistrationStyles.section}>
              <Text style={VehicleRegistrationStyles.label}>{t('smartSociety.brand')}</Text>
              <TextInput
                style={VehicleRegistrationStyles.input}
                value={vehicleBrand}
                onChangeText={setVehicleBrand}
                placeholder={t('smartSociety.pleaseEnterVehicleBrand')}
                placeholderTextColor={COLORS.GREY_TEXT}
                autoCapitalize="words"
              />
            </View>

            <View style={VehicleRegistrationStyles.section}>
              <Text style={VehicleRegistrationStyles.label}>{t('smartSociety.model')}</Text>
              <TextInput
                style={VehicleRegistrationStyles.input}
                value={vehicleModel}
                onChangeText={setVehicleModel}
                placeholder={t('smartSociety.pleaseEnterVehicleModel')}
                placeholderTextColor={COLORS.GREY_TEXT}
                autoCapitalize="words"
              />
            </View>

            <View style={VehicleRegistrationStyles.section}>
              <Text style={VehicleRegistrationStyles.label}>{t('smartSociety.color')}</Text>
              <TextInput
                style={VehicleRegistrationStyles.input}
                value={color}
                onChangeText={setColor}
                placeholder={t('smartSociety.color')}
                placeholderTextColor={COLORS.GREY_TEXT}
                autoCapitalize="words"
              />
            </View>

            <View style={VehicleRegistrationStyles.section}>
              <Text style={VehicleRegistrationStyles.label}>{t('smartSociety.parkingSlot')}</Text>
              <View style={VehicleRegistrationStyles.typesContainer}>
                {parkingSlots.map(slot => (
                  <TouchableOpacity
                    key={slot}
                    style={[
                      VehicleRegistrationStyles.typeChip,
                      parkingSlot === slot &&
                        VehicleRegistrationStyles.typeChipActive,
                    ]}
                    onPress={() => setParkingSlot(slot)}
                  >
                    <Text
                      style={[
                        VehicleRegistrationStyles.typeChipText,
                        parkingSlot === slot &&
                          VehicleRegistrationStyles.typeChipTextActive,
                      ]}
                    >
                      {slot}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={VehicleRegistrationStyles.buttonRow}>
              <View style={VehicleRegistrationStyles.cancelButton}>
                <CustomButton
                  title={t('common.cancel')}
                  onPress={() => {
                    resetForm();
                    setIsAdding(false);
                  }}
                />
              </View>
              <View style={VehicleRegistrationStyles.submitButton}>
                <CustomButton
                  title={t('smartSociety.registerVehicle')}
                  onPress={handleAddVehicle}
                />
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </Container>
  );
};

export default VehicleRegistration;

