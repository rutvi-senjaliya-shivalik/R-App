import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Container, HeaderComponent } from '../../../../components/common';
import LostFoundListStyles from './styles/lostFoundListStyles';
import { COLORS } from '../../../../constants';
import { useTranslation } from '../../../../context/LanguageContext';

interface LostFoundItem {
  id: string;
  type: 'Lost' | 'Found';
  itemName: string;
  description: string;
  location?: string;
  date: string;
  status: 'Open' | 'Claimed' | 'Returned';
  imageUrl?: string;
  reportedBy: string;
  flatNo: string;
  contact?: string;
}

const LostFoundList = (props: any) => {
  const { t } = useTranslation();
  const isMountedRef = useRef(true);
  const selectedRole = props.route?.params?.selectedRole;
  const [items, setItems] = useState<LostFoundItem[]>([]);
  const [filterType, setFilterType] = useState<'All' | 'Lost' | 'Found'>('All');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Open' | 'Claimed' | 'Returned'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    isMountedRef.current = true;
    loadLostFoundItems();
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Listen for new items added from AddLostFound screen
  useFocusEffect(
    React.useCallback(() => {
      const newItem = props.route?.params?.newItem;
      if (newItem && isMountedRef.current) {
        // Add the new item to the list
        setItems(prevItems => {
          // Check if item already exists (prevent duplicates)
          const exists = prevItems.some(item => item.id === newItem.id);
          if (!exists) {
            // Add new item at the beginning of the list
            return [newItem, ...prevItems];
          }
          return prevItems;
        });
        
        // Clear the params to prevent re-adding on next focus
        props.navigation?.setParams({ newItem: undefined });
      }
    }, [props.route?.params?.newItem, props.navigation]),
  );

  const loadLostFoundItems = () => {
    // TODO: Fetch from API/Firebase
    // Mock data for now
    const mockItems: LostFoundItem[] = [
      {
        id: 'lf001',
        type: 'Lost',
        itemName: 'Wallet',
        description: 'Brown leather wallet lost near parking B',
        location: 'Parking Zone B',
        date: '2025-11-08',
        status: 'Open',
        imageUrl: undefined,
        reportedBy: 'Jay Sarvaiya',
        flatNo: 'A-101',
        contact: '9876543210',
      },
      {
        id: 'lf002',
        type: 'Found',
        itemName: 'Car Keys',
        description: 'Found keys with red keychain near lift',
        location: 'Tower C Lift',
        date: '2025-11-06',
        status: 'Returned',
        imageUrl: undefined,
        reportedBy: 'Priya Mehta',
        flatNo: 'C-405',
        contact: '9988776655',
      },
      {
        id: 'lf003',
        type: 'Lost',
        itemName: 'Mobile Phone',
        description: 'iPhone 13 Pro Max, black case',
        location: 'Gym Area',
        date: '2025-11-07',
        status: 'Open',
        imageUrl: undefined,
        reportedBy: 'R. Mehta',
        flatNo: 'A-203',
        contact: '9876543211',
      },
    ];
    setItems(mockItems);
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'lost':
        return { bg: '#FFEBEE', text: '#C62828', border: '#EF5350' };
      case 'found':
        return { bg: '#E8F5E9', text: '#2E7D32', border: '#66BB6A' };
      default:
        return { bg: COLORS.LIGHT_GRAY, text: COLORS.GREY_TEXT, border: COLORS.BORDER_GREY };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'returned':
        return { bg: COLORS.LIGHT_BLUE, text: COLORS.DARK_BLUE, border: COLORS.BLUE_BORDER };
      case 'claimed':
        return { bg: COLORS.YELLOW_BG, text: COLORS.ORANGE_TEXT, border: COLORS.YELLOW_BORDER };
      case 'open':
        return { bg: COLORS.LIGHT_GREEN, text: COLORS.GREEN_TEXT, border: COLORS.LIGHT_BORDER_GREEN };
      default:
        return { bg: COLORS.LIGHT_GRAY, text: COLORS.GREY_TEXT, border: COLORS.BORDER_GREY };
    }
  };

  const filteredItems = items.filter(item => {
    const matchesType = filterType === 'All' || item.type === filterType;
    const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
    const matchesSearch =
      searchQuery === '' ||
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  const handleItemPress = (item: LostFoundItem) => {
    props.navigation?.navigate('LostFoundDetail', { item, selectedRole });
  };

  const handleAddReport = () => {
    props.navigation?.navigate('AddLostFound', { selectedRole });
  };

  const renderItemCard = ({ item }: { item: LostFoundItem }) => {
    const typeColor = getTypeColor(item.type);
    const statusColor = getStatusColor(item.status);

    return (
      <TouchableOpacity
        style={[LostFoundListStyles.itemCard, { borderColor: typeColor.border }]}
        activeOpacity={0.7}
        onPress={() => handleItemPress(item)}
      >
        <View style={LostFoundListStyles.cardHeader}>
          <View style={LostFoundListStyles.cardHeaderLeft}>
            <View
              style={[
                LostFoundListStyles.typeBadge,
                { backgroundColor: typeColor.bg, borderColor: typeColor.border },
              ]}
            >
              <Text style={[LostFoundListStyles.typeBadgeText, { color: typeColor.text }]}>
                {item.type}
              </Text>
            </View>
            <Text style={LostFoundListStyles.itemName}>{item.itemName}</Text>
          </View>
          <View
            style={[
              LostFoundListStyles.statusBadge,
              { backgroundColor: statusColor.bg, borderColor: statusColor.border },
            ]}
          >
            <Text style={[LostFoundListStyles.statusText, { color: statusColor.text }]}>
              {item.status}
            </Text>
          </View>
        </View>

        {item.imageUrl && (
          <Image source={{ uri: item.imageUrl }} style={LostFoundListStyles.itemImage} />
        )}

        <Text style={LostFoundListStyles.description} numberOfLines={2}>
          {item.description}
        </Text>

        {item.location && (
          <View style={LostFoundListStyles.locationRow}>
            <Text style={LostFoundListStyles.locationLabel}>📍</Text>
            <Text style={LostFoundListStyles.locationText}>{item.location}</Text>
          </View>
        )}

        <View style={LostFoundListStyles.cardFooter}>
          <View>
            <Text style={LostFoundListStyles.dateText}>
              {t('smartSociety.date')}: {new Date(item.date).toLocaleDateString()}
            </Text>
            <Text style={LostFoundListStyles.reportedByText}>
              {t('smartSociety.by')} {item.reportedBy} ({item.flatNo})
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <HeaderComponent
        Title={t('smartSociety.lostFound') || 'Lost & Found'}
        onPress={() => props.navigation?.goBack()}
      />
      <View style={LostFoundListStyles.container}>
        {/* Search Bar */}
        <View style={LostFoundListStyles.searchContainer}>
          <TextInput
            style={LostFoundListStyles.searchInput}
            placeholder={t('smartSociety.searchItems') || 'Search items...'}
            placeholderTextColor={COLORS.GREY_TEXT}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filter Tabs - Type */}
        <View style={LostFoundListStyles.filterContainer}>
          <Text style={LostFoundListStyles.filterLabel}>
            {t('smartSociety.type') || 'Type'}:{' '}
          </Text>
          {(['All', 'Lost', 'Found'] as const).map(type => (
            <TouchableOpacity
              key={type}
              style={[
                LostFoundListStyles.filterTab,
                filterType === type && LostFoundListStyles.filterTabActive,
              ]}
              onPress={() => setFilterType(type)}
            >
              <Text
                style={[
                  LostFoundListStyles.filterTabText,
                  filterType === type && LostFoundListStyles.filterTabTextActive,
                ]}
              >
                {type === 'All' ? t('common.all') : type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Filter Tabs - Status */}
        <View style={LostFoundListStyles.filterContainer}>
          <Text style={LostFoundListStyles.filterLabel}>
            {t('smartSociety.status') || 'Status'}:{' '}
          </Text>
          {(['All', 'Open', 'Claimed', 'Returned'] as const).map(status => (
            <TouchableOpacity
              key={status}
              style={[
                LostFoundListStyles.filterTab,
                filterStatus === status && LostFoundListStyles.filterTabActive,
              ]}
              onPress={() => setFilterStatus(status)}
            >
              <Text
                style={[
                  LostFoundListStyles.filterTabText,
                  filterStatus === status && LostFoundListStyles.filterTabTextActive,
                ]}
              >
                {status === 'All' ? t('common.all') : status}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={filteredItems}
          renderItem={renderItemCard}
          keyExtractor={item => item.id}
          contentContainerStyle={LostFoundListStyles.itemsList}
          ListEmptyComponent={
            <View style={LostFoundListStyles.emptyState}>
              <Text style={LostFoundListStyles.emptyStateText}>
                {t('smartSociety.noLostFoundItems') || 'No lost or found items found'}
              </Text>
            </View>
          }
        />

        <TouchableOpacity
          style={LostFoundListStyles.fab}
          activeOpacity={0.8}
          onPress={handleAddReport}
        >
          <Text style={LostFoundListStyles.fabText}>+</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default LostFoundList;

