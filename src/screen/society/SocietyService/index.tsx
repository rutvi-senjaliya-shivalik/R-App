import React, { useCallback, useMemo } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { Container, HeaderComponent } from '../../../components/common';
import { societyServiceStyles } from './styles';
import { Icon } from '../../../components/common/Icon';

type ServiceItem = {
  key: string;
  label: string;
  icon: any;
  onPress?: () => void;
};

const SocietyService = ({ navigation }: any) => {
  const services: ServiceItem[] = useMemo(
    () => [
      { key: 'dashboard', label: 'Dashboard', icon: 'dashboard-ic' },
      { key: 'amenities', label: 'Amenities', icon: 'amenities-ic' },
      { key: 'helpdesk', label: 'Helpdesk', icon: 'helpdesk-ic' },
      { key: 'security', label: 'Security', icon: 'security-ic' },
      { key: 'sos', label: 'SOS', icon: 'sos-ic' },
      { key: 'report', label: 'Report', icon: 'report-ic' },
      { key: 'unitManagement', label: 'Unit Management', icon: 'unit-management-ic' },
    ],
    [],
  );

  const handlePress = useCallback(
    (item: ServiceItem) => {
      switch (item.key) {
        case 'dashboard':
          navigation.navigate('SocietyDashboard');
          break;
        case 'amenities':
          navigation.navigate('SocietyAmenities');
          break;
        case 'helpdesk':
          navigation.navigate('SocietyHelpdesk');
          break;
        case 'security':
          navigation.navigate('SocietySecurity');
          break;
        case 'sos':
          navigation.navigate('SocietySOS');
          break;
        case 'report':
          navigation.navigate('SocietyReport');
          break;
        case 'unitManagement':
          navigation.navigate('UnitManagement');
          break;
        default:
          break;
      }
    },
    [navigation],
  );

  const renderItem = useCallback(({ item }: { item: ServiceItem }) => {
    return (
      <TouchableOpacity
        style={societyServiceStyles.card}
        activeOpacity={0.85}
        onPress={() => handlePress(item)}
      >
        <Icon name={item.icon} sizes={{ width: 32, height: 32 }} />
        <Text style={societyServiceStyles.label}>{item.label}</Text>
      </TouchableOpacity>
    );
  }, [handlePress]);

  return (
    <Container>
      <View style={societyServiceStyles.container}>
        <HeaderComponent
          Title="Society Services"
          onPress={() => navigation.goBack()}
        />
        <View style={societyServiceStyles.contentWrapper}>
          <FlatList
            data={services}
            keyExtractor={(item) => item.key}
            numColumns={3}
            renderItem={renderItem}
            contentContainerStyle={societyServiceStyles.gridContent}
          />
        </View>
      </View>
    </Container>
  );
};

export default SocietyService;


