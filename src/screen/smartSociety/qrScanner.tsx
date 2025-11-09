import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  PermissionsAndroid,
  Platform,
  Linking,
  Dimensions,
} from 'react-native';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import { Container, HeaderComponent } from '../../components/common';
import { COLORS, FF, FS } from '../../constants';
import { useTranslation } from '../../context/LanguageContext';

const { width, height } = Dimensions.get('window');

const QRScanner = (props: any) => {
  const { t } = useTranslation();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scannedData, setScannedData] = useState<any>(null);
  const device = useCameraDevice('back');

  useEffect(() => {
    checkCameraPermission();
  }, []);

  const checkCameraPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: t('common.cameraPermission'),
            message: t('smartSociety.cameraPermissionForQRScan'),
            buttonPositive: t('common.ok'),
            buttonNegative: t('common.cancel'),
          }
        );
        setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
      } else {
        const status = await Camera.requestCameraPermission();
        setHasPermission(status === 'granted');
      }
    } catch (error) {
      console.error('Permission error:', error);
      setHasPermission(false);
    }
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      if (codes.length > 0 && !scannedData) {
        const data = codes[0].value;
        console.log('QR Code scanned:', data);
        
        // Try to parse JSON data
        let parsedData;
        try {
          parsedData = JSON.parse(data);
        } catch (parseError) {
          // If not JSON, treat as plain text
          parsedData = { rawData: data };
        }

        // If onScanComplete callback is provided, return data immediately
        const onScanComplete = props.route?.params?.onScanComplete;
        if (onScanComplete) {
          // Call callback first
          try {
            onScanComplete(parsedData);
          } catch (error) {
            console.error('Error in onScanComplete callback:', error);
          }
          // Get previous route name and navigate back with params
          const state = props.navigation?.getState();
          const previousRoute = state?.routes?.[state?.index - 1];
          if (previousRoute) {
            props.navigation?.navigate(previousRoute.name, { scannedData: parsedData });
          } else {
            props.navigation?.goBack();
          }
          return;
        }

        // Otherwise, show details screen
        setScannedData(parsedData);
      }
    },
  });

  const handleSubmit = () => {
    if (scannedData) {
      // Pass scanned data back to AddVisitor screen
      const onScanComplete = props.route?.params?.onScanComplete;
      if (onScanComplete) {
        onScanComplete(scannedData);
      }
      props.navigation?.goBack();
    }
  };

  const handleCancel = () => {
    props.navigation?.goBack();
  };

  const handleScanAgain = () => {
    setScannedData(null);
  };

  if (hasPermission === null) {
    return (
      <Container>
        <HeaderComponent Title={t('smartSociety.qrScanner')} onPress={handleCancel} />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>{t('smartSociety.checkingCameraPermission')}</Text>
        </View>
      </Container>
    );
  }

  if (hasPermission === false) {
    return (
      <Container>
        <HeaderComponent Title={t('smartSociety.qrScanner')} onPress={handleCancel} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{t('common.cameraPermissionRequired')}</Text>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => Linking.openSettings()}
          >
            <Text style={styles.settingsButtonText}>{t('common.openSettings')}</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }

  if (!device) {
    return (
      <Container>
        <HeaderComponent Title={t('smartSociety.qrScanner')} onPress={handleCancel} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{t('common.cameraNotAvailable')}</Text>
        </View>
      </Container>
    );
  }

  // If data is scanned, show details
  if (scannedData) {
    return (
      <Container>
        <HeaderComponent Title={t('smartSociety.qrCodeDetails')} onPress={handleCancel} />
        <View style={styles.detailsContainer}>
          <View style={styles.detailsCard}>
            <Text style={styles.detailsTitle}>{t('smartSociety.scannedVisitorDetails')}</Text>
            
            {scannedData.visitorName && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>{t('smartSociety.visitorName')}:</Text>
                <Text style={styles.detailValue}>{scannedData.visitorName}</Text>
              </View>
            )}
            
            {scannedData.phoneNumber && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>{t('smartSociety.phoneNumber')}:</Text>
                <Text style={styles.detailValue}>{scannedData.phoneNumber}</Text>
              </View>
            )}
            
            {scannedData.flatNumber && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>{t('smartSociety.flatNumber')}:</Text>
                <Text style={styles.detailValue}>{scannedData.flatNumber}</Text>
              </View>
            )}
            
            {scannedData.purpose && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>{t('smartSociety.purpose')}:</Text>
                <Text style={styles.detailValue}>{scannedData.purpose}</Text>
              </View>
            )}
            
            {scannedData.vehicleNumber && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>{t('smartSociety.vehicleNumber')}:</Text>
                <Text style={styles.detailValue}>{scannedData.vehicleNumber}</Text>
              </View>
            )}
            
            {scannedData.numberOfVisitors && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>{t('smartSociety.numberOfVisitors')}:</Text>
                <Text style={styles.detailValue}>{scannedData.numberOfVisitors}</Text>
              </View>
            )}

            {scannedData.rawData && !scannedData.visitorName && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>{t('smartSociety.qrData')}:</Text>
                <Text style={styles.detailValue}>{scannedData.rawData}</Text>
              </View>
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleScanAgain}
              >
                <Text style={styles.cancelButtonText}>{t('smartSociety.scanAgain')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
              >
                <Text style={styles.submitButtonText}>{t('common.submit')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <HeaderComponent Title={t('smartSociety.scanQRCode')} onPress={handleCancel} />
      <View style={styles.scannerContainer}>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          codeScanner={codeScanner}
        />
        <View style={styles.overlay}>
          <View style={styles.topOverlay} />
          <View style={styles.middleOverlay}>
            <View style={styles.sideOverlay} />
            <View style={styles.scanArea}>
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
            </View>
            <View style={styles.sideOverlay} />
          </View>
          <View style={styles.bottomOverlay}>
            <Text style={styles.instructionText}>
              {t('smartSociety.positionQRCodeWithinFrame')}
            </Text>
            <TouchableOpacity
              style={styles.cancelButtonOverlay}
              onPress={handleCancel}
            >
              <Text style={styles.cancelButtonTextOverlay}>{t('common.cancel')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Container>
  );
};

const scanAreaSize = width * 0.7;

const styles = StyleSheet.create({
  scannerContainer: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  topOverlay: {
    flex: 1,
  },
  middleOverlay: {
    flexDirection: 'row',
    height: scanAreaSize,
  },
  sideOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scanArea: {
    width: scanAreaSize,
    height: scanAreaSize,
    justifyContent: 'center',
    alignItems: 'center',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: COLORS.OCEAN_BLUE_TEXT,
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  bottomOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  instructionText: {
    fontSize: FS.FS16,
    fontFamily: FF[500],
    color: COLORS.WHITE,
    textAlign: 'center',
    marginBottom: 20,
  },
  cancelButtonOverlay: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: COLORS.OCEAN_BLUE_TEXT,
    borderRadius: 8,
  },
  cancelButtonTextOverlay: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.WHITE,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: COLORS.ERROR_COLOR,
    marginBottom: 20,
    textAlign: 'center',
  },
  settingsButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: COLORS.OCEAN_BLUE_TEXT,
    borderRadius: 8,
  },
  settingsButtonText: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.WHITE,
  },
  detailsContainer: {
    flex: 1,
    padding: 16,
  },
  detailsCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailsTitle: {
    fontSize: FS.FS18,
    fontFamily: FF[700],
    color: COLORS.BLACK_TEXT,
    marginBottom: 20,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_GREY,
  },
  detailLabel: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.GREY_TEXT,
    width: 120,
  },
  detailValue: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
    flex: 1,
    textAlign: 'right',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    backgroundColor: COLORS.LIGHT_GRAY,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 6,
  },
  cancelButtonText: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
  },
  submitButton: {
    flex: 1,
    paddingVertical: 14,
    backgroundColor: COLORS.OCEAN_BLUE_TEXT,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 6,
  },
  submitButtonText: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.WHITE,
  },
});

export default QRScanner;
