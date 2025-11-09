import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { AppHeader, SearchBar, FilterButtons, LeadCard } from '../../components/common';
import type { LeadStatus } from '../../components/common/LeadCard';
import { COLORS, FF, FS } from '../../constants';
import { useLeads } from '../../hooks/useLeads';
import type { Lead } from '../../services/api';

const Community = (props: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const { getLeads, loading } = useLeads();

  const handleBellPress = () => {
    Alert.alert('Notifications', 'No new notifications');
  };

  const handleProfilePress = () => {
    props.navigation.navigate('Profile');
  };

  const handleSearch = () => {
    Alert.alert('Search', `Searching for: ${searchQuery}`);
  };

  const handleDateFilter = () => {
    Alert.alert('Filter', 'Date filter pressed');
  };

  const handleStageFilter = () => {
    Alert.alert('Filter', 'Stage filter pressed');
  };

  const handleProjectFilter = () => {
    Alert.alert('Filter', 'Project filter pressed');
  };

  const handlePriorityFilter = () => {
    Alert.alert('Filter', 'Priority filter pressed');
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      console.log('Fetching leads...');
      const response = await getLeads(1, 50);
      console.log('Leads response:', response);
      console.log('Number of leads:', response.leads?.length);
      setLeads(response.leads || []);
    } catch (error: any) {
      console.error('Error fetching leads:', error);
      console.error('Error details:', error.message, error.response);
      // Silently handle error - just show empty state
      setLeads([]);
    }
  };

  const handleAddLead = () => {
    props.navigation.navigate('AddLead');
  };

  const handleLeadPress = (leadId: string) => {
    props.navigation.navigate('LeadDetails', { leadId });
  };

  const getTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  // Sample leads data (fallback)
  const sampleLeads = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      projectName: 'Shivalik Heights - Tower A',
      status: 'New Lead' as LeadStatus,
      managedBy: 'Tirth Prajapati',
      lastContact: '2 days ago',
      priority: 'high' as const,
    },
    {
      id: '2',
      name: 'Priya Sharma',
      projectName: 'Shivalik Paradise - Unit 304',
      status: 'Contacted' as LeadStatus,
      managedBy: 'Amit Patel',
      lastContact: '1 day ago',
      priority: 'medium' as const,
    },
    {
      id: '3',
      name: 'Vikram Singh',
      projectName: 'Shivalik Residency - Tower B',
      status: 'Site Visit Scheduled' as LeadStatus,
      managedBy: 'Neha Desai',
      lastContact: '3 hours ago',
      priority: 'high' as const,
    },
    {
      id: '4',
      name: 'Anjali Mehta',
      projectName: 'Shivalik Heights - Tower C',
      status: 'Negotiation' as LeadStatus,
      managedBy: 'Rahul Shah',
      lastContact: '5 hours ago',
      priority: 'medium' as const,
    },
    {
      id: '5',
      name: 'Suresh Patel',
      projectName: 'Shivalik Paradise - Unit 205',
      status: 'Booked' as LeadStatus,
      managedBy: 'Tirth Prajapati',
      lastContact: '1 week ago',
      priority: 'low' as const,
    },
  ];

  return (
    <View style={styles.container}>
      <AppHeader 
        title="Leads"
        onBellPress={handleBellPress}
        onProfilePress={handleProfilePress}
      />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <SearchBar 
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search leads..."
          onSearchPress={handleSearch}
        />

        <FilterButtons 
          onDatePress={handleDateFilter}
          onStagePress={handleStageFilter}
          onProjectPress={handleProjectFilter}
          onPriorityPress={handlePriorityFilter}
        />

        {/* Leads List */}
        <View style={styles.leadsContainer}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#000000" />
              <Text style={styles.loadingText}>Loading leads...</Text>
            </View>
          ) : leads.length > 0 ? (
            leads.map((lead) => (
              <LeadCard
                key={lead._id}
                name={lead.clientName}
                projectName={lead.projectName}
                status={lead.stage as LeadStatus}
                managedBy="Team Member"
                lastContact={getTimeAgo(lead.updatedAt)}
                onPress={() => handleLeadPress(lead._id)}
              />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No leads found</Text>
              <Text style={styles.emptySubtext}>Create your first lead to get started</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={handleAddLead}
        activeOpacity={0.8}
      >
        <Svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.8572 23.5714C18.7747 23.5714 23.5715 18.7746 23.5715 12.8571C23.5715 6.93961 18.7747 2.14282 12.8572 2.14282C6.93967 2.14282 2.14288 6.93961 2.14288 12.8571C2.14288 18.7746 6.93967 23.5714 12.8572 23.5714ZM13.6607 9.64282C13.6607 9.19902 13.301 8.83925 12.8572 8.83925C12.4134 8.83925 12.0536 9.19902 12.0536 9.64282V12.0535H9.64288C9.19908 12.0535 8.83931 12.4133 8.83931 12.8571C8.83931 13.3009 9.19908 13.6607 9.64288 13.6607H12.0536V16.0714C12.0536 16.5152 12.4134 16.875 12.8572 16.875C13.301 16.875 13.6607 16.5152 13.6607 16.0714V13.6607H16.0715C16.5153 13.6607 16.875 13.3009 16.875 12.8571C16.875 12.4133 16.5153 12.0535 16.0715 12.0535H13.6607V9.64282Z"
            fill="white"
          />
        </Svg>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  leadsContainer: {
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: '#6B7280',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: FS.FS18,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default Community;
