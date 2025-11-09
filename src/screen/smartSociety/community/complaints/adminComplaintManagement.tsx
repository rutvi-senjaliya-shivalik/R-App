import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Container, HeaderComponent } from '../../../../components/common';
import AdminComplaintManagementStyles from './styles/adminComplaintManagementStyles';
import { COLORS, FS } from '../../../../constants';
import { useTranslation } from '../../../../context/LanguageContext';

const AdminComplaintManagement = (props: any) => {
  const { t } = useTranslation();
  const isMountedRef = useRef(true);
  const [complaints, setComplaints] = useState<any[]>([]);
  const [filter, setFilter] = useState<
    'all' | 'open' | 'in-progress' | 'resolved'
  >('all');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showAssignModal, setShowAssignModal] = useState(false);

  useEffect(() => {
    isMountedRef.current = true;
    loadAllComplaints();
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const loadAllComplaints = () => {
    // TODO: Fetch all complaints from API
    const mockComplaints = [
      {
        id: 'comp001',
        flatNo: 'B-204',
        memberId: 'mem123',
        category: 'Plumbing',
        description: 'Bathroom tap is leaking',
        status: 'In Progress',
        assignedTo: 'staff001',
        createdAt: '2025-11-05',
        updatedAt: '2025-11-06',
      },
      {
        id: 'comp002',
        flatNo: 'A-101',
        memberId: 'mem124',
        category: 'Electrical',
        description: 'Light switch not working',
        status: 'Open',
        assignedTo: null,
        createdAt: '2025-11-07',
        updatedAt: '2025-11-07',
      },
      {
        id: 'comp003',
        flatNo: 'C-305',
        memberId: 'mem125',
        category: 'Cleaning',
        description: 'Garbage not collected',
        status: 'Resolved',
        assignedTo: 'staff002',
        createdAt: '2025-11-01',
        updatedAt: '2025-11-03',
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

  const translateStatus = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'open') {
      return t('smartSociety.open') || 'Open';
    } else if (statusLower === 'in progress' || statusLower === 'in-progress') {
      return t('smartSociety.inProgress') || 'In Progress';
    } else if (statusLower === 'resolved') {
      return t('smartSociety.resolved') || 'Resolved';
    }
    return status;
  };

  const filteredComplaints = complaints.filter(complaint => {
    if (filter === 'all') return true;

    // Normalize status for comparison (handle spaces and hyphens)
    const normalizedStatus = complaint.status
      .toLowerCase()
      .replace(/\s+/g, '-');
    const normalizedFilter = filter.toLowerCase();

    return normalizedStatus === normalizedFilter;
  });

  const handleComplaintPress = (complaint: any) => {
    props.navigation?.navigate('ComplaintDetail', {
      complaint,
      selectedRole: { id: 'admin' },
    });
  };

  const handleAssignStaff = (complaint: any) => {
    setSelectedComplaint(complaint);
    setShowAssignModal(true);
  };

  const handleStatusUpdate = (complaint: any, newStatus: string) => {
    // TODO: Update status via API
    Alert.alert(
      t('smartSociety.statusUpdated'),
      t('smartSociety.complaintStatusChangedTo', { status: newStatus }),
      [{ text: t('common.ok') }],
    );
  };

  // TODO: Use maintenanceStaff when assign modal is implemented
  // const maintenanceStaff = [
  //   { label: 'Staff 001 - Plumbing', value: 'staff001' },
  //   { label: 'Staff 002 - Electrical', value: 'staff002' },
  //   { label: 'Staff 003 - General', value: 'staff003' },
  // ];

  const renderComplaintCard = ({ item }: any) => {
    const statusColor = getStatusColor(item.status);
    const statusIcon = getStatusIcon(item.status);

    return (
      <TouchableOpacity
        style={[
          AdminComplaintManagementStyles.complaintCard,
          { borderColor: statusColor.border },
        ]}
        activeOpacity={0.7}
        onPress={() => handleComplaintPress(item)}
      >
        <View style={AdminComplaintManagementStyles.complaintHeader}>
          <View style={AdminComplaintManagementStyles.complaintHeaderLeft}>
            <Text style={AdminComplaintManagementStyles.categoryBadge}>
              {item.category}
            </Text>
            <Text style={AdminComplaintManagementStyles.flatNo}>
              {item.flatNo}
            </Text>
          </View>
          <View
            style={[
              AdminComplaintManagementStyles.statusBadge,
              {
                backgroundColor: statusColor.bg,
                borderColor: statusColor.border,
              },
            ]}
          >
            <Text style={AdminComplaintManagementStyles.statusIcon}>
              {statusIcon}
            </Text>
            <Text
              style={[
                AdminComplaintManagementStyles.statusText,
                { color: statusColor.text },
              ]}
            >
              {translateStatus(item.status)}
            </Text>
          </View>
        </View>
        <Text
          style={AdminComplaintManagementStyles.description}
          numberOfLines={2}
        >
          {item.description}
        </Text>
        <View style={AdminComplaintManagementStyles.complaintFooter}>
          <View style={AdminComplaintManagementStyles.footerLeft}>
            <Text style={AdminComplaintManagementStyles.dateText}>
              {new Date(item.createdAt).toLocaleDateString()}
            </Text>
            {item.assignedTo && (
              <Text style={AdminComplaintManagementStyles.assignedText}>
                {t('smartSociety.assignedTo')}: {item.assignedTo}
              </Text>
            )}
          </View>
          <View style={AdminComplaintManagementStyles.actionButtons}>
            {!item.assignedTo && (
              <TouchableOpacity
                style={AdminComplaintManagementStyles.assignButton}
                onPress={() => handleAssignStaff(item)}
              >
                <Text style={AdminComplaintManagementStyles.assignButtonText}>
                  {t('smartSociety.assign')}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={AdminComplaintManagementStyles.statusButton}
              onPress={() => {
                const statuses = ['Open', 'In Progress', 'Resolved'];
                const currentIndex = statuses.findIndex(
                  s => s.toLowerCase() === item.status.toLowerCase(),
                );
                const nextStatus =
                  statuses[(currentIndex + 1) % statuses.length];
                handleStatusUpdate(item, nextStatus);
              }}
            >
              <Text style={AdminComplaintManagementStyles.statusButtonText}>
                {t('smartSociety.updateStatus')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <HeaderComponent
        Title={t('smartSociety.complaintManagement')}
        onPress={() => props.navigation?.goBack()}
        titleStyle={{ fontSize: FS.FS18 }}
      />
      <View style={AdminComplaintManagementStyles.container}>
        <View style={AdminComplaintManagementStyles.filterContainer}>
          {(['all', 'open', 'in-progress', 'resolved'] as const).map(
            filterType => (
              <TouchableOpacity
                key={filterType}
                style={[
                  AdminComplaintManagementStyles.filterTab,
                  filter === filterType &&
                    AdminComplaintManagementStyles.filterTabActive,
                ]}
                onPress={() => setFilter(filterType)}
              >
                <Text
                  style={[
                    AdminComplaintManagementStyles.filterTabText,
                    filter === filterType &&
                      AdminComplaintManagementStyles.filterTabTextActive,
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
          contentContainerStyle={AdminComplaintManagementStyles.complaintsList}
          ListEmptyComponent={
            <View style={AdminComplaintManagementStyles.emptyState}>
              <Text style={AdminComplaintManagementStyles.emptyStateText}>
                {t('smartSociety.noComplaintsFound')}
              </Text>
            </View>
          }
        />
      </View>
    </Container>
  );
};

export default AdminComplaintManagement;
