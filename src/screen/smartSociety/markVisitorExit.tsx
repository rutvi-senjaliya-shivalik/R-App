import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { Container, HeaderComponent, CustomButton, SearchInput } from '../../components/common';
import { MarkVisitorExitStyles } from './styles';
import { useTranslation } from '../../context/LanguageContext';

const MarkVisitorExit = (props: any) => {
  const { t } = useTranslation();
  // Mock data - In real app, this would come from API
  const [allVisitors, setAllVisitors] = useState([
    {
      id: '1',
      visitorName: 'John Doe',
      phoneNumber: '9876543210',
      flatNumber: 'A-101',
      entryTime: '10:00 AM',
      purpose: 'Delivery',
      vehicleNumber: 'MH-12-AB-1234',
      image: null, // In real app, this would be a URL or local image
    },
    {
      id: '2',
      visitorName: 'Jane Smith',
      phoneNumber: '9876543211',
      flatNumber: 'B-205',
      entryTime: '11:30 AM',
      purpose: 'Meeting',
      vehicleNumber: '',
      image: null,
    },
    {
      id: '3',
      visitorName: 'Robert Johnson',
      phoneNumber: '9876543212',
      flatNumber: 'C-301',
      entryTime: '9:15 AM',
      purpose: 'Service',
      vehicleNumber: 'MH-12-CD-5678',
      image: null,
    },
    {
      id: '4',
      visitorName: 'Emily Davis',
      phoneNumber: '9876543213',
      flatNumber: 'A-102',
      entryTime: '2:00 PM',
      purpose: 'Guest',
      vehicleNumber: '',
      image: null,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVisitor, setSelectedVisitor] = useState<any>(null);
  const [filteredVisitors, setFilteredVisitors] = useState(allVisitors);

  // Filter visitors based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredVisitors(allVisitors);
    } else {
      const filtered = allVisitors.filter(visitor =>
        visitor.visitorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        visitor.phoneNumber.includes(searchQuery) ||
        visitor.flatNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredVisitors(filtered);
    }
  }, [searchQuery, allVisitors]);

  const handleVisitorSelect = (visitor: any) => {
    setSelectedVisitor(visitor);
    setSearchQuery('');
  };

  const handleMarkExit = () => {
    if (!selectedVisitor) {
      Alert.alert(t('common.error'), t('smartSociety.pleaseSelectVisitorFirst'));
      return;
    }

    // Here you would typically make an API call to mark visitor exit
    const currentTime = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    console.log('Visitor Exit Data:', {
      ...selectedVisitor,
      exitTime: currentTime,
    });

    Alert.alert(
      t('common.success'),
      t('smartSociety.visitorExitRecordedSuccessfully', { name: selectedVisitor.visitorName }),
      [
        {
          text: t('common.ok'),
          onPress: () => {
            // Remove visitor from list after exit
            setAllVisitors(prev => prev.filter(v => v.id !== selectedVisitor.id));
            setSelectedVisitor(null);
          },
        },
      ],
    );
  };

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const renderVisitorItem = ({ item }: any) => {
    const isSelected = selectedVisitor?.id === item.id;
    return (
      <TouchableOpacity
        style={[
          MarkVisitorExitStyles.visitorItem,
          isSelected && MarkVisitorExitStyles.visitorItemSelected,
        ]}
        onPress={() => handleVisitorSelect(item)}
        activeOpacity={0.7}
      >
        <View style={MarkVisitorExitStyles.visitorItemContent}>
          <View style={MarkVisitorExitStyles.visitorItemRow}>
            <View style={MarkVisitorExitStyles.visitorImageContainer}>
              {item.image ? (
                <Image
                  source={{ uri: item.image }}
                  style={MarkVisitorExitStyles.visitorImage}
                />
              ) : (
                <View style={MarkVisitorExitStyles.visitorImagePlaceholder}>
                  <Text style={MarkVisitorExitStyles.visitorInitials}>
                    {getInitials(item.visitorName)}
                  </Text>
                </View>
              )}
            </View>
            <View style={MarkVisitorExitStyles.visitorInfo}>
              <View style={MarkVisitorExitStyles.visitorItemHeader}>
                <Text style={MarkVisitorExitStyles.visitorName}>{item.visitorName}</Text>
                {isSelected && (
                  <View style={MarkVisitorExitStyles.selectedBadge}>
                    <Text style={MarkVisitorExitStyles.selectedBadgeText}>{t('common.selected')}</Text>
                  </View>
                )}
              </View>
              <View style={MarkVisitorExitStyles.visitorDetails}>
                <View style={MarkVisitorExitStyles.visitorDetailRow}>
                  <Text style={MarkVisitorExitStyles.visitorDetailLabel}>{t('smartSociety.phone')}:</Text>
                  <Text style={MarkVisitorExitStyles.visitorDetailValue}>{item.phoneNumber}</Text>
                </View>
                <View style={MarkVisitorExitStyles.visitorDetailRow}>
                  <Text style={MarkVisitorExitStyles.visitorDetailLabel}>{t('smartSociety.flat')}:</Text>
                  <Text style={MarkVisitorExitStyles.visitorDetailValue}>{item.flatNumber}</Text>
                </View>
                <View style={MarkVisitorExitStyles.visitorDetailRow}>
                  <Text style={MarkVisitorExitStyles.visitorDetailLabel}>{t('smartSociety.entryTime')}:</Text>
                  <Text style={MarkVisitorExitStyles.visitorDetailValue}>{item.entryTime}</Text>
                </View>
                {item.vehicleNumber && (
                  <View style={MarkVisitorExitStyles.visitorDetailRow}>
                    <Text style={MarkVisitorExitStyles.visitorDetailLabel}>{t('smartSociety.vehicle')}:</Text>
                    <Text style={MarkVisitorExitStyles.visitorDetailValue}>{item.vehicleNumber}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <HeaderComponent
        Title={t('smartSociety.markVisitorExit')}
        onPress={() => props.navigation?.goBack()}
      />
      <View style={MarkVisitorExitStyles.container}>
        {/* Search Section */}
        <View style={MarkVisitorExitStyles.searchSection}>
          <SearchInput
            placeholder={t('smartSociety.searchByNamePhoneFlat')}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Visitors List */}
        {!selectedVisitor ? (
          <View style={MarkVisitorExitStyles.listSection}>
            <Text style={MarkVisitorExitStyles.sectionTitle}>
              {t('smartSociety.activeVisitors')} ({filteredVisitors.length})
            </Text>
            {filteredVisitors.length > 0 ? (
              <FlatList
                data={filteredVisitors}
                renderItem={renderVisitorItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={MarkVisitorExitStyles.listContent}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <View style={MarkVisitorExitStyles.emptyState}>
                <Text style={MarkVisitorExitStyles.emptyStateText}>
                  {searchQuery ? t('smartSociety.noVisitorsFound') : t('smartSociety.noActiveVisitors')}
                </Text>
              </View>
            )}
          </View>
        ) : (
          <ScrollView
            style={MarkVisitorExitStyles.detailsSection}
            contentContainerStyle={MarkVisitorExitStyles.detailsContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Selected Visitor Details Card */}
            <View style={MarkVisitorExitStyles.card}>
              <View style={MarkVisitorExitStyles.cardHeader}>
                <Text style={MarkVisitorExitStyles.cardTitle}>{t('smartSociety.visitorDetails')}</Text>
                <TouchableOpacity
                  onPress={() => setSelectedVisitor(null)}
                  style={MarkVisitorExitStyles.changeButton}
                >
                  <Text style={MarkVisitorExitStyles.changeButtonText}>{t('common.change')}</Text>
                </TouchableOpacity>
              </View>
              <View style={MarkVisitorExitStyles.cardContent}>
                {/* Visitor Image */}
                <View style={MarkVisitorExitStyles.visitorImageSection}>
                  {selectedVisitor.image ? (
                    <Image
                      source={{ uri: selectedVisitor.image }}
                      style={MarkVisitorExitStyles.visitorDetailImage}
                    />
                  ) : (
                    <View style={MarkVisitorExitStyles.visitorDetailImagePlaceholder}>
                      <Text style={MarkVisitorExitStyles.visitorDetailInitials}>
                        {getInitials(selectedVisitor.visitorName)}
                      </Text>
                    </View>
                  )}
                </View>
                <View style={MarkVisitorExitStyles.detailRow}>
                  <Text style={MarkVisitorExitStyles.detailLabel}>{t('smartSociety.visitorNameLabel')}</Text>
                  <Text style={MarkVisitorExitStyles.detailValue}>
                    {selectedVisitor.visitorName}
                  </Text>
                </View>
                <View style={MarkVisitorExitStyles.detailRow}>
                  <Text style={MarkVisitorExitStyles.detailLabel}>{t('smartSociety.phoneNumberLabel')}</Text>
                  <Text style={MarkVisitorExitStyles.detailValue}>
                    {selectedVisitor.phoneNumber}
                  </Text>
                </View>
                <View style={MarkVisitorExitStyles.detailRow}>
                  <Text style={MarkVisitorExitStyles.detailLabel}>{t('smartSociety.flatUnitNumberLabel')}</Text>
                  <Text style={MarkVisitorExitStyles.detailValue}>
                    {selectedVisitor.flatNumber}
                  </Text>
                </View>
                <View style={MarkVisitorExitStyles.detailRow}>
                  <Text style={MarkVisitorExitStyles.detailLabel}>{t('smartSociety.entryTimeLabel')}</Text>
                  <Text style={MarkVisitorExitStyles.detailValue}>
                    {selectedVisitor.entryTime}
                  </Text>
                </View>
                <View style={MarkVisitorExitStyles.detailRow}>
                  <Text style={MarkVisitorExitStyles.detailLabel}>{t('smartSociety.purposeLabel')}</Text>
                  <Text style={MarkVisitorExitStyles.detailValue}>
                    {selectedVisitor.purpose}
                  </Text>
                </View>
                {selectedVisitor.vehicleNumber && (
                  <View style={MarkVisitorExitStyles.detailRow}>
                    <Text style={MarkVisitorExitStyles.detailLabel}>{t('smartSociety.vehicleNumberLabel')}</Text>
                    <Text style={MarkVisitorExitStyles.detailValue}>
                      {selectedVisitor.vehicleNumber}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            <View style={MarkVisitorExitStyles.buttonContainer}>
              <CustomButton
                title={t('smartSociety.markExit')}
                onPress={handleMarkExit}
              />
            </View>
          </ScrollView>
        )}
      </View>
    </Container>
  );
};

export default MarkVisitorExit;

