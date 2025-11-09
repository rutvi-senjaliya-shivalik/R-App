import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { COLORS, FF, FS } from '../../constants';

interface FilterButtonsProps {
  onDatePress?: () => void;
  onStagePress?: () => void;
  onProjectPress?: () => void;
  onPriorityPress?: () => void;
}

// Calendar Icon
const CalendarIcon = () => (
  <Svg width="17" height="17" viewBox="0 0 17 17" fill="none">
    <Path
      d="M5.41272 1.74604C5.41272 1.45675 5.1782 1.22223 4.88891 1.22223C4.59962 1.22223 4.3651 1.45675 4.3651 1.74604V2.84953C3.35939 2.92985 2.70009 3.1268 2.21539 3.61219C1.72999 4.09689 1.53304 4.75689 1.45203 5.76191H15.3099C15.2289 4.75619 15.0319 4.09689 14.5466 3.61219C14.0619 3.1268 13.4019 2.92985 12.3968 2.84883V1.74604C12.3968 1.45675 12.1623 1.22223 11.873 1.22223C11.5837 1.22223 11.3492 1.45675 11.3492 1.74604V2.80273C10.8848 2.79366 10.3638 2.79366 9.77779 2.79366H6.98415C6.39818 2.79366 5.87716 2.79366 5.41272 2.80273V1.74604Z"
      fill="#1F2937"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.39691 8.38095C1.39691 7.79499 1.39691 7.27397 1.40599 6.80952H15.3561C15.3652 7.27397 15.3652 7.79499 15.3652 8.38095V9.77778C15.3652 12.4115 15.3652 13.7287 14.5466 14.5465C13.7281 15.3644 12.4116 15.3651 9.77787 15.3651H6.98421C4.3505 15.3651 3.03329 15.3651 2.21545 14.5465C1.39761 13.728 1.39691 12.4115 1.39691 9.77778V8.38095ZM11.8731 9.77778C12.2588 9.77778 12.5715 9.46509 12.5715 9.07937C12.5715 8.69364 12.2588 8.38095 11.8731 8.38095C11.4874 8.38095 11.1747 8.69364 11.1747 9.07937C11.1747 9.46509 11.4874 9.77778 11.8731 9.77778ZM11.8731 12.5714C12.2588 12.5714 12.5715 12.2587 12.5715 11.873C12.5715 11.4873 12.2588 11.1746 11.8731 11.1746C11.4874 11.1746 11.1747 11.4873 11.1747 11.873C11.1747 12.2587 11.4874 12.5714 11.8731 12.5714ZM9.07945 9.07937C9.07945 9.46509 8.76676 9.77778 8.38104 9.77778C7.99532 9.77778 7.68263 9.46509 7.68263 9.07937C7.68263 8.69364 7.99532 8.38095 8.38104 8.38095C8.76676 8.38095 9.07945 8.69364 9.07945 9.07937ZM9.07945 11.873C9.07945 12.2587 8.76676 12.5714 8.38104 12.5714C7.99532 12.5714 7.68263 12.2587 7.68263 11.873C7.68263 11.4873 7.99532 11.1746 8.38104 11.1746C8.76676 11.1746 9.07945 11.4873 9.07945 11.873ZM4.88898 9.77778C5.2747 9.77778 5.58739 9.46509 5.58739 9.07937C5.58739 8.69364 5.2747 8.38095 4.88898 8.38095C4.50325 8.38095 4.19056 8.69364 4.19056 9.07937C4.19056 9.46509 4.50325 9.77778 4.88898 9.77778ZM4.88898 12.5714C5.2747 12.5714 5.58739 12.2587 5.58739 11.873C5.58739 11.4873 5.2747 11.1746 4.88898 11.1746C4.50325 11.1746 4.19056 11.4873 4.19056 11.873C4.19056 12.2587 4.50325 12.5714 4.88898 12.5714ZM4.88898 12.5714C5.2747 12.5714 5.58739 12.2587 5.58739 11.873C5.58739 11.4873 5.2747 11.1746 4.88898 11.1746C4.50325 11.1746 4.19056 11.4873 4.19056 11.873C4.19056 12.2587 4.50325 12.5714 4.88898 12.5714Z"
      fill="#1F2937"
    />
  </Svg>
);

