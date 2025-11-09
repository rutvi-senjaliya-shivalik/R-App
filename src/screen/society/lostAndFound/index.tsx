/**
 * LostAndFound Screen Component
 * 
 * Main screen that displays a list of lost & found entries.
 * Features:
 * - List view of all entries
 * - Add button to create new entries
 * - BottomSheet form for creating entries
 * - API integration with GET and POST
 */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Container, HeaderComponent, BottomSheet, CustomButton } from '../../../components/common';
import { LostAndFoundForm, LostAndFoundFormRef } from './LostAndFoundForm';
import { lostAndFoundStyles } from './styles';
import { COLORS } from '../../../constants';
import { MakeApiRequest } from '../../../services/apiService';
import { GET_LOS_LIST } from '../../../services/httpService';
import { GET } from '../../../constants/api';

type LostAndFoundEntry = {
  id: string;
  description: string;
  image?: string | null;
  timestamp: string;
  status?: string;
  userId?: string;
};

type ApiLosEntry = {
  _id: string;
  userId: string;
  name: string;
  image?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

const LostAndFound = ({ navigation }: any) => {
  // State management
  const [entries, setEntries] = useState<LostAndFoundEntry[]>([]);
  const [showFormSheet, setShowFormSheet] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Ref for form to call submit
  const formRef = useRef<LostAndFoundFormRef>(null);

  /**
   * Maps API entry to UI entry format
   */
  const mapApiEntryToEntry = useCallback((apiEntry: ApiLosEntry): LostAndFoundEntry => {
    return {
      id: apiEntry._id,
      description: apiEntry.name,
      image: apiEntry.image || null,
      timestamp: apiEntry.createdAt,
      status: apiEntry.status,
      userId: apiEntry.userId,
    };
  }, []);

  /**
   * Fetches L&F entries from API
   */
  const fetchEntries = useCallback(async () => {
    try {
      console.log('Fetching L&F entries...');
      
      const response = await MakeApiRequest({
        apiUrl: GET_LOS_LIST,
        apiMethod: GET,
      });

      console.log('L&F entries response:', response);

      if (response?.status === 200) {
        const losEntries = response.data?.result?.losEntries || [];
        const mappedEntries = losEntries.map(mapApiEntryToEntry);
        
        setEntries(mappedEntries);
        
        console.log(`Loaded ${mappedEntries.length} L&F entries`);
      } else {
        console.log('Failed to fetch entries:', response);
        Alert.alert('Error', 'Failed to load entries. Please try again.');
      }
    } catch (error: any) {
      console.log('Error fetching L&F entries:', error);
      
      // Don't show error on initial load if user is not authenticated
      if (error?.response?.status !== 401) {
        Alert.alert(
          'Error',
          error?.response?.data?.message || 'Failed to load entries. Please try again.'
        );
      }
    }
  }, [mapApiEntryToEntry]);

  /**
   * Fetch entries on component mount
   */
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      await fetchEntries();
      setLoading(false);
    };

    loadInitialData();
  }, [fetchEntries]);

  /**
   * Opens the form bottom sheet
   */
  const handleAddPress = useCallback(() => {
    setShowFormSheet(true);
  }, []);

  /**
   * Closes the form bottom sheet
   */
  const handleCloseSheet = useCallback(() => {
    if (!isSubmitting) {
      setShowFormSheet(false);
    }
  }, [isSubmitting]);

  /**
   * Handles successful form submission
   */
  const handleFormSuccess = useCallback(async () => {
    // Close the bottom sheet
    setShowFormSheet(false);
    
    // Refresh the list from the API to ensure data consistency
    await fetchEntries();
  }, [fetchEntries]);

  /**
   * Handles form submit button press from BottomSheet
   */
  const handleSubmit = useCallback(async () => {
    // Call the form's handleSubmit method
    if (formRef.current?.handleSubmit) {
      await formRef.current.handleSubmit();
    }
  }, []);

  /**
   * Handles pull-to-refresh
   */
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchEntries();
    setRefreshing(false);
  }, [fetchEntries]);

  /**
   * Renders individual entry item
   */
  const renderEntry = useCallback(({ item }: { item: LostAndFoundEntry }) => {
    return (
      <View style={lostAndFoundStyles.entryCard}>
        <View style={lostAndFoundStyles.entryContent}>
          <Text style={lostAndFoundStyles.entryDescription} numberOfLines={3}>
            {item.description}
          </Text>
          <Text style={lostAndFoundStyles.entryTimestamp}>
            {new Date(item.timestamp).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
        {item.image && (
          <Image
            source={{ uri: item.image }}
            style={lostAndFoundStyles.entryThumbnail}
            resizeMode="cover"
          />
        )}
      </View>
    );
  }, []);

  /**
   * Renders empty state
   */
  const renderEmptyState = useCallback(() => {
    return (
      <View style={lostAndFoundStyles.emptyStateContainer}>
        <Text style={lostAndFoundStyles.emptyStateIcon}>🔍</Text>
        <Text style={lostAndFoundStyles.emptyStateTitle}>
          No Lost & Found Entries
        </Text>
        <Text style={lostAndFoundStyles.emptyStateMessage}>
          Tap the "Add New" button to report a lost or found item.
        </Text>
      </View>
    );
  }, []);

  /**
   * Key extractor for FlatList
   */
  const keyExtractor = useCallback((item: LostAndFoundEntry) => item.id, []);

  /**
   * Renders loading state
   */
  if (loading) {
    return (
      <Container>
        <View style={lostAndFoundStyles.container}>
          <HeaderComponent
            Title="L&F - Loss & Found"
            onPress={() => navigation.goBack()}
          />
          <View style={lostAndFoundStyles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.BLUE_TEXT} />
            <Text style={lostAndFoundStyles.loadingText}>Loading entries...</Text>
          </View>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <View style={lostAndFoundStyles.container}>
        <HeaderComponent
          Title="L&F - Loss & Found"
          onPress={() => navigation.goBack()}
        />

        {/* Entries List */}
        <FlatList
          data={entries}
          renderItem={renderEntry}
          keyExtractor={keyExtractor}
          contentContainerStyle={[
            lostAndFoundStyles.listContent,
            entries.length === 0 && lostAndFoundStyles.emptyListContent,
          ]}
          ListEmptyComponent={renderEmptyState}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={COLORS.BLUE_TEXT}
              colors={[COLORS.BLUE_TEXT]}
            />
          }
        />

        {/* Add Button - Bottom Center */}
        <View style={lostAndFoundStyles.bottomButtonContainer}>
          <CustomButton
            title="+ Add new"
            onPress={handleAddPress}
            style={lostAndFoundStyles.addButton}
          />
        </View>
      </View>

      {/* Form Bottom Sheet */}
      <BottomSheet
        visible={showFormSheet}
        title="Report Lost or Found Item"
        onClose={handleCloseSheet}
        positiveButton={{
          text: 'Submit',
          onPress: handleSubmit,
          loading: isSubmitting,
          disabled: isSubmitting,
        }}
        negativeButton={{
          text: 'Cancel',
          onPress: handleCloseSheet,
          disabled: isSubmitting,
        }}
      >
        <LostAndFoundForm
          ref={formRef}
          onSuccess={handleFormSuccess}
          onCancel={handleCloseSheet}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
        />
      </BottomSheet>
    </Container>
  );
};

export default LostAndFound;
