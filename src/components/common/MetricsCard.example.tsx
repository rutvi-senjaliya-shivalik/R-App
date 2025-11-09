/**
 * MetricsCard Component Usage Example
 * 
 * This component displays user metrics including welcome message, active leads, and projects.
 */

import React from 'react';
import { View, ScrollView } from 'react-native';
import { MetricsCard } from './index';
import { COLORS } from '../../constants';

// Example 1: Basic Usage with all props
const ExampleScreen1 = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
      <MetricsCard 
        userName="John Doe"
        activeLeads={25}
        projects={8}
      />
    </View>
  );
};

const ExampleScreen2 = () => {
  const userName = "Jane Smith";
  const activeLeadsCount = 42;
  const projectsCount = 15;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
      <MetricsCard 
        userName={userName}
        activeLeads={activeLeadsCount}
        projects={projectsCount}
      />
    </View>
  );
};

// Example 3: With default values (when data is not available)
const ExampleScreen3 = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
      <MetricsCard />
      {/* Will show: Welcome User, Active Leads: 0, Projects: 0 */}
    </View>
  );
};

// Example 4: In a ScrollView with other content
const ExampleScreen4 = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
      <MetricsCard 
        userName="Alex Johnson"
        activeLeads={18}
        projects={5}
      />
      {/* Other content below */}
    </ScrollView>
  );
};

export { ExampleScreen1, ExampleScreen2, ExampleScreen3, ExampleScreen4 };
