import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { InputField } from '../../../../components/common';
import { formStyles } from '../styles/formStyles';

interface DocumentFormProps {
  documentName: string;
  setDocumentName: (value: string) => void;
  documentType: string;
  setDocumentType: (value: string) => void;
}

const DocumentForm: React.FC<DocumentFormProps> = ({
  documentName,
  setDocumentName,
  documentType,
  setDocumentType,
}) => {
  return (
    <>
      <View style={formStyles.inputWrapper}>
        <Text style={formStyles.label}>Document Name *</Text>
        <InputField
          placeholder="Enter document name"
          value={documentName}
          onChangeText={setDocumentName}
        />
      </View>
      <View style={formStyles.inputWrapper}>
        <Text style={formStyles.label}>Document Type *</Text>
        <InputField
          placeholder="E.g., Agreement, ID Proof"
          value={documentType}
          onChangeText={setDocumentType}
        />
      </View>
      <TouchableOpacity style={formStyles.filePickerButton}>
        <Text style={formStyles.filePickerText}>Choose File</Text>
      </TouchableOpacity>
    </>
  );
};

export default DocumentForm;

