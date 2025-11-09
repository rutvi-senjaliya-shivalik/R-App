/**
 * QuickActions Component Usage Example
 * 
 * This component displays two quick action buttons: Add Lead and Create Invoice
 */

import React from 'react';
import { View, Alert, ScrollView } from 'react-native';
import { QuickActions } from './index';
import { COLORS } from '../../constants';

// Example 1: Basic Usage with Alert handlers
const ExampleScreen1 = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
      <QuickActions 
        onAddLead={() => Alert.alert('Add Lead', 'Opening Add Lead form')}
        onCreateInvoice={() => Alert.alert('Create Invoice', 'Opening Invoice form')}
      />
    </View>
  );
};

// Example 2: With Navigation
const ExampleScreen2 = ({ navigation }: any) => {
  const handleAddLead = () => {
    navigation.navigate('AddLead');
  };

  const handleCreateInvoice = () => {
    navigation.navigate('CreateInvoice');
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
      <QuickActions 
        onAddLead={handleAddLead}
        onCreateInvoice={handleCreateInvoice}
      />
    </View>
  );
};

// Example 3: In a ScrollView with other content
const ExampleScreen3 = ({ navigation }: any) => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
      {/* Other content above */}
      
      <QuickActions 
        onAddLead={() => navigation.navigate('AddLead')}
        onCreateInvoice={() => navigation.navigate('CreateInvoice')}
      />
      
      {/* Other content below */}
    </ScrollView>
  );
};

// Example 4: Without handlers (buttons will still be visible but won't do anything)
const ExampleScreen4 = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
      <QuickActions />
    </View>
  );
};

export { ExampleScreen1, ExampleScreen2, ExampleScreen3, ExampleScreen4 };
