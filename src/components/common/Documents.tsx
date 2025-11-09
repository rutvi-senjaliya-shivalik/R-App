import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import { COLORS, FF, FS } from '../../constants';

interface Document {
  id: string;
  name: string;
  size: string;
}

interface DocumentsProps {
  documents: Document[];
  onUploadPress?: () => void;
  onDocumentPress?: (documentId: string) => void;
}

// Document Icon
const DocumentIcon = () => (
  <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <Rect width="40" height="40" rx="8" fill="#F3F4F6" />
    <Path
      d="M18 12H14C13.4696 12 12.9609 12.2107 12.5858 12.5858C12.2107 12.9609 12 13.4696 12 14V26C12 26.5304 12.2107 27.0391 12.5858 27.4142C12.9609 27.7893 13.4696 28 14 28H26C26.5304 28 27.0391 27.7893 27.4142 27.4142C27.7893 27.0391 28 26.5304 28 26V22M18 12L28 22M18 12V22H28"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Upload Icon
const UploadIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <Path
      d="M17 13V15C17 15.5304 16.7893 16.0391 16.4142 16.4142C16.0391 16.7893 15.5304 17 15 17H5C4.46957 17 3.96086 16.7893 3.58579 16.4142C3.21071 16.0391 3 15.5304 3 15V13M13 6L10 3M10 3L7 6M10 3V13"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const Documents: React.FC<DocumentsProps> = ({
  documents,
  onUploadPress,
  onDocumentPress,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Documents</Text>

      {/* Documents List */}
      <View style={styles.documentsList}>
        {documents.map((doc) => (
          <TouchableOpacity
            key={doc.id}
            style={styles.documentItem}
            onPress={() => onDocumentPress?.(doc.id)}
            activeOpacity={0.7}
          >
            <DocumentIcon />
            <View style={styles.documentInfo}>
              <Text style={styles.documentName}>{doc.name}</Text>
              <Text style={styles.documentSize}>{doc.size}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Upload Button */}
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={onUploadPress}
        activeOpacity={0.7}
      >
        <UploadIcon />
        <Text style={styles.uploadText}>Upload New Document</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  title: {
    fontSize: FS.FS18,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    fontWeight: '600',
    marginBottom: 16,
  },
  documentsList: {
    gap: 12,
    marginBottom: 16,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  documentInfo: {
    flex: 1,
    gap: 2,
  },
  documentName: {
    fontSize: FS.FS14,
    fontFamily: FF[500],
    color: COLORS.BLACK,
    fontWeight: '500',
  },
  documentSize: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: '#9CA3AF',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 14,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
  },
  uploadText: {
    fontSize: FS.FS14,
    fontFamily: FF[500],
    color: COLORS.BLACK,
    fontWeight: '500',
  },
});

export default Documents;
