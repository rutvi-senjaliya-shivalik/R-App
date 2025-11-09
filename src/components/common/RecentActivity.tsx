import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { COLORS, FF, FS } from '../../constants';

interface Activity {
  id: string;
  type: 'call' | 'document' | 'lead';
  title: string;
  description: string;
  timeAgo: string;
}

interface RecentActivityProps {
  activities?: Activity[];
  onViewAll?: () => void;
  onActivityPress?: (activity: Activity) => void;
}

// Phone Icon
const PhoneIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <Path 
      d="M11.3151 8.45089L11.0017 8.76298C11.0017 8.76298 10.2555 9.50429 8.2197 7.48016C6.18386 5.45603 6.92999 4.71473 6.92999 4.71473L7.12703 4.51769C7.61411 4.03405 7.66027 3.25691 7.23519 2.68922L6.36712 1.52972C5.84076 0.826998 4.82457 0.73399 4.22174 1.33337L3.14009 2.40813C2.84178 2.70576 2.64198 3.09019 2.6661 3.51734C2.7281 4.61069 3.22276 6.96207 5.98131 9.70546C8.90727 12.6142 11.6527 12.7299 12.775 12.6252C13.1305 12.5921 13.4392 12.4116 13.6879 12.1636L14.6662 11.1908C15.3276 10.5343 15.1415 9.40783 14.2955 8.94831L12.9796 8.23249C12.4243 7.93142 11.7485 8.01961 11.3144 8.45089" 
      fill="black"
    />
  </Svg>
);

// Document Icon
const DocumentIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <Path 
      d="M12.9013 5.07808L10.2613 2.70274C9.51 2.02608 9.13467 1.68741 8.67267 1.51074L8.66667 3.33341C8.66667 4.90474 8.66667 5.69075 9.15467 6.17875C9.64267 6.66675 10.4287 6.66675 12 6.66675H14.3867C14.1453 6.19741 13.712 5.80808 12.9013 5.07808Z" 
      fill="black"
    />
    <Path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M9.33332 14.6667H6.66666C4.15266 14.6667 2.89533 14.6667 2.11467 13.8853C1.334 13.104 1.33334 11.8473 1.33334 9.33335V6.66669C1.33334 4.1527 1.33334 2.89537 2.11467 2.11471C2.896 1.33404 4.15933 1.33337 6.68666 1.33337C7.09065 1.33337 7.41399 1.33337 7.68665 1.34471C7.67776 1.39804 7.67332 1.45226 7.67332 1.50737L7.66665 3.3967C7.66665 4.12803 7.66665 4.7747 7.73665 5.29536C7.81265 5.86003 7.98665 6.42469 8.44799 6.88603C8.90798 7.34603 9.47332 7.52069 10.038 7.59669C10.5586 7.66669 11.2053 7.66669 11.9366 7.66669H14.638C14.6666 8.02269 14.6666 8.46002 14.6666 9.04202V9.33335C14.6666 11.8473 14.6666 13.1047 13.8853 13.8853C13.104 14.666 11.8473 14.6667 9.33332 14.6667ZM6.99866 9.62669C7.20483 9.80996 7.22362 10.1256 7.04066 10.332L5.26266 12.332C5.16778 12.4387 5.03179 12.4998 4.88899 12.4998C4.7462 12.4998 4.61021 12.4387 4.51533 12.332L3.626 11.332C3.44264 11.1255 3.46144 10.8094 3.668 10.626C3.87455 10.4427 4.19064 10.4615 4.374 10.668L4.88866 11.248L6.29266 9.66802C6.38071 9.56861 6.50471 9.50831 6.63728 9.50043C6.76985 9.49255 6.89944 9.5384 6.99866 9.62669ZM6.99866 9.62669C7.20483 9.80996 7.22362 10.1256 7.04066 10.332L5.26266 12.332C5.16778 12.4387 5.03179 12.4998 4.88899 12.4998C4.7462 12.4998 4.61021 12.4387 4.51533 12.332L3.626 11.332C3.44264 11.1255 3.46144 10.8094 3.668 10.626C3.87455 10.4427 4.19064 10.4615 4.374 10.668L4.88866 11.248L6.29266 9.66802C6.38071 9.56861 6.50471 9.50831 6.63728 9.50043C6.76985 9.49255 6.89944 9.5384 6.99866 9.62669Z" 
      fill="black"
    />
  </Svg>
);

