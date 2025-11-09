import React from 'react';
import { View, Text } from 'react-native';
import { InputField } from '../../../../components/common';
import { formStyles } from '../styles/formStyles';

interface FamilyMemberFormProps {
  name: string;
  setName: (value: string) => void;
  relation: string;
  setRelation: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
}

const FamilyMemberForm: React.FC<FamilyMemberFormProps> = ({
  name,
  setName,
  relation,
  setRelation,
  phone,
  setPhone,
}) => {
  return (
    <>
      <View style={formStyles.inputWrapper}>
        <Text style={formStyles.label}>Name *</Text>
        <InputField
          placeholder="Enter family member name"
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={formStyles.inputWrapper}>
        <Text style={formStyles.label}>Relation *</Text>
        <InputField
          placeholder="E.g., Spouse, Child, Parent"
          value={relation}
          onChangeText={setRelation}
        />
      </View>
      <View style={formStyles.inputWrapper}>
        <Text style={formStyles.label}>Phone Number</Text>
        <InputField
          placeholder="Enter phone number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          maxLength={10}
        />
      </View>
    </>
  );
};

export default FamilyMemberForm;

