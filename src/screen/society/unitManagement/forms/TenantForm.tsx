import React from 'react';
import { View, Text } from 'react-native';
import { InputField } from '../../../../components/common';
import { formStyles } from '../styles/formStyles';

interface TenantFormProps {
  tenantName: string;
  setTenantName: (value: string) => void;
  tenantPhone: string;
  setTenantPhone: (value: string) => void;
  tenantEmail: string;
  setTenantEmail: (value: string) => void;
  leaseStart: string;
  setLeaseStart: (value: string) => void;
}

const TenantForm: React.FC<TenantFormProps> = ({
  tenantName,
  setTenantName,
  tenantPhone,
  setTenantPhone,
  tenantEmail,
  setTenantEmail,
  leaseStart,
  setLeaseStart,
}) => {
  return (
    <>
      <View style={formStyles.inputWrapper}>
        <Text style={formStyles.label}>Tenant Name *</Text>
        <InputField
          placeholder="Enter tenant name"
          value={tenantName}
          onChangeText={setTenantName}
        />
      </View>
      <View style={formStyles.inputWrapper}>
        <Text style={formStyles.label}>Phone Number *</Text>
        <InputField
          placeholder="Enter phone number"
          value={tenantPhone}
          onChangeText={setTenantPhone}
          keyboardType="phone-pad"
          maxLength={10}
        />
      </View>
      <View style={formStyles.inputWrapper}>
        <Text style={formStyles.label}>Email</Text>
        <InputField
          placeholder="Enter email address"
          value={tenantEmail}
          onChangeText={setTenantEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={formStyles.inputWrapper}>
        <Text style={formStyles.label}>Lease Start Date</Text>
        <InputField
          placeholder="YYYY-MM-DD"
          value={leaseStart}
          onChangeText={setLeaseStart}
        />
      </View>
    </>
  );
};

export default TenantForm;

