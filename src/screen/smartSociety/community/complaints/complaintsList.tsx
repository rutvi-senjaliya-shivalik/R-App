import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Container, HeaderComponent } from '../../../../components/common';
import ComplaintsListStyles from './styles/complaintsListStyles';
import { COLORS } from '../../../../constants';
import { useTranslation } from '../../../../context/LanguageContext';

const ComplaintsList = (props: any) => {
  const { t } = useTranslation();
  const isMountedRef = useRef(true);
  const selectedRole = props.route?.params?.selectedRole;
  const [complaints, setComplaints] = useState<any[]>([]);
  const [filter, setFilter] = useState<
    'all' | 'open' | 'in-progress' | 'resolved'
  >('all');

  useEffect(() => {
    isMountedRef.current = true;
    loadComplaints();
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const loadComplaints = () => {
    // TODO: Fetch complaints from API
    // Mock data for now
    const mockComplaints = [
      {
        id: 'comp001',
        flatNo: 'B-204',
        category: 'Plumbing',
        description: 'Bathroom tap is leaking',
        status: 'In Progress',
        createdAt: '2025-11-05',
        updatedAt: '2025-11-06',
        imageUrl: null,
      },
      {
        id: 'comp002',
        flatNo: 'B-204',
        category: 'Electrical',
        description: 'Light switch not working in bedroom',
        status: 'Open',
        createdAt: '2025-11-07',
        updatedAt: '2025-11-07',
        imageUrl: null,
      },
      {
        id: 'comp003',
        flatNo: 'B-204',
        category: 'Cleaning',
        description: 'Garbage not collected from floor',
        status: 'Resolved',
        createdAt: '2025-11-01',
        updatedAt: '2025-11-03',
        imageUrl: null,
        feedback: 'Resolved quickly, thanks!',
      },
    ];
    setComplaints(mockComplaints);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'resolved':
        return {
          bg: COLORS.LIGHT_GREEN,
          text: COLORS.GREEN_TEXT,
          border: COLORS.LIGHT_BORDER_GREEN,
        };
      case 'in progress':
        return {
          bg: COLORS.YELLOW_BG,
          text: COLORS.ORANGE_TEXT,
          border: COLORS.YELLOW_BORDER,
        };
      case 'open':
        return {
          bg: COLORS.ORANGE_BG,
          text: COLORS.ORANGE_TEXT,
          border: COLORS.ORANGE_BORDER,
        };
      default:
        return {
          bg: COLORS.LIGHT_GRAY,
          text: COLORS.GREY_TEXT,
          border: COLORS.BORDER_GREY,
        };
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'resolved':
        return '✅';
      case 'in progress':
        return '🟡';
      case 'open':
        return '🔴';
      default:
        return '⚪';
    }
  };

  const filteredComplaints = complaints.filter(complaint => {
    if (filter === 'all') return true;
    return complaint.status.toLowerCase() === filter.toLowerCase();
  });

  const handleComplaintPress = (complaint: any) => {
    props.navigation?.navigate('ComplaintDetail', { complaint, selectedRole });
  };

  const handleAddComplaint = () => {
    props.navigation?.navigate('AddComplaint', { selectedRole });
  };

  const renderComplaintCard = ({ item }: any) => {
    const statusColor = getStatusColor(item.status);
    const statusIcon = getStatusIcon(item.status);

    return (
      <TouchableOpacity
        style={[
          ComplaintsListStyles.complaintCard,
          { borderColor: statusColor.border },
        ]}
        activeOpacity={0.7}
        onPress={() => handleComplaintPress(item)}
      >
        <View style={ComplaintsListStyles.complaintHeader}>
          <View style={ComplaintsListStyles.complaintHeaderLeft}>
            <Text style={ComplaintsListStyles.categoryBadge}>
              {item.category}
            </Text>
            <Text style={ComplaintsListStyles.flatNo}>{item.flatNo}</Text>
          </View>
          <View
            style={[
              ComplaintsListStyles.statusBadge,
              {
                backgroundColor: statusColor.bg,
                borderColor: statusColor.border,
              },
            ]}
          >
            <Text style={[ComplaintsListStyles.statusIcon]}>{statusIcon}</Text>
            <Text
              style={[
                ComplaintsListStyles.statusText,
                { color: statusColor.text },
              ]}
            >
              {item.status}
            </Text>
          </View>
        </View>
        <Text style={ComplaintsListStyles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={ComplaintsListStyles.complaintFooter}>
          <Text style={ComplaintsListStyles.dateText}>
            {t('smartSociety.created')}{' '}
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
          {item.updatedAt !== item.createdAt && (
            <Text style={ComplaintsListStyles.dateText}>
              {t('smartSociety.updated')}{' '}
              {new Date(item.updatedAt).toLocaleDateString()}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <HeaderComponent
        Title={t('smartSociety.myComplaints')}
        onPress={() => props.navigation?.goBack()}
      />
      <View style={ComplaintsListStyles.container}>
        <View style={ComplaintsListStyles.filterContainer}>
          {(['all', 'open', 'in-progress', 'resolved'] as const).map(
            filterType => (
              <TouchableOpacity
                key={filterType}
                style={[
                  ComplaintsListStyles.filterTab,
                  filter === filterType && ComplaintsListStyles.filterTabActive,
                ]}
                onPress={() => setFilter(filterType)}
              >
                <Text
                  style={[
                    ComplaintsListStyles.filterTabText,
                    filter === filterType &&
                      ComplaintsListStyles.filterTabTextActive,
                  ]}
                  numberOfLines={1}
                  adjustsFontSizeToFit={true}
                  minimumFontScale={0.8}
                >
                  {filterType === 'all'
                    ? t('common.all')
                    : filterType === 'in-progress'
                    ? t('smartSociety.inProgress')
                    : filterType === 'open'
                    ? t('smartSociety.open') || 'Open'
                    : t('smartSociety.resolved')}
                </Text>
              </TouchableOpacity>
            ),
          )}
        </View>

        <FlatList
          data={filteredComplaints}
          renderItem={renderComplaintCard}
          keyExtractor={item => item.id}
          contentContainerStyle={ComplaintsListStyles.complaintsList}
          ListEmptyComponent={
            <View style={ComplaintsListStyles.emptyState}>
              <Text style={ComplaintsListStyles.emptyStateText}>
                {t('smartSociety.noComplaintsFound')}
              </Text>
            </View>
          }
        />

        <TouchableOpacity
          style={ComplaintsListStyles.fab}
          activeOpacity={0.8}
          onPress={handleAddComplaint}
        >
          <Text style={ComplaintsListStyles.fabText}>+</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default ComplaintsList;
