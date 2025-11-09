import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { COLORS, FF, FS } from '../../constants';
import { useLeads } from '../../hooks/useLeads';
import type { Lead } from '../../services/api';

interface Visit {
  id: string;
  name: string;
  location: string;
  timeAgo: string;
  phone: string;
}

interface ScheduledVisitsProps {
  onViewAll?: () => void;
  onCallPress?: (phone: string) => void;
  onVisitPress?: (leadId: string) => void;
}

// Calendar Icon
const CalendarIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="6" width="18" height="15" rx="2" stroke="#000" strokeWidth="2" />
    <Path d="M3 10H21" stroke="#000" strokeWidth="2" />
    <Path d="M8 3V7" stroke="#000" strokeWidth="2" strokeLinecap="round" />
    <Path d="M16 3V7" stroke="#000" strokeWidth="2" strokeLinecap="round" />
    <Circle cx="8" cy="14" r="1" fill="#000" />
    <Circle cx="12" cy="14" r="1" fill="#000" />
    <Circle cx="16" cy="14" r="1" fill="#000" />
  </Svg>
);

// Clock Icon
const ClockIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="#6B7280">
    <Circle cx="8" cy="8" r="7" stroke="#6B7280" strokeWidth="1.5" />
    <Path d="M8 4V8L11 11" stroke="none" strokeWidth="1.5" strokeLinecap="round" />
    <Path d="M8 4V8L11 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </Svg>
);

// Phone Icon
const PhoneIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <Path
      d="M14.5 11.5C14.5 11.776 14.434 12.058 14.296 12.334C14.158 12.61 13.982 12.868 13.756 13.108C13.396 13.496 13.002 13.778 12.562 13.96C12.128 14.142 11.66 14.234 11.158 14.234C10.414 14.234 9.622 14.062 8.788 13.714C7.954 13.366 7.12 12.898 6.292 12.31C5.458 11.716 4.666 11.056 3.916 10.324C3.172 9.586 2.506 8.8 1.918 7.972C1.336 7.144 0.868 6.316 0.526 5.494C0.184 4.666 0.012 3.874 0.012 3.118C0.012 2.626 0.098 2.158 0.274 1.73C0.45 1.296 0.726 0.898 1.108 0.542C1.568 0.094 2.074 -0.13 2.614 -0.13C2.824 -0.13 3.034 -0.082 3.226 0.014C3.424 0.11 3.598 0.254 3.736 0.458L5.332 2.836C5.47 3.034 5.566 3.214 5.632 3.388C5.698 3.556 5.734 3.724 5.734 3.874C5.734 4.066 5.68 4.258 5.572 4.444C5.47 4.63 5.32 4.822 5.128 5.014L4.54 5.626C4.45 5.716 4.408 5.824 4.408 5.956C4.408 6.022 4.414 6.082 4.432 6.148C4.456 6.214 4.48 6.262 4.498 6.31C4.636 6.568 4.876 6.904 5.218 7.312C5.566 7.72 5.938 8.134 6.34 8.548C6.76 8.962 7.168 9.34 7.582 9.688C7.99 10.03 8.326 10.264 8.59 10.402C8.632 10.42 8.68 10.444 8.74 10.468C8.806 10.492 8.872 10.498 8.944 10.498C9.082 10.498 9.19 10.45 9.28 10.36L9.868 9.778C10.066 9.58 10.258 9.43 10.444 9.334C10.63 9.226 10.816 9.172 11.014 9.172C11.164 9.172 11.326 9.202 11.5 9.268C11.674 9.334 11.854 9.43 12.052 9.562L14.454 11.176C14.658 11.314 14.802 11.476 14.892 11.668C14.976 11.86 15.02 12.052 15.02 12.268L14.5 11.5Z"
      fill="#6B7280"
    />
  </Svg>
);

