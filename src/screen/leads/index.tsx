import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { COLORS, FF, FS } from '../../constants';
import LeadCard from '../../components/common/LeadCard';
import SearchBar from '../../components/common/SearchBar';
import FilterButtons from '../../components/common/FilterButtons';

// Back Arrow Icon
const BackArrowIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18L9 12L15 6"
      stroke="#000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Profile Icon
const ProfileIcon = () => (
  <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <Path
      d="M20 20C24.4183 20 28 16.4183 28 12C28 7.58172 24.4183 4 20 4C15.5817 4 12 7.58172 12 12C12 16.4183 15.5817 20 20 20Z"
      fill="#6B7280"
    />
    <Path
      d="M20 22C11.1634 22 4 29.1634 4 38H36C36 29.1634 28.8366 22 20 22Z"
      fill="#6B7280"
    />
  </Svg>
);

const Leads = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock leads data
  const leadsData = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      projectName: 'Shivalik Heights - Tower A',
      status: 'Site Visit Scheduled' as const,
      managedBy: 'Amit Sharma',
      lastContact: '2 hours ago',
      priority: 'high' as const,
    },
    {
      id: '2',
      name: 'Priya Patel',
      projectName: 'Shivalik Villa',
      status: 'Negotiation' as const,
      managedBy: 'Neha Singh',
      lastContact: '1 day ago',
      priority: 'medium' as const,
    },
    {
      id: '3',
      name: 'Amit Verma',
      projectName: 'Shivalik Heights - Tower B',
      status: 'New Lead' as const,
      managedBy: 'Rajesh Kumar',
      lastContact: '3 hours ago',
      priority: 'high' as const,
    },
    {
      id: '4',
      name: 'Sneha Gupta',
      projectName: 'Shivalik Golf',
      status: 'Contacted' as const,
      managedBy: 'Amit Sharma',
      lastContact: '5 hours ago',
    },
    {
      id: '5',
      name: 'Vikram Singh',
      projectName: 'Shivalik Heights - Tower C',
      status: 'Booking in Progress' as const,
      managedBy: 'Neha Singh',
      lastContact: '1 day ago',
      priority: 'high' as const,
    },
  ];

  const handleBack = () => {
    navigation.goBack();
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleLeadPress = (leadId: string) => {
    navigation.navigate('LeadDetails', { leadId });
  };

  const handleDateFilter = () => {
    Alert.alert('Filter', 'Date filter');
  };

  const handleStageFilter = () => {
    Alert.alert('Filter', 'Stage filter');
  };

  const handleProjectFilter = () => {
    Alert.alert('Filter', 'Project filter');
  };

  const handlePriorityFilter = () => {
    Alert.alert('Filter', 'Priority filter');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <BackArrowIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Leads</Text>
        <TouchableOpacity onPress={handleProfilePress} style={styles.profileIcon}>
          <ProfileIcon />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search leads..."
        />
      </View>

      {/* Filter Buttons */}
      <FilterButtons
        onDatePress={handleDateFilter}
        onStagePress={handleStageFilter}
        onProjectPress={handleProjectFilter}
        onPriorityPress={handlePriorityFilter}
      />

      {/* Leads List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {leadsData.map((lead) => (
          <LeadCard
            key={lead.id}
            name={lead.name}
            projectName={lead.projectName}
            status={lead.status}
            managedBy={lead.managedBy}
            lastContact={lead.lastContact}
            priority={lead.priority}
            onPress={() => handleLeadPress(lead.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: COLORS.WHITE,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: FS.FS18,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    fontWeight: '600',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
});

export default Leads;