// Lead Icon (Checkmark in Square)
const LeadIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <Path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M7.46667 14.9333C3.94667 14.9333 2.18667 14.9333 1.09467 13.8387C0 12.7467 0 10.9867 0 7.46667C0 3.94667 0 2.18667 1.09467 1.09467C2.18667 0 3.94667 0 7.46667 0C10.9867 0 12.7467 0 13.8387 1.09467C14.9333 2.18667 14.9333 3.94667 14.9333 7.46667C14.9333 10.9867 14.9333 12.7467 13.8387 13.8387C12.7467 14.9333 10.9867 14.9333 7.46667 14.9333ZM11.6651 5.85811C11.8195 5.70371 11.8782 5.47349 11.8175 5.26C11.7568 5.04651 11.5866 4.88711 11.3731 4.84803C11.1596 4.80895 10.9395 4.89571 10.8251 5.06611L5.80907 11.3141L5.02827 10.5349C4.87387 10.3805 4.64365 10.3218 4.43016 10.3825C4.21667 10.4432 4.05727 10.6134 4.01819 10.8269C3.97911 11.0404 4.06587 11.2605 4.23627 11.3749L5.71997 12.8579C5.84128 12.9779 6.00785 13.04 6.17997 13.04C6.35209 13.04 6.51866 12.9779 6.63997 12.8579L11.6651 5.85811Z" 
      fill="black"
    />
  </Svg>
);

// Get icon based on activity type
const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'call':
      return <PhoneIcon />;
    case 'document':
      return <DocumentIcon />;
    case 'lead':
      return <LeadIcon />;
    default:
      return <PhoneIcon />;
  }
};

// Single Activity Card
const ActivityCard: React.FC<{ 
  activity: Activity; 
  onPress?: (activity: Activity) => void 
}> = ({ activity, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.activityCard}
      onPress={() => onPress?.(activity)}
      activeOpacity={0.7}
    >
      {/* Left Side - Icon */}
      <View style={styles.iconContainer}>
        {getActivityIcon(activity.type)}
      </View>

      {/* Right Side - Activity Details */}
      <View style={styles.detailsContainer}>
        {/* Title */}
        <Text style={styles.activityTitle}>{activity.title}</Text>
        
        {/* Description */}
        <Text style={styles.description}>{activity.description}</Text>
        
        {/* Time */}
        <Text style={styles.timeText}>{activity.timeAgo}</Text>
      </View>
    </TouchableOpacity>
  );
};

const RecentActivity: React.FC<RecentActivityProps> = ({
  activities = [
    {
      id: '1',
      type: 'call',
      title: 'Call with Amit Sharma',
      description: 'Discussed Project Phoenix',
      timeAgo: '2 hours ago',
    },
    {
      id: '2',
      type: 'document',
      title: 'Document Submitted',
      description: 'Property Papers Verified',
      timeAgo: '5 hours ago',
    },
    {
      id: '3',
      type: 'lead',
      title: 'New Lead Added',
      description: 'Priya Verma - Interested in 3BHK',
      timeAgo: 'Yesterday',
    },
  ],
  onViewAll,
  onActivityPress,
}) => {
  return (
    <View style={styles.mainContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <TouchableOpacity onPress={onViewAll} activeOpacity={0.7}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      {/* Activity Cards */}
      <View style={styles.cardsContainer}>
        {activities.map((activity) => (
          <ActivityCard 
            key={activity.id} 
            activity={activity} 
            onPress={onActivityPress}
          />
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
  activityCard: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
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
    gap: 4,
  },
  activityTitle: {
    color: COLORS.BLACK,
    fontFamily: FF[600],
    fontSize: FS.FS16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24,
  },
  description: {
    color: '#6B7280',
    fontFamily: FF[400],
    fontSize: FS.FS14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
  },
  timeText: {
    color: '#9CA3AF',
    fontFamily: FF[400],
    fontSize: FS.FS12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 16,
    marginTop: 4,
  },
});

export default RecentActivity;
