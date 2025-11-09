import React, { useRef, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import { Container, HeaderComponent } from '../../components/common';
import { SmartSocietyStyles } from './styles';
import { COLORS, IMAGES } from '../../constants';
import {
  ROUTE_CONFIG,
  getComplaintRoute,
  SMART_SOCIETY_ROUTES,
} from '../../navigation/routes/smartSocietyRoutes';
import { useTranslation } from '../../context/LanguageContext';

const SmartSociety = (props: any) => {
  const { t } = useTranslation();
  const isMountedRef = useRef(true);
  const selectedRole = props.route?.params?.selectedRole;

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Society Member (Resident) Features
  const residentFeatures = useMemo(
    () => ({
      finance: [
        {
          id: 'r1',
          title: t('smartSociety.maintenanceBillManagement'),
          description: t('smartSociety.autoGenerateBills'),
          icon: IMAGES.FILE,
          category: 'finance',
        },
        {
          id: 'r2',
          title: t('smartSociety.expenseTracking'),
          description: t('smartSociety.recordSocietyExpenses'),
          icon: IMAGES.TIMER,
          category: 'finance',
        },
      ],
      complaints: [
        {
          id: 'r3',
          title: t('smartSociety.submitComplaints'),
          description: t('smartSociety.submitComplaintsAndRequests'),
          icon: IMAGES.FEEDBACK,
          category: 'community',
        },
        {
          id: 'r4',
          title: t('smartSociety.complaintStatus'),
          description: t('smartSociety.trackStatus'),
          icon: IMAGES.TIMER,
          category: 'community',
        },
      ],
      community: [
        {
          id: 'r5',
          title: t('smartSociety.noticesAndUpdates'),
          description: t('smartSociety.receiveNotices'),
          icon: IMAGES.SHARE,
          category: 'community',
        },
        {
          id: 'r6',
          title: t('smartSociety.eventRSVP'),
          description: t('smartSociety.rsvpForEvents'),
          icon: IMAGES.CALENDAR,
          category: 'community',
        },
        {
          id: 'r7',
          title: t('smartSociety.societyRules'),
          description: t('smartSociety.viewSocietyRules'),
          icon: IMAGES.FILE,
          category: 'community',
        },
        {
          id: 'r15',
          title: t('smartSociety.amenities'),
          description: t('smartSociety.viewAndBookAmenities'),
          icon: IMAGES.CALENDAR,
          category: 'community',
        },
        {
          id: 'r16',
          title: t('smartSociety.myBookings'),
          description: t('smartSociety.viewMyAmenityBookings'),
          icon: IMAGES.CALENDAR,
          category: 'community',
        },
        {
          id: 'r17',
          title: t('smartSociety.lostFound') || 'Lost & Found',
          description:
            t('smartSociety.reportLostFoundItems') ||
            'Report and find lost or found items',
          icon: IMAGES.SEARCH,
          category: 'community',
        },
      ],
      logs: [
        {
          id: 'r8',
          title: t('smartSociety.visitorLogs'),
          description: t('smartSociety.viewVisitorLogs'),
          icon: IMAGES.SCANNER,
          category: 'delivery',
        },
        {
          id: 'r9',
          title: t('smartSociety.parcelLogs'),
          description: t('smartSociety.viewParcelLogs'),
          icon: IMAGES.PLUS,
          category: 'delivery',
        },
        {
          id: 'r13',
          title: t('smartSociety.addVisitorEntry'),
          description: t('smartSociety.addVisitorEntryPreApprove'),
          icon: IMAGES.SCANNER,
          category: 'delivery',
        },
        {
          id: 'r14',
          title: t('smartSociety.recordParcel'),
          description: t('smartSociety.recordIncomingParcel'),
          icon: IMAGES.PLUS,
          category: 'delivery',
        },
      ],
      security: [
        {
          id: 'r10',
          title: t('smartSociety.panicSOSAlert'),
          description: t('smartSociety.emergencyAlertButton'),
          icon: IMAGES.ALERT,
          category: 'core',
        },
      ],
      profile: [
        {
          id: 'r11',
          title: t('smartSociety.vehicleRegistration'),
          description: t('smartSociety.registerAndManageVehicles'),
          icon: IMAGES.SCAN,
          category: 'parking',
        },
        {
          id: 'r12',
          title: t('smartSociety.editProfile'),
          description: t('smartSociety.editPersonalOrFlatInfo'),
          icon: IMAGES.EDIT,
          category: 'core',
        },
      ],
    }),
    [t],
  );

  // Admin Features
  const adminFeatures = useMemo(
    () => ({
      complaints: [
        {
          id: 'a1',
          title: t('smartSociety.complaintManagement'),
          description: t('smartSociety.viewAndManageComplaints'),
          icon: IMAGES.FEEDBACK,
          category: 'community',
        },
      ],
      notices: [
        {
          id: 'a2',
          title: t('smartSociety.createNotice'),
          description: t('smartSociety.createAndSendNotices'),
          icon: IMAGES.SHARE,
          category: 'community',
        },
        {
          id: 'a3',
          title: t('smartSociety.viewNotices'),
          description: t('smartSociety.viewAllNotices'),
          icon: IMAGES.FILE,
          category: 'community',
        },
      ],
      events: [
        {
          id: 'a4',
          title: t('smartSociety.createEvent'),
          description: t('smartSociety.createAndManageEvents'),
          icon: IMAGES.CALENDAR,
          category: 'community',
        },
        {
          id: 'a5',
          title: t('smartSociety.viewEvents'),
          description: t('smartSociety.viewAllEvents'),
          icon: IMAGES.CALENDAR,
          category: 'community',
        },
      ],
      management: [
        {
          id: 'a6',
          title: t('smartSociety.memberManagement') || 'Member Management',
          description:
            t('smartSociety.manageSocietyMembers') ||
            'Manage all society members',
          icon: IMAGES.CONTACT,
          category: 'admin',
        },
        {
          id: 'a7',
          title: t('smartSociety.parkingManagement') || 'Parking Management',
          description:
            t('smartSociety.manageParkingSlots') ||
            'Manage parking slot allocations',
          icon: IMAGES.SCAN,
          category: 'admin',
        },
        {
          id: 'a8',
          title: t('smartSociety.amenitiesManagement'),
          description: t('smartSociety.manageSocietyAmenities'),
          icon: IMAGES.CALENDAR,
          category: 'admin',
        },
        {
          id: 'a9',
          title: t('smartSociety.lostFound') || 'Lost & Found',
          description:
            t('smartSociety.manageLostFoundItems') ||
            'Manage lost and found items',
          icon: IMAGES.SEARCH,
          category: 'admin',
        },
      ],
    }),
    [t],
  );

  // Watchman (Security Guard) Features
  const watchmanFeatures = useMemo(
    () => ({
      visitor: [
        {
          id: 'w1',
          title: t('smartSociety.addVisitorEntry'),
          description: t('smartSociety.addVisitorEntryManualQR'),
          icon: IMAGES.SCANNER,
          category: 'core',
        },
        {
          id: 'w2',
          title: t('smartSociety.markVisitorExit'),
          description: t('smartSociety.recordVisitorExitTime'),
          icon: IMAGES.SCAN,
          category: 'core',
        },
        {
          id: 'w3',
          title: t('smartSociety.expectedVisitors'),
          description: t('smartSociety.viewExpectedVisitors'),
          icon: IMAGES.CALENDAR,
          category: 'core',
        },
      ],
      delivery: [
        {
          id: 'w4',
          title: t('smartSociety.recordParcels'),
          description: t('smartSociety.recordParcelDeliveries'),
          icon: IMAGES.PLUS,
          category: 'delivery',
        },
        // {
        //   id: 'w5',
        //   title: t('smartSociety.updateLogStatus'),
        //   description: t('smartSociety.updateVisitorOrDeliveryStatus'),
        //   icon: IMAGES.FILE,
        //   category: 'delivery',
        // },
      ],
      security: [
        {
          id: 'w6',
          title: t('smartSociety.emergencyAlerts'),
          description: t('smartSociety.receiveEmergencyAlerts'),
          icon: IMAGES.ALERT,
          category: 'core',
        },
        {
          id: 'w7',
          title: t('smartSociety.reportActivity'),
          description: t('smartSociety.reportSuspiciousActivity'),
          icon: IMAGES.FEEDBACK,
          category: 'core',
        },
      ],
      directory: [
        {
          id: 'w8',
          title: t('smartSociety.memberDirectory'),
          description: t('smartSociety.viewFlatMemberDirectory'),
          icon: IMAGES.CONTACT,
          category: 'core',
        },
      ],
    }),
    [t],
  );

  // Category color mapping - White and Light theme (matching society screens)
  const getCategoryColor = (category: string) => {
    const colorMap: any = {
      core: {
        bg: COLORS.WHITE,
        border: COLORS.BORDER_GREY,
        text: COLORS.BLACK_TEXT,
      },
      finance: {
        bg: COLORS.WHITE,
        border: COLORS.BORDER_GREY,
        text: COLORS.BLACK_TEXT,
      },
      community: {
        bg: COLORS.WHITE,
        border: COLORS.BORDER_GREY,
        text: COLORS.BLACK_TEXT,
      },
      parking: {
        bg: COLORS.WHITE,
        border: COLORS.BORDER_GREY,
        text: COLORS.BLACK_TEXT,
      },
      delivery: {
        bg: COLORS.WHITE,
        border: COLORS.BORDER_GREY,
        text: COLORS.BLACK_TEXT,
      },
      admin: {
        bg: COLORS.WHITE,
        border: COLORS.BORDER_GREY,
        text: COLORS.BLACK_TEXT,
      },
      future: {
        bg: COLORS.LIGHT_GRAY,
        border: COLORS.BORDER_GREY,
        text: COLORS.GREY_TEXT,
      },
    };
    return colorMap[category] || colorMap.core;
  };

  // Get role-based feature categories
  const featureCategories = useMemo(() => {
    if (!selectedRole) {
      return [];
    }

    if (selectedRole.id === 'resident') {
      return [
        {
          title: t('smartSociety.financeAndBills'),
          data: residentFeatures.finance,
          icon: '💰',
          color: getCategoryColor('finance'),
          count: residentFeatures.finance.length,
        },
        {
          title: t('smartSociety.complaintsAndServices'),
          data: residentFeatures.complaints,
          icon: '📝',
          color: getCategoryColor('community'),
          count: residentFeatures.complaints.length,
        },
        {
          title: t('smartSociety.communityAndEvents'),
          data: residentFeatures.community,
          icon: '🎉',
          color: getCategoryColor('community'),
          count: residentFeatures.community.length,
        },
        {
          title: t('smartSociety.visitorAndParcelLogs'),
          data: residentFeatures.logs,
          icon: '📋',
          color: getCategoryColor('delivery'),
          count: residentFeatures.logs.length,
        },
        {
          title: t('smartSociety.securityAndSafety'),
          data: residentFeatures.security,
          icon: '🛡️',
          color: getCategoryColor('core'),
          count: residentFeatures.security.length,
        },
        {
          title: t('smartSociety.profileAndSettings'),
          data: residentFeatures.profile,
          icon: '⚙️',
          color: getCategoryColor('parking'),
          count: residentFeatures.profile.length,
        },
      ];
    } else if (selectedRole.id === 'watchman') {
      return [
        {
          title: t('smartSociety.visitorManagement'),
          data: watchmanFeatures.visitor,
          icon: '👥',
          color: getCategoryColor('core'),
          count: watchmanFeatures.visitor.length,
        },
        {
          title: t('smartSociety.parcelAndDelivery'),
          data: watchmanFeatures.delivery,
          icon: '📦',
          color: getCategoryColor('delivery'),
          count: watchmanFeatures.delivery.length,
        },
        {
          title: t('smartSociety.securityAndAlerts'),
          data: watchmanFeatures.security,
          icon: '🚨',
          color: getCategoryColor('core'),
          count: watchmanFeatures.security.length,
        },
        {
          title: t('smartSociety.directoryAndInfo'),
          data: watchmanFeatures.directory,
          icon: '📖',
          color: getCategoryColor('core'),
          count: watchmanFeatures.directory.length,
        },
      ];
    } else if (selectedRole.id === 'admin') {
      return [
        {
          title: t('smartSociety.complaintManagement'),
          data: adminFeatures.complaints,
          icon: '📝',
          color: getCategoryColor('community'),
          count: adminFeatures.complaints.length,
        },
        {
          title: t('smartSociety.noticesAndAnnouncements'),
          data: adminFeatures.notices,
          icon: '📢',
          color: getCategoryColor('community'),
          count: adminFeatures.notices.length,
        },
        {
          title: t('smartSociety.eventManagement'),
          data: adminFeatures.events,
          icon: '🎉',
          color: getCategoryColor('community'),
          count: adminFeatures.events.length,
        },
        {
          title: t('smartSociety.management') || 'Management',
          data: adminFeatures.management,
          icon: '👨‍💼',
          color: getCategoryColor('admin'),
          count: adminFeatures.management.length,
        },
      ];
    }

    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRole, t, residentFeatures, adminFeatures, watchmanFeatures]);

  const handleFeaturePress = (feature: any) => {
    if (!isMountedRef.current) return;

    const currentRole = selectedRole?.id;

    // First, check for watchman-specific navigation (hardcoded for existing features)
    // Navigate to AddVisitorEntry screen when "Add Visitor Entry" is clicked (watchman)
    if (feature.id === 'w1') {
      props.navigation?.navigate(SMART_SOCIETY_ROUTES.ADD_VISITOR_ENTRY, {
        selectedRole,
      });
      return;
    }

    // Navigate to MarkVisitorExit screen when "Mark Visitor Exit" is clicked
    if (feature.id === 'w2') {
      props.navigation?.navigate('MarkVisitorExit');
      return;
    }

    // Navigate to ExpectedVisitors screen when "Expected Visitors" is clicked
    if (feature.id === 'w3') {
      props.navigation?.navigate('ExpectedVisitors');
      return;
    }

    // Navigate to RecordParcel screen when "Record Parcels" is clicked
    if (feature.id === 'w4') {
      props.navigation?.navigate('RecordParcel');
      return;
    }

    // Navigate to UpdateLogStatus screen when "Update Log Status" is clicked
    if (feature.id === 'w5') {
      props.navigation?.navigate('UpdateLogStatus');
      return;
    }

    // Navigate to EmergencyAlerts screen when "Emergency Alerts" is clicked
    if (feature.id === 'w6') {
      props.navigation?.navigate('EmergencyAlerts');
      return;
    }

    // Navigate to ReportActivity screen when "Report Activity" is clicked
    if (feature.id === 'w7') {
      props.navigation?.navigate('ReportActivity');
      return;
    }

    // Navigate to MemberDirectory screen when "Member Directory" is clicked
    if (feature.id === 'w8') {
      props.navigation?.navigate('MemberDirectory');
      return;
    }

    // Then, check for route configuration (for resident and admin features)
    const routeConfig = ROUTE_CONFIG[feature.id];

    // If route config exists, use it
    if (routeConfig) {
      // Check role-based access
      if (!routeConfig.allowedRoles.includes(currentRole || '')) {
        const rolesText = routeConfig.allowedRoles
          .map(role => {
            if (role === 'resident') return 'residents';
            if (role === 'admin') return 'admins';
            if (role === 'watchman') return 'watchman';
            return role;
          })
          .join(' and ');

        Alert.alert(
          feature.title,
          `${feature.description}\n\n${t('errors.featureAvailableForRoles', {
            roles: rolesText,
          })}`,
          [{ text: t('common.ok') }],
        );
        return;
      }

      // Special handling for r4 (complaint status)
      let routeName = routeConfig.route;
      if (feature.id === 'r4') {
        routeName = getComplaintRoute(currentRole || '');
      }

      // Prepare navigation params
      const navigationParams: any = {
        selectedRole,
        ...routeConfig.params,
      };

      // Navigate to the route
      try {
        props.navigation?.navigate(routeName, navigationParams);
      } catch (error) {
        console.error('Navigation error:', error);
        Alert.alert(
          t('errors.navigationError'),
          t('errors.failedToNavigate', { feature: feature.title }),
          [{ text: t('common.ok') }],
        );
      }
      return;
    }

    // If no route config and no hardcoded navigation, show coming soon
    Alert.alert(
      feature.title,
      `${feature.description}\n\n${t('errors.featureAvailableSoon')}`,
      [{ text: t('common.ok') }],
    );
  };

  const renderFeatureItem = ({ item, categoryColor }: any) => {
    // Use light blue for icon background (matching society screens) for all categories
    const iconBgColor = COLORS.LIGHT_BLUE;

    // Arrow color: black text for all categories (matching society screens)
    const arrowColor = COLORS.BLACK_TEXT;

    return (
      <TouchableOpacity
        style={[
          SmartSocietyStyles.featureCard,
          { borderColor: categoryColor.border },
        ]}
        activeOpacity={0.7}
        onPress={() => handleFeaturePress(item)}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`${item.title}. ${item.description}`}
        accessibilityHint={
          t('common.doubleTapToOpen') || 'Double tap to open this feature'
        }
      >
        <View
          style={[
            SmartSocietyStyles.featureIconContainer,
            { backgroundColor: iconBgColor },
          ]}
        >
          <Image source={item.icon} style={SmartSocietyStyles.featureIcon} />
        </View>
        <View style={SmartSocietyStyles.featureContent}>
          <Text style={SmartSocietyStyles.featureTitle}>{item.title}</Text>
          <Text style={SmartSocietyStyles.featureDescription}>
            {item.description}
          </Text>
        </View>
        <View style={SmartSocietyStyles.arrowContainer}>
          <Text style={[SmartSocietyStyles.arrowText, { color: arrowColor }]}>
            →
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderCategorySection = (category: any) => {
    if (!category.data || category.data.length === 0) return null;

    // Badge background: use light blue for all categories (matching society screens)
    const badgeBgColor = COLORS.LIGHT_BLUE;
    const badgeTextColor = COLORS.BLACK_TEXT;

    return (
      <View key={category.title} style={SmartSocietyStyles.categorySection}>
        <View
          style={[
            SmartSocietyStyles.categoryHeaderContainer,
            {
              backgroundColor: category.color.bg,
              borderColor: category.color.border,
            },
          ]}
        >
          <View style={SmartSocietyStyles.categoryHeader}>
            <View style={SmartSocietyStyles.categoryHeaderLeft}>
              <Text style={SmartSocietyStyles.categoryIcon}>
                {category.icon}
              </Text>
              <Text
                style={[
                  SmartSocietyStyles.categoryTitle,
                  { color: category.color.text },
                ]}
              >
                {category.title}
              </Text>
            </View>
            <View
              style={[
                SmartSocietyStyles.categoryBadge,
                { backgroundColor: badgeBgColor },
              ]}
            >
              <Text
                style={[
                  SmartSocietyStyles.categoryBadgeText,
                  { color: badgeTextColor },
                ]}
              >
                {category.count}
              </Text>
            </View>
          </View>
        </View>
        <FlatList
          data={category.data}
          renderItem={({ item }) =>
            renderFeatureItem({ item, categoryColor: category.color })
          }
          keyExtractor={item => item.id}
          scrollEnabled={false}
          numColumns={2}
          columnWrapperStyle={SmartSocietyStyles.row}
          contentContainerStyle={SmartSocietyStyles.featuresList}
        />
      </View>
    );
  };

  return (
    <Container>
      <HeaderComponent
        Title={t('smartSociety.smartSociety')}
        onPress={() => props.navigation?.goBack()}
      />
      <ScrollView
        style={SmartSocietyStyles.container}
        contentContainerStyle={SmartSocietyStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={SmartSocietyStyles.headerSection}>
          <View style={SmartSocietyStyles.headerImageContainer}>
            <Image
              source={IMAGES.SMART_SOCIETY}
              style={SmartSocietyStyles.headerImage}
            />
          </View>
          <Text style={SmartSocietyStyles.headerTitle}>
            {t('smartSociety.welcomeToSmartSociety')}
          </Text>
          <Text style={SmartSocietyStyles.headerSubtitle}>
            {selectedRole
              ? t('smartSociety.accessRoleFeatures', {
                  role: selectedRole.title,
                })
              : t('smartSociety.manageSocietyEfficiently')}
          </Text>
          {selectedRole && (
            <View style={SmartSocietyStyles.roleBadgeContainer}>
              <View style={SmartSocietyStyles.roleBadge}>
                <Text style={SmartSocietyStyles.roleBadgeIcon}>
                  {selectedRole.icon}
                </Text>
                <Text style={SmartSocietyStyles.roleBadgeText}>
                  {selectedRole.title} ({selectedRole.subtitle})
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Render role-based feature categories */}
        {featureCategories.length > 0 ? (
          featureCategories.map(renderCategorySection)
        ) : (
          <View style={SmartSocietyStyles.emptyStateContainer}>
            <Text style={SmartSocietyStyles.emptyStateText}>
              {t('smartSociety.pleaseSelectRoleToViewFeatures')}
            </Text>
          </View>
        )}
      </ScrollView>
    </Container>
  );
};

export default SmartSociety;