// Single Visit Card
const VisitCard: React.FC<{ visit: Visit; onCallPress?: (phone: string) => void }> = ({ 
  visit, 
  onCallPress 
}) => {
  return (
    <View style={styles.visitCard}>
      {/* Left Side - Calendar Icon */}
      <View style={styles.iconContainer}>
        <CalendarIcon />
      </View>

      {/* Right Side - Visit Details */}
      <View style={styles.detailsContainer}>
        {/* Name */}
        <Text style={styles.visitorName}>{visit.name}</Text>
        
        {/* Location */}
        <Text style={styles.location}>{visit.location}</Text>
        
        {/* Time and Phone Row */}
        <View style={styles.infoRow}>
          {/* Time */}
          <View style={styles.timeContainer}>
            <ClockIcon />
            <Text style={styles.timeText}>{visit.timeAgo}</Text>
          </View>

          {/* Phone */}
          <TouchableOpacity 
            style={styles.phoneContainer}
            onPress={() => onCallPress?.(visit.phone)}
            activeOpacity={0.7}
          >
            <PhoneIcon />
            <Text style={styles.phoneText}>{visit.phone}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const ScheduledVisits: React.FC<ScheduledVisitsProps> = ({
  onViewAll,
  onCallPress,
  onVisitPress,
}) => {
  const { getScheduledVisits, loading } = useLeads();
  const [visits, setVisits] = useState<Visit[]>([]);

  useEffect(() => {
    fetchScheduledVisits();
  }, []);

  const fetchScheduledVisits = async () => {
    try {
      const response = await getScheduledVisits();
      const transformedVisits = response.leads.slice(0, 3).map((lead: Lead) => ({
        id: lead._id,
        name: lead.clientName,
        location: lead.projectName,
        timeAgo: getTimeAgo(lead.createdAt),
        phone: lead.clientContactNumber,
      }));
      setVisits(transformedVisits);
    } catch (error: any) {
      console.error('Error fetching scheduled visits:', error);
      setVisits([]);
    }
  };

  const getTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  const handleVisitPress = (visitId: string) => {
    onVisitPress?.(visitId);
  };

  if (loading) {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <Text style={styles.sectionTitle}>Scheduled Visits</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#000000" />
        </View>
      </View>
    );
  }

  if (visits.length === 0) {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <Text style={styles.sectionTitle}>Scheduled Visits</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No scheduled visits</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.mainContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Scheduled Visits</Text>
        <TouchableOpacity onPress={onViewAll} activeOpacity={0.7}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      {/* Visit Cards */}
      <View style={styles.cardsContainer}>
        {visits.map((visit) => (
          <TouchableOpacity 
            key={visit.id}
            onPress={() => handleVisitPress(visit.id)}
            activeOpacity={0.7}
          >
            <VisitCard 
              visit={visit} 
              onCallPress={onCallPress}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    paddingHorizontal: 16,
    flexDirection: 'column',
    gap: 14,
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#6B7280',
    fontFamily: FF[600],
    fontSize: FS.FS18,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24,
  },
  viewAllText: {
    color: '#6B7280',
    fontFamily: FF[400],
    fontSize: FS.FS14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    textDecorationLine: 'underline',
  },
  cardsContainer: {
    flexDirection: 'column',
    gap: 12,
  },
  visitCard: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#000000',
  },
  iconContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 6,
  },
  visitorName: {
    color: COLORS.BLACK,
    fontFamily: FF[600],
    fontSize: FS.FS16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24,
  },
  location: {
    color: '#6B7280',
    fontFamily: FF[400],
    fontSize: FS.FS14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timeText: {
    color: '#6B7280',
    fontFamily: FF[400],
    fontSize: FS.FS12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 16,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  phoneText: {
    color: '#6B7280',
    fontFamily: FF[400],
    fontSize: FS.FS12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 16,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
  },
  emptyText: {
    color: '#6B7280',
    fontFamily: FF[400],
    fontSize: FS.FS14,
    fontStyle: 'normal',
    fontWeight: '400',
  },
});

export default ScheduledVisits;
