/**
 * TierProgressCard Component Usage Example
 * 
 * This component displays tier progress with a progress bar and labels for current tier and commission rate
 */

import React from 'react';
import { View, ScrollView } from 'react-native';
import { TierProgressCard } from './index';
import { COLORS } from '../../constants';

// Example 1: Basic Usage with all props
const ExampleScreen1 = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
      <TierProgressCard 
        currentTier="Silver"
        commissionRate="5%"
        progress={65}
        progressLabel="65% to Gold Tier"
      />
    </View>
  );
};

// Example 2: Different tier levels
const ExampleScreen2 = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
      {/* Bronze Tier */}
      <TierProgressCard 
        currentTier="Bronze"
        commissionRate="3%"
        progress={30}
        progressLabel="30% to Silver Tier"
      />

      {/* Silver Tier */}
      <TierProgressCard 
        currentTier="Silver"
        commissionRate="5%"
        progress={65}
        progressLabel="65% to Gold Tier"
      />

      {/* Gold Tier */}
      <TierProgressCard 
        currentTier="Gold"
        commissionRate="8%"
        progress={85}
        progressLabel="85% to Platinum Tier"
      />

      {/* Platinum Tier */}
      <TierProgressCard 
        currentTier="Platinum"
        commissionRate="10%"
        progress={100}
        progressLabel="Maximum Tier Achieved"
      />
    </ScrollView>
  );
};

// Example 3: With dynamic data from API/Redux
const ExampleScreen3 = () => {
  // Assume you have this data from Redux or API
  const userTierData = {
    tier: 'Gold',
    commission: '8%',
    progressPercentage: 75,
    nextTier: 'Platinum',
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
      <TierProgressCard 
        currentTier={userTierData.tier}
        commissionRate={userTierData.commission}
        progress={userTierData.progressPercentage}
        progressLabel={`${userTierData.progressPercentage}% to ${userTierData.nextTier} Tier`}
      />
    </View>
  );
};

// Example 4: With default values
const ExampleScreen4 = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
      <TierProgressCard />
      {/* Will show: Silver tier, 5% commission, 65% progress */}
    </View>
  );
};

// Example 5: Low progress
const ExampleScreen5 = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
      <TierProgressCard 
        currentTier="Bronze"
        commissionRate="2%"
        progress={15}
        progressLabel="15% to Silver Tier"
      />
    </View>
  );
};

export { ExampleScreen1, ExampleScreen2, ExampleScreen3, ExampleScreen4, ExampleScreen5 };
