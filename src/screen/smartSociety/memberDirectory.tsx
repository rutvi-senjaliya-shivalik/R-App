import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { Container, HeaderComponent, SearchInput } from '../../components/common';
import { MemberDirectoryStyles } from './styles';
import { useTranslation } from '../../context/LanguageContext';

const MemberDirectory = (props: any) => {
  const { t } = useTranslation();
  // Mock data - In real app, this would come from API
  const [allMembers, setAllMembers] = useState([
    {
      id: '1',
      name: 'Rajesh Kumar',
      flatNumber: 'A-101',
      phoneNumber: '9876543210',
      email: 'rajesh.kumar@example.com',
      image: null, // In real app, this would be a URL or local image
      role: 'Owner',
    },
    {
      id: '2',
      name: 'Priya Sharma',
      flatNumber: 'A-102',
      phoneNumber: '9876543211',
      email: 'priya.sharma@example.com',
      image: null,
      role: 'Owner',
    },
    {
      id: '3',
      name: 'Amit Patel',
      flatNumber: 'B-201',
      phoneNumber: '9876543212',
      email: 'amit.patel@example.com',
      image: null,
      role: 'Tenant',
    },
    {
      id: '4',
      name: 'Sneha Reddy',
      flatNumber: 'B-202',
      phoneNumber: '9876543213',
      email: 'sneha.reddy@example.com',
      image: null,
      role: 'Owner',
    },
    {
      id: '5',
      name: 'Vikram Singh',
      flatNumber: 'C-301',
      phoneNumber: '9876543214',
      email: 'vikram.singh@example.com',
      image: null,
      role: 'Owner',
    },
    {
      id: '6',
      name: 'Anjali Desai',
      flatNumber: 'C-302',
      phoneNumber: '9876543215',
      email: 'anjali.desai@example.com',
      image: null,
      role: 'Tenant',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMembers, setFilteredMembers] = useState(allMembers);

  // Filter members based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredMembers(allMembers);
    } else {
      const filtered = allMembers.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.flatNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.phoneNumber.includes(searchQuery) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMembers(filtered);
    }
  }, [searchQuery, allMembers]);

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const renderMemberItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        style={MemberDirectoryStyles.memberCard}
        activeOpacity={0.7}
        onPress={() => {
          // Navigate to member details if needed
          console.log('Member selected:', item);
        }}
      >
        <View style={MemberDirectoryStyles.memberImageContainer}>
          {item.image ? (
            <Image
              source={{ uri: item.image }}
              style={MemberDirectoryStyles.memberImage}
            />
          ) : (
            <View style={MemberDirectoryStyles.memberImagePlaceholder}>
              <Text style={MemberDirectoryStyles.memberInitials}>
                {getInitials(item.name)}
              </Text>
            </View>
          )}
        </View>
        <View style={MemberDirectoryStyles.memberInfo}>
          <View style={MemberDirectoryStyles.memberHeader}>
            <Text style={MemberDirectoryStyles.memberName}>{item.name}</Text>
            <View style={[
              MemberDirectoryStyles.roleBadge,
              item.role === 'Owner' && MemberDirectoryStyles.roleBadgeOwner
            ]}>
              <Text style={[
                MemberDirectoryStyles.roleBadgeText,
                item.role === 'Owner' && MemberDirectoryStyles.roleBadgeTextOwner
              ]}>
                {item.role}
              </Text>
            </View>
          </View>
          <View style={MemberDirectoryStyles.memberDetails}>
            <View style={MemberDirectoryStyles.memberDetailRow}>
              <Text style={MemberDirectoryStyles.memberDetailLabel}>{t('smartSociety.flat')}:</Text>
              <Text style={MemberDirectoryStyles.memberDetailValue}>
                {item.flatNumber}
              </Text>
            </View>
            <View style={MemberDirectoryStyles.memberDetailRow}>
              <Text style={MemberDirectoryStyles.memberDetailLabel}>{t('smartSociety.phone')}:</Text>
              <Text style={MemberDirectoryStyles.memberDetailValue}>
                {item.phoneNumber}
              </Text>
            </View>
            <View style={MemberDirectoryStyles.memberDetailRow}>
              <Text style={MemberDirectoryStyles.memberDetailLabel}>{t('common.email')}:</Text>
              <Text
                style={MemberDirectoryStyles.memberDetailValue}
                numberOfLines={1}
              >
                {item.email}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <HeaderComponent
        Title={t('smartSociety.memberDirectory')}
        onPress={() => props.navigation?.goBack()}
      />
      <View style={MemberDirectoryStyles.container}>
        {/* Search Section */}
        <View style={MemberDirectoryStyles.searchSection}>
          <SearchInput
            placeholder={t('smartSociety.searchByNameFlatPhoneEmail')}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Members List */}
        <View style={MemberDirectoryStyles.listSection}>
          <Text style={MemberDirectoryStyles.sectionTitle}>
            {t('smartSociety.allMembers')} ({filteredMembers.length})
          </Text>
          {filteredMembers.length > 0 ? (
            <FlatList
              data={filteredMembers}
              renderItem={renderMemberItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={MemberDirectoryStyles.listContent}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={MemberDirectoryStyles.emptyState}>
              <Text style={MemberDirectoryStyles.emptyStateText}>
                {searchQuery ? t('smartSociety.noMembersFound') : t('smartSociety.noMembersAvailable')}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Container>
  );
};

export default MemberDirectory;

