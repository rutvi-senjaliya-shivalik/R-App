# Document Upload Implementation Guide

## Required Packages

To enable real document upload functionality, install these packages:

```bash
# For image picking
npm install react-native-image-picker
# or
yarn add react-native-image-picker

# For document/file picking
npm install react-native-document-picker
# or
yarn add react-native-document-picker
```

## iOS Setup

Add to `ios/Podfile`:
```ruby
permissions_path = '../node_modules/react-native-permissions/ios'
pod 'Permission-PhotoLibrary', :path => "#{permissions_path}/PhotoLibrary"
pod 'Permission-Camera', :path => "#{permissions_path}/Camera"
```

Add to `Info.plist`:
```xml
<key>NSPhotoLibraryUsageDescription</key>
<string>We need access to your photo library to upload documents</string>
<key>NSCameraUsageDescription</key>
<string>We need access to your camera to take photos</string>
```

## Android Setup

Add to `android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.CAMERA"/>
```

## Implementation Code

Replace the `handlePickDocument` function in `src/screen/leads/addLead.tsx`:

```typescript
import { launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';

const handlePickDocument = async () => {
  Alert.alert(
    'Upload Document',
    'Choose document type',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Image', onPress: () => pickImage() },
      { text: 'File', onPress: () => pickFile() },
    ]
  );
};

const pickImage = async () => {
  try {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
      selectionLimit: 1,
    });

    if (result.didCancel) return;
    if (result.errorCode) {
      Alert.alert('Error', result.errorMessage || 'Failed to pick image');
      return;
    }

    if (result.assets && result.assets[0]) {
      const file = result.assets[0];
      await uploadFile(file);
    }
  } catch (error: any) {
    Alert.alert('Error', 'Failed to pick image');
  }
};

const pickFile = async () => {
  try {
    const result = await DocumentPicker.pick({
      type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      allowMultiSelection: false,
    });

    if (result && result[0]) {
      await uploadFile(result[0]);
    }
  } catch (error: any) {
    if (!DocumentPicker.isCancel(error)) {
      Alert.alert('Error', 'Failed to pick file');
    }
  }
};

const uploadFile = async (file: any) => {
  try {
    const uploadResult = await uploadDocument(file);
    setUploadedDocuments([...uploadedDocuments, uploadResult.url]);
    Alert.alert('Success', 'Document uploaded successfully!');
  } catch (error: any) {
    Alert.alert('Upload Failed', error.message || 'Failed to upload document');
  }
};
```

## Current Status

The form currently shows installation instructions when you try to upload a document. Once you install the required packages and implement the code above, real document upload will work.

For testing purposes, the current implementation simulates document upload by adding mock URLs to the documents array.