// Flag Icon (for Stage)
const FlagIcon = () => (
  <Svg width="17" height="17" viewBox="0 0 17 17" fill="none">
    <Path
      d="M3.5 2.5C3.5 2.22386 3.72386 2 4 2C4.27614 2 4.5 2.22386 4.5 2.5V3H12.5C12.6326 3 12.7598 3.05268 12.8536 3.14645L14.8536 5.14645C15.0488 5.34171 15.0488 5.65829 14.8536 5.85355L12.8536 7.85355C12.7598 7.94732 12.6326 8 12.5 8H4.5V14.5C4.5 14.7761 4.27614 15 4 15C3.72386 15 3.5 14.7761 3.5 14.5V2.5Z"
      fill="#1F2937"
    />
  </Svg>
);

// Building Icon (for Project)
const BuildingIcon = () => (
  <Svg width="17" height="17" viewBox="0 0 17 17" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 3C2 2.44772 2.44772 2 3 2H8C8.55228 2 9 2.44772 9 3V14H14C14.5523 14 15 14.4477 15 15C15 15.5523 14.5523 16 14 16H3C2.44772 16 2 15.5523 2 15V3ZM4 5H7V7H4V5ZM7 9H4V11H7V9Z"
      fill="#1F2937"
    />
  </Svg>
);

// Flame Icon (for Priority)
const FlameIcon = () => (
  <Svg width="17" height="17" viewBox="0 0 17 17" fill="none">
    <Path
      d="M8.5 2C8.5 2 6 5 6 7.5C6 8.88071 7.11929 10 8.5 10C9.88071 10 11 8.88071 11 7.5C11 5 8.5 2 8.5 2Z"
      fill="#1F2937"
    />
    <Path
      d="M8.5 11C6.567 11 5 12.567 5 14.5C5 14.7761 5.22386 15 5.5 15H11.5C11.7761 15 12 14.7761 12 14.5C12 12.567 10.433 11 8.5 11Z"
      fill="#1F2937"
    />
  </Svg>
);

// Down Arrow Icon
const DownArrowIcon = () => (
  <Svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <Path
      d="M6.45395 8.38095L9.89297 4.83496C10.1074 4.613 9.97748 4.19048 9.69508 4.19048H2.81703C2.53464 4.19048 2.40467 4.613 2.61914 4.83496L6.05817 8.38095C6.17209 8.49862 6.34003 8.49862 6.45395 8.38095Z"
      fill="#1F2937"
    />
  </Svg>
);

// Single Filter Button
const FilterButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
}> = ({ icon, label, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.filterButton}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon}
      <Text style={styles.filterText}>{label}</Text>
      <DownArrowIcon />
    </TouchableOpacity>
  );
};

const FilterButtons: React.FC<FilterButtonsProps> = ({
  onDatePress,
  onStagePress,
  onProjectPress,
  onPriorityPress,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <FilterButton 
          icon={<CalendarIcon />}
          label="Date"
          onPress={onDatePress}
        />
        <FilterButton 
          icon={<FlagIcon />}
          label="Stage"
          onPress={onStagePress}
        />
        <FilterButton 
          icon={<BuildingIcon />}
          label="Project"
          onPress={onProjectPress}
        />
        <FilterButton 
          icon={<FlameIcon />}
          label="Priority"
          onPress={onPriorityPress}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 9,
    paddingHorizontal: 12,
    alignSelf: 'stretch',
  },
  scrollContent: {
    gap: 8,
    paddingRight: 12,
  },
  filterButton: {
    flexDirection: 'row',
    padding: 9,
    paddingHorizontal: 18,
    alignItems: 'center',
    gap: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.10)',
  },
  filterText: {
    fontFamily: FF[500],
    fontSize: FS.FS14,
    color: '#1F2937',
    fontWeight: '500',
  },
});

export default FilterButtons;
