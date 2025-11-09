import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  Container,
  SearchInput,
  HeaderComponent,
} from '../../components/common';
import { SocietySelectionStyles } from './styles';
import { useTranslation } from '../../context/LanguageContext';
import PrefManager from '../../utils/prefManager';
import { STRING } from '../../constants';

interface Society {
  id: string;
  name: string;
  location: string;
  members: number;
  blocks: number;
}

const SocietySelection = (props: any) => {
  const { t } = useTranslation();
  const isMountedRef = useRef(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredSocieties, setFilteredSocieties] = useState<Society[]>([]);

  // Mock data - replace with actual API call
  const societies: Society[] = [
    {
      id: '1',
      name: 'Shivalik Parkview 2',
      location: 'Satellite, Ahmedabad',
      members: 250,
      blocks: 4,
    },
    {
      id: '2',
      name: 'Shivalik Edge',
      location: 'Prahlad Nagar, Ahmedabad',
      members: 180,
      blocks: 3,
    },
    {
      id: '3',
      name: 'Shivalik Harmony',
      location: 'Vastrapur, Ahmedabad',
      members: 320,
      blocks: 5,
    },
    {
      id: '4',
      name: 'Shivalik Enclave',
      location: 'Bodakdev, Ahmedabad',
      members: 200,
      blocks: 4,
    },
    {
      id: '5',
      name: 'Shivalik Platinum',
      location: 'SG Highway, Ahmedabad',
      members: 280,
      blocks: 5,
    },
  ];

  useEffect(() => {
    isMountedRef.current = true;
    setFilteredSocieties(societies);
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredSocieties(societies);
    } else {
      const filtered = societies.filter(
        society =>
          society.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          society.location.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredSocieties(filtered);
    }
  }, [searchTerm]);

  const handleSocietyPress = async (society: Society) => {
    if (!isMountedRef.current) return;

    try {
      // Store selected society in preferences
      await PrefManager.setValue(STRING.SELECTED_SOCIETY, society);
      console.log('Selected society saved:', society);

      // Navigate to RoleSelection screen
      props.navigation?.navigate('RoleSelection', { selectedSociety: society });
    } catch (error) {
      console.error('Error saving selected society:', error);
      // Still navigate even if save fails
      props.navigation?.navigate('RoleSelection', { selectedSociety: society });
    }
  };

  const handleAddSociety = () => {
    props.navigation?.navigate('AddNewSociety');
  };

  const renderSocietyItem = ({ item }: { item: Society }) => (
    <TouchableOpacity
      style={SocietySelectionStyles.societyCard}
      onPress={() => handleSocietyPress(item)}
      activeOpacity={0.7}
    >
      <View style={SocietySelectionStyles.societyIconContainer}>
        <View style={SocietySelectionStyles.societyIcon}>
          <Text style={SocietySelectionStyles.societyIconText}>🏢</Text>
        </View>
      </View>
      <View style={SocietySelectionStyles.societyInfo}>
        <Text style={SocietySelectionStyles.societyName}>{item.name}</Text>
        <Text style={SocietySelectionStyles.societyLocation}>
          {item.location}
        </Text>
        <Text style={SocietySelectionStyles.societyDetails}>
          {item.members} {t('society.members')} • {item.blocks}{' '}
          {t('society.blocks')}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Container>
      <HeaderComponent
        Title={t('society.societyManagement')}
        onPress={() => props.navigation?.goBack()}
        showLanguageSelector={true}
        rightAction={
          <TouchableOpacity
            style={SocietySelectionStyles.addButton}
            onPress={handleAddSociety}
            activeOpacity={0.7}
          >
            <Text style={SocietySelectionStyles.addButtonText}>+</Text>
          </TouchableOpacity>
        }
      />
      <ScrollView
        style={SocietySelectionStyles.container}
        contentContainerStyle={SocietySelectionStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={SocietySelectionStyles.card}>
          <Text style={SocietySelectionStyles.title}>
            {t('society.selectYourSociety')}
          </Text>
          <Text style={SocietySelectionStyles.subtitle}>
            {t('society.searchAndSelectSociety')}
          </Text>

          <View style={SocietySelectionStyles.searchContainer}>
            <SearchInput
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholder={t('society.searchPlaceholder')}
            />
          </View>

          <FlatList
            data={filteredSocieties}
            renderItem={renderSocietyItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default SocietySelection;
